<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">{{ componentTitle }}</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <form-error-messages
                    :messages="errorMessages"
            />
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs6>
                        <v-text-field v-validate="'required|alpha_spaces'"
                                      :error-messages="errors.collect('name')" name="name" autofocus
                                      v-model="classOfUtility.name" label="Name of the class utility"
                                      required></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                        <v-autocomplete
                                v-validate="'required'"
                                :error-messages="errors.collect('utility')"
                                name="utility"
                                v-model="classOfUtility.utilityId"
                                label="Utility"
                                :items="allUtilities"
                                item-text="name"
                                item-value="id"
                        ></v-autocomplete>
                    </v-flex>

                    <v-flex xs12>
                        <v-textarea v-validate="'required|alpha_spaces'"
                                    :error-messages="errors.collect('description')" name="description"
                                    v-model="classOfUtility.description" label="Description of the class utility"
                                    required></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveClassOfUtility(classOfUtility)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "NewClassOfUtility",
        props: {
            modalName: {
                type: String,
                default: ""
            },
            classOfUtility: {
                type: Object,
                default: () => {
                    this.classOfUtility = {
                        name: "",
                        description: "",
                        utilityId: ""
                    }
                }
            }
        },
        data() {
            return {
                errorMessages: null,
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveClassOfUtility(classOfUtility) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        if (classOfUtility.id) {
                            this.updateClassOfUtility(classOfUtility);
                        } else {
                            this.createClassOfUtility(classOfUtility);
                        }
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['fetchAllUtilities', 'createClassOfUtility', 'updateClassOfUtility'])
        },
        computed: {
            ...mapGetters(['allUtilities']),
            componentTitle() {
                if (!this.classOfUtility.id)
                    return "Create class of utility";
                else
                    return "Edit class of utility";
            }
        },
        created() {
            this.fetchAllUtilities()
        }
    }
</script>

