<template>
  <v-card>
    <v-toolbar height="40" flat color="white">
      <span class="subheading">{{ componentTitle }}</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <form-error-messages :messages="errorMessages" />
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs4 px-4>
            <div class="pb-3">
              <p class="mb-0 font-weight-bold">Quick pick from drugs</p>

              <v-layout row small>
                <v-flex xs12 class="text-xs-right pr-2">
                  <v-autocomplete
                    v-validate="'required'"
                    :error-messages="errors.collect('drug')"
                    name="drug"
                    v-model="prescription.drugId"
                    label="Drug"
                    :items="allDrugs"
                    item-text="name"
                    item-value="id"
                    @change="fillDrugStrength"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </div>

            <div class="pt-3">
              <p class="mb-0 font-weight-bold">
                Or filter by drug utility and class
              </p>

              <v-layout row small>
                <v-flex xs12 class="text-xs-right pr-2">
                  <v-autocomplete
                    name="utility"
                    label="Utility"
                    :items="allUtilities"
                    item-text="name"
                    item-value="id"
                    @change="filterByUtility"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>

              <v-layout row small>
                <v-flex xs12 class="text-xs-right pr-2">
                  <v-autocomplete
                    name="classOfUtility"
                    label="Class of utility"
                    :items="allClassOfUtilities"
                    item-text="name"
                    item-value="id"
                    @change="filterByClassOfUtility"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>

          <v-flex xs4 px-4>
            <div class="pb-3">
              <p class="mb-0 font-weight-bold">Select drug strength</p>

              <v-layout row small>
                <v-flex xs12 class="text-xs-right pr-2">
                  <v-autocomplete
                    v-validate="'required'"
                    :error-messages="errors.collect('strength')"
                    name="strength"
                    v-model="prescription.strength"
                    label="Drug strength"
                    :items="drug.strengths"
                    item-text="name"
                    item-value="name"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </div>

            <div class="pt-3">
              <p class="mb-0 font-weight-bold">Form of medicine</p>
              <p class="mb-0">{{ drug.form }}</p>
            </div>
          </v-flex>

          <v-flex xs4 px-4>
            <div class="pb-3">
              <v-text-field
                class="body-1"
                v-validate="'required'"
                :error-messages="errors.collect('dose')"
                name="dose"
                v-model="prescription.dose"
                label="Dose"
                required
              ></v-text-field>
            </div>

            <div class="pb-3">
              <v-text-field
                class="body-1"
                v-validate="'required|numeric|max_value:100'"
                :error-messages="errors.collect('itemsPerDose')"
                name="itemsPerDose"
                v-model="prescription.itemsPerDose"
                label="Items Per Dose"
                required
              ></v-text-field>
            </div>

            <div class="pb-3">
              <v-autocomplete
                v-validate="'required'"
                :error-messages="errors.collect('frequency')"
                name="frequency"
                v-model="prescription.frequency"
                label="Frequency"
                :items="frequency"
                item-text="name"
                item-value="name"
              ></v-autocomplete>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider />
    <v-toolbar height="40" flat color="white">
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" flat @click="savePrescription(prescription)"
        >Add</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { PatientService } from "@/services";

export default {
  name: "NewPrescription",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    prescription: {
      type: Object,
      default: () => {
        this.prescription = {
          name: "",
          description: "",
        };
      },
    },
  },
  data() {
    return {
      dialog: false,
      errorMessages: null,
      frequency: ["hourly", "daily"],
    };
  },
  methods: {
    closeDialog() {
      this.$modal.hide(this.modalName);
    },
    savePrescription(prescription) {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.errorMessages = null;
          prescription.patientId = PatientService.getPatientId();
          if (prescription.id) {
            this.updatePrescription(prescription);
          } else {
            this.createPrescription(prescription);
          }
          this.$modal.hide(this.modalName);
        }
      });
    },
    fillDrugStrength(a) {
      this.prescription.strength = "";
      this.fetchDrug(a);
    },
    filterByUtility(a) {
      const filterUtility = {
        where: {
          drugUtilityId: a,
        },
        order: "createdAt DESC",
      };

      const filterClassOfUtility = {
        where: {
          utilityId: a,
        },
        order: "createdAt DESC",
      };

      this.filterDrugs(filterUtility);
      this.filterClassOfUtility(filterClassOfUtility);
    },
    filterByClassOfUtility(a) {
      const filter = {
        where: {
          drugClassId: a,
        },
        order: "createdAt DESC",
      };

      this.filterDrugs(filter);
    },
    ...mapActions([
      "createPrescription",
      "updatePrescription",
      "fetchAllDrugs",
      "fetchAllUtilities",
      "fetchAllClassOfUtilities",
      "fetchDrug",
      "filterDrugs",
      "filterClassOfUtility",
    ]),
  },
  computed: {
    componentTitle() {
      if (!this.prescription.id) return "Create prescription";
      else return "Edit prescription";
    },
    ...mapGetters(["drug", "allDrugs", "allUtilities", "allClassOfUtilities"]),
  },
  created() {
    this.fetchAllDrugs();
    this.fetchAllUtilities();
    this.fetchAllClassOfUtilities();
  },
};
</script>
