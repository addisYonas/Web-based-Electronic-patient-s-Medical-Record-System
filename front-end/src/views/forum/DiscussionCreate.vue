<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add a discussion</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field class="body-1" v-validate="'required|alpha_spaces'"
                                      :error-messages="errors.collect('discussion')" name="discussion"
                                      v-model="discussion.title" label="Discussion name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea class="body-1" v-validate="'required'"
                                    :error-messages="errors.collect('allergicReaction')" name="allergicReaction"
                                    v-model="discussion.description" label="Description" required></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveDiscussion(discussion)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex'
    import {PatientService} from "@/services"

    export default {
        name: "DiscussionCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                discussion: {}
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveDiscussion(discussion) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        discussion.patientId = PatientService.getPatientId();
                        this.createDiscussion(discussion);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createDiscussion'])
        }
    }
</script>

<style scoped>

</style>
