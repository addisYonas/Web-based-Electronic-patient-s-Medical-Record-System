<template>
  <v-card>
    <v-toolbar height="40" flat color="white" dense>
      <span class="subheading" v-if="inputEnabled">Create Lab Order</span>
      <span class="subheading" v-else>Lab order Results</span>
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
            <v-layout row small>
              <v-flex xs12 class="text-xs-right pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-textarea
                      class="body-1"
                      v-validate="'required'"
                      :error-messages="errors.collect('labOrderNote')"
                      name="labOrderNote"
                      v-model="labOrder.note"
                      label="Laboratory note"
                      :readonly="authenticatedUserRole !== 'Doctor'"
                      outline
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout
              row
              small
              v-if="
                labOrder.haematology !== undefined &&
                  labOrder.haematology !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showHaematology()
                            : showLaboratoryDetail()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">Haematology</span>
                          <v-spacer />
                          <v-chip
                            v-if="
                              Object.keys(labOrder.haematology).length !== 0
                            "
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.haematology).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout
              row
              small
              v-if="
                labOrder.immunology !== undefined &&
                  labOrder.immunology !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showImmunologyOrder()
                            : showImmunologyFiller()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">Immunology</span>
                          <v-spacer />
                          <v-chip
                            v-if="Object.keys(labOrder.immunology).length !== 0"
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.immunology).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout
              row
              small
              v-if="
                labOrder.microBiology !== undefined &&
                  labOrder.microBiology !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showMicroBiologyOrder()
                            : showMicroBiologyFiller()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">MicroBiology</span>
                          <v-spacer />
                          <v-chip
                            v-if="
                              Object.keys(labOrder.microBiology).length !== 0
                            "
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.microBiology).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs6>
            <v-layout
              row
              small
              v-if="
                labOrder.serumChemistry !== undefined &&
                  labOrder.serumChemistry !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showSerumChemistryOrder()
                            : showSerumChemistryFiller()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">Serum Chemistry</span>
                          <v-spacer />
                          <v-chip
                            v-if="
                              Object.keys(labOrder.serumChemistry).length !== 0
                            "
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.serumChemistry).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout
              row
              small
              v-if="
                labOrder.otherImmunology !== undefined &&
                  labOrder.otherImmunology !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showOtherImmunologyOrder()
                            : showOtherImmunologyFiller()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">Other Immunology</span>
                          <v-spacer />
                          <v-chip
                            v-if="
                              Object.keys(labOrder.otherImmunology).length !== 0
                            "
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.otherImmunology).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout
              row
              small
              v-if="
                labOrder.otherLab !== undefined && labOrder.otherLab !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showOtherLabsOrder()
                            : showOtherLabsFiller()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">Other Labs</span>
                          <v-spacer />
                          <v-chip
                            v-if="Object.keys(labOrder.otherLab).length !== 0"
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.otherLab).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout
              row
              small
              v-if="
                labOrder.parasitology !== undefined &&
                  labOrder.parasitology !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showParasitologyOrder()
                            : showParasitologyFiller()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">Parasitology</span>
                          <v-spacer />
                          <v-chip
                            v-if="
                              Object.keys(labOrder.parasitology).length !== 0
                            "
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.parasitology).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout
              row
              small
              v-if="
                labOrder.radiology !== undefined && labOrder.radiology !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showRadiologyOrder()
                            : showRadiologyFiller()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">Radiology</span>
                          <v-spacer />
                          <v-chip
                            v-if="Object.keys(labOrder.radiology).length !== 0"
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.radiology).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout
              row
              small
              v-if="
                labOrder.urinalysis !== undefined &&
                  labOrder.urinalysis !== null
              "
            >
              <v-flex xs12 class="pr-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-hover>
                      <v-card
                        style="cursor: pointer"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 5 : 2}`"
                        @click="
                          authenticatedUserRole === 'Doctor'
                            ? showUrinalysisOrder()
                            : showUrinalysisFiller()
                        "
                      >
                        <v-toolbar color="transparent" flat dense>
                          <span class="text-xs-left">Urinalysis</span>
                          <v-spacer />
                          <v-chip
                            v-if="Object.keys(labOrder.urinalysis).length !== 0"
                            right
                            class="ma-0 text-xs-right"
                          >
                            <span>{{
                              Object.keys(labOrder.urinalysis).length
                            }}</span>
                          </v-chip>
                        </v-toolbar>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider />
    <v-toolbar height="40" flat color="white" dense>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
      <v-btn
        color="blue darken-1"
        flat
        v-if="inputEnabled"
        @click="saveLabOrder(labOrder)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { LabOrderAPI } from "@/api";
import { mapMutations } from "vuex";
import { eventBus } from "../../main";

import HaematologyOrder from "./haematologyOrder/HaematologyOrder";
import HaematologyDetail from "../laboratory/haematology/HaematologyCreateOrDetail";

import ImmunologyOrder from "./immunologyOrder/ImmunologyOrder";
import ImmunologyCreate from "../laboratory/immunology/ImmunologyCreate";

import MicroBiologyOrder from "./microbiologyOrder/MicroBiologyOrder";
import MicroBiologyCreate from "../laboratory/microBiology/MicroBiologyCreate";

import OtherImmunologyOrder from "./otherImmunologyOrder/OtherImmunologyOrder";
import OtherImmunologyCreate from "../laboratory/otherImmunology/OtherImmunologyCreate";

import OtherLabsOrder from "./otherLabsOrder/OtherLabsOrder";
import OtherLabsCreate from "../laboratory/otherLabs/OtherLabCreateOrDetail";

import ParasitologyOrder from "./parasitologyOrder/ParasitologyOrder";
import ParasitologyCreate from "../laboratory/parasitology/ParasitologyCreateOrDetail";

import RadiologyOrder from "./radiologyOrder/RadiologyOrder";
import RadiologyCreate from "../laboratory/radiology/RadiologyCreateOrDetail";

import SerumChemistryOrder from "./serumChemistryOrder/SerumChemistryOrder";
import SerumChemistryCreate from "../laboratory/serumChemistry/SerumChemistryCreateOrDetail";

import UrinalysisOrder from "./urinalysisOrder/UrinalysisOrder";
import UrinalysisCreate from "../laboratory/urinalysis/UrinalysisCreateOrDetail";

export default {
  name: "LabOrder",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    labOrder: {
      type: Object,
      default: () => {
        return {
          note: "",
          haematology: {},
          immunology: {},
          microBiology: {},
          otherImmunology: {},
          otherLab: {},
          parasitology: {},
          radiology: {},
          serumChemistry: {},
          urinalysis: {},
          orderingDate: null,
          fillingDate: null,
        };
      },
    },
    fetchData: {
      type: Function,
    },
  },
  data() {
    return {
      authenticatedUserRole: "",
      invalidInput: null,
    };
  },
  methods: {
    // ======================== Haematology ========================
    showHaematology() {
      this.$modal.show(
        HaematologyOrder,
        {
          modalName: "haematology-order-modal",
          inputEnabled: Object.keys(this.labOrder.haematology).length === 0,
          haematologyOrder: { ...this.labOrder.haematology },
          saveHaematology: this.saveHaematology,
        },
        {
          name: "haematology-order-modal",
          height: "auto",
          width: 900,
          scrollable: true,
        }
      );
    },

    showLaboratoryDetail() {
      this.setHaematoFilter(this.labOrder.haematology);

      this.$modal.show(
        HaematologyDetail,
        {
          modalName: "haematology-result-modal",
          inputEnabled: undefined,
          orderedById: this.labOrder.orderedById,
          haematologyResult: undefined,
          editCallBack: this.updateLabOrder,
        },
        {
          name: "haematology-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveHaematology(haematology) {
      if (Object.keys(haematology).length !== 0) {
        this.labOrder.haematology = haematology;
      }
    },

    updateLabOrder() {
      LabOrderAPI.update({ haematology: null, id: this.labOrder.id }).then(
        () => {
          this.labOrder.haematology = null;
          this.checkAndDeleteLabOrder();
        }
      );
    },

    // ======================== Immunology ========================

    showImmunologyOrder() {
      this.$modal.show(
        ImmunologyOrder,
        {
          modalName: "immunology-order-modal",
          inputEnabled: Object.keys(this.labOrder.immunology).length === 0,
          immunologyOrder: { ...this.labOrder.immunology },
          saveImmunology: this.saveImmunology,
        },
        {
          name: "immunology-order-modal",
          height: "auto",
          width: 1100,
          scrollable: true,
        }
      );
    },

    showImmunologyFiller() {
      this.setImmunoFilter(this.labOrder.immunology);

      this.$modal.show(
        ImmunologyCreate,
        {
          modalName: "immunology-result-modal",
          inputEnabled: undefined,
          immunologyResult: undefined,
          orderedById: this.labOrder.orderedById,
          editCallBack: this.updateLabOrderImmunology,
        },
        {
          name: "immunology-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveImmunology(imm) {
      if (Object.keys(imm).length !== 0) {
        this.labOrder.immunology = imm;
      }
    },

    updateLabOrderImmunology() {
      LabOrderAPI.update({ immunology: null, id: this.labOrder.id }).then(
        () => {
          this.labOrder.immunology = null;
          this.checkAndDeleteLabOrder();
        }
      );
    },

    // ======================== Micro Biology ========================

    showMicroBiologyOrder() {
      this.$modal.show(
        MicroBiologyOrder,
        {
          modalName: "microBiology-order-modal",
          inputEnabled: Object.keys(this.labOrder.microBiology).length === 0,
          microBiologyOrder: { ...this.labOrder.microBiology },
          saveMicroBiology: this.saveMicroBiology,
        },
        {
          name: "microBiology-order-modal",
          height: "auto",
          width: 700,
          scrollable: true,
        }
      );
    },

    showMicroBiologyFiller() {
      this.setMicroBiologyFilter(this.labOrder.microBiology);

      this.$modal.show(
        MicroBiologyCreate,
        {
          modalName: "microBiology-result-modal",
          inputEnabled: undefined,
          mbResult: undefined,
          orderedById: this.labOrder.orderedById,
          editCallBack: this.updateLabOrderMicroBiology,
        },
        {
          name: "microBiology-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveMicroBiology(mb) {
      if (Object.keys(mb).length !== 0) {
        this.labOrder.microBiology = mb;
      }
    },

    updateLabOrderMicroBiology() {
      LabOrderAPI.update({ microBiology: null, id: this.labOrder.id }).then(
        () => {
          this.labOrder.microBiology = null;
          this.checkAndDeleteLabOrder();
        }
      );
    },

    // ======================== Other Immunology ========================

    showOtherImmunologyOrder() {
      this.$modal.show(
        OtherImmunologyOrder,
        {
          modalName: "other-immunology-order-modal",
          inputEnabled: Object.keys(this.labOrder.otherImmunology).length === 0,
          otherImmunologyOrder: { ...this.labOrder.otherImmunology },
          saveOtherImmunology: this.saveOtherImmunology,
        },
        {
          name: "other-immunology-order-modal",
          height: "auto",
          width: 800,
          scrollable: true,
        }
      );
    },

    showOtherImmunologyFiller() {
      this.setOtherImmunologyFilter(this.labOrder.otherImmunology);

      this.$modal.show(
        OtherImmunologyCreate,
        {
          modalName: "other-immunology-result-modal",
          inputEnabled: undefined,
          editCallBack: this.updateLabOrderOtherImmunology,
          orderedById: this.labOrder.orderedById,
          otherImmunologyResult: undefined,
        },
        {
          name: "other-immunology-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveOtherImmunology(oi) {
      if (Object.keys(oi).length !== 0) {
        this.labOrder.otherImmunology = oi;
      }
    },

    updateLabOrderOtherImmunology() {
      LabOrderAPI.update({ otherImmunology: null, id: this.labOrder.id }).then(
        () => {
          this.labOrder.otherImmunology = null;
          this.checkAndDeleteLabOrder();
        }
      );
    },

    // ======================== Other Labs ========================

    showOtherLabsOrder() {
      this.$modal.show(
        OtherLabsOrder,
        {
          modalName: "other-labs-order-modal",
          inputEnabled: Object.keys(this.labOrder.otherLab).length === 0,
          saveOtherLabs: this.saveOtherLabs,
          otherLabsOrder: { ...this.labOrder.otherLab },
        },
        {
          name: "other-labs-order-modal",
          height: "auto",
          width: 400,
          scrollable: true,
        }
      );
    },

    showOtherLabsFiller() {
      this.setOtherLabsFilter(this.labOrder.otherLab);

      this.$modal.show(
        OtherLabsCreate,
        {
          modalName: "other-labs-result-modal",
          inputEnabled: undefined,
          otherLabsResult: undefined,
          orderedById: this.labOrder.orderedById,
          editCallBack: this.updateLabOrderOtherLabs,
        },
        {
          name: "other-labs-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveOtherLabs(ol) {
      if (Object.keys(ol).length !== 0) {
        this.labOrder.otherLab = ol;
      }
    },

    updateLabOrderOtherLabs() {
      LabOrderAPI.update({ otherLab: null, id: this.labOrder.id }).then(() => {
        this.labOrder.otherLab = null;
        this.checkAndDeleteLabOrder();
      });
    },

    // ======================== Parasitology ========================

    showParasitologyOrder() {
      this.$modal.show(
        ParasitologyOrder,
        {
          modalName: "parasitology-order-modal",
          inputEnabled: Object.keys(this.labOrder.parasitology).length === 0,
          parasitologyOrder: { ...this.labOrder.parasitology },
          saveParasitology: this.saveParasitology,
        },
        {
          name: "parasitology-order-modal",
          height: "auto",
          width: 600,
          scrollable: true,
        }
      );
    },

    showParasitologyFiller() {
      this.setParasitologyFilter(this.labOrder.parasitology);

      this.$modal.show(
        ParasitologyCreate,
        {
          modalName: "parasitology-result-modal",
          inputEnabled: undefined,
          parasitologyResult: undefined,
          orderedById: this.labOrder.orderedById,
          editCallBack: this.updateLabOrderParasitology,
        },
        {
          name: "parasitology-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveParasitology(ol) {
      if (Object.keys(ol).length !== 0) {
        this.labOrder.parasitology = ol;
      }
    },

    updateLabOrderParasitology() {
      LabOrderAPI.update({ parasitology: null, id: this.labOrder.id }).then(
        () => {
          this.labOrder.parasitology = null;
          this.checkAndDeleteLabOrder();
        }
      );
    },

    // ======================== Radiology ========================

    showRadiologyOrder() {
      this.$modal.show(
        RadiologyOrder,
        {
          modalName: "radiology-order-modal",
          inputEnabled: Object.keys(this.labOrder.radiology).length === 0,
          radiologyOrder: { ...this.labOrder.radiology },
          orderedById: this.labOrder.orderedById,
          saveRadiology: this.saveRadiology,
        },
        {
          name: "radiology-order-modal",
          height: "auto",
          width: 600,
          scrollable: true,
        }
      );
    },

    showRadiologyFiller() {
      this.setRadiologyFilter(this.labOrder.radiology);

      this.$modal.show(
        RadiologyCreate,
        {
          modalName: "radiology-result-modal",
          inputEnabled: undefined,
          radiologyResult: undefined,
          orderedById: this.labOrder.orderedById,
          editCallBack: this.updateLabOrderRadiology,
        },
        {
          name: "radiology-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveRadiology(ol) {
      if (Object.keys(ol).length !== 0) {
        this.labOrder.radiology = ol;
      }
    },

    updateLabOrderRadiology() {
      LabOrderAPI.update({ radiology: null, id: this.labOrder.id }).then(() => {
        this.labOrder.radiology = null;
        this.checkAndDeleteLabOrder();
      });
    },

    // ======================== Serum Chemistry ========================

    showSerumChemistryOrder() {
      this.$modal.show(
        SerumChemistryOrder,
        {
          modalName: "serum-chemistry-order-modal",
          inputEnabled: Object.keys(this.labOrder.serumChemistry).length === 0,
          serumChemistryOrder: { ...this.labOrder.serumChemistry },
          saveSerumChemistry: this.saveSerumChemistry,
        },
        {
          name: "serum-chemistry-order-modal",
          height: "auto",
          width: 1000,
          scrollable: true,
        }
      );
    },

    showSerumChemistryFiller() {
      this.setSerumChemistryFilter(this.labOrder.serumChemistry);

      this.$modal.show(
        SerumChemistryCreate,
        {
          modalName: "serum-chemistry-result-modal",
          inputEnabled: undefined,
          serumChemistryResult: undefined,
          orderedById: this.labOrder.orderedById,
          editCallBack: this.updateLabOrderSerumChemisty,
        },
        {
          name: "serum-chemistry-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveSerumChemistry(ol) {
      if (Object.keys(ol).length !== 0) {
        this.labOrder.serumChemistry = ol;
      }
    },

    updateLabOrderSerumChemisty() {
      LabOrderAPI.update({ serumChemistry: null, id: this.labOrder.id }).then(
        () => {
          this.labOrder.serumChemistry = null;
          this.checkAndDeleteLabOrder();
        }
      );
    },

    // ======================== Urinalysis ========================

    showUrinalysisOrder() {
      this.$modal.show(
        UrinalysisOrder,
        {
          modalName: "urinalysis-order-modal",
          inputEnabled: Object.keys(this.labOrder.urinalysis).length === 0,
          urinalysisOrder: { ...this.labOrder.urinalysis },
          saveUrinalysis: this.saveUrinalysis,
        },
        {
          name: "urinalysis-order-modal",
          height: "auto",
          width: 600,
          scrollable: true,
        }
      );
    },

    showUrinalysisFiller() {
      this.setUrinalysisFilter(this.labOrder.urinalysis);

      this.$modal.show(
        UrinalysisCreate,
        {
          modalName: "urinalysis-result-modal",
          inputEnabled: undefined,
          uResult: undefined,
          orderedById: this.labOrder.orderedById,
          editCallBack: this.updateLabOrderUrinalysis,
        },
        {
          name: "urinalysis-result-modal",
          height: "auto",
          width: 1200,
          scrollable: true,
        }
      );
    },

    saveUrinalysis(ol) {
      if (Object.keys(ol).length !== 0) {
        this.labOrder.urinalysis = ol;
      }
    },

    updateLabOrderUrinalysis() {
      LabOrderAPI.update({ urinalysis: null, id: this.labOrder.id }).then(
        () => {
          this.labOrder.urinalysis = null;
          this.checkAndDeleteLabOrder();
        }
      );
    },

    closeDialog() {
      this.$modal.hide(this.modalName);
      // this.uResult = null;
    },
    saveLabOrder(labOrder) {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          for (let key in labOrder) {
            if (
              labOrder[key] === "" ||
              labOrder[key] === null ||
              Object.keys(labOrder[key]).length === 0
            )
              delete labOrder[key];
          }

          if (Object.keys(labOrder).length > 1) {
            // labOrder.orderedById = AccountService.getProfile().id;
            labOrder.orderingDate = Date();
            labOrder.patientId = PatientService.getPatientId();
            labOrder.orderedById = AccountService.getProfile().id;

            LabOrderAPI.create(labOrder).then((res) => {
              this.addLabOrder(res);
              eventBus.$emit("openSb", {
                message: "Laboratory Order successfully created!",
                color: "primary",
              });
              this.$modal.hide(this.modalName);
            });
          } else {
            this.invalidInput = "Please fill in some inputs!";
            this.resetAllLabOrders();
          }
        }
      });
    },

    checkAndDeleteLabOrder() {
      if (
        (this.labOrder.haematology == null ||
          Object.keys(this.labOrder.haematology).length === 0) &&
        (this.labOrder.immunology == null ||
          Object.keys(this.labOrder.immunology).length === 0) &&
        (this.labOrder.microBiology == null ||
          Object.keys(this.labOrder.microBiology).length === 0) &&
        (this.labOrder.otherImmunology == null ||
          Object.keys(this.labOrder.otherImmunology).length === 0) &&
        (this.labOrder.otherLab == null ||
          Object.keys(this.labOrder.otherLab).length === 0) &&
        (this.labOrder.parasitology == null ||
          Object.keys(this.labOrder.parasitology).length === 0) &&
        (this.labOrder.radiology == null ||
          Object.keys(this.labOrder.radiology).length === 0) &&
        (this.labOrder.serumChemistry == null ||
          Object.keys(this.labOrder.serumChemistry).length === 0) &&
        (this.labOrder.urinalysis == null ||
          Object.keys(this.labOrder.urinalysis).length === 0)
      ) {
        LabOrderAPI.remove(this.labOrder.id).then(() => {
          this.fetchData("replace");
        });
      }
    },
    resetAllLabOrders() {
      this.labOrder.haematology = {};
      this.labOrder.immunology = {};
      this.labOrder.microBiology = {};
      this.labOrder.otherImmunology = {};
      this.labOrder.otherLab = {};
      this.labOrder.parasitology = {};
      this.labOrder.radiology = {};
      this.labOrder.serumChemistry = {};
      this.labOrder.urinalysis = {};
    },
    ...mapMutations([
      "addLabOrder",
      "setHaematoFilter",
      "setImmunoFilter",
      "setMicroBiologyFilter",
      "setOtherImmunologyFilter",
      "setOtherLabsFilter",
      "setParasitologyFilter",
      "setRadiologyFilter",
      "setSerumChemistryFilter",
      "setUrinalysisFilter",
    ]),
  },
  mounted() {
    if (AccountService.getProfile())
      this.authenticatedUserRole = AccountService.getProfile().role;
  },
};
</script>

<style scoped>
.container {
  padding: 0px !important;
}

.full-btn {
  width: available !important;
}

.setSelected {
  background-color: lightsteelblue;
}

.v-btn:before {
  width: 320% !important;
}

.v-alert {
  padding: 0px !important;
  margin: 0px !important;
}
</style>
