<template>
  <v-card>
    <v-toolbar height="40" flat color="white" dense>
      <span class="subheading" v-if="inputEnabled">Create Parasitology</span>
      <span class="subheading" v-else>Parasitology Results</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs6>
            <p class="mb-0 font-weight-bold pl-2">Stool Exam</p>

            <template v-if="prResult.pr1 !== undefined">
              <v-layout row small>
                <v-flex xs3 class="text-xs-right">
                  <span>Appearance</span>
                </v-flex>
                <v-flex xs5 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    autofocus
                    :disabled="!inputEnabled"
                    required
                    v-model="prResult.pr1"
                    outline
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="prResult.pr2 !== undefined">
              <v-layout row small>
                <v-flex xs3 class="text-xs-right">
                  <span>Consistency</span>
                </v-flex>
                <v-flex xs5 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="prResult.pr2"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="prResult.pr3 !== undefined">
              <v-layout row small>
                <v-flex xs3 class="text-xs-right">
                  <span>Mucus</span>
                </v-flex>
                <v-flex xs5 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="prResult.pr3"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="prResult.pr4 !== undefined">
              <v-layout row small>
                <v-flex xs3 class="text-xs-right">
                  <span> Gross Blood</span>
                </v-flex>
                <v-flex xs5 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="prResult.pr4"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="prResult.pr5 !== undefined">
              <v-layout wrap class="pt-3">
                <v-flex xs12>
                  <p class="mb-0 font-weight-bold pl-2">Blood Film</p>
                  <v-layout row small>
                    <v-flex xs3 class="text-xs-right">
                      <span>Blood Film</span>
                    </v-flex>
                    <v-flex xs5 class="text-xs-right pr-2">
                      <v-select
                        name="protein"
                        v-model="prResult.pr5"
                        :disabled="!inputEnabled"
                        :items="[
                          'P. Facliparum',
                          'P. Vivax',
                          'NO H/P Seen',
                          'Others',
                        ]"
                        outline
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>

          <v-flex xs6>
            <template v-if="prResult.pr6 !== undefined">
              <p class="mb-0 font-weight-bold pl-2">&nbsp;</p>
              <v-layout row small>
                <v-flex xs4 class="text-xs-right">
                  <span>Pus Cells</span>
                </v-flex>
                <v-flex xs5 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="prResult.pr6"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="prResult.pr7 !== undefined">
              <v-layout row small>
                <v-flex xs4 class="text-xs-right">
                  <span>RBC</span>
                </v-flex>
                <v-flex xs5 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="prResult.pr7"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="prResult.pr8 !== undefined">
              <v-layout row small>
                <v-flex xs4 class="text-xs-right">
                  <span>Ova and Parasite</span>
                </v-flex>
                <v-flex xs5 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="prResult.pr8"
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
        @click="savePrResult(prResult)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { ParasitologyAPI } from "@/api";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { eventBus } from "../../../main";

export default {
  name: "ParasitologyResult",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    editCallBack: {
      type: Function,
    },
    inputEnabled: {
      type: Boolean,
      default: true,
    },
    orderedById: {
      type: String,
    },
    prResult: {
      type: Object,
      default: () => {
        return {
          pr1: "",
          pr2: "",
          pr3: "",
          pr4: "",
          pr5: "",
          pr6: "",
          pr7: "",
          pr8: "",
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
    savePrResult(prResult) {
      prResult.filledById = AccountService.getProfile().id;
      prResult.orderedById = this.orderedById;
      prResult.status = "Active";
      prResult.patientId = PatientService.getPatientId();

      ParasitologyAPI.create(prResult).then((res) => {
        this.addParasitology(res);
        eventBus.$emit("openSb", {
          message: "Parasitology result successfully created!",
          color: "primary",
        });
        if (Object.keys(this.parasitologyFilter).length !== 0) {
          this.editCallBack();
        }
        this.$modal.hide(this.modalName);
      });
    },
    ...mapMutations(["addParasitology"]),
  },
  computed: mapGetters(["parasitologyFilter"]),
  created() {
    if (Object.keys(this.parasitologyFilter).length !== 0) {
      for (let key in this.prResult) {
        if (!this.parasitologyFilter.hasOwnProperty(key)) {
          delete this.prResult[key];
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

.v-select.v-text-field--enclosed:not(.v-text-field--single-line)
  .v-select__selections {
  padding-top: 0px !important;
  margin-left: 4px !important;
}

.v-text-field.v-text-field--enclosed .v-input__append-inner {
  margin-top: 0px !important;
}
</style>
