<template>
  <v-card>
    <v-toolbar flat color="white" dense>
      <span class="headline">Other Immunology Details</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs4>
            <p class="mb-0" v-if="otherImmunologyDetail.oi1">
              HIV Viral Load - <b>{{ otherImmunologyDetail.oi1 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi2">
              HIV Resistance - <b>{{ otherImmunologyDetail.oi2 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi3">
              HIV DNA PCR - Roche - <b>{{ otherImmunologyDetail.oi3 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi4">
              HIV TNA Real Time PCR - <b>{{ otherImmunologyDetail.oi4 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi5">
              HIV RNA PCR - <b>{{ otherImmunologyDetail.oi5 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi6">
              HIV p24 Antigen - <b>{{ otherImmunologyDetail.oi6 }}</b>
            </p>
          </v-flex>

          <v-flex xs4>
            <p class="mb-0" v-if="otherImmunologyDetail.oi7">
              HPylori - <b>{{ otherImmunologyDetail.oi7 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi8">
              Widal O - <b>{{ otherImmunologyDetail.oi8 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi9">
              Widal H - <b>{{ otherImmunologyDetail.oi9 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi10">
              Weil-Felix - <b>{{ otherImmunologyDetail.oi10 }}</b>
            </p>
          </v-flex>

          <v-flex xs4>
            <p class="mb-0" v-if="otherImmunologyDetail.oi11">
              Blood Group - <b>{{ otherImmunologyDetail.oi11 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi12">
              Cross Match - <b>{{ otherImmunologyDetail.oi12 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi13">
              Peripheral blood Morphology -
              <b>{{ otherImmunologyDetail.oi13 }}</b>
            </p>
            <p class="mb-0" v-if="otherImmunologyDetail.oi14">
              RH Factor - <b>{{ otherImmunologyDetail.oi14 }}</b>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "immunologyDetail",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    otherImmunologyDetail: {
      type: Object,
    },
  },
  methods: {
    closeDialog() {
      this.$modal.hide(this.modalName);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0px !important;
  margin: 0px !important;
}
.v-text-field {
  margin: 0px !important;
  padding: 0px !important;
  height: 20px !important;
}
.v-text-field input {
  padding: 0px !important;
}
.v-radio {
  height: 1px !important;
  margin: 0px !important;
}
.v-card__text {
  /*margin: 0px !important;*/
  /*padding: 0px !important;*/
  margin-top: 5px !important;
}
.v-input--selection-controls__ripple {
  margin: 0px !important;
}
.v-input--selection-controls.v-input .v-label {
  font-size: 14px;
}
.v-input {
  margin: 0px !important;
  margin-top: 10px !important;
}
</style>
