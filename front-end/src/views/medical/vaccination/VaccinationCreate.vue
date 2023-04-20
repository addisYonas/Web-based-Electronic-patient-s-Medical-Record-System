<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add a vaccination</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field class="body-1" v-validate="'required|alpha_spaces'"
                                      :error-messages="errors.collect('vaccine')" name="vaccine"
                                      v-model="vaccine.vaccine" label="Vaccine name" required></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-menu
                                v-model="datePicker"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        v-model="vaccine.takenDate"
                                        label="Vaccine taken date"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker :max="maxDate" v-model="vaccine.takenDate" color="primary"
                                           @input="datePicker = false"></v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveVaccine(vaccine)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex";
    import {PatientService} from "@/services"

    export default {
        name: "VaccineCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                vaccine: {},
                datePicker: false,
                currentDate: new Date().toDateString()
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveVaccine(vaccine) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        vaccine.patientId = PatientService.getPatientId();
                        this.createVaccination(vaccine);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            formatDate(date) {
                let month = `${date.getMonth() + 1}`;
                let day = `${date.getDate()}`;
                const year = date.getFullYear();

                if (month.length < 2) month = `0${month}`;
                if (day.length < 2) day = `0${day}`;

                return [year, month, day].join('-');
            },
            ...mapActions(['createVaccination'])
        },
        computed: {
            maxDate() {
                const today = new Date();
                return this.formatDate(today);
            },
        }
    }
</script>

<style scoped>

</style>
