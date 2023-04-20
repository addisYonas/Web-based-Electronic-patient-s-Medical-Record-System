<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add a social history</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field class="body-1" v-validate="'required|alpha_spaces'"
                                      :error-messages="errors.collect('occupation')" name="occupation"
                                      v-model="socialHistory.occupation" label="Occupation" required></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field class="body-1"
                                      :error-messages="errors.collect('employer')" name="employer"
                                      v-model="socialHistory.employer" label="Employer"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field class="body-1"
                                      :error-messages="errors.collect('educationalStatus')" name="educationalStatus"
                                      v-model="socialHistory.educationalStatus"
                                      label="Educational Status"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field type="number" min="0" max="30" class="body-1"
                                      v-validate="'required|numeric|max_value:30'"
                                      :error-messages="errors.collect('noOfChildren')" name="noOfChildren"
                                      v-model="socialHistory.noOfChildren" label="No Of Children"
                                      required></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-container fluid class="pa-0">
                            <p>Martial Status</p>
                            <v-radio-group row v-model="socialHistory.martialStatus" :mandatory="false">
                                <v-flex xs4>
                                    <v-radio color="primary" label="Single" value="Single"></v-radio>
                                </v-flex>
                                <v-flex xs4>
                                    <v-radio color="primary" label="Married" value="Married"></v-radio>
                                </v-flex>
                                <v-flex xs4>
                                    <v-radio color="primary" label="Widowed" value="Widowed"></v-radio>
                                </v-flex>
                            </v-radio-group>
                        </v-container>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveSocialHistory(socialHistory)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex";
    import {PatientService} from "@/services"

    export default {
        name: "SocialHistoryCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                socialHistory: {}
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveSocialHistory(socialHistory) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        socialHistory.patientId = PatientService.getPatientId();
                        this.createSocialHistory(socialHistory);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createSocialHistory'])
        }
    }
</script>

<style scoped>

</style>
