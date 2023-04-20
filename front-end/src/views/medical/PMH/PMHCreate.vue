<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add a pmh</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs12 class="my-1 py-0">
                        <v-text-field class="body-1"  v-validate="'required|alpha_spaces'"
                                      :error-messages="errors.collect('disease')" name="disease" autofocus
                                      v-model="pmh.disease" label="Disease" required></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-checkbox v-model="pmh.isCurrent" label="Current situation" color="primary"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 class="my-1 py-0">
                        <v-textarea class="body-1" v-validate="'required'"
                                    :error-messages="errors.collect('pmh')" name="comment"
                                    v-model="pmh.comment" label="Comment" required></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="savePMH(pmh)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex";
    import {PatientService} from "@/services"

    export default {
        name: "PMHCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data(){
            return{
                pmh: {
                    isCurrent: false
                }
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            savePMH(pmh) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        pmh.patientId = PatientService.getPatientId();
                        this.createPMH(pmh);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createPMH'])
        }
    }
</script>

<style scoped>

</style>
