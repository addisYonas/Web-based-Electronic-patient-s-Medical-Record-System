<template>
    <div>
        <v-btn class="mx-0 mt-0 text-capitalize" color="primary" small dark v-if="authenticatedUserRole === 'Doctor' && isThereAPatient"
               @click="surgeryCreateMethod({})">
            <v-icon class="mr-1">add_circle_outline</v-icon>
            Add Surgery
        </v-btn>
        <div v-if="allSurgeries.length > 0">
            <v-card v-for="item in allSurgeries" :key="item.id" class="mt-2 mb-3">
                <v-toolbar class="primary--text" height="30" flat dense card>
                    <v-toolbar-title class="body-1">{{item.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="body-2">By Dr. {{item.filledBy.fullName}}</v-toolbar-title>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <div class="px-2"><b>{{item.type}}</b> at {{item.surgeryDate | moment("dddd, MMMM Do YYYY")}} in {{item.location}}</div>
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
    import SurgeryCreate from '@/views/medical/surgery/SurgeryCreate'

    export default {
        name: "SurgeryList",
        data() {
            return {
                authenticatedUserRole: "",
                isThereAPatient: PatientService.isPatientThere()
            }
        },
        methods: {
            surgeryCreateMethod(surgery) {
                this.$modal.show(
                    SurgeryCreate,
                    {
                        modalName: "surgery-create-modal",
                        surgery: surgery
                    },
                    {
                        name: "surgery-create-modal",
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
                        this.getMoreSurgeries().then(() => {});
                    }
                };
            },
            ...mapActions(['fetchSurgeries', 'getMoreSurgeries'])
        },
        mounted() {
            this.scroll();
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchSurgeries();
            this.isThereAPatient = PatientService.isPatientThere();
        },
        computed: {
            ...mapGetters(['allSurgeries'])
        }
    }
</script>

<style scoped>

</style>
