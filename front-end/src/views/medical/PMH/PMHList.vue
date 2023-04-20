<template>
    <div>
        <v-btn class="mx-0 mt-0 text-capitalize" color="primary" small dark v-if="authenticatedUserRole === 'Doctor' && isThereAPatient"
               @click="pmhCreateMethod({})">
            <v-icon class="mr-1">add_circle_outline</v-icon>
            Add Personal Medical Health
        </v-btn>
        <div v-if="allPMHs.length > 0">
            <v-card v-for="item in allPMHs" :key="item.id" class="mt-2 mb-3">
                <v-toolbar class="primary--text" height="30" flat dense card>
                    <v-toolbar-title class="body-1">{{item.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="body-2">By Dr. {{item.filledBy.fullName}}</v-toolbar-title>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <div class="px-2"><b>{{item.disease}}</b> - {{item.comment}}</div>
                </v-card-text>
                <div class="text-xs-left px-3">
                    <v-chip class="body-1 font-weight-bold" small outline color="primary">{{item.isCurrent ? 'Current' : 'Past'}}</v-chip>
                </div>
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
    import PMHCreate from '@/views/medical/PMH/PMHCreate'

    export default {
        name: "PMHList",
        data() {
            return {
                authenticatedUserRole: "",
                isThereAPatient: PatientService.isPatientThere()
            }
        },
        methods: {
            pmhCreateMethod(pmh) {
                this.$modal.show(
                    PMHCreate,
                    {
                        modalName: "pmh-create-modal",
                        pmh: pmh
                    },
                    {
                        name: "pmh-create-modal",
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
                        this.getMorePMHs().then(() => {});
                    }
                };
            },
            ...mapActions(['fetchPMHs', 'getMorePMHs'])
        },
        mounted() {
            this.scroll();
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchPMHs();
            this.isThereAPatient = PatientService.isPatientThere();
        },
        computed: {
            ...mapGetters(['allPMHs'])
        }
    }
</script>

<style scoped>

</style>
