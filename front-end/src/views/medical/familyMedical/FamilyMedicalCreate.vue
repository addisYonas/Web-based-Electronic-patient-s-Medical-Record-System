<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading">Add a family medical</span>
        </v-toolbar>
        <v-divider/>
        <v-card-text>
            <v-container grid-list-md class="py-1">
                <v-layout wrap>
                    <v-flex xs6>
                        <v-autocomplete
                                v-validate="'required'"
                                :error-messages="errors.collect('family')"
                                name="family"
                                v-model="familyMedical.family"
                                label="Family"
                                :items="families"
                                item-text="name"
                                item-value="name"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex xs6>
                        <v-radio-group v-model="familyMedical.livingStatus" v-validate="'required'"
                                       :error-messages="errors.collect('livingStatus')" name="livingStatus" required>
                            <v-layout row wrap>
                                <v-flex xs6>
                                    <v-radio color="primary" label="Alive" value="Alive"></v-radio>
                                </v-flex>
                                <v-flex xs6>
                                    <v-radio color="primary" label="Dead" value="Dead"></v-radio>
                                </v-flex>
                            </v-layout>
                        </v-radio-group>
                    </v-flex>
                    <v-flex xs12 class="my-1 py-0">
                        <v-text-field class="body-1" v-validate="'required'"
                                      :error-messages="errors.collect('disease')" name="disease"
                                      v-model="familyMedical.disease" label="Disease" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="my-1 py-0">
                        <v-textarea class="body-1" v-validate="'required'"
                                    :error-messages="errors.collect('comment')" name="comment"
                                    v-model="familyMedical.comment" label="Comment" required></v-textarea>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveFamilyMedical(familyMedical)">Add</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import {mapActions} from "vuex";
    import {PatientService} from "@/services"

    export default {
        name: "FamilyMedicalCreate",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                familyMedical: {
                    livingStatus: 'Alive'
                },
                families: [
                    {name: "Mother"},
                    {name: "Father"},
                    {name: "Brother"},
                    {name: "Sister"},
                    {name: "Son"},
                    {name: "Doughter"}
                ]
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            saveFamilyMedical(familyMedical) {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.errorMessages = null;
                        familyMedical.patientId = PatientService.getPatientId();
                        this.createFamilyMedical(familyMedical);
                        this.$modal.hide(this.modalName);
                    }
                });
            },
            ...mapActions(['createFamilyMedical'])
        }
    }
</script>

<style scoped>

</style>
