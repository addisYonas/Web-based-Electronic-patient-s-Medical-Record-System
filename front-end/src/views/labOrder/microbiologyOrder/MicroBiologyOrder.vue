<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled">Create Microbiology</span>
      <span class="subheading" v-else>Microbiology Orders</span>
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
                  label="Sputum Smear for AFB "
                  v-model="microBiologyOrder.mb1"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Sputum culture for TB"
                  v-model="microBiologyOrder.mb2"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Gram Stain"
                  v-model="microBiologyOrder.mb3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Notes"
                  v-model="microBiologyOrder.mb4"
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
                  label="INH"
                  v-model="microBiologyOrder.mb5"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="RIF"
                  v-model="microBiologyOrder.mb6"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="ETH"
                  v-model="microBiologyOrder.mb7"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="PZ"
                  v-model="microBiologyOrder.mb8"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Strep"
                  v-model="microBiologyOrder.mb9"
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
        @click="saveMicroBiologyOrder(microBiologyOrder)"
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
  name: "MicroBiologyResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    saveMicroBiology: {
      type: Function,
    },
    microBiologyOrder: {
      type: Object,
      default: () => {
        return {
          mb1: false,
          mb2: false,
          mb3: false,
          mb4: false,
          mb5: false,
          mb6: false,
          mb7: false,
          mb8: false,
          mb9: false,
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

    saveMicroBiologyOrder(mResult) {
      for (let key in mResult) {
        if (mResult[key] === false) delete mResult[key];
      }

      if (Object.keys(mResult).length !== 0) {
        this.saveMicroBiology(mResult);
        this.$modal.hide(this.modalName);
      } else {
        this.invalidInput = "Please fill in some inputs!";
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
