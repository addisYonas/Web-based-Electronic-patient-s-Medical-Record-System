<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex class="xs12 sm3" style="position: fixed !important;">
                <v-navigation-drawer permanent height="auto" class="elevation-1">
                    <v-list class="py-0">
                        <template v-for="(link, index) in links">
                            <v-list-tile route :to="link.route" class="black--text" active-class="primary white--text" :key="index">
                                <v-list-tile-content left>
                                    <v-list-tile-title>{{link.text}}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-chip right class="ma-0" v-if="link.count !== undefined && link.count !== null && allLabOrder.length !== 0">
                                    <span>{{allLabOrder.length}}</span>
                                </v-chip>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-navigation-drawer>
            </v-flex>
            <v-flex class="xs12 sm8" style="margin-left: 24.5% !important;">
                <v-content class="py-0">
                    <router-view></router-view>
                </v-content>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import { mapGetters } from 'vuex'
    export default {
        name: "view-medical",
        data(){
            return {
                links: [
                    {
                        text: 'Lab Orders',
                        route: '/laboratories/lab-orders',
                        count: null,
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Haematology',
                        route: '/laboratories/haematology',
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Immunology',
                        route: '/laboratories/immunology',
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Serum Chemistry',
                        route: '/laboratories/serum-chemistry',
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Parasitology',
                        route: '/laboratories/parasitology',
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Other Immunology',
                        route: '/laboratories/other-immunology',
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Urinalysis',
                        route: '/laboratories/urinalysis',
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Micro Biology',
                        route: '/laboratories/micro-biology',
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Radiology',
                        route: '/laboratories/radiology',
                        allowedUserRoles: ["LabTechnician"]
                    },
                    {
                        text: 'Other Labs',
                        route: '/laboratories/other-labs',
                        allowedUserRoles: ["LabTechnician"]
                    },
                ]
            }
        },
        computed: mapGetters(['allLabOrder']),
        methods: {

        },
        created() {
            this.links[0].count = this.allLabOrder.length;
        }
    }
</script>

<style scoped>

</style>
