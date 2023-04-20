<template>
  <nav>
    <v-toolbar
      app
      flat
      fixed
      height="45"
      style="padding-left: 0 !important; background: white"
    >
      <v-toolbar-side-icon>
        <span class="font-weight-regular">
          <img
            class="logo"
            :src="require('.././assets/tenaBlue.png')"
            alt="TenaMahder"
            height="50px"
            width="90px"
          />
        </span>
      </v-toolbar-side-icon>

      <v-spacer></v-spacer>

      <v-btn
        v-if="isThereAPatient || isSelectedPatientThere"
        class="text-capitalize"
        color="error"
        small
        dark
        @click="RemoveInfo()"
      >
        Remove Info
      </v-btn>
      <v-btn
        outline
        color="#26C6DA"
        flat
        depressed
        small
        dark
        v-else
        class="text-capitalize"
        @click="GetInfo()"
      >
        Get Info
      </v-btn>

      <v-btn
        color="primary"
        class="text-capitalize"
        small
        dark
        v-if="authenticatedUserRole === 'Doctor'"
        @click="PatientCreateMethod()"
      >
        <v-icon class="mr-1">add_circle_outline</v-icon>
        Add Patient
      </v-btn>

      <v-menu offset-y v-if="authenticatedUserRole">
        <v-btn
          small
          class="text-capitalize"
          slot="activator"
          flat
          color="#263238"
        >
          <v-icon left color="#263238">account_box</v-icon>
          <span>{{ userName }}</span>
        </v-btn>

        <v-list class="py-0">
          <v-btn
            small
            class="text-capitalize"
            flat
            color="#263238"
            to="/profile"
          >
            <v-icon left>person</v-icon>
            <span>Profile</span>
          </v-btn>
          <div></div>
          <v-btn
            small
            class="text-capitalize"
            flat
            color="#263238"
            @click="logout"
          >
            <v-icon left>exit_to_app</v-icon>
            <span>Logout</span>
          </v-btn>
        </v-list>
      </v-menu>
      <template v-else>
        <v-btn
          round
          depressed
          color="primary"
          class="font-weight-black text-capitalize"
          small
          dark
          router
          :to="'/login'"
        >
          LogIn
        </v-btn>
      </template>
    </v-toolbar>
    <v-content
      v-if="
        isThereAPatient ||
          isSelectedPatientThere ||
          authenticatedUserRole === 'Admin'
      "
    >
      <v-toolbar
        color="transparent"
        flat
        style="padding-left: 0 !important; "
        dense
        app
        class="topMarg px-0"
      >
        <v-tabs height="30" color="white" slider-color="primary" centered>
          <v-tab
            router
            to="/medical/clinical-note"
            v-if="authenticatedUserRole !== 'Admin' || isThereAPatient"
            class="text-capitalize"
            >Medical</v-tab
          >
          <v-tab
            router
            to="/medicine"
            v-if="authenticatedUserRole !== 'Admin' || isThereAPatient"
            class="text-capitalize"
            >Medicine</v-tab
          >
          <v-tab
            router
            to="/laboratories/lab-orders"
            v-if="authenticatedUserRole !== 'Admin' || isThereAPatient"
            class="text-capitalize"
            >Laboratory</v-tab
          >
          <v-tab
            router
            to="/forum"
            v-if="authenticatedUserRole !== 'Admin' || isThereAPatient"
            class="text-capitalize"
            >Forum</v-tab
          >
          <v-tab
            router
            to="/drug/drugs"
            v-if="authenticatedUserRole === 'Admin'"
            class="text-capitalize"
            >Drug</v-tab
          >
          <v-tab
            router
            to="/accounts"
            v-if="authenticatedUserRole === 'Admin'"
            class="text-capitalize"
            >Accounts</v-tab
          >
          <v-tab
            router
            to="/patient"
            v-if="isThereAPatient || isSelectedPatientThere"
            class="text-capitalize"
            >Patient Info</v-tab
          >
        </v-tabs>
      </v-toolbar>
    </v-content>
  </nav>
</template>

<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import { eventBus } from "../main";
import PatientCreate from "@/views/patient/PatientCreate";
import GetInfo from "@/views/patient/GetInfo";
import Router from "../router";
import { mapMutations } from "vuex";

export const GET_INFO_KEY = "patient key";

export default {
  name: "Navbar",
  data() {
    return {
      userName: "",
      patientName: ",",
      authenticatedUserRole: "",
      isThereAPatient: PatientService.isPatientThere,
      isSelectedPatientThere: PatientService.isSelectedPatientThere,
    };
  },
  methods: {
    logout() {
      AccountService.logout();
    },
    PatientCreateMethod(patient) {
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
    GetInfo() {
      this.$modal.show(
        GetInfo,
        {
          modalName: "get-info-modal",
          adjustIsTherePatient: this.adjustIsTherePatient,
        },
        {
          name: "get-info-modal",
          height: "auto",
          width: 500,
          scrollable: true,
        }
      );
    },
    RemoveInfo() {
      PatientService.removePatientInfo();
      this.adjustIsTherePatient(PatientService.isPatientThere());
      this.$router.push("/start");
      this.resetAllStates();
    },
    adjustIsTherePatient(value) {
      this.isThereAPatient = value;
      this.isSelectedPatientThere = value;
      if (value === true)
        this.patientName = PatientService.getPatientProfile().info.fullName.split(
          " "
        )[0];
    },
    resetAllStates() {
      this.replaceAllLabOrders([]);
      this.resetAllHaematologies();
      this.resetAllImmunologies();
      this.resetAllMicroBiologies();
      this.resetAllOtherImmunologies();
      this.resetAllOtherLabs();
      this.resetAllParasitologies();
      this.resetAllRadiologies();
      this.resetAllSerumChemistries();
      this.resetAllUrinalyses();
      this.emptyClinicalNotes();
      this.emptyAllergies();
      this.emptyFamilyMedicals();
      this.emptyOtherHealths();
      this.emptyPMHs();
      this.emptySocialHistories();
      this.emptySurgeries();
      this.emptyVaccinations();
      this.emptyWomenHealths();
      this.emptyDiscussions();
      this.emptyComments();
      this.emptyPrescriptions();
    },
    ...mapMutations([
      "replaceAllLabOrders",
      "resetAllHaematologies",
      "resetAllImmunologies",
      "resetAllMicroBiologies",
      "resetAllOtherImmunologies",
      "resetAllOtherLabs",
      "resetAllParasitologies",
      "resetAllRadiologies",
      "resetAllSerumChemistries",
      "resetAllUrinalyses",
      "emptyClinicalNotes",
      "emptyAllergies",
      "emptyFamilyMedicals",
      "emptyOtherHealths",
      "emptyPMHs",
      "emptySocialHistories",
      "emptySurgeries",
      "emptyVaccinations",
      "emptyWomenHealths",
      "emptyDiscussions",
      "emptyComments",
      "emptyPrescriptions",
    ]),
  },
  mounted() {
    if (AccountService.getProfile()) {
      this.authenticatedUserRole = AccountService.getProfile().role;
      this.userName = AccountService.getProfile().fullName.split(" ")[0];
    }

    if (this.isThereAPatient)
      this.patientName = PatientService.getPatientProfile().info.fullName.split(
        " "
      )[0];

    eventBus.$on("patientSelected", () => {
      this.isSelectedPatientThere = true;
    });
  },
  created() {
    this.isThereAPatient = PatientService.isPatientThere();
    this.isSelectedPatientThere = PatientService.isSelectedPatientThere();
  },
};
</script>

<style scoped>
.topMarg {
  margin-top: 41px !important;
}
.diva {
  width: 20px !important;
  height: 10px !important;
}
.v-toolbar__content {
  height: auto !important;
}
.logo {
  margin-left: 40px;
}
</style>
