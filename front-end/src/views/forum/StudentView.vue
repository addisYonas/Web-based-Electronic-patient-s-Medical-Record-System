<template>
    <div>
        <div v-if="comments.length > 0" class="px-3">
            <v-card v-for="item in comments" :key="item.id" class="mt-2 mb-3">
                <v-toolbar class="primary--text" height="30" flat dense card>
                    <v-toolbar-title class="body-2" v-if="item.createdBy.fullName !== undefined">
                        {{item.createdBy.fullName}}
                    </v-toolbar-title>
                    <v-spacer/>
                    <v-toolbar-title class="body-1">{{item.createdAt | moment("MM-DD-YYYY, h:mm:ss a")}}
                    </v-toolbar-title>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <div class="px-2">{{item.comment}}</div>
                </v-card-text>
            </v-card>
        </div>
        <div v-else class="px-3 py-4">
            <v-alert
                    :value="true"
                    color="primary"
                    icon="check_circle"
                    outline
            >
                There is nothing to show. Please add your comment by writing in the space bellow.
            </v-alert>
        </div>
        <div v-if="authenticatedUserRole === 'Doctor' || authenticatedUserRole === 'Student'">
            <v-textarea outline class="body-1 white px-3" v-validate="'required'"
                        :error-messages="errors.collect('comment')" name="comment"
                        v-model="comment.comment" label="Write your comment here" required></v-textarea>
            <v-toolbar height="40" flat color="transparent">
                <v-spacer></v-spacer>
                <v-btn small color="white" class="primary" flat @click="saveComment()">Comment</v-btn>
            </v-toolbar>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import {PatientService} from "@/services"
    import {AccountService} from "@/services"

    export default {
        name: "StudentView",
        data() {
            return {
                comment: {},
                authenticatedUserRole: ''
            }
        },
        methods: {
            saveComment() {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        this.comment.patientId = PatientService.getPatientId();
                        this.comment.discussionId = this.discussionId;
                        this.comment.writtenFor = 'student';
                        this.createComment(this.comment).then(() => {
                            this.comment = {};
                            this.incrementComment();
                        });
                    }
                });
            },
            ...mapActions(['fetchComments', 'createComment']),
            ...mapMutations(['emptyComments', 'setCommentFilter', 'incrementComment'])
        },
        mounted() {
            if(AccountService.getProfile())
                this.authenticatedUserRole = AccountService.getProfile().role;
        },
        created() {
            this.emptyComments();
            this.setCommentFilter({
                patientId: PatientService.getPatientId(),
                discussionId: this.discussionId,
                writtenFor: 'student'
            });
            this.fetchComments();
        },
        computed: mapGetters(['comments', 'discussionId'])
    }
</script>

<style scoped>

</style>
