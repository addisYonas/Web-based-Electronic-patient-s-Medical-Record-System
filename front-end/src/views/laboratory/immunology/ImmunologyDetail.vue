<template>
  <v-card>
    <v-toolbar flat color="white" dense>
      <span class="headline">Immunology Details</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs3>
            <p class="mb-0" v-if="immunologyDetail.im1">
              Pregnancy - <b>{{ immunologyDetail.im1 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im2">
              RPR - <b>{{ immunologyDetail.im2 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im3">
              TPHA - <b>{{ immunologyDetail.im3 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im4">
              HIV - <b>{{ immunologyDetail.im4 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im5">
              Determine - <b>{{ immunologyDetail.im5 }}</b>
            </p>
          </v-flex>

          <v-flex xs3>
            <p class="mb-0" v-if="immunologyDetail.im6">
              Bionor - <b>{{ immunologyDetail.im6 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im7">
              Oraquick - <b>{{ immunologyDetail.im7 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im8">
              Genie II - <b>{{ immunologyDetail.im8 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im9">
              Unigold - <b>{{ immunologyDetail.im9 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im10">
              Western blot - <b>{{ immunologyDetail.im10 }}</b>
            </p>
          </v-flex>

          <v-flex xs3>
            <p class="mb-0" v-if="immunologyDetail.im11">
              CMV IGG (Cytomegalovirus IGG) - <b>{{ immunologyDetail.im11 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im12">
              HSV - <b>{{ immunologyDetail.im12 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im1">
              HBsAg - <b>{{ immunologyDetail.im13 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im13">
              HCV - <b>{{ immunologyDetail.im14 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im14">
              Rheumatoid Factor - <b>{{ immunologyDetail.im15 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im15">
              CAT - Card Aggulatination Test -
              <b>{{ immunologyDetail.im16 }}</b>
            </p>
          </v-flex>

          <v-flex xs3>
            <p class="mb-0" v-if="immunologyDetail.im16">
              ASOT - anti-stereptolysin titer (ASLO) -
              <b>{{ immunologyDetail.im17 }}</b>
            </p>
            <p class="mb-0" v-if="immunologyDetail.im17">
              Toxoplasma - <b>{{ immunologyDetail.im18 }}</b>
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
    immunologyDetail: {
      type: Object,
      default: () => {
        return {
          im1: "",
          im2: "",
          im3: "",
          im4: "",
          im5: "",
          im6: "",
          im7: "",
          im8: "",
          im9: "",
          im10: "",
          im11: "",
          im12: "",
          im13: "",
          im14: "",
          im15: "",
          im16: "",
          im17: "",
          im18: "",
          status: "active",
          orderingDate: null,
          fillingDate: null,
          patientId: "",
          filledBy: "",
          orderedBy: "",
        };
      },
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
