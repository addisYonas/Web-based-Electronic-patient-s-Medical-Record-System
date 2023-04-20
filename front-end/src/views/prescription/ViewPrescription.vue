<template>
  <v-container grid-list-xl fluid>
    <div>
      <v-btn
        class="mx-0 mt-0 mb-2 text-capitalize"
        color="primary"
        small
        dark
        v-if="authenticatedUserRole === 'Doctor' && isThereAPatient"
        @click="prescriptionCreateMethod({})"
      >
        <v-icon class="mr-1">add_circle_outline</v-icon>
        Add Prescription
      </v-btn>
      <div v-if="prescriptions.length > 0">
        <v-layout row wrap>
          <v-flex xs12 sm6 v-for="item in prescriptions" :key="item.id">
            <v-card>
              <v-toolbar class="primary--text" height="30" flat dense card>
                <v-toolbar-title class="body-1"
                  ><b>Prescription - </b>{{ item.id }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-toolbar-title class="body-2"
                  >By Dr. {{ item.orderedBy.fullName }}</v-toolbar-title
                >
              </v-toolbar>
              <v-divider />
              <v-card-text>
                <v-layout row wrap>
                  <v-flex class="xs4">
                    <div class="py-2">
                      <div class="px-2"><b>Drug</b></div>
                      <div class="px-2">{{ item.drug.name }}</div>
                    </div>

                    <div class="py-2">
                      <div class="px-2"><b>Drug utility</b></div>
                      <div class="px-2">{{ item.drug.drugUtility.name }}</div>
                    </div>

                    <div class="py-2">
                      <div class="px-2"><b>Class of utility</b></div>
                      <div class="px-2">{{ item.drug.drugClass.name }}</div>
                    </div>
                  </v-flex>
                  <v-flex class="xs4">
                    <div class="py-2">
                      <div class="px-2"><b>Strength</b></div>
                      <div class="px-2">{{ item.strength }}</div>
                    </div>

                    <div class="py-2">
                      <div class="px-2"><b>Drug form</b></div>
                      <div class="px-2">{{ item.drug.form }}</div>
                    </div>
                  </v-flex>
                  <v-flex class="xs4">
                    <div class="py-2">
                      <div class="px-2"><b>Dose</b></div>
                      <div class="px-2">{{ item.dose }}</div>
                    </div>

                    <div class="py-2">
                      <div class="px-2"><b>Items per dose</b></div>
                      <div class="px-2">{{ item.itemsPerDose }}</div>
                    </div>

                    <div class="py-2">
                      <div class="px-2"><b>Frequency</b></div>
                      <div class="px-2">{{ item.frequency }}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-toolbar
                class="primary--text"
                height="30"
                flat
                dense
                card
                color="transparent"
              >
                <v-toolbar-title class="body-1"
                  ><b>Ordered at - </b
                  >{{ item.createdAt | moment("MM-DD-YYYY, h:mm:ss a") }}
                </v-toolbar-title>
              </v-toolbar>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
      <div v-else>
        <v-card class="mt-2 mb-3 pa-4">
          <span class="body-1 text-xs-center">There is nothing to show.</span>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { mapGetters, mapActions } from "vuex";
import PrescriptionCreate from "./PrescriptionCreate";

export default {
  name: "view-medicine",
  data() {
    return {
      authenticatedUserRole: "",
      isThereAPatient: PatientService.isPatientThere(),
    };
  },
  methods: {
    prescriptionCreateMethod(prescription) {
      this.$modal.show(
        PrescriptionCreate,
        {
          modalName: "prescription-create-modal",
          prescription: prescription,
        },
        {
          name: "prescription-create-modal",
          height: "auto",
          width: 1000,
          scrollable: true,
        }
      );
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.getMorePrescriptions().then(() => {});
        }
      };
    },
    ...mapActions(["fetchPrescriptions", "getMorePrescriptions"]),
  },
  computed: mapGetters(["prescriptions"]),
  created() {
    this.fetchPrescriptions();
    this.isThereAPatient = PatientService.isPatientThere();
  },
  mounted() {
    this.scroll();
    if (AccountService.getProfile())
      this.authenticatedUserRole = AccountService.getProfile().role;
  },
};
</script>

<style scoped></style>
