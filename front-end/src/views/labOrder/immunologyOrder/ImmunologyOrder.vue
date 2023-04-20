<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled">Create Immunology</span>
      <span class="subheading" v-else>Immunology Orders</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert v-if="invalidInput" :value="true" type="error" dense>{{
        invalidInput
      }}</v-alert>
      <br />
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs3>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Pregnancy"
                  v-model="immunologyOrder.im1"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="RPR"
                  v-model="immunologyOrder.im2"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="TPHA"
                  v-model="immunologyOrder.im3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HIV"
                  v-model="immunologyOrder.im4"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Determine"
                  v-model="immunologyOrder.im5"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs3>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Bionor"
                  v-model="immunologyOrder.im6"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Oraquick"
                  v-model="immunologyOrder.im7"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Genie II"
                  v-model="immunologyOrder.im8"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Unigold"
                  v-model="immunologyOrder.im9"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Western blot"
                  v-model="immunologyOrder.im10"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs3>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CMV IGG (Cytomegalovirus IGG)"
                  v-model="immunologyOrder.im11"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HSV"
                  v-model="immunologyOrder.im12"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HBsAg"
                  v-model="immunologyOrder.im13"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HCV"
                  v-model="immunologyOrder.im14"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Rheumatoid Factor"
                  v-model="immunologyOrder.im15"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CAT - Card Aggulatination Test"
                  v-model="immunologyOrder.im16"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs3>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="ASOT - anti-stereptolysin titer (ASLO)"
                  v-model="immunologyOrder.im17"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Toxoplasma"
                  v-model="immunologyOrder.im18"
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
        @click="saveImmunologyOrder(immunologyOrder)"
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
  name: "ImmunologyResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    saveImmunology: {
      type: Function,
    },
    immunologyOrder: {
      type: Object,
      default: () => {
        return {
          im1: false,
          im2: false,
          im3: false,
          im4: false,
          im5: false,
          im6: false,
          im7: false,
          im8: false,
          im9: false,
          im10: false,
          im11: false,
          im12: false,
          im13: false,
          im14: false,
          im15: false,
          im16: false,
          im17: false,
          im18: false,
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

    saveImmunologyOrder(immResult) {
      for (let key in immResult) {
        if (immResult[key] === false) delete immResult[key];
      }

      if (Object.keys(immResult).length !== 0) {
        this.saveImmunology(immResult);
        this.$modal.hide(this.modalName);
      } else {
        this.invalidInput = "please fill in some inputs!";
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
