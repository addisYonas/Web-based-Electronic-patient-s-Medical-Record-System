<template>
  <v-card>
    <v-toolbar flat color="#26C6DA">
      <span class="headline">Get Patient Information</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert v-if="invalidKeyError" :value="true" type="error">{{
        invalidKeyError
      }}</v-alert>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('getInfo')"
              v-model="key"
              name="getInfo"
              label="Insert Key"
              autofocus
              required
              color="#26C6DA"
              prepend-icon="account_box"
              @keypress.enter="getPatientInfo(key)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="#757575" flat @click="closeDialog">Close</v-btn>
      <v-btn color="#616161" flat @click="getPatientInfo(key)">Get</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PatientService from "../../services/patient.service";
import Router from "../../router";

export const GET_INFO_KEY = "patient key";
export const PATIENT_ID = "patient id";

export default {
  name: "GetInfo",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    adjustIsTherePatient: {
      type: Function,
    },
  },
  data() {
    return {
      key: null,
      invalidKeyError: null,
    };
  },
  methods: {
    closeDialog() {
      this.$modal.hide(this.modalName);
    },

    getPatientInfo(key) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          PatientService.getInfo(key)
            .then((res) => {
              if (this.adjustIsTherePatient)
                this.adjustIsTherePatient(PatientService.isPatientThere());
              Router.push({ name: "patient" });
              this.$modal.hide(this.modalName);
            })
            .catch((err) => {
              this.invalidKeyError = "Please insert a valid key!";
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.headline {
  color: white;
}
</style>
