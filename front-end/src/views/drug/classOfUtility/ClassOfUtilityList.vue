<template>
    <div>
        <v-btn class="mx-0 mt-0 mb-2 text-capitalize" color="primary" small dark
               v-if="authenticatedUserRole === 'Admin'"
               @click="utilityClassCreateMethod({})">
            <v-icon class="mr-1">add_circle_outline</v-icon>
            Add Class of Utility
        </v-btn>
        <div v-if="classOfUtilities.length > 0">
            <v-layout row wrap>
                <v-flex xs12 sm6 v-for="item in classOfUtilities" :key="item.id">
                    <v-card>
                        <v-toolbar class="primary--text" height="30" flat dense card>
                            <v-toolbar-title class="body-1 font-weight-bold">{{item.name}}</v-toolbar-title>
                            <v-spacer/>
                            <v-icon small class="mr-2" @click="utilityClassCreateMethod(item)">edit</v-icon>
                            <v-icon small @click="utilityClassDeleteMethod(item)">delete</v-icon>
                        </v-toolbar>
                        <v-divider/>
                        <v-card-text>
                            <div class="px-2"><b>Utility - </b>{{item.utility.name}}</div>
                            <div class="px-2">{{item.description}}</div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
        <div v-else>
            <v-card class="mt-2 mb-3 pa-4">
                <span class="body-1 text-xs-center">There is nothing to show. Please add by pressing <b>Add Class of Utility</b> button above.</span>
            </v-card>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {DrugAPI} from '@/api'
    import {AccountService} from "@/services"
    import Confirmation from '@/components/StateConfirmation'
    import ClassOfUtilityCreate from "./ClassOfUtilityCreate"
    import {eventBus} from "../../../main";

    export default {
        name: "ClassOfUtilityList",
        data() {
            return {
                authenticatedUserRole: ""
            }
        },
        methods: {
            utilityClassCreateMethod(classOfUtility) {
                this.$modal.show(
                    ClassOfUtilityCreate,
                    {
                        modalName: "class-create-modal",
                        classOfUtility: classOfUtility
                    },
                    {
                        name: "class-create-modal",
                        height: "auto",
                        width: 500,
                        scrollable: true
                    }
                );
            },
            utilityClassDeleteMethod(classOfUtility) {
                const where = {drugClassId: classOfUtility.id};
                DrugAPI.count({where: where}).then((res) => {
                    if (res.count == 0) {
                        this.$modal.show(
                            Confirmation,
                            {
                                modalName: "confirmation-modal",
                                name: "Class of utility - " + classOfUtility.name,
                                id: classOfUtility.id,
                                remover: this.deleteClassOfUtility
                            },
                            {
                                name: "confirmation-modal",
                                height: "auto",
                                width: 400
                            }
                        );
                    } else {
                        eventBus.$emit('openSb', {message: 'Class of utility is not delete safe!', color: "info"});
                    }
                });
            },
            ...mapActions(['fetchClassOfUtilities', 'deleteClassOfUtility'])
        },
        created() {
            this.fetchClassOfUtilities();
        },
        computed: mapGetters(['classOfUtilities']),
        mounted() {
            this.authenticatedUserRole = AccountService.getProfile().role;
        }
    }
</script>

<style scoped>

</style>
