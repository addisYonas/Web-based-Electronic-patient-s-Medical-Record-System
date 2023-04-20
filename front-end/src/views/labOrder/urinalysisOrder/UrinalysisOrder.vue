<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled"
        >Create urinalysis order</span
      >
      <span class="subheading" v-else>Urinalysis Orders</span>
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
                  label="Specific Gravity"
                  v-model="urinalysisOrder.ur1"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Protein"
                  v-model="urinalysisOrder.ur2"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="pH"
                  v-model="urinalysisOrder.ur3"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Ketones"
                  v-model="urinalysisOrder.ur4"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Nitrite"
                  v-model="urinalysisOrder.ur5"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Blood"
                  v-model="urinalysisOrder.ur6"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Leukocytes"
                  v-model="urinalysisOrder.ur7"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Albumin"
                  v-model="urinalysisOrder.ur8"
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
                  label="Glucose (Glu)"
                  v-model="urinalysisOrder.ur9"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Glucose (Glu)"
                  v-model="urinalysisOrder.ur10"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Bilrubin"
                  v-model="urinalysisOrder.ur11"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Urobiliongen"
                  v-model="urinalysisOrder.ur12"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Urobiliongen"
                  v-model="urinalysisOrder.ur13"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Urine alcohol"
                  v-model="urinalysisOrder.ur14"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Microscopic"
                  v-model="urinalysisOrder.ur15"
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
        @click="saveUrinalysisOrder(urinalysisOrder)"
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
  name: "UrinalysisResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    saveUrinalysis: {
      type: Function,
    },
    urinalysisOrder: {
      type: Object,
      default: () => {
        return {
          ur1: false,
          ur2: false,
          ur3: false,
          ur4: false,
          ur5: false,
          ur6: false,
          ur7: false,
          ur8: false,
          ur9: false,
          ur10: false,
          ur11: false,
          ur12: false,
          ur13: false,
          ur14: false,
          ur15: false,
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

    saveUrinalysisOrder(mResult) {
      for (let key in mResult) {
        if (mResult[key] === false) delete mResult[key];
      }

      if (Object.keys(mResult).length !== 0) {
        this.saveUrinalysis(mResult);
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
