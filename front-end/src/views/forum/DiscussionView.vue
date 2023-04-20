<template>
    <div>
        <v-card class="mt-2 mb-0 elevation-1">
            <v-toolbar class="primary--text" height="30" flat dense card>
                <v-toolbar-title class="body-2">{{discussion.createdBy.fullName}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class="body-1">{{discussion.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}
                </v-toolbar-title>
            </v-toolbar>
            <v-divider/>
            <v-card-text>
                <div class="px-2 subheading font-weight-bold">{{discussion.title}}</div>
                <div class="px-2">{{discussion.description}}</div>
            </v-card-text>
            <v-toolbar dense flat class="py-0 mb-0" color="white">
                <v-tabs grow height="30" color="white" slider-color="primary" centered>
                    <v-tab router :to="`/forum/discussion/${discussionId}/doctor`" class="text-capitalize font-weight-bold">Doctor
                    </v-tab>
                    <v-tab router :to="`/forum/discussion/${discussionId}/student`" class="text-capitalize font-weight-bold">Student
                    </v-tab>
                </v-tabs>
            </v-toolbar>
        </v-card>

        <v-content class="py-0 px-3" style="background-color: white">
            <router-view></router-view>
        </v-content>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "DiscussionView",
        data() {
            return {}
        },
        computed: mapGetters(['discussion', 'discussionId'])
    }
</script>

<style scoped>

</style>
