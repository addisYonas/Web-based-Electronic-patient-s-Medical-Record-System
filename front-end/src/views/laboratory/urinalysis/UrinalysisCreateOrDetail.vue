<template>
  <v-card>
    <v-toolbar height="40" flat color="white" dense>
      <span class="subheading" v-if="inputEnabled">Create Urinalysis</span>
      <span class="subheading" v-else>Urinalysis Results</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs6>
            <p class="mb-0 font-weight-bold pl-2">Urinalysis</p>

            <template v-if="uResult.ur1 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span>Specific Gravity</span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    autofocus
                    :disabled="!inputEnabled"
                    required
                    v-model="uResult.ur1"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="text-xs-left">
                  <span>g/L</span>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur2 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span>Protein</span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur2"
                    :disabled="!inputEnabled"
                    :items="['Negative', '+', '++', '+++', '++++', 'Trace']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur3 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> pH </span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="uResult.ur3"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur4 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> Ketones </span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur4"
                    :disabled="!inputEnabled"
                    :items="['Negative', 'Trace', 'Small', 'Moderate', 'Large']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur5 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span>Nitrite</span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur5"
                    :disabled="!inputEnabled"
                    :items="['Negative', 'Trace', 'Positive']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur6 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> Blood </span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur6"
                    :disabled="!inputEnabled"
                    :items="['Negative', '+', '++', '+++', '++++', 'Trace']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur7 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> Leukocytes </span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur7"
                    :disabled="!inputEnabled"
                    :items="['Negative', '+', '++', '+++', '++++', 'Trace']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur8 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> Albumin </span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur8"
                    :disabled="!inputEnabled"
                    :items="['Negative', '+', '++', '+++', '++++', 'Trace']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>

          <v-flex xs6>
            <p class="mb-0 font-weight-bold pl-2">LFT - Liver Function</p>

            <template v-if="uResult.ur9 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span>Glucose (Glu)</span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur9"
                    :disabled="!inputEnabled"
                    :items="['Negative', '+', '++', '+++', '++++', 'Trace']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur10 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span>Glucose (Glu) (mg/dL)</span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="uResult.ur10"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="text-xs-left">
                  <span>Mg/dL</span>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur11 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> Bilrubin </span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur11"
                    :disabled="!inputEnabled"
                    :items="['Negative', '+', '++', '+++', '++++', 'Trace']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur12 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> Urobiliongen </span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur12"
                    :disabled="!inputEnabled"
                    :items="['Negative', '+', '++', '+++', '++++', 'Trace']"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur13 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span>Urobiliongen (mcmol)</span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-select
                    name="protein"
                    v-model="uResult.ur13"
                    :disabled="!inputEnabled"
                    :items="[
                      'Negative',
                      'Trace',
                      '16mcmol/L',
                      '33mcmol/L',
                      '66mcmol/L',
                      '131mcmol/L',
                    ]"
                    outline
                  ></v-select>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur14 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> Urine alcohol</span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="uResult.ur14"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 class="text-xs-left">
                  <span>U/L</span>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="uResult.ur15 !== undefined">
              <v-layout row small>
                <v-flex xs6 class="text-xs-right">
                  <span> Microscopic </span>
                </v-flex>
                <v-flex xs4 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="uResult.ur15"
                  ></v-text-field>
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
        v-if="inputEnabled"
        @click="saveScResult(uResult)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { UrinalysisAPI } from "@/api";
import { mapGetters, mapMutations } from "vuex";
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
    uResult: {
      type: Object,
      default: () => {
        return {
          ur1: "",
          ur2: "",
          ur3: "",
          ur4: "",
          ur5: "",
          ur6: "",
          ur7: "",
          ur8: "",
          ur9: "",
          ur10: "",
          ur11: "",
          ur12: "",
          ur13: "",
          ur14: "",
          ur15: "",
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
      dropz: ["Negative", "+", "++", "+++", "++++", "Trace"],
    };
  },
  methods: {
    dropDowns() {
      return ["Negative", "+", "++", "+++", "++++", "Trace"];
    },
    closeDialog() {
      this.$modal.hide(this.modalName);
    },
    saveScResult(uResult) {
      uResult.filledById = AccountService.getProfile().id;
      uResult.orderedById = this.orderedById;
      uResult.status = "Active";
      uResult.patientId = PatientService.getPatientId();

      UrinalysisAPI.create(uResult).then((res) => {
        this.addUrinalysis(res);
        eventBus.$emit("openSb", {
          message: "Urinalysis result successfully created!",
          color: "primary",
        });
        if (Object.keys(this.urinalysisFilter).length !== 0) {
          this.editCallBack();
        }
        this.$modal.hide(this.modalName);
      });
    },
    ...mapMutations(["addUrinalysis"]),
  },
  computed: mapGetters(["urinalysisFilter"]),
  created() {
    if (Object.keys(this.urinalysisFilter).length !== 0) {
      for (let key in this.uResult) {
        if (!this.urinalysisFilter.hasOwnProperty(key)) {
          delete this.uResult[key];
        }
      }
      console.log(this.uResult);
    } else {
      console.log("[[]]");
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

.v-text-field .v-input__append-inner {
  margin-top: 0px !important;
}

.v-select.v-text-field--enclosed:not(.v-text-field--single-line)
  .v-select__selections {
  padding-top: 0px !important;
  padding-left: 2px;
  max-height: 32px !important;
}
</style>
