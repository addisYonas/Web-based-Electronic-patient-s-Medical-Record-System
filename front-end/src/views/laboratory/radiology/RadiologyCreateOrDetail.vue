<template>
  <v-card>
    <v-toolbar height="40" flat color="white" dense>
      <span class="subheading" v-if="inputEnabled">Create Radiology</span>
      <span class="subheading" v-else>Radiology Results</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs6>
            <template v-if="radiologyResult.rd1 !== undefined">
              <v-layout row small>
                <v-flex xs3 class="text-xs-right">
                  <span>Ultrasound</span>
                </v-flex>
                <v-flex xs9 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    autofocus
                    :disabled="!inputEnabled"
                    required
                    v-model="radiologyResult.rd1"
                    outline
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="radiologyResult.rd2 !== undefined">
              <v-layout row small>
                <v-flex xs3 class="text-xs-right">
                  <span>CT Scan</span>
                </v-flex>
                <v-flex xs9 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="radiologyResult.rd2"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>
        </v-layout>

        <v-layout wrap>
          <v-flex xs12>
            <p class="mb-0 font-weight-bold pl-2">CXR Results</p>

            <template v-if="radiologyResult.rd3 !== undefined">
              <v-layout row small>
                <v-flex xs6>
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Date</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        autofocus
                        :disabled="!inputEnabled"
                        required
                        v-model="radiologyResult.rd3"
                        outline
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </template>

            <v-layout row small>
              <v-flex xs6>
                <template v-if="radiologyResult.rd4 !== undefined">
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Normal</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        :disabled="!inputEnabled"
                        required
                        outline
                        v-model="radiologyResult.rd4"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </template>

                <template v-if="radiologyResult.rd5 !== undefined">
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Infiltrate</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        :disabled="!inputEnabled"
                        required
                        outline
                        v-model="radiologyResult.rd5"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </template>

                <template v-if="radiologyResult.rd6 !== undefined">
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Pleural effusion</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        :disabled="!inputEnabled"
                        required
                        outline
                        v-model="radiologyResult.rd6"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </template>

                <template v-if="radiologyResult.rd7 !== undefined">
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Pul. TB</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        :disabled="!inputEnabled"
                        required
                        outline
                        v-model="radiologyResult.rd7"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </template>
              </v-flex>

              <v-flex xs6>
                <template v-if="radiologyResult.rd8 !== undefined">
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Pneumonia</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        :disabled="!inputEnabled"
                        required
                        outline
                        v-model="radiologyResult.rd8"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </template>

                <template v-if="radiologyResult.rd9 !== undefined">
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Military TB</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        :disabled="!inputEnabled"
                        required
                        outline
                        v-model="radiologyResult.rd9"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </template>

                <template v-if="radiologyResult.rd10 !== undefined">
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Mediastinal</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        :disabled="!inputEnabled"
                        required
                        outline
                        v-model="radiologyResult.rd10"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </template>

                <template v-if="radiologyResult.rd11 !== undefined">
                  <v-layout wrap>
                    <v-flex xs3 class="text-xs-right">
                      <span>Other</span>
                    </v-flex>
                    <v-flex xs9 class="text-xs-right pr-2">
                      <v-text-field
                        name="oldPassword"
                        class="font-weight-bold"
                        :disabled="!inputEnabled"
                        required
                        outline
                        v-model="radiologyResult.rd11"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </template>
              </v-flex>
            </v-layout>
          </v-flex>

          <template v-if="radiologyResult.rd12 !== undefined">
            <v-layout wrap class="mt-3">
              <v-flex xs6>
                <v-layout wrap>
                  <v-flex xs3 class="text-xs-right">
                    <span>Other Report</span>
                  </v-flex>
                  <v-flex xs9 class="text-xs-right pr-2">
                    <v-text-field
                      name="oldPassword"
                      class="font-weight-bold"
                      :disabled="!inputEnabled"
                      required
                      outline
                      v-model="radiologyResult.rd12"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </template>
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
        @click="saveHaematologyResult(radiologyResult)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { RadiologyAPI } from "@/api";
import { mapGetters, mapMutations } from "vuex";
import { eventBus } from "../../../main";

export default {
  name: "RadiologyResult",
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
    radiologyResult: {
      type: Object,
      default: () => {
        return {
          rd1: "",
          rd2: "",
          rd3: "",
          rd4: "",
          rd5: "",
          rd6: "",
          rd7: "",
          rd8: "",
          rd9: "",
          rd10: "",
          rd11: "",
          rd12: "",
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
    saveHaematologyResult(rdResult) {
      rdResult.filledById = AccountService.getProfile().id;
      rdResult.orderedById = this.orderedById;
      rdResult.status = "Active";
      rdResult.patientId = PatientService.getPatientId();

      RadiologyAPI.create(rdResult).then((res) => {
        this.addRadiology(res);
        eventBus.$emit("openSb", {
          message: "Radiology result successfully created!",
          color: "primary",
        });
        if (Object.keys(this.radiologyFilter).length !== 0) {
          this.editCallBack();
        }
        this.$modal.hide(this.modalName);
      });
    },
    ...mapMutations(["addRadiology"]),
  },
  computed: mapGetters(["radiologyFilter"]),
  created() {
    if (Object.keys(this.radiologyFilter).length !== 0) {
      for (let key in this.radiologyResult) {
        if (!this.radiologyFilter.hasOwnProperty(key)) {
          delete this.radiologyResult[key];
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
