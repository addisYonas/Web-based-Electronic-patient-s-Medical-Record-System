<template>
  <v-layout row>
    <v-flex xs0 sm3></v-flex>
    <v-flex xs12 sm6>
      <v-card flat class="text-xs-center ma-3 px-5">
        <v-responsive class="pt-4" v-if="patient.info">
          <v-avatar size="100" class="grey lighten-2">
            <img src="../../assets/account.png" alt="" />
          </v-avatar>
        </v-responsive>

        <div class="title mt-2" v-if="patient.info">
          {{ patient.info.fullName }}
        </div>

        <v-card-text>
          <v-layout row wrap>
            <template v-if="patient.info">
              <v-flex xs6 class="text-xs-right mb-2">
                <label class="font-weight-bold body-1">Full name</label>
              </v-flex>
              <v-flex xs6 class="pl-3 text-xs-left mb-2">
                <label class="body-1">{{ patient.info.fullName }}</label>
              </v-flex>
            </template>

            <template v-if="patient.info">
              <v-flex xs6 class="text-xs-right mb-2">
                <label class="font-weight-bold body-1">Address</label>
              </v-flex>
              <v-flex xs6 class="pl-3 text-xs-left mb-2">
                <label class="body-1">{{ patient.info.address }}</label>
              </v-flex>
            </template>

            <template v-if="patient.info">
              <v-flex xs6 class="text-xs-right mb-2">
                <label class="font-weight-bold body-1">Email</label>
              </v-flex>
              <v-flex xs6 class="pl-3 text-xs-left mb-2">
                <label class="body-1">{{ patient.info.email }}</label>
              </v-flex>
            </template>

            <template v-if="patient.info">
              <v-flex xs6 class="text-xs-right mb-2">
                <label class="font-weight-bold body-1">Phone</label>
              </v-flex>
              <v-flex xs6 class="pl-3 text-xs-left mb-2">
                <label class="body-1">{{ patient.info.phone }}</label>
              </v-flex>
            </template>

            <v-flex xs6 class="text-xs-right mb-2">
              <label class="font-weight-bold body-1">Gender</label>
            </v-flex>
            <v-flex xs6 class="pl-3 text-xs-left mb-2">
              <label class="body-1">{{ patient.sex }}</label>
            </v-flex>

            <v-flex xs6 class="text-xs-right mb-2">
              <label class="font-weight-bold body-1">Age</label>
            </v-flex>
            <v-flex xs6 class="pl-3 text-xs-left mb-2">
              <label class="body-1">{{ patient.age }}</label>
            </v-flex>

            <template v-if="patient.info && authenticatedUserRole === 'Doctor'">
              <v-flex xs12 md12 class="text-xs-center mb-2">
                <v-btn
                  small
                  outline
                  class="font-weight-black mt-5 ml-0 mb-3"
                  color="primary"
                  @click="UpdatePatient(patient)"
                  >Update Patient
                </v-btn>
              </v-flex>
            </template>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs0 sm3></v-flex>
  </v-layout>
</template>

<script>
import { PatientService } from "@/services";
import { AccountService } from "@/services";
import PatientCreate from "@/views/patient/PatientCreate";

export default {
  data() {
    return {
      authenticatedUserRole: "",
      patient: {
        info: {
          fullName: "",
          address: "",
          email: "",
          phone: "",
        },
        age: "",
        sex: "",
      },
    };
  },
  methods: {
    UpdatePatient(patient) {
      this.$modal.show(
        PatientCreate,
        {
          modalName: "patient-create-modal",
          patient: patient,
          pullData: () => {},
        },
        {
          name: "patient-create-modal",
          height: "auto",
          width: 500,
          scrollable: true,
        }
      );
    },
    pullData() {
      this.patient = PatientService.getPatientProfile();
      // console.log(this.patient);
    },
  },
  created() {
    this.pullData();
    if (AccountService.getProfile()) {
      this.authenticatedUserRole = AccountService.getProfile().role;
    }
  },
};
</script>

<style scoped>
.title {
  font-family: "Poppins" !important;
  font-weight: bold !important;
}
</style>
