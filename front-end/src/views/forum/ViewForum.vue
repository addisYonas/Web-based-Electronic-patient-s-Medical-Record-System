<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex class="xs12 sm3">
                <v-btn class="mx-0 mt-0 text-capitalize" color="primary" small dark
                       v-if="authenticatedUserRole === 'Doctor'"
                       @click="discussionCreateMethod({})">
                    <v-icon class="mr-1">add_circle_outline</v-icon>
                    Add Discussion
                </v-btn>
                <v-navigation-drawer height="auto" permanent enable-resize-watcher class="elevation-1">
                    <v-list class="py-0">
                        <template v-for="(item, index) in discussions">
                            <v-list-tile router :key="item.index" :to="`/forum/discussion/${item.id}`"
                                         @click="setDiscussion(item.id, index)"
                                         class="black--text"
                                         active-class="primary white--text">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-chip small right class="my-0 ml-3">
                                    <span>{{ item.comments }}</span>
                                </v-chip>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-navigation-drawer>
            </v-flex>
            <v-flex class="xs12 sm8">
                <v-content v-if="discussions.length > 0" class="py-0">
                    <router-view></router-view>
                </v-content>

                <div v-else>
                    <v-card class="mt-2 mb-3 pa-4">
                        <span class="body-1 text-xs-center">There is nothing to show. You can add discussion by pressing <b>Add Discussion</b> button.</span>
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import {AccountService} from "@/services"
    import DiscussionCreate from "./DiscussionCreate"

    export default {
        name: "view-forum",
        data() {
            return {
                authenticatedUserRole: ''
            }
        },
        methods: {
            discussionCreateMethod(discussion) {
                this.$modal.show(
                    DiscussionCreate,
                    {
                        modalName: "discussion-create-modal",
                        discussion: discussion
                    },
                    {
                        name: "discussion-create-modal",
                        height: "auto",
                        width: 500,
                        scrollable: true
                    }
                );
            },
            setDiscussion(id, index) {
                this.selectDiscussionIndex(index);
                this.fetchDiscussion(id);
                this.setDiscussionId(id);
            },
            ...mapActions(['fetchDiscussion', 'fetchDiscussions']),
            ...mapMutations(['setDiscussionId', 'selectDiscussionIndex'])
        },
        mounted() {
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        computed: mapGetters(['discussions']),
        created() {
            this.fetchDiscussions();
        }
    }
</script>

<style scoped>
</style>
