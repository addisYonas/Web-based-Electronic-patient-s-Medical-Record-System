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
                                      v-model="drug.name" label="Name of the drug" required></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                        <v-autocomplete
                                v-validate="'required'"
                                :error-messages="errors.collect('utility')"
                                name="utility"
                                v-model="drug.drugUtilityId"
                                label="Drug utility"
                                :items="allUtilities"
                                item-text="name"
                                item-value="id"
                        ></v-autocomplete>
                    </v-flex>

                    <v-flex xs6>
                        <v-autocomplete
                                v-validate="'required'"
                                :error-messages="errors.collect('classOfUtility')"
                                name="classOfUtility"
                                v-model="drug.drugClassId"
                                label="Class of utility"
                                :items="allClassOfUtilities"
                                item-text="name"
                                item-value="id"
                        ></v-autocomplete>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <v-autocomplete
                                v-validate="'required'"
                                :error-messages="errors.collect('strengths')"
                                name="strengths"
                                label="Select strengths"
                                :items="strengths"
                                chips
                                multiple
                                v-model="drug.strengths"
                                item-text="strength"
                                item-value="strength"
                        >
                            <template slot="selection" slot-scope="data">
                                <v-chip
                                        close
                                        @input="data.parent.selectItem(data.item.strength)"
                                        class="chip--select-multi"
                                        :selected="data.selected"
                                        :key="JSON.stringify(data.item.strength)"
                                >
                                    {{ data.item.strength }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-flex>

                    <v-flex xs12 sm6>
                        <v-autocomplete
                                v-validate="'required'"
                                :error-messages="errors.collect('form')"
                                name="form"
                                v-model="drug.form"
                                label="Drug Form"
                                :items="forms"
                        ></v-autocomplete>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveDrug(drug)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "NewDrug",
        props: {
            modalName: {
                type: String,
                default: ""
            },
            drug: {
                type: Object,
                default: () => {
                    this.drug = {
                        name: "",
                        utility: "",
                        classOfUtility: "",
                        strengths: [],
                        form: ""
                    }
                }
            }
        },
        data() {
            return {
                dialog: false,
                errorMessages: null,
                showPassword: false,
                roles: [],
                strengths: [
                    {strength: "strength 1"},
                    {strength: "strength 2"},
                    {strength: "strength 3"},
                    {strength: "strength 4"},
                    {strength: "strength 5"},
                    {strength: "strength 6"},
                    {strength: "strength 7"},
                    {strength: "strength 8"},
                    {strength: "strength 9"},
                    {strength: "strength 10"}
                ],
                forms: [
                    "tablets",
                    "syrup",
                    "syringe"
                ]
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveDrug(drug) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        if (drug.id) {
                            this.updateDrug(drug);
                        } else {
                            this.createDrug(drug);
                        }
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createDrug', 'updateDrug', 'fetchAllUtilities', 'fetchAllClassOfUtilities'])
        },
        computed: {
            ...mapGetters(['allUtilities', 'allClassOfUtilities']),
            componentTitle() {
                if (!this.drug.id)
                    return "Create drug";
                else
                    return "Edit drug";
            }
        },
        created() {
            this.fetchAllUtilities();
            this.fetchAllClassOfUtilities();
        }
    }
</script>
