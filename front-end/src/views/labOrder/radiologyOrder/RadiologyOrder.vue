<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled">Create Radiology Order</span>
      <span class="subheading" v-else>Radiology Order</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert v-if="invalidInput" :value="true" type="error" dense>{{
        invalidInput
      }}</v-alert>
      <br />
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs6>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Ultrasound"
                  v-model="radiologyOrder.rd1"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CT Scan"
                  v-model="radiologyOrder.rd2"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Date"
                  v-model="radiologyOrder.rd3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Normal"
                  v-model="radiologyOrder.rd4"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Infiltrate"
                  v-model="radiologyOrder.rd5"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Pleural effusion"
                  v-model="radiologyOrder.rd6"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs6>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Pul. TB"
                  v-model="radiologyOrder.rd7"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Pneumonia"
                  v-model="radiologyOrder.rd8"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Military TB"
                  v-model="radiologyOrder.rd9"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Mediastinal"
                  v-model="radiologyOrder.rd10"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Other"
                  v-model="radiologyOrder.rd11"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Other Report"
                  v-model="radiologyOrder.rd12"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider />
    <v-toolbar color="white" dense flat height="40">
      <v-spacer></v-spacer>
      <v-btn @click="closeDialog" color="blue darken-1" flat>Close</v-btn>
      <v-btn
        @click="saveRadiologyOrder(radiologyOrder)"
        color="blue darken-1"
        flat
        v-if="inputEnabled"
      >
        Save
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "RadiologyResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    saveRadiology: {
      type: Function,
    },
    radiologyOrder: {
      type: Object,
      default: () => {
        return {
          rd1: false,
          rd2: false,
          rd3: false,
          rd4: false,
          rd5: false,
          rd6: false,
          rd7: false,
          rd8: false,
          rd9: false,
          rd10: false,
          rd11: false,
          rd12: false,
        };
      },
    },
  },
  data() {
    return {
      invalidInput: null,
    };
  },
  methods: {
    closeDialog() {
      this.$modal.hide(this.modalName);
    },

    saveRadiologyOrder(mResult) {
      for (let key in mResult) {
        if (mResult[key] === false) delete mResult[key];
      }

      if (Object.keys(mResult).length !== 0) {
        this.saveRadiology(mResult);
        this.$modal.hide(this.modalName);
      } else {
        this.invalidInput = "Please fill in some input!";
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0px !important;
}

.v-text-field input {
  padding: 0px !important;
}

.v-input--selection-controls {
  padding: 0px !important;
  margin: 0px !important;
}

.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
  margin: 0px !important;
}

.v-messages {
  min-height: 5px !important;
}
.v-alert {
  padding: 0px !important;
  margin: 0px !important;
}
</style>
