<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add an allergy</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field class="body-1" v-validate="'required|alpha_spaces'"
                                      :error-messages="errors.collect('allergy')" name="allergy"
                                      v-model="allergy.allergy" label="Allergy name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea class="body-1" v-validate="'required'"
                                    :error-messages="errors.collect('allergicReaction')" name="allergicReaction"
                                    v-model="allergy.allergicReaction" label="Allergis reaction" required></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveAllergy(allergy)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex'
    import {PatientService} from "@/services"

    export default {
        name: "AllergyCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                allergy: {}
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveAllergy(allergy) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        allergy.patientId = PatientService.getPatientId();
                        this.createAllergy(allergy);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createAllergy'])
        }
    }
</script>

<style scoped>

</style>
