<template>
    <div>
        <v-layout class="ma-0 elevation-0" color="transparent">
            <v-btn class="mx-0 mt-0 text-capitalize" color="primary" small dark
                   v-if="authenticatedUserRole === 'Doctor' && isThereAPatient"
                   @click="socialHistoryCreateMethod({})">
                <v-icon class="mr-1">add_circle_outline</v-icon>
                Add Social History
            </v-btn>
            <v-spacer/>
            <v-btn class="mx-0 mt-0 text-capitalize black--text body-1" small flat
                   v-if="authenticatedUserRole === 'Doctor' && allSocialHistories.length > 1"
                   @click="showGeneratedSocialHistory()">
                Generate final social history
            </v-btn>
        </v-layout>
        <div v-if="allSocialHistories.length > 0">
            <v-card v-for="item in allSocialHistories" :key="item.id" class="mt-2 mb-3">
                <v-toolbar class="primary--text" height="30" flat dense card>
                    <v-toolbar-title class="body-1">{{item.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="body-2">By Dr. {{item.filledBy.fullName}}</v-toolbar-title>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <div class="px-2" v-if="item.occupation"><b>Occupation</b> - {{item.occupation}}</div>
                    <div class="px-2" v-if="item.employer"><b>Employer</b> - {{item.employer}}</div>
                    <div class="px-2" v-if="item.educationalStatus"><b>Educational Status</b> -
                        {{item.educationalStatus}}
                    </div>
                    <div class="px-2" v-if="item.martialStatus"><b>Martial Status</b> - {{item.martialStatus}}</div>
                    <div class="px-2" v-if="item.noOfChildren"><b>No Of Children</b> - {{item.noOfChildren}}</div>
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
    import {mapGetters, mapActions} from 'vuex';
    import SocialHistoryCreate from '@/views/medical/socialHistory/SocialHistoryCreate'
    import GeneratedSocialHistory from '@/views/medical/socialHistory/GeneratedSocialHistory'

    export default {
        name: "SocialHistoryList",
        data() {
            return {
                authenticatedUserRole: "",
                isThereAPatient: PatientService.isPatientThere()
            }
        },
        methods: {
            socialHistoryCreateMethod(socialHistory) {
                this.$modal.show(
                    SocialHistoryCreate,
                    {
                        modalName: "socialHistory-create-modal",
                        socialHistory: socialHistory
                    },
                    {
                        name: "socialHistory-create-modal",
                        height: "auto",
                        width: 500,
                        scrollable: true
                    }
                );
            },
            showGeneratedSocialHistory() {
                this.$modal.show(
                    GeneratedSocialHistory,
                    {
                        modalName: "socialHistory-generate-modal"
                    },
                    {
                        name: "socialHistory-generate-modal",
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
                        this.getMoreSocialHistories().then(() => {});
                    }
                };
            },
            ...mapActions(['fetchSocialHistories', 'getMoreSocialHistories'])
        },
        mounted() {
            this.scroll();
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchSocialHistories();
            this.isThereAPatient = PatientService.isPatientThere();
        },
        computed: mapGetters(['allSocialHistories'])
    }
</script>

<style scoped>

</style>
