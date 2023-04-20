<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add a clinical note</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs12>
                        <v-textarea class="body-1" v-validate="'required'"
                                      :error-messages="errors.collect('clinicalNote')" name="clinicalNote" autofocus
                                    v-model="clinicalNote.note" label="Clinical note" required></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveClinicalNote(clinicalNote)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex'
    import {PatientService} from "@/services"

    export default {
        name: "ClinicalNoteCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data(){
            return{
                clinicalNote: {}
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveClinicalNote(clinicalNote) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        clinicalNote.patientId = PatientService.getPatientId();
                        this.createClinicalNote(clinicalNote);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createClinicalNote'])
        }
    }
</script>

<style scoped>

</style>
