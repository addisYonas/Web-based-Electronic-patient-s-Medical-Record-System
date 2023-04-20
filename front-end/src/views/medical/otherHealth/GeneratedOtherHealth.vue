<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Generated social history</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-card-text>
                    <div class="px-2" v-if="generatedOtherHealth.useTobacco"><b>Use tobacco</b></div>
                    <div class="px-2" v-if="generatedOtherHealth.alcoholUse"><b>Use alcohol</b></div>
                    <div class="px-2" v-if="generatedOtherHealth.sexualActivity"><b>Sexual Activity</b> -
                        {{generatedOtherHealth.sexualActivity}}
                    </div>
                    <div class="px-2" v-if="generatedOtherHealth.exercise"><b>Exercise</b> - {{generatedOtherHealth.exercise}}</div>
                    <div class="px-2" v-if="generatedOtherHealth.sleep"><b>sleep</b> - {{generatedOtherHealth.sleep}}</div>
                    <div class="px-2" v-if="generatedOtherHealth.diet"><b>Diet</b> - {{generatedOtherHealth.diet}}</div>
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
        name: "OtherHealthGenerate",
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
            ...mapActions(['fetchGeneratedOtherHealth'])
        },
        created() {
            this.fetchGeneratedOtherHealth();
        },
        computed: mapGetters(['generatedOtherHealth'])
    }
</script>

<style scoped>

</style>
