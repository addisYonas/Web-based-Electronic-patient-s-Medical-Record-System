<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled"
        >Create Other Immunology</span
      >
      <span class="subheading" v-else>Other Immunology Orders</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert v-if="invalidInput" :value="true" type="error" dense>{{
        invalidInput
      }}</v-alert>
      <br />
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs4>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HIV Viral Load"
                  v-model="otherImmunologyOrder.oi1"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HIV Resistance"
                  v-model="otherImmunologyOrder.oi2"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HIV DNA PCR - Roche"
                  v-model="otherImmunologyOrder.oi3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HIV TNA Real Time PCR"
                  v-model="otherImmunologyOrder.oi4"
                ></v-checkbox>
              </v-flex>

              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HIV RNA PCR"
                  v-model="otherImmunologyOrder.oi5"
                ></v-checkbox>
              </v-flex>

              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HIV p24 Antigen"
                  v-model="otherImmunologyOrder.oi6"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs4>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HPylori"
                  v-model="otherImmunologyOrder.oi7"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Widal O"
                  v-model="otherImmunologyOrder.oi8"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Widal H"
                  v-model="otherImmunologyOrder.oi9"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Weil-Felix"
                  v-model="otherImmunologyOrder.oi10"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs4>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Blood Group"
                  v-model="otherImmunologyOrder.oi11"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Cross Match"
                  v-model="otherImmunologyOrder.oi12"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Peripheral blood Morphology"
                  v-model="otherImmunologyOrder.oi13"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="RH Factor"
                  v-model="otherImmunologyOrder.oi14"
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
        @click="saveOtherImmunologyOrder(otherImmunologyOrder)"
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
  name: "OtherImmunologyResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    saveOtherImmunology: {
      type: Function,
    },
    otherImmunologyOrder: {
      type: Object,
      default: () => {
        return {
          oi1: false,
          oi2: false,
          oi3: false,
          oi4: false,
          oi5: false,
          oi6: false,
          oi7: false,
          oi8: false,
          oi9: false,
          oi10: false,
          oi11: false,
          oi12: false,
          oi13: false,
          oi14: false,
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

    saveOtherImmunologyOrder(oiResult) {
      for (let key in oiResult) {
        if (oiResult[key] === false) delete oiResult[key];
      }

      if (Object.keys(oiResult).length !== 0) {
        this.saveOtherImmunology(oiResult);
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
