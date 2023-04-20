<template>
  <v-card>
    <v-toolbar height="40" flat color="white" dense>
      <span class="subheading">Create MicroBiology</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-layout wrap>
              <v-flex xs6>
                <template v-if="mbResult.mb1 !== undefined">
                  <v-layout wrap>
                    <p class="mb-0 font-weight-bold">Sputum Smear For AFB</p>
                    <v-flex xs12>
                      <v-radio-group v-model="mbResult.mb1">
                        <v-layout row wrap>
                          <v-flex xs6>
                            <v-radio
                              label="Positive For TB"
                              value="M"
                            ></v-radio>
                          </v-flex>
                          <v-flex xs6>
                            <v-radio
                              label="Negative For TB"
                              value="F"
                            ></v-radio>
                          </v-flex>
                        </v-layout>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </template>

                <template v-if="mbResult.mb2 !== undefined">
                  <v-layout wrap>
                    <p class="mb-0 font-weight-bold">Sputum Culture For TB</p>
                    <v-flex xs12>
                      <v-radio-group v-model="mbResult.mb2">
                        <v-layout row wrap>
                          <v-flex xs6>
                            <v-radio label="Positive" value="M"></v-radio>
                          </v-flex>
                          <v-flex xs6>
                            <v-radio label="Negative" value="F"></v-radio>
                          </v-flex>
                        </v-layout>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </template>
              </v-flex>

              <v-flex xs6>
                <v-layout wrap>
                  <template v-if="mbResult.mb3 !== undefined">
                    <v-flex xs6>
                      <v-layout wrap>
                        <v-flex xs5>
                          <p class="mb-0 font-weight-bold">Gram Stain</p>
                        </v-flex>
                        <v-flex xs7>
                          <v-radio-group v-model="mbResult.mb3">
                            <v-layout row wrap>
                              <v-flex xs12>
                                <v-radio label="Gram +ve" value="M"></v-radio>
                              </v-flex>
                              <v-flex xs12>
                                <v-radio label="Gram -ve" value="F"></v-radio>
                              </v-flex>
                              <v-flex x12>
                                <v-radio label="Gram Var" value="G"></v-radio>
                              </v-flex>
                              <v-flex x12>
                                <v-radio
                                  label="Gram Indeter"
                                  value="K"
                                ></v-radio>
                              </v-flex>
                            </v-layout>
                          </v-radio-group>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </template>

                  <template v-if="mbResult.mb4 !== undefined">
                    <v-flex xs6>
                      <v-layout wrap>
                        <p class="mb-0 font-weight-bold">Notes</p>

                        <v-flex xs12>
                          <v-text-field
                            name="oldPassword"
                            class="font-weight-bold"
                            :disabled="!inputEnabled"
                            outline
                            v-model="mbResult.mb4"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </template>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12>
                <p class="mb-0 font-weight-bold">TBH Drug Sensitivities</p>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <template v-if="mbResult.mb5 !== undefined">
                <v-flex xs2>
                  <p class="mb-1 font-weight-bold">INH</p>

                  <v-radio-group v-model="mbResult.mb5">
                    <v-layout row wrap>
                      <v-radio label="Susceptible" value="M"></v-radio>
                      <v-radio label="Intermediate" value="F"></v-radio>
                      <v-radio label="Resistant" value="G"></v-radio>
                      <v-radio label="Not done" value="H"></v-radio>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </template>

              <template v-if="mbResult.mb6 !== undefined">
                <v-flex xs2>
                  <p class="mb-1 font-weight-bold">RIF</p>

                  <v-radio-group v-model="mbResult.mb6">
                    <v-layout row wrap>
                      <v-radio label="Susceptible" value="M"></v-radio>
                      <v-radio label="Intermediate" value="F"></v-radio>
                      <v-radio label="Resistant" value="G"></v-radio>
                      <v-radio label="Not done" value="H"></v-radio>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </template>

              <template v-if="mbResult.mb7 !== undefined">
                <v-flex xs2>
                  <p class="mb-1 font-weight-bold">ETH</p>

                  <v-radio-group v-model="mbResult.mb7">
                    <v-layout row wrap>
                      <v-radio label="Susceptible" value="M"></v-radio>
                      <v-radio label="Intermediate" value="F"></v-radio>
                      <v-radio label="Resistant" value="G"></v-radio>
                      <v-radio label="Not done" value="H"></v-radio>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </template>

              <template v-if="mbResult.mb8 !== undefined">
                <v-flex xs2>
                  <p class="mb-1 font-weight-bold">PZ</p>

                  <v-radio-group v-model="mbResult.mb8">
                    <v-layout row wrap>
                      <v-radio label="Susceptible" value="M"></v-radio>
                      <v-radio label="Intermediate" value="F"></v-radio>
                      <v-radio label="Resistant" value="G"></v-radio>
                      <v-radio label="Not done" value="H"></v-radio>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </template>

              <template v-if="mbResult.mb9 !== undefined">
                <v-flex xs2>
                  <p class="mb-1 font-weight-bold">Strep</p>

                  <v-radio-group v-model="mbResult.mb9">
                    <v-layout row wrap>
                      <v-radio label="Susceptible" value="M"></v-radio>
                      <v-radio label="Intermediate" value="F"></v-radio>
                      <v-radio label="Resistant" value="G"></v-radio>
                      <v-radio label="Not done" value="H"></v-radio>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </template>
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
        @click="saveMbResult(mbResult)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { MicroBiologyAPI } from "@/api";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { eventBus } from "../../../main";

export default {
  name: "MicroBiologyResult",
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
    mbResult: {
      type: Object,
      default: () => {
        return {
          mb1: "",
          mb2: "",
          mb3: "",
          mb4: "",
          mb5: "",
          mb6: "",
          mb7: "",
          mb8: "",
          mb9: "",
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
    saveMbResult(mbRes) {
      mbRes.filledById = AccountService.getProfile().id;
      mbRes.orderedById = this.orderedById;
      mbRes.status = "Active";
      mbRes.patientId = PatientService.getPatientId();

      MicroBiologyAPI.create(mbRes).then((res) => {
        this.addMicroBiology(res);
        eventBus.$emit("openSb", {
          message: "Micro Biology result successfully created!",
          color: "primary",
        });
        if (Object.keys(this.microBiologyFilter).length !== 0) {
          this.editCallBack();
        }
        this.$modal.hide(this.modalName);
      });
    },
    ...mapMutations(["addMicroBiology"]),
  },
  computed: mapGetters(["microBiologyFilter"]),
  created() {
    if (Object.keys(this.microBiologyFilter).length !== 0) {
      for (let key in this.mbResult) {
        if (!this.microBiologyFilter.hasOwnProperty(key)) {
          delete this.mbResult[key];
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
.v-input {
  margin: 0px !important;
}
.v-input--radio-group--column .v-input--radio-group__input {
  max-height: 40px !important;
}
.v-input--selection-controls .v-input__control {
  width: 90% !important;
}
.v-radio {
  margin-right: 0px !important;
}
.v-input[data-v-7d9f2809] {
  height: 100px !important;
}
.v-messages {
  min-height: 0px !important;
}
</style>
