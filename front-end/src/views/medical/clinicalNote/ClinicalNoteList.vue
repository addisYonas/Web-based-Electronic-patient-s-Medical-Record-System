<template>
    <div>
        <v-btn class="mx-0 mt-0 text-capitalize" color="primary" small dark v-if="authenticatedUserRole === 'Doctor' && isThereAPatient" @click="clinicalNoteCreateMethod({})">
            <v-icon class="mr-1">add_circle_outline</v-icon>
            Add Clinical Note
        </v-btn>
        <div v-if="allClinicalNotes.length > 0">
            <v-card v-for="item in allClinicalNotes" :key="item.id" class="mt-2 mb-3">
                <v-toolbar class="primary--text" height="30" flat dense card>
                    <v-toolbar-title class="body-1">{{item.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="body-2">By Dr. {{item.filledBy.fullName}}</v-toolbar-title>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <div class="px-2">{{item.note}}</div>
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
    import ClinicalNoteCreate from '@/views/medical/clinicalNote/ClinicalNoteCreate'

    export default {
        name: "ClinicalNoteList",
        data() {
            return {
                authenticatedUserRole: "",
                isThereAPatient: PatientService.isPatientThere()
            }
        },
        methods: {
            clinicalNoteCreateMethod(clinicalNote){
                this.$modal.show(
                    ClinicalNoteCreate,
                    {
                        modalName: "clinical-note-create-modal",
                         clinicalNote: clinicalNote
                    },
                    {
                        name: "clinical-note-create-modal",
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
                        this.getMoreClinicalNotes().then(() => {});
                    }
                };
            },
            ...mapActions(['fetchClinicalNotes', 'getMoreClinicalNotes'])
        },
        mounted() {
            this.scroll();
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchClinicalNotes();
            this.isThereAPatient = PatientService.isPatientThere();
        },
        computed: mapGetters(['allClinicalNotes'])
    }
</script>

<style scoped>

</style>
