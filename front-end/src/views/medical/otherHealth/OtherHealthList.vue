<template>
    <div>
        <v-layout class="ma-0 elevation-0" color="transparent">
            <v-btn class="mx-0 mt-0 text-capitalize" color="primary" small dark v-if="authenticatedUserRole === 'Doctor' && isThereAPatient"
                   @click="otherHealthCreateMethod({})">
                <v-icon class="mr-1">add_circle_outline</v-icon>
                Add Other Health
            </v-btn>
            <v-spacer/>
            <v-btn class="mx-0 mt-0 text-capitalize black--text body-1" small flat v-if="authenticatedUserRole === 'Doctor' && allOtherHealths.length > 1"
                   @click="showGeneratedOtherHealth()">
                Generate final other health
            </v-btn>
        </v-layout>
        <div v-if="allOtherHealths.length > 0">
            <v-card v-for="item in allOtherHealths" :key="item.id" class="mt-2 mb-3">
                <v-toolbar class="primary--text" height="30" flat dense card>
                    <v-toolbar-title class="body-1">{{item.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="body-2">By Dr. {{item.filledBy.fullName}}</v-toolbar-title>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <div class="px-2" v-if="item.useTobacco"><b>Use tobacco</b></div>
                    <div class="px-2" v-if="item.alcoholUse"><b>Use alcohol</b></div>
                    <div class="px-2" v-if="item.sexualActivity"><b>Sexual Activity</b> - {{item.sexualActivity}}</div>
                    <div class="px-2" v-if="item.excercise"><b>Excercise</b> - {{item.excercise}}</div>
                    <div class="px-2" v-if="item.sleep"><b>Sleep</b> - {{item.sleep}}</div>
                    <div class="px-2" v-if="item.diet"><b>Diet</b> - {{item.diet}}</div>
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
    import OtherHealthCreate from '@/views/medical/otherHealth/OtherHealthCreate'
    import GeneratedOtherHealth from '@/views/medical/otherHealth/GeneratedOtherHealth'

    export default {
        name: "OtherHealthList",
        data() {
            return {
                items: [],
                authenticatedUserRole: "",
                isThereAPatient: PatientService.isPatientThere()
            }
        },
        methods: {
            otherHealthCreateMethod(otherHealth) {
                this.$modal.show(
                    OtherHealthCreate,
                    {
                        modalName: "otherHealth-create-modal",
                        otherHealth: otherHealth
                    },
                    {
                        name: "otherHealth-create-modal",
                        height: "auto",
                        width: 500,
                        scrollable: true
                    }
                );
            },
            showGeneratedOtherHealth() {
                this.$modal.show(
                    GeneratedOtherHealth,
                    {
                        modalName: "otherHealth-generate-modal"
                    },
                    {
                        name: "otherHealth-generate-modal",
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
                        this.getMoreOtherHealths().then(() => {});
                    }
                };
            },
            ...mapActions(['fetchOtherHealths', 'getMoreOtherHealths'])
        },
        mounted() {
            this.scroll();
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchOtherHealths();
            this.isThereAPatient = PatientService.isPatientThere();
        },
        computed: mapGetters(['allOtherHealths'])
    }
</script>

<style scoped>

</style>
