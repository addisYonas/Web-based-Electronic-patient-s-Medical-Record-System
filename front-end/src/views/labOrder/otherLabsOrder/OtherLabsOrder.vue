<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled">Create OtherLab Order</span>
      <span class="subheading" v-else>OtherLab Orders</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert v-if="invalidInput" :value="true" type="error" dense>{{
        invalidInput
      }}</v-alert>
      <br />
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-layout row small wrap>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Test name"
                  v-model="otherLabsOrder.testName"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Lab result"
                  v-model="otherLabsOrder.labResult"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Unit"
                  v-model="otherLabsOrder.unit"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  color="primary"
                  :readonly="!inputEnabled"
                  label="Note"
                  v-model="otherLabsOrder.note"
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
        @click="saveOtherLabsOrder(otherLabsOrder)"
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
  name: "OtherLabsResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    saveOtherLabs: {
      type: Function,
    },
    otherLabsOrder: {
      type: Object,
      default: () => {
        return {
          testName: false,
          labResult: false,
          unit: false,
          note: false,
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

    saveOtherLabsOrder(mResult) {
      for (let key in mResult) {
        if (mResult[key] === false) delete mResult[key];
      }

      if (Object.keys(mResult).length !== 0) {
        this.saveOtherLabs(mResult);
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
