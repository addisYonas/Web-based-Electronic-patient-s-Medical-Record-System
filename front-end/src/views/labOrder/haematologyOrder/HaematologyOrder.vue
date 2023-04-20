<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled">Create Haematology</span>
      <span class="subheading" v-else>Haematology Orders</span>
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
                  label="RBC (Red Blood Cell Count)"
                  v-model="haematologyOrder.hm1"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Hgb (Haemoglobin)"
                  v-model="haematologyOrder.hm2"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Hct (Haematocrit)"
                  v-model="haematologyOrder.hm3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="MCV (Mean Cell Volume)"
                  v-model="haematologyOrder.hm4"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="MCH (Mean Cell Hgb)"
                  v-model="haematologyOrder.hm5"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="MCHC (Mean Cell Hgb Concentration)"
                  v-model="haematologyOrder.hm6"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="PLT (Platelete Count)"
                  v-model="haematologyOrder.hm7"
                ></v-checkbox>
              </v-flex>
            </v-layout>

            <v-layout row small wrap>
              <p class="mb-0 font-weight-bold pl-2">Other RBC Tests</p>

              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="RDW (Red Cell Distribution Width)"
                  v-model="haematologyOrder.hm8"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Retic (Reticulocyte Cell Count)"
                  v-model="haematologyOrder.hm9"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="ESR (Erythrocyte Sedimentation Rate)"
                  v-model="haematologyOrder.hm10"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs4>
            <p class="mb-0 font-weight-bold pl-2">RBC Count</p>

            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="WBC (White Cell Count)"
                  v-model="haematologyOrder.hm11"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Unseg. Neutrophils"
                  v-model="haematologyOrder.hm12"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Seg. Neutrophils"
                  v-model="haematologyOrder.hm13"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Neutrophils"
                  v-model="haematologyOrder.hm14"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Lymphs (Lymphocytes)"
                  v-model="haematologyOrder.hm15"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Mono (Monocytes)"
                  v-model="haematologyOrder.hm16"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Eos (Eosinophils)"
                  v-model="haematologyOrder.hm17"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Baso (Basophils)"
                  v-model="haematologyOrder.hm18"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="MID"
                  v-model="haematologyOrder.hm19"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs4>
            <p class="mb-0 font-weight-bold pl-2">RBC Count</p>

            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="PT (Prothrombin Time)"
                  v-model="haematologyOrder.hm20"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="PTT (Partial Thromboplastin Time)"
                  v-model="haematologyOrder.hm21"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="APTT (Act. Partial Thromboplatin Time)"
                  v-model="haematologyOrder.hm22"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Bleeding Time"
                  v-model="haematologyOrder.hm23"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Clot Retraction"
                  v-model="haematologyOrder.hm24"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Coagulation Time"
                  v-model="haematologyOrder.hm25"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Fibrinogen"
                  v-model="haematologyOrder.hm26"
                ></v-checkbox>
              </v-flex>
            </v-layout>

            <v-layout row small wrap>
              <p class="mb-0 font-weight-bold pl-2">RBC Count</p>

              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CD4 Absolute Count"
                  v-model="haematologyOrder.hm27"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CD4 % of Lymphocytes"
                  v-model="haematologyOrder.hm28"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CD4/CDB"
                  v-model="haematologyOrder.hm29"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CDB"
                  v-model="haematologyOrder.hm30"
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
        @click="saveHaematologyOrder(haematologyOrder)"
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
  name: "HaematologyResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    saveHaematology: {
      type: Function,
    },
    haematologyOrder: {
      type: Object,
      default: () => {
        return {
          hm1: false,
          hm2: false,
          hm3: false,
          hm4: false,
          hm5: false,
          hm6: false,
          hm7: false,
          hm8: false,
          hm9: false,
          hm10: false,
          hm11: false,
          hm12: false,
          hm13: false,
          hm14: false,
          hm15: false,
          hm16: false,
          hm17: false,
          hm18: false,
          hm19: false,
          hm20: false,
          hm21: false,
          hm22: false,
          hm23: false,
          hm24: false,
          hm25: false,
          hm26: false,
          hm27: false,
          hm28: false,
          hm29: false,
          hm30: false,
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

    saveHaematologyOrder(hResult) {
      for (let key in hResult) {
        if (hResult[key] === false) delete hResult[key];
      }

      if (Object.keys(hResult).length !== 0) {
        this.saveHaematology(hResult);
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
  padding: 5px !important;
  margin: 0px !important;
}
</style>
