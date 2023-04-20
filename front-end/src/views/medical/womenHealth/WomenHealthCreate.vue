<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add a women Health</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs6>
                        <v-text-field type="number" min="0" max="30" class="body-1"
                                      v-validate="'numeric|max_value:30'"
                                      :error-messages="errors.collect('noOfPregnancies')" name="noOfPregnancies"
                                      v-model="womenHealth.noOfPregnancies" label="No of Pregnancies"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field type="number" min="0" max="30" class="body-1"
                                      v-validate="'numeric|max_value:30'"
                                      :error-messages="errors.collect('noOfDeliveries')" name="noOfDeliveries"
                                      v-model="womenHealth.noOfDeliveries" label="No of Deliveries"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field type="number" min="0" max="30" class="body-1"
                                      v-validate="'numeric|max_value:30'"
                                      :error-messages="errors.collect('noOfAbortions')" name="noOfAbortions"
                                      v-model="womenHealth.noOfAbortions" label="No of Abortions"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field type="number" min="0" max="30" class="body-1"
                                      v-validate="'numeric|max_value:30'"
                                      :error-messages="errors.collect('noOfMiscarriages')" name="noOfMiscarriages"
                                      v-model="womenHealth.noOfMiscarriages" label="No of Miscarriages"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field type="number" min="0" max="30" class="body-1"
                                      v-validate="'numeric|max_value:30'"
                                      :error-messages="errors.collect('ageAtFirstMense')" name="ageAtFirstMense"
                                      v-model="womenHealth.ageAtFirstMense" label="Age at First Mense"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field type="number" min="0" max="30" class="body-1"
                                      v-validate="'numeric|max_value:30'"
                                      :error-messages="errors.collect('lengthOfMense')" name="lengthOfMense"
                                      v-model="womenHealth.lengthOfMense" label="Length of Mense"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field class="body-1"
                                      v-model="womenHealth.concernsOfMense" label="concerns of Mense"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveWomenHealth(womenHealth)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex";
    import {PatientService} from "@/services"

    export default {
        name: "WomenHealthCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                womenHealth: {}
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveWomenHealth(womenHealth) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        womenHealth.patientId = PatientService.getPatientId();
                        this.createWomenHealth(womenHealth);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createWomenHealth'])
        }
    }
</script>

<style scoped>

</style>
