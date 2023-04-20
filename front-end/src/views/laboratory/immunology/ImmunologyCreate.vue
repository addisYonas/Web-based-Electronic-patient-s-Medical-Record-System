<template>
  <v-card>
    <v-toolbar height="40" flat color="white" dense>
      <span class="subheading">Create Immunology</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs3>
            <template v-if="immunologyResult.im1 !== undefined">
              <p class="mb-0 font-weight-bold">Pregnancy</p>
              <v-layout row small>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im1"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs6>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im2 !== undefined">
              <p class="mb-0 font-weight-bold">RPR</p>
              <v-layout row small>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im2"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs6>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im3 !== undefined">
              <p class="mb-0 font-weight-bold">TPHA</p>
              <v-layout row small>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im3"
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
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im4 !== undefined">
              <p class="mb-0 font-weight-bold">HIV</p>
              <v-layout row small>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im4"
                    :error-messages="errors.collect('pregnancy')"
                    name="pregnancy"
                    required
                  >
                    <v-layout row wrap>
                      <v-flex xs6>
                        <v-radio label="+ve" value="M"></v-radio>
                      </v-flex>
                      <v-flex xs6>
                        <v-radio label="-ve" value="F"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im5 !== undefined">
              <p class="mb-0 font-weight-bold">Determine</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im5"
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
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>

          <v-flex xs3>
            <template v-if="immunologyResult.im6 !== undefined">
              <p class="mb-0 font-weight-bold">Bionor</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im6"
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
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im7 !== undefined">
              <p class="mb-0 font-weight-bold">Oraquick</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im7"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im8 !== undefined">
              <p class="mb-0 font-weight-bold">Genie II</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im8"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im9 !== undefined">
              <p class="mb-0 font-weight-bold">Unigold</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im9"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im10 !== undefined">
              <p class="mb-0 font-weight-bold">Western blot</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im10"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>

          <v-flex xs3>
            <template v-if="immunologyResult.im11 !== undefined">
              <p class="mb-0 font-weight-bold">CMV IGG - Cytomegalovirus IGG</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im11"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im12 !== undefined">
              <p class="mb-0 font-weight-bold">HSV - Herpes Simplex virus II</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im12"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im13 !== undefined">
              <p class="mb-0 font-weight-bold">
                HBsAg - Hepatitis B Surface Antigen
              </p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im13"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im14 !== undefined">
              <p class="mb-0 font-weight-bold">HCV - Hepatic C Virus</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im14"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im15 !== undefined">
              <p class="mb-0 font-weight-bold">Rheumatoid Factor</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im15"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im16 !== undefined">
              <p class="mb-0 font-weight-bold">
                CAT - Card Aggulatination Test
              </p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im16"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>

          <v-flex xs3>
            <template v-if="immunologyResult.im17 !== undefined">
              <p class="mb-0 font-weight-bold">
                ASOT - anti-stereptolysin titer (ASLO)
              </p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im17"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="immunologyResult.im18 !== undefined">
              <p class="mb-0 font-weight-bold">Toxoplasma</p>
              <v-layout row small wrap>
                <v-flex xs12>
                  <v-radio-group
                    v-validate="'required'"
                    v-model="immunologyResult.im18"
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
                      <v-flex xs4>
                        <v-radio label="Indeterm" value="G"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </template>
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
        @click="saveImmunologyResult(immunologyResult)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { ImmunologyAPI } from "@/api";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
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
    immunologyResult: {
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
  data() {
    return {
      //
    };
  },
  methods: {
    closeDialog() {
      this.$modal.hide(this.modalName);
    },
    saveImmunologyResult(hResult) {
      hResult.filledById = AccountService.getProfile().id;
      hResult.orderedById = this.orderedById;
      hResult.status = "Active";
      hResult.patientId = PatientService.getPatientId();

      ImmunologyAPI.create(hResult).then((res) => {
        this.addImmunology(res);
        eventBus.$emit("openSb", {
          message: "Immunology result successfully created!",
          color: "primary",
        });
        if (Object.keys(this.immunoFilter).length !== 0) {
          this.editCallBack();
        }
        this.$modal.hide(this.modalName);
      });
    },
    ...mapMutations(["addImmunology"]),
  },
  computed: mapGetters(["immunoFilter"]),
  created() {
    if (Object.keys(this.immunoFilter).length !== 0) {
      for (let key in this.immunologyResult) {
        if (!this.immunoFilter.hasOwnProperty(key)) {
          delete this.immunologyResult[key];
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
.container.grid-list-md .layout:only-child {
  width: 113% !important;
}
</style>
