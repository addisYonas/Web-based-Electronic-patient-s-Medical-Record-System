<template>
  <v-card>
    <v-toolbar color="white" dense flat height="40">
      <span class="subheading" v-if="inputEnabled">Create Haematology</span>
      <span class="subheading" v-else>Haematology Results</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs4>
            <p class="mb-0 font-weight-bold pl-2">RBC Count</p>

            <v-layout row small v-if="haematologyResult.hm1 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>RBC (Red Blood Cell Count)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  autofocus
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm1"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm2 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Hgb (Haemoglobin)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm2"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm3 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Hct (Haematocrit) </span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm3"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm4 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span> MCV (Mean Cell Volume)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm4"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm5 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>MCH (Mean Cell Hgb)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm5"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm6 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>MCHC (Mean Cell Hgb Concentration)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm6"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm7 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span> PLT (Platelete Count)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm7"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout class="pt-3" wrap>
              <v-flex xs12>
                <p class="mb-0 font-weight-bold pl-2">Other RBC Tests</p>
                <v-layout row small v-if="haematologyResult.hm8 !== undefined">
                  <v-flex class="text-xs-right" xs6>
                    <span>RDW (Red Cell Distribution Width)</span>
                  </v-flex>
                  <v-flex class="text-xs-right pr-2" xs3>
                    <v-text-field
                      :disabled="!inputEnabled"
                      class="font-weight-bold"
                      name="oldPassword"
                      outline
                      required
                      v-model="haematologyResult.hm8"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-left" xs3>
                    <span>g/m3</span>
                  </v-flex>
                </v-layout>

                <v-layout row small v-if="haematologyResult.hm9 !== undefined">
                  <v-flex class="text-xs-right" xs6>
                    <span> Retic (Reticulocyte Cell Count)</span>
                  </v-flex>
                  <v-flex class="text-xs-right pr-2" xs3>
                    <v-text-field
                      :disabled="!inputEnabled"
                      class="font-weight-bold"
                      name="oldPassword"
                      outline
                      required
                      v-model="haematologyResult.hm9"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-left" xs3>
                    <span>g/m3</span>
                  </v-flex>
                </v-layout>

                <v-layout row small v-if="haematologyResult.hm10 !== undefined">
                  <v-flex class="text-xs-right" xs6>
                    <span>ESR (Erythrocyte Sedimentation Rate)</span>
                  </v-flex>
                  <v-flex class="text-xs-right pr-2" xs3>
                    <v-text-field
                      :disabled="!inputEnabled"
                      class="font-weight-bold"
                      name="oldPassword"
                      outline
                      required
                      v-model="haematologyResult.hm10"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-left" xs3>
                    <span>g/m3</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs4>
            <p class="mb-0 font-weight-bold pl-2">WBC(TLS) Differential</p>
            <v-layout row small v-if="haematologyResult.hm11 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>WBC (White Cell Count)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm11"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>
            <v-layout mt-4 row>
              <v-flex xs6> </v-flex>
              <v-flex small xs3>
                <span class="font-weight-bold">Cells/mm3</span>
              </v-flex>
              <v-flex small xs3>
                <span class="font-weight-bold">% Of WBC</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm12 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Unseg. Neutrophils</span>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm12.number"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm12.percent"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm13 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Seg. Neutrophils</span>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm13.number"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm13.percent"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm14 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Neutrophils</span>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm14.number"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm14.percent"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm15 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Lymphs (Lymphocytes)</span>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm15.number"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm15.percent"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm16 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Mono (Monocytes)</span>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm16.number"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm16.percent"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm17 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Eos (Eosinophils)</span>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm17.number"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm17.percent"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm18 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Baso (Basophils)</span>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm18.number"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm18.percent"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm19 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span> MID </span>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm19.number"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm19.percent"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs4>
            <p class="mb-0 font-weight-bold pl-2">Other</p>

            <v-layout row small v-if="haematologyResult.hm20 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>PT (Prothrombin Time) </span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm20"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm21 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>PTT (Partial Thromboplastin Time)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm21"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm22 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>APTT (Act. Partial Thromboplatin Time)</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm22"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm23 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Bleeding Time</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm23"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm24 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Clot Retraction</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm24"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm25 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Coagulation Time</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm25"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout row small v-if="haematologyResult.hm26 !== undefined">
              <v-flex class="text-xs-right" xs6>
                <span>Fibrinogen</span>
              </v-flex>
              <v-flex class="text-xs-right pr-2" xs3>
                <v-text-field
                  :disabled="!inputEnabled"
                  class="font-weight-bold"
                  name="oldPassword"
                  outline
                  required
                  v-model="haematologyResult.hm26"
                ></v-text-field>
              </v-flex>
              <v-flex class="text-xs-left" xs3>
                <span>g/m3</span>
              </v-flex>
            </v-layout>

            <v-layout class="pt-3" wrap>
              <v-flex xs12>
                <p class="mb-0 font-weight-bold pl-2">RBC Count</p>

                <v-layout row small v-if="haematologyResult.hm27 !== undefined">
                  <v-flex class="text-xs-right" xs6>
                    <span>CD4 Absolute Count</span>
                  </v-flex>
                  <v-flex class="text-xs-right pr-1" xs3>
                    <v-text-field
                      :disabled="!inputEnabled"
                      class="font-weight-bold"
                      name="oldPassword"
                      outline
                      required
                      v-model="haematologyResult.hm27"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-left" xs3>
                    <span>g/m3</span>
                  </v-flex>
                </v-layout>

                <v-layout row small v-if="haematologyResult.hm28 !== undefined">
                  <v-flex class="text-xs-right" xs6>
                    <span>CD4 % of Lymphocytes</span>
                  </v-flex>
                  <v-flex class="text-xs-right pr-1" xs3>
                    <v-text-field
                      :disabled="!inputEnabled"
                      class="font-weight-bold"
                      name="oldPassword"
                      outline
                      required
                      v-model="haematologyResult.hm28"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-left" xs3>
                    <span>g/m3</span>
                  </v-flex>
                </v-layout>

                <v-layout row small v-if="haematologyResult.hm29 !== undefined">
                  <v-flex class="text-xs-right" xs6>
                    <span>CD4/CDB</span>
                  </v-flex>
                  <v-flex class="text-xs-right pr-1" xs3>
                    <v-text-field
                      :disabled="!inputEnabled"
                      class="font-weight-bold"
                      name="oldPassword"
                      outline
                      required
                      v-model="haematologyResult.hm29"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-left" xs3>
                    <span>g/m3</span>
                  </v-flex>
                </v-layout>

                <v-layout row small v-if="haematologyResult.hm30 !== undefined">
                  <v-flex class="text-xs-right" xs6>
                    <span>CDB</span>
                  </v-flex>
                  <v-flex class="text-xs-right pr-1" xs3>
                    <v-text-field
                      :disabled="!inputEnabled"
                      class="font-weight-bold"
                      name="oldPassword"
                      outline
                      required
                      v-model="haematologyResult.hm30"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-left" xs3>
                    <span>g/m3</span>
                  </v-flex>
                </v-layout>
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
        @click="saveHaematologyResult(haematologyResult)"
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
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { HaematologyAPI } from "@/api";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { eventBus } from "../../../main";

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
    editCallBack: {
      type: Function,
    },
    orderedById: {
      type: String,
    },
    haematologyResult: {
      type: Object,
      default: () => {
        return {
          hm1: "",
          hm2: "",
          hm3: "",
          hm4: "",
          hm5: "",
          hm6: "",
          hm7: "",
          hm8: "",
          hm9: "",
          hm10: "",
          hm11: "",
          hm12: {
            number: "",
            percent: "",
          },
          hm13: {
            number: "",
            percent: "",
          },
          hm14: {
            number: "",
            percent: "",
          },
          hm15: {
            number: "",
            percent: "",
          },
          hm16: {
            number: "",
            percent: "",
          },
          hm17: {
            number: "",
            percent: "",
          },
          hm18: {
            number: "",
            percent: "",
          },
          hm19: {
            number: "",
            percent: "",
          },
          hm20: "",
          hm21: "",
          hm22: "",
          hm23: "",
          hm24: "",
          hm25: "",
          hm26: "",
          hm27: "",
          hm28: "",
          hm29: "",
          hm30: "",
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
    saveHaematologyResult(hResult) {
      hResult.filledById = AccountService.getProfile().id;
      hResult.orderedById = this.orderedById;
      hResult.status = "Active Status";
      hResult.patientId = PatientService.getPatientId();

      HaematologyAPI.create(hResult).then((res) => {
        this.addHaematology(res);
        eventBus.$emit("openSb", {
          message: "Haematology result successfully created!",
          color: "primary",
        });
        this.$modal.hide(this.modalName);
        if (Object.keys(this.haematoFilter).length !== 0) {
          this.editCallBack();
        }
      });
    },
    ...mapMutations(["addHaematology"]),
  },

  computed: mapGetters(["haematoFilter"]),

  created() {
    if (Object.keys(this.haematoFilter).length !== 0) {
      for (let key in this.haematologyResult) {
        if (!this.haematoFilter.hasOwnProperty(key)) {
          delete this.haematologyResult[key];
        }
      }
    }
  },
};
</script>

<style scoped>
.container {
  padding: 0px !important;
}

.v-text-field {
  margin: 0px !important;
  padding: 0px !important;
  height: 20px !important;
}

.v-text-field--outline input {
  margin: 2px !important;
  font-size: 14px !important;
}

.v-input__slot {
  margin: 0px !important;
  padding: 0px !important;
  height: 20px !important;
  min-height: 26px !important;
}

.title {
  font-family: "Poppins", sans-serif !important;
}
</style>
