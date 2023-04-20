<template>
  <v-card>
    <v-toolbar height="40" flat color="white" dense>
      <span class="subheading" v-if="inputEnabled">Create Other Lab </span>
      <span class="subheading" v-else>Other Lab Results Results</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs11>
            <p class="mb-0 font-weight-bold pl-2">Other Lab</p>

            <template v-if="otherLabResult.testName !== undefined">
              <v-layout row small>
                <v-flex xs2 class="text-xs-right">
                  <span>Test Name</span>
                </v-flex>
                <v-flex xs8 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    autofocus
                    :disabled="!inputEnabled"
                    required
                    v-model="otherLabResult.testName"
                    outline
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherLabResult.labResult !== undefined">
              <v-layout row small>
                <v-flex xs2 class="text-xs-right">
                  <span>Lab Result</span>
                </v-flex>
                <v-flex xs8 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="otherLabResult.labResult"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherLabResult.unit !== undefined">
              <v-layout row small>
                <v-flex xs2 class="text-xs-right">
                  <span>Unit </span>
                </v-flex>
                <v-flex xs8 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="otherLabResult.unit"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-if="otherLabResult.note !== undefined">
              <v-layout row small>
                <v-flex xs2 class="text-xs-right">
                  <span>Note </span>
                </v-flex>
                <v-flex xs8 class="text-xs-right pr-2">
                  <v-text-field
                    name="oldPassword"
                    class="font-weight-bold"
                    :disabled="!inputEnabled"
                    required
                    outline
                    v-model="otherLabResult.note"
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
        @click="saveOtherLabResult(otherLabResult)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { OtherLabAPI } from "@/api";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { eventBus } from "../../../main";

export default {
  name: "OtherLabResult",
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
    otherLabResult: {
      type: Object,
      default: () => {
        return {
          testName: "",
          labResult: "",
          unit: "",
          note: "",
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
    saveOtherLabResult(otherLabResult) {
      otherLabResult.filledById = AccountService.getProfile().id;
      otherLabResult.orderedById = this.orderedById;
      otherLabResult.status = "Active";
      otherLabResult.patientId = PatientService.getPatientId();

      OtherLabAPI.create(otherLabResult).then((res) => {
        this.addOtherLab(res);
        eventBus.$emit("openSb", {
          message: "Other Lab result successfully created!",
          color: "primary",
        });
        if (Object.keys(this.otherLabsFilter).length !== 0) {
          this.editCallBack();
        }
        this.$modal.hide(this.modalName);
      });
    },
    ...mapMutations(["addOtherLab"]),
  },
  computed: mapGetters(["otherLabsFilter"]),
  created() {
    if (Object.keys(this.otherLabsFilter).length !== 0) {
      for (let key in this.otherLabResult) {
        if (!this.otherLabsFilter.hasOwnProperty(key)) {
          delete this.otherLabResult[key];
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
