<template>
    <div>
        <div v-if="allOtherImmunology.length > 0">
            <template v-for="(otherImmunology, index) in allOtherImmunology">
                <v-card class="cursorz mb-3 mt-2" @click="showOtherImmunologyDetail(otherImmunology)" :key="index">
                    <v-toolbar flat dense class="pa-0 primary--text">
                        <v-flex class="text-xs-left ml-0 pl-0">
                            <span>{{otherImmunology.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}</span>
                        </v-flex>
                        <v-flex class="text-xs-right mr-0 pr-0" v-if="otherImmunology.orderedBy">
                            <span>By {{otherImmunology.orderedBy.fullName}}</span>
                        </v-flex>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="px-2">{{otherImmunology.status}}</div>
                    </v-card-text>
                </v-card>
            </template>
        </div>

        <div v-else>
            <v-card class="mt-2 mb-3 pa-4">
                <span class="body-1 text-xs-center">There is nothing to show. You can add Laboratory orders for it.</span>
            </v-card>
        </div>
    </div>
</template>
<script>
    import {AccountService} from "@/services"
    import OtherImmunologyCreateAndDetail from './OtherImmunologyCreate';
    import OtherImmunologyDetail from './OtherImmunologyDetail';
    import { mapGetters, mapActions } from 'vuex'


    export default {
        name: 'OtherImmunology',
        data() {
            return {
                authenticatedUserRole: ""
            }
        },
        methods: {
            createOtherImmunology(otherImmResult){
                this.$modal.show(
                    OtherImmunologyCreateAndDetail,
                    {
                        modalName: "otherImmunology-result-modal",
                        otherImmunologyResult: otherImmResult
                    },
                    {
                        name: "otherImmunology-result-modal",
                        height: "auto",
                        width: 1000,
                        scrollable: true
                    }
                );
            },
            showOtherImmunologyDetail(otherImmDetail){
                this.$modal.show(
                    OtherImmunologyDetail,
                    {
                        modalName: "otherImmunology-detail-modal",
                        otherImmunologyDetail: otherImmDetail
                    },
                    {
                        name: "otherImmunology-detail-modal",
                        height: "auto",
                        width: 1200,
                        scrollable: true
                    }
                );
            },
            scroll () {
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                    if (bottomOfWindow) {
                        this.goOtImmuNextPageAction();
                    }
                };
            },
            ...mapActions(['fetchOtherImmunologies', 'goOtImmuNextPageAction'])
        },
        mounted() {
            this.scroll();
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.fetchOtherImmunologies();
        },
        computed: mapGetters(['allOtherImmunology'])
    }
</script>

<style scoped>
    .cursorz {
        cursor: pointer;
    }
    .titleColorz {
        background-color: lavender;
    }
</style>
