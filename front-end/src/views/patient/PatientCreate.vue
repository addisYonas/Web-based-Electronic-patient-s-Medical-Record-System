<template>
  <v-card width="500" flat>
    <v-toolbar height="40" width="400" flat color="primary">
      <span class="subheading test">{{ componentTitle }}</span>
    </v-toolbar>

    <v-card-text>
      <form-error-messages :messages="errorMessages" />
      <v-container grid-list-md class="my-4">
        <v-layout wrap class="px-3" v-if="!patKey">
          <v-flex xs12>
            <v-text-field
              v-validate="'required|alpha_spaces'"
              :error-messages="errors.collect('fullName')"
              name="fullName"
              autofocus
              v-model="patient.info.fullName"
              label="Name of the patient"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-validate="'required|numeric|between:0,120'"
              type="number"
              :error-messages="errors.collect('age')"
              name="age"
              v-model="patient.age"
              label="Age"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-radio-group
              v-model="patient.sex"
              v-validate="'required'"
              :error-messages="errors.collect('sex')"
              name="sex"
              required
            >
              <v-layout row wrap>
                <v-flex xs6>
                  <v-radio label="Male" value="M" color="primary"></v-radio>
                </v-flex>
                <v-flex xs6>
                  <v-radio label="Female" value="F" color="primary"></v-radio>
                </v-flex>
              </v-layout>
            </v-radio-group>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-validate="'alpha_spaces'"
              :error-messages="errors.collect('address')"
              name="address"
              v-model="patient.info.address"
              label="Address"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-validate="'email'"
              :error-messages="errors.collect('email')"
              name="email"
              v-model="patient.info.email"
              label="Email"
              type="email"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              name="phone"
              v-model="patient.info.phone"
              label="Phone"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="px-3 pl-3 mb-2" v-else>
          <v-flex xs10 class="pl-3  mb-2">
            <label class="font-weight-bold body-1">Full name &nbsp;</label>
            <label class="body-1">{{ patient.info.fullName }}</label>
          </v-flex>
          <v-flex xs10 class="pl-3  mb-2">
            <label class="font-weight-bold body-1">Address &nbsp;</label>
            <label class="body-1">{{ patient.info.address }}</label>
          </v-flex>
          <v-flex xs12 class="pl-3  mb-2">
            <label class="font-weight-bold body-1">Email &nbsp;</label>
            <label class="body-1">{{ patient.info.email }}</label>
          </v-flex>
          <v-flex xs12 class="pl-3  mb-2">
            <label class="font-weight-bold body-1">Phone &nbsp;</label>
            <label class="body-1">{{ patient.info.phone }}</label>
          </v-flex>
          <v-flex xs12 class="pl-3  mb-2">
            <label class="font-weight-bold body-1">Gender &nbsp;</label>
            <label class="body-1">{{ patient.sex }}</label>
          </v-flex>
          <v-flex xs12 class="pl-3  mb-2">
            <label class="font-weight-bold body-1">Age &nbsp;</label>
            <label class="body-1">{{ patient.age }}</label>
          </v-flex>
          <v-flex xs12 class="pl-3  mb-2">
            <label class="font-weight-bold body-1">Key &nbsp;</label>
            <label class="body-1">{{ patient.key }}</label>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider />
    <v-toolbar height="40" flat color="white">
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" flat @click="savePatient(patient)">{{
        this.patKey ? "Print" : "Save"
      }}</v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { PatientAPI } from "@/api";
import { PatientService } from "@/services";
import { eventBus } from "../../main";
import jsPDF from "jspdf";

export default {
  name: "NewPatient",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    patient: {
      type: Object,
      default: () => {
        return {
          id: null,
          info: {
            fullName: "",
            address: "",
            email: "",
            phone: "",
          },
          age: 18,
          sex: "",
        };
      },
    },
    pullData: {
      type: Function,
    },
  },
  data() {
    return {
      dialog: false,
      errorMessages: null,
      showPassword: false,
      patKey: null,
      roles: [],
    };
  },
  methods: {
    closeDialog() {
      this.$modal.hide(this.modalName);
    },
    savePatient(patient) {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.errorMessages = null;
          if (patient.id) {
            this.updatePatient(patient);
          } else {
            this.createPatient(patient);
          }
        }
      });
    },

    createPatient(patient) {
      if (!this.patKey) {
        //save case
        PatientAPI.create(patient).then((res) => {
          // this.pullData();
          this.patient.key = res.key;
          eventBus.$emit("openSb", {
            message: "Patient Successfully Created!",
            color: "primary",
          });
          this.patKey = true;
        });
      } else {
        //Print case
        this.doPrint();
        this.$modal.hide(this.modalName);
      }
    },

    updatePatient(patient) {
      patient.age = parseInt(patient.age);
      patient.key = PatientService.getPatientKey();

      PatientAPI.update(patient).then((_) => {
        PatientService.getInfo(patient.key).then((_) => {
          this.$modal.hide(this.modalName);
        });
      });
    },
    doPrint() {
      let pdfName = "patientPdf";
      var doc = new jsPDF();
      let appendedString =
        "Full Name: " +
        this.patient.info.fullName +
        "\n" +
        "Address: " +
        this.patient.info.address +
        "\n" +
        "Phone: " +
        this.patient.info.phone +
        "\n" +
        "Email: " +
        this.patient.info.email +
        "\n" +
        "Age: " +
        this.patient.age +
        "\n" +
        "Sex: " +
        this.patient.sex +
        "\n" +
        "Key: " +
        this.patient.key;
      doc.text(appendedString, 10, 10);
      doc.save(pdfName + ".pdf");
    },
  },

  computed: {
    componentTitle() {
      if (!this.patient.id) return "Create a patient";
      else return "Edit a patient";
    },
  },
};
</script>

<style scoped>
.v-card__text {
  padding: 0px !important;
}
.container {
  padding: 0px 30px !important;
}
.container.grid-list-md .layout .flex {
  padding: 0px !important;
}
.v-toolbar__content {
  height: 45px !important;
}
.v-card__actions {
  padding: 2px !important;
}
.v-text-field {
  padding-top: 0px !important;
  margin-top: 0px !important;
}
.test {
  color: rgb(255, 255, 255);
}
</style>
