<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Generated social history</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-card-text>
                    <div class="px-2" v-if="generatedSocialHistory.occupation"><b>Occupation</b> - {{generatedSocialHistory.occupation}}
                    </div>
                    <div class="px-2" v-if="generatedSocialHistory.employer"><b>Employer</b> - {{generatedSocialHistory.employer}}</div>
                    <div class="px-2" v-if="generatedSocialHistory.educationalStatus"><b>Educational Status</b> -
                        {{generatedSocialHistory.educationalStatus}}
                    </div>
                    <div class="px-2" v-if="generatedSocialHistory.martialStatus"><b>Martial Status</b> -
                        {{generatedSocialHistory.martialStatus}}
                    </div>
                    <div class="px-2" v-if="generatedSocialHistory.noOfChildren"><b>No Of Children</b> -
                        {{generatedSocialHistory.noOfChildren}}
                    </div>
                </v-card-text>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "SocialHistoryList",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            ...mapActions(['fetchGeneratedSocialHistory'])
        },
        created() {
            this.fetchGeneratedSocialHistory();
        },
        computed: mapGetters(['generatedSocialHistory'])
    }
</script>

<style scoped>

</style>
