<template>
  <v-card>
    <v-toolbar flat color="white" dense>
      <span class="headline">Micro Biology Details</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs6>
            <p class="mb-0" v-if="mbDetail.mb1">
              Sputum Smear for AFB - <b>{{ mbDetail.mb1 }}</b>
            </p>
            <p class="mb-0" v-if="mbDetail.mb2">
              Sputum culture for TB - <b>{{ mbDetail.mb2 }}</b>
            </p>
            <p class="mb-0" v-if="mbDetail.mb3">
              Gram Stain - <b>{{ mbDetail.mb3 }}</b>
            </p>
            <p class="mb-0" v-if="mbDetail.mb4">
              Notes - <b>{{ mbDetail.mb4 }}</b>
            </p>
          </v-flex>

          <v-flex xs6>
            <p class="mb-0" v-if="mbDetail.mb5">
              INH - <b>{{ mbDetail.mb5 }}</b>
            </p>
            <p class="mb-0" v-if="mbDetail.mb6">
              RIF - <b>{{ mbDetail.mb6 }}</b>
            </p>
            <p class="mb-0" v-if="mbDetail.mb7">
              ETH - <b>{{ mbDetail.mb7 }}</b>
            </p>
            <p class="mb-0" v-if="mbDetail.mb8">
              PZ - <b>{{ mbDetail.mb8 }}</b>
            </p>
            <p class="mb-0" v-if="mbDetail.mb9">
              Strep - <b>{{ mbDetail.mb9 }}</b>
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
    mbDetail: {
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
