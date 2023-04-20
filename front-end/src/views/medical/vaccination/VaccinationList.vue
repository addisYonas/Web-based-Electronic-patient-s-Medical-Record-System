<template>
    <div>
        <v-btn class="mx-0 mt-0 text-capitalize" color="primary" small dark v-if="authenticatedUserRole === 'Doctor' && isThereAPatient"
               @click="vaccineCreateMethod({})">
            <v-icon class="mr-1">add_circle_outline</v-icon>
            Add Vaccine
        </v-btn>
        <div v-if="allVaccinations.length > 0">
            <v-card v-for="item in allVaccinations" :key="item.id" class="mt-2 mb-3">
                <v-toolbar class="primary--text" height="30" flat dense card>
                    <v-toolbar-title class="body-1">{{item.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="body-2">By Dr. {{item.filledBy.fullName}}</v-toolbar-title>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <div class="px-2"><b>{{item.vaccine}}</b> taken at {{item.takenDate | moment("MM-DD-YYYY")}}</div>
                </v-card-text>
            </v-card>
        </div>
        <div v-else>
            <v-card class="mt-2 mb-3 pa-4">
                <span class="body-1 text-xs-center">There is nothing to show.</span>
            </v-card>
        </div>
    </div>
</template>

<script>
    import {AccountService} from "@/services"
    import {PatientService} from "@/services"
    import { mapGetters, mapActions } from 'vuex';
    import VaccinationCreate from '@/views/medical/vaccination/VaccinationCreate'

    export default {
        name: "VaccineList",
        data() {
            return {
                authenticatedUserRole: "",
                isThereAPatient: PatientService.isPatientThere()
            }
        },
        methods: {
            vaccineCreateMethod(vaccine) {
                this.$modal.show(
                    VaccinationCreate,
                    {
                        modalName: "vaccine-create-modal",
                        vaccine: vaccine
                    },
                    {
                        name: "vaccine-create-modal",
                        height: "auto",
                        width: 500,
                        scrollable: true
                    }
                );
            },
            scroll() {
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                    if (bottomOfWindow) {
                        this.getMoreVaccinations().then(() => {});
                    }
                };
            },
            ...mapActions(['fetchVaccinations', 'getMoreVaccinations'])
        },
        mounted() {
            this.scroll();
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchVaccinations();
            this.isThereAPatient = PatientService.isPatientThere();
        },
        computed: {
            ...mapGetters(['allVaccinations'])
        }
    }
</script>

<style scoped>

</style>
