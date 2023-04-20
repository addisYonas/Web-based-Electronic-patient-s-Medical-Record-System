<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex class="xs12 sm3" style="position: fixed !important;">
                <v-navigation-drawer height="auto" permanent enable-resize-watcher class="elevation-1">
                    <v-list class="py-0">
                        <template v-for="item in items">
                            <v-list-tile router :key="item.index" :to="item.path"
                                         class="black--text"
                                         active-class="primary white--text">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
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
    export default {
        name: "view-medical",
        data() {
            return {
                items: [
                    {
                        title: 'Clinical Note',
                        path: '/medical/clinical-note',
                    },
                    {
                        title: 'Allergy',
                        path: '/medical/allergy'
                    },
                    {
                        title: 'PMH',
                        path: '/medical/pmh'
                    },
                    {
                        title: 'Vaccination',
                        path: '/medical/vaccination'
                    },
                    {
                        title: 'Surgery',
                        path: '/medical/surgery'
                    },
                    {
                        title: 'Family Medical',
                        path: '/medical/family-medical'
                    },
                    {
                        title: 'Social History',
                        path: '/medical/social-history'
                    },
                    {
                        title: 'Other Health',
                        path: '/medical/other-health'
                    },
                    {
                        title: 'Women Health',
                        path: '/medical/women-health'
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .activeClass {
        background-color: aqua;
        color: red;
    }
</style>
