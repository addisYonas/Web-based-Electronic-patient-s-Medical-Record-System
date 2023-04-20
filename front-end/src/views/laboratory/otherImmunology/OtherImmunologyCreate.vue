<template>
  <v-card>
    <v-toolbar height="40" flat color="white" dense>
      <span class="subheading">Create Other Immunology</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs4>
            <p class="mb-0 font-weight-bold">Other</p>

            <template v-if="otherImmunologyResult.oi1 !== undefined">
              <v-layout row wrap>
                <v-flex xs6 class="text-xs-left">
                  <span>HIV Viral Load</span>
                </v-flex>
                <v-flex xs3 class="text-xs-right pr-2">
                  <v-text-field
                    v-validate="'required'"
                    :error-messages="errors.collect('oldPassword')"
                    name="oldPassword"
                    class="font-weight-bold"
                    required
                    v-model="otherImmunologyResult.oi1"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3 class="text-xs-left mb-2">
                  <span>g/m3</span>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherImmunologyResult.oi2 !== undefined">
              <p class="mb-0 font-weight-bold">HIV Resistance</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi2"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherImmunologyResult.oi3 !== undefined">
              <p class="mb-0 font-weight-bold">HIV DNA PCR - Roche</p>
              <v-layout row small>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi3"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherImmunologyResult.oi4 !== undefined">
              <p class="mb-0 font-weight-bold">HIV TNA Real Time PCR</p>
              <v-layout row small>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi4"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherImmunologyResult.oi5 !== undefined">
              <p class="mb-0 font-weight-bold">HIV RNA PCR</p>
              <v-layout row small>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi5"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherImmunologyResult.oi6 !== undefined">
              <p class="mb-0 font-weight-bold">HIV p24 Antigen</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi6"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>

          <v-flex xs4>
            <template v-if="otherImmunologyResult.oi7 !== undefined">
              <p class="mb-0 font-weight-bold">HPylori</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi7"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherImmunologyResult.oi8 !== undefined">
              <p class="mb-0 font-weight-bold">Widal O</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi8"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherImmunologyResult.oi9 !== undefined">
              <p class="mb-0 font-weight-bold">Widal H</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi9"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherImmunologyResult.oi10 !== undefined">
              <p class="mb-0 font-weight-bold">Weil-Felix</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="otherImmunologyResult.oi10"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs4>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                      <v-flex xs4 wrap>
                        <v-radio label="Indeterminate" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>

          <v-flex xs4>
            <v-layout row small wrap>
              <v-flex xs12 mt-4>
                <v-layout row wrap>
                  <template v-if="otherImmunologyResult.oi11 !== undefined">
                    <v-flex xs6 class="text-xs-left">
                      <span>Blood Group</span>
                    </v-flex>
                    <v-flex xs6 class="text-xs-right pr-2">
                      <v-text-field
                        v-validate="'required'"
                        :error-messages="errors.collect('oldPassword')"
                        name="oldPassword"
                        class="font-weight-bold"
                        required
                        v-model="otherImmunologyResult.oi11"
                      ></v-text-field>
                    </v-flex>
                  </template>

                  <template v-if="otherImmunologyResult.oi12 !== undefined">
                    <v-flex xs6 class="text-xs-left">
                      <span>Cross Match</span>
                    </v-flex>
                    <v-flex xs6 class="text-xs-right pr-2">
                      <v-text-field
                        v-validate="'required'"
                        :error-messages="errors.collect('oldPassword')"
                        name="oldPassword"
                        class="font-weight-bold"
                        required
                        v-model="otherImmunologyResult.oi12"
                      ></v-text-field>
                    </v-flex>
                  </template>

                  <template v-if="otherImmunologyResult.oi13 !== undefined">
                    <v-flex xs6 class="text-xs-left">
                      <span>Peripheral blood Morphology</span>
                    </v-flex>
                    <v-flex xs6 class="text-xs-right pr-2">
                      <v-text-field
                        v-validate="'required'"
                        :error-messages="errors.collect('oldPassword')"
                        name="oldPassword"
                        class="font-weight-bold"
                        required
                        v-model="otherImmunologyResult.oi13"
                      ></v-text-field>
                    </v-flex>
                  </template>

                  <template v-if="otherImmunologyResult.oi14 !== undefined">
                    <v-flex xs6 class="text-xs-left">
                      <span>RH Factor</span>
                    </v-flex>
                    <v-flex xs6 class="text-xs-right pr-2">
                      <v-text-field
                        v-validate="'required'"
                        :error-messages="errors.collect('oldPassword')"
                        name="oldPassword"
                        class="font-weight-bold"
                        required
                        v-model="otherImmunologyResult.oi14"
                      ></v-text-field>
                    </v-flex>
                  </template>
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
        @click="saveOtherImmunologyResult(otherImmunologyResult)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { OtherImmunologyAPI } from "@/api";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { eventBus } from "../../../main";

export default {
  name: "immunologyResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    editCallBack: {
      type: Function,
    },
    orderedById: {
      type: String,
    },
    otherImmunologyResult: {
      type: Object,
      default: () => {
        return {
          oi1: "",
          oi2: "",
          oi3: "",
          oi4: "",
          oi5: "",
          oi6: "",
          oi7: "",
          oi8: "",
          oi9: "",
          oi10: "",
          oi11: "",
          oi12: "",
          oi13: "",
          oi14: "",
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
    saveOtherImmunologyResult(hResult) {
      hResult.filledById = AccountService.getProfile().id;
      hResult.orderedById = this.orderedById;
      hResult.status = "Active";
      hResult.patientId = PatientService.getPatientId();

      OtherImmunologyAPI.create(hResult).then((res) => {
        this.addOtherImmunology(res);
        eventBus.$emit("openSb", {
          message: "Haematology result successfully created!",
          color: "primary",
        });
        if (Object.keys(this.otherImmunologyFilter).length !== 0) {
          this.editCallBack();
        }
        this.$modal.hide(this.modalName);
      });
    },
    ...mapMutations(["addOtherImmunology"]),
  },

  computed: mapGetters(["otherImmunologyFilter"]),

  created() {
    if (Object.keys(this.otherImmunologyFilter).length !== 0) {
      for (let key in this.otherImmunologyResult) {
        if (!this.otherImmunologyFilter.hasOwnProperty(key)) {
          delete this.otherImmunologyResult[key];
        }
      }
    }
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
.v-text-field {
  margin: 0px !important;
  padding: 0px !important;
  height: 20px !important;
}
.v-text-field input {
  padding: 0px !important;
}
</style>
