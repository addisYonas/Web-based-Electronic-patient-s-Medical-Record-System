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
                    <v-flex xs12>
                        <v-text-field v-validate="'required|alpha_spaces'"
                                      :error-messages="errors.collect('name')" name="name" autofocus
                                      v-model="utility.name" label="Name of the utility" required></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-textarea v-validate="'required|alpha_spaces'"
                                    :error-messages="errors.collect('description')" name="description"
                                    v-model="utility.description" label="Description of the utility" required></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveUtility(utility)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "NewUtility",
        props: {
            modalName: {
                type: String,
                default: ""
            },
            utility: {
                type: Object,
                default: () => {
                    this.utility = {
                        name: "",
                        description: ""
                    }
                }
            }
        },
        data() {
            return {
                dialog: false,
                errorMessages: null,
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveUtility(utility) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        if (utility.id) {
                            this.updateUtility(utility);
                        } else {
                            this.createUtility(utility);
                        }
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createUtility', 'updateUtility'])
        },
        computed: {
            componentTitle() {
                if (!this.utility.id)
                    return "Create utility";
                else
                    return "Edit utility";
            }
        }
    }
</script>
