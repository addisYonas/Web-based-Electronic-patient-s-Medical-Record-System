<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add a other Health</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs6>
                        <v-checkbox v-model="otherHealth.useTobacco" label="Use tobacco" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                        <v-checkbox v-model="otherHealth.alcoholUse" label="Use alcohol" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field class="body-1" v-validate="'alpha_spaces'"
                                      :error-messages="errors.collect('sexualActivity')" name="sexualActivity"
                                      v-model="otherHealth.sexualActivity" label="Sexual Activity"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field class="body-1"
                                      v-model="otherHealth.exercise" label="Exercise"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field class="body-1"
                                      v-model="otherHealth.sleep" label="Sleep"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field class="body-1"
                                      v-model="otherHealth.diet" label="Diet"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveOtherHealth(otherHealth)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex";
    import {PatientService} from "@/services"

    export default {
        name: "OtherHealthCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                otherHealth: {
                    useTobacco: false,
                    alcoholUse: false
                }
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveOtherHealth(otherHealth) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        otherHealth.patientId = PatientService.getPatientId();
                        this.createOtherHealth(otherHealth);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createOtherHealth'])
        }
    }
</script>

<style scoped>

</style>
