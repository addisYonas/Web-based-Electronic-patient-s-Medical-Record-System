<template>
    <div>
        <v-btn class="mx-0 mt-0 mb-2 text-capitalize" color="primary" small dark
               v-if="authenticatedUserRole === 'Admin'"
               @click="drugCreateMethod({})">
            <v-icon class="mr-1">add_circle_outline</v-icon>
            Add Drug
        </v-btn>
        <div v-if="drugs.length > 0">
            <v-layout row wrap>
                <v-flex xs12 sm6 v-for="item in drugs" :key="item.id">
                    <v-card class="text-xs-center">
                        <v-toolbar class="primary--text" height="30" flat dense card>
                            <v-toolbar-title class="body-1 font-weight-bold">{{item.name}}</v-toolbar-title>
                            <v-spacer/>
                            <v-icon small class="mr-2" @click="drugCreateMethod(item)">edit</v-icon>
                            <v-icon small @click="drugDeleteMethod(item)">delete</v-icon>
                        </v-toolbar>
                        <v-divider/>
                        <v-card-text>
                            <v-layout column wrap class="mx-5 px-2">
                                <v-layout row wrap class="my-1">
                                    <v-flex xs4 class="px-1 py-1 text-xs-right">
                                        <label class="font-weight-bold">Utility</label>
                                    </v-flex>
                                    <v-flex xs8 class="px-1 py-1 text-xs-left">
                                        <label>{{item.drugUtility.name}}</label>
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap class="my-1">
                                    <v-flex xs4 class="px-1 py-1 text-xs-right">
                                        <label class="font-weight-bold">Class</label>
                                    </v-flex>
                                    <v-flex xs8 class="px-1 py-1 text-xs-left">
                                        <label>{{item.drugClass.name}}</label>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap class="my-1">
                                    <v-flex xs4 class="px-1 py-1 text-xs-right">
                                        <label class="font-weight-bold">Form</label>
                                    </v-flex>
                                    <v-flex xs8 class="px-1 py-1 text-xs-left">
                                        <label>{{item.form}}</label>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap class="my-1">
                                    <v-flex xs4 class="px-1 py-1 text-xs-right">
                                        <label class="font-weight-bold">Strengths</label>
                                    </v-flex>
                                    <v-flex xs8 class="px-1 py-1 text-xs-left">
                                        <label>{{item.strengths.join(', ')}}</label>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
        <div v-else>
            <v-card class="mt-2 mb-3 pa-4">
                <span class="body-1 text-xs-center">There is nothing to show. Please add by pressing <b>Add Drug</b> button above.</span>
            </v-card>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {PrescriptionAPI} from '@/api'
    import {AccountService} from "@/services"
    import Confirmation from '@/components/StateConfirmation'
    import DrugCreate from './DrugCreate'
    import {eventBus} from "../../../main";

    export default {
        name: "DrugList",
        data() {
            return {
                authenticatedUserRole: ""
            }
        },
        methods: {
            drugCreateMethod(drug) {
                this.$modal.show(
                    DrugCreate,
                    {
                        modalName: "drug-create-modal",
                        drug: drug
                    },
                    {
                        name: "drug-create-modal",
                        height: "auto",
                        width: 500,
                        scrollable: true
                    }
                );
            },
            drugDeleteMethod(drug) {
                const where = {drugId: drug.id};
                PrescriptionAPI.count({where: where}).then((res) => {
                    if (res.count == 0) {
                        this.$modal.show(
                            Confirmation,
                            {
                                modalName: "confirmation-modal",
                                name: "Drug - " + drug.name,
                                id: drug.id,
                                remover: this.deleteDrug
                            },
                            {
                                name: "confirmation-modal",
                                height: "auto",
                                width: 400
                            }
                        );
                    } else {
                        eventBus.$emit('openSb', {message: 'Drug is not delete safe!', color: "info"});
                    }
                });
            },
            ...mapActions(['fetchDrugs', 'deleteDrug'])
        },

        created() {
            this.fetchDrugs();
        },
        computed: mapGetters(['drugs']),
        mounted() {
            this.authenticatedUserRole = AccountService.getProfile().role;
        }
    };
</script>

<style scoped>
</style>
