<template>
    <v-container grid-list-xl fluid class="mt-3">
        <div v-if="allPatients.length > 0">
            <v-layout row wrap>
                <v-flex xs12 sm6 v-for="item in allPatients" :key="item.id">
                    <v-hover>
                        <v-card class="cursorz" @click="getPatientInformation(item.id, item.age, item.sex)"
                                slot-scope="{ hover }" :class="`elevation-${hover ? 5 : 2}`">
                            <v-toolbar class="primary--text" height="30" flat dense card>
                                <v-toolbar-title class="body-1"><b>Patient - </b>{{item.id}}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-title class="body-2">By Dr. {{item.createdBy.fullName}}</v-toolbar-title>
                            </v-toolbar>
                            <v-divider/>
                            <v-card-text class="mx-2">
                                <div>Age - <span>{{item.age}}</span></div>
                                <div>Sex - <span>{{item.sex}}</span></div>
                            </v-card-text>
                            <v-toolbar class="primary--text" height="30" flat dense card color="transparent">
                                <v-toolbar-title class="body-1"><b>Created at - </b>{{item.createdAt |
                                    moment("MM-DD-YYYY, h:mm:ss a")}}
                                </v-toolbar-title>
                            </v-toolbar>
                        </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import {AccountService} from "@/services"
    import {mapGetters, mapActions} from 'vuex';
    import PatientService from "../../services/patient.service"
    import {eventBus} from "../../main";

    export default {
        name: "start-page",
        data() {
            return {
                authenticatedUserRole: ''
            }
        },
        methods: {
            getPatientInformation(id, age, sex) {
                PatientService.setPatientId(id, {age: age, sex: sex});
                eventBus.$emit('patientSelected');
                this.$router.push('/patient');
            },
            scroll() {
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                    if (bottomOfWindow) {
                        this.getMorePatients().then(() => {
                        });
                    }
                };
            },
            ...mapActions(['fetchPatients', 'getMorePatients'])
        },
        mounted() {
            this.scroll();
            if (AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchPatients();
        },
        computed: mapGetters(['allPatients'])
    }
</script>

<style scoped>
    .cursorz {
        cursor: pointer;
    }
</style>