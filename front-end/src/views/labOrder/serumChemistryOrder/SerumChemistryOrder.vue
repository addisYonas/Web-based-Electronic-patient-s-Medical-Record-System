<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled"
        >Create Serum Chemistry Order</span
      >
      <span class="subheading" v-else>Serum Chemistry Orders</span>
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
                  label="Albumin"
                  v-model="serumChemistryOrder.sc1"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Total Protein"
                  v-model="serumChemistryOrder.sc2"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="ALP (Alkaline Phosphate)"
                  v-model="serumChemistryOrder.sc3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="ALT (Alanine Transferase)"
                  v-model="serumChemistryOrder.sc4"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="AST (Aspartate Transferase)"
                  v-model="serumChemistryOrder.sc5"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="GGT (Gama-Glutamyl Transpeptidase)"
                  v-model="serumChemistryOrder.sc6"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Dir Bili (Direct Bilirubin)"
                  v-model="serumChemistryOrder.sc7"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="T Bili (Total - Bilirubin)"
                  v-model="serumChemistryOrder.sc8"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Indir Bili (Indirect Bilirubin)"
                  v-model="serumChemistryOrder.sc9"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="LDH (Lactic Acid Dehydrogenase)"
                  v-model="serumChemistryOrder.sc10"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Lactate"
                  v-model="serumChemistryOrder.sc11"
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
                  label="Na+ (Sodium)"
                  v-model="serumChemistryOrder.sc12"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="K+ (Potassium)"
                  v-model="serumChemistryOrder.sc13"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Cl (Chloride)"
                  v-model="serumChemistryOrder.sc14"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CO2 (Bicarbonate)"
                  v-model="serumChemistryOrder.sc15"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Ca (Calcium)"
                  v-model="serumChemistryOrder.sc16"
                ></v-checkbox>
              </v-flex>

              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="BUN (Blood Urea Nitrogen)"
                  v-model="serumChemistryOrder.sc17"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Creatinine"
                  v-model="serumChemistryOrder.sc18"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Creatinine Clearance"
                  v-model="serumChemistryOrder.sc19"
                ></v-checkbox>
              </v-flex>

              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Lipase"
                  v-model="serumChemistryOrder.sc29"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Amylase"
                  v-model="serumChemistryOrder.sc30"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Acid Phosphatase"
                  v-model="serumChemistryOrder.sc31"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="TIBC (Total Iron Binding Capacity)"
                  v-model="serumChemistryOrder.sc32"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Uric Acid"
                  v-model="serumChemistryOrder.sc33"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Blood Alchohol"
                  v-model="serumChemistryOrder.sc34"
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
                  label="FBS (Fasting Blood Sugar)"
                  v-model="serumChemistryOrder.sc20"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="RBS (Random Blood Sugar)"
                  v-model="serumChemistryOrder.sc21"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Chol (Cholesterol)"
                  v-model="serumChemistryOrder.sc22"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="HDL (High Density Lipoprotein)"
                  v-model="serumChemistryOrder.sc23"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="LDL (Low Density Lipoprotein)"
                  v-model="serumChemistryOrder.sc24"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Trig (Triglycerides)"
                  v-model="serumChemistryOrder.sc25"
                ></v-checkbox>
              </v-flex>

              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Insulin"
                  v-model="serumChemistryOrder.sc26"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CPK (Creatinie Phosphokinase)"
                  v-model="serumChemistryOrder.sc27"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="CPK MB (Myocardial Band)"
                  v-model="serumChemistryOrder.sc28"
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
        @click="saveSerumChemistryOrder(serumChemistryOrder)"
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
  name: "SerumChemistryResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    saveSerumChemistry: {
      type: Function,
    },
    serumChemistryOrder: {
      type: Object,
      default: () => {
        return {
          sc1: false,
          sc2: false,
          sc3: false,
          sc4: false,
          sc5: false,
          sc6: false,
          sc7: false,
          sc8: false,
          sc9: false,
          sc10: false,
          sc11: false,
          sc12: false,
          sc13: false,
          sc14: false,
          sc15: false,
          sc16: false,
          sc17: false,
          sc18: false,
          sc19: false,
          sc20: false,
          sc21: false,
          sc22: false,
          sc23: false,
          sc24: false,
          sc25: false,
          sc26: false,
          sc27: false,
          sc28: false,
          sc29: false,
          sc30: false,
          sc31: false,
          sc32: false,
          sc33: false,
          sc34: false,
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

    saveSerumChemistryOrder(mResult) {
      for (let key in mResult) {
        if (mResult[key] === false) delete mResult[key];
      }

      if (Object.keys(mResult).length !== 0) {
        this.saveSerumChemistry(mResult);
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
