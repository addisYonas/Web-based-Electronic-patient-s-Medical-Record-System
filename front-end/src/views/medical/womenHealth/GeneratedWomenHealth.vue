<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Generated women health</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-card-text>
                    <div class="px-2" v-if="generatedWomenHealth.noOfPregnancies"><b>No of Pregnancies</b> -
                        {{generatedWomenHealth.noOfPregnancies}}
                    </div>
                    <div class="px-2" v-if="generatedWomenHealth.noOfDeliveries"><b>No of Deliveries</b> -
                        {{generatedWomenHealth.noOfDeliveries}}
                    </div>
                    <div class="px-2" v-if="generatedWomenHealth.noOfAbortions"><b>No of Abortions</b> -
                        {{generatedWomenHealth.noOfAbortions}}
                    </div>
                    <div class="px-2" v-if="generatedWomenHealth.noOfMiscarriages"><b>No Of Miscarriages</b> -
                        {{generatedWomenHealth.noOfMiscarriages}}
                    </div>
                    <div class="px-2" v-if="generatedWomenHealth.ageAtFirstMense"><b>Age at First Mense</b> -
                        {{generatedWomenHealth.ageAtFirstMense}}
                    </div>
                    <div class="px-2" v-if="generatedWomenHealth.lengthOfMense"><b>Length of Mense</b> -
                        {{generatedWomenHealth.lengthOfMense}}
                    </div>
                    <div class="px-2" v-if="generatedWomenHealth.concernsOfMense"><b>Concerns of Mense</b> -
                        {{generatedWomenHealth.concernsOfMense}}
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
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "WomenHealthList",
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
            ...mapActions(['fetchGeneratedWomenHealth'])
        },
        created() {
            this.fetchGeneratedWomenHealth();
        },
        computed: mapGetters(['generatedWomenHealth'])
    }
</script>

<style scoped>

</style>
