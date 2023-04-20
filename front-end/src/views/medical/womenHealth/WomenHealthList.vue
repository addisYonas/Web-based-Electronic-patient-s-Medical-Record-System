<template>
    <div>
        <v-layout class="ma-0 elevation-0" color="transparent">
            <v-btn class="mx-0 mt-0 text-capitalize" color="primary" small dark v-if="authenticatedUserRole === 'Doctor' && isThereAPatient"
                   @click="womenHealthCreateMethod({})">
                <v-icon class="mr-1">add_circle_outline</v-icon>
                Add Women Health
            </v-btn>
            <v-spacer/>
            <v-btn class="mx-0 mt-0 text-capitalize black--text body-1" small flat
                   v-if="authenticatedUserRole === 'Doctor' && allWomenHealths.length > 1"
                   @click="showGeneratedWomenHealth()">
                Generate final women health
            </v-btn>
        </v-layout>
        <div v-if="allWomenHealths.length > 0">
            <v-card v-for="item in allWomenHealths" :key="item.id" class="mt-2 mb-3">
                <v-toolbar class="primary--text" height="30" flat dense card>
                    <v-toolbar-title class="body-1">{{item.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="body-2">By Dr. {{item.filledBy.fullName}}</v-toolbar-title>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <div class="px-2" v-if="item.noOfPregnancies"><b>No of Pregnancies</b> - {{item.noOfPregnancies}}
                    </div>
                    <div class="px-2" v-if="item.noOfDeliveries"><b>No of Deliveries</b> - {{item.noOfDeliveries}}</div>
                    <div class="px-2" v-if="item.noOfAbortions"><b>No of Abortions</b> - {{item.noOfAbortions}}</div>
                    <div class="px-2" v-if="item.noOfMiscarriages"><b>No Of Miscarriages</b> - {{item.noOfMiscarriages}}
                    </div>
                    <div class="px-2" v-if="item.ageAtFirstMense"><b>Age at First Mense</b> - {{item.ageAtFirstMense}}
                    </div>
                    <div class="px-2" v-if="item.lengthOfMense"><b>Length of Mense</b> - {{item.lengthOfMense}}</div>
                    <div class="px-2" v-if="item.concernsOfMense"><b>Concerns of Mense</b> - {{item.concernsOfMense}}
                    </div>
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
    import { mapGetters, mapActions } from 'vuex'
    import WomenHealthCreate from '@/views/medical/womenHealth/WomenHealthCreate'
    import GeneratedWomenHealth from '@/views/medical/womenHealth/GeneratedWomenHealth'

    export default {
        name: "WomenHealthList",
        data() {
            return {
                authenticatedUserRole: "",
                isThereAPatient: PatientService.isPatientThere()
            }
        },
        methods: {
            womenHealthCreateMethod(womenHealth) {
                this.$modal.show(
                    WomenHealthCreate,
                    {
                        modalName: "womenHealth-create-modal",
                        womenHealth: womenHealth
                    },
                    {
                        name: "womenHealth-create-modal",
                        height: "auto",
                        width: 500,
                        scrollable: true
                    }
                );
            },
            showGeneratedWomenHealth() {
                this.$modal.show(
                    GeneratedWomenHealth,
                    {
                        modalName: "womenHealth-generate-modal"
                    },
                    {
                        name: "womenHealth-generate-modal",
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
                        this.getMoreWomenHealths().then(() => {});
                    }
                };
            },
            ...mapActions(['fetchWomenHealths', 'getMoreWomenHealths'])
        },
        mounted() {
            this.scroll();
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchWomenHealths();
            this.isThereAPatient = PatientService.isPatientThere();
        },
        computed: mapGetters(['allWomenHealths'])
    }
</script>

<style scoped>

</style>
