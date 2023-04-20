<template>
  <div>
    <v-btn
      v-if="authenticatedUserRole === 'Doctor' && isThereAPatient"
      color="primary"
      small
      dark
      class="ma-0 mb-2 text-capitalize"
      @click="showOrCreateLabOrder()"
    >
      <v-icon class="mr-1">add_circle_outline</v-icon>
      Add Laboratory Order
    </v-btn>

    <div v-if="allLabOrder.length > 0">
      <template v-for="(labOrder, index) in allLabOrder">
        <v-card
          class="cursorz mb-3 mt-2"
          @click="showOrCreateLabOrder(labOrder, false)"
          :key="index"
        >
          <v-toolbar flat dense class="pa-0 primary--text">
            <v-flex class="text-xs-left ml-0 pl-0">
              <span>{{
                labOrder.createdAt | moment("MM-DD-YYYY, h:mm:ss a")
              }}</span>
            </v-flex>
            <v-flex class="text-xs-right mr-0 pr-0">
              <span
                >By Dr.
                {{
                  labOrder.orderedBy ? labOrder.orderedBy.fullName : ""
                }}</span
              >
            </v-flex>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <div class="px-2 py-2">{{ labOrder.note }}</div>
          </v-card-text>
        </v-card>
      </template>
    </div>

    <div v-else>
      <v-card class="mt-2 mb-3 pa-4">
        <span class="body-1 text-xs-center"
          >There is nothing to show. Please add by pressing
          <b>Add Laboratory Order</b> button above.</span
        >
      </v-card>
    </div>
  </div>
</template>
<script>
import { AccountService } from "@/services";
import { PatientService } from "@/services";
import LabOrderCreateFillDetail from "./LabOrderCreateFillDetail";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "labOrders",
  data() {
    return {
      authenticatedUserRole: null,
      isThereAPatient: PatientService.isPatientThere(),
    };
  },
  methods: {
    showOrCreateLabOrder(lb, inputEnabled) {
      this.$modal.show(
        LabOrderCreateFillDetail,
        {
          modalName: "lab-order-create-modal",
          inputEnabled: inputEnabled,
          labOrder: lb,
          fetchData: this.fetchData,
        },
        {
          name: "lab-order-create-modal",
          height: "auto",
          width: 1000,
          scrollable: true,
        }
      );
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.goLabOrderNextPageAction();
        }
      };
    },
    fetchData(val) {
      this.fetchLabOrders(val);
    },
    ...mapActions(["fetchLabOrders", "goLabOrderNextPageAction"]),
  },
  mounted() {
    this.scroll();
    if (AccountService.getProfile())
      this.authenticatedUserRole = AccountService.getProfile().role;
  },
  created() {
    this.isThereAPatient = PatientService.isPatientThere();
    this.fetchData();
  },
  computed: mapGetters(["allLabOrder"]),
};
</script>

<style scoped>
.cursorz {
  cursor: pointer;
}

.titleColorz {
  background-color: lavender;
}

.v-expansion-panel__header {
  padding: 0px !important;
}

.v-card__text {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.p {
  margin: 0px !important;
}

.theme--light.v-expansion-panel .v-expansion-panel__container {
  margin-bottom: 16px !important;
}

.v-expansion-panel__header {
  padding: 0px !important;
}
</style>
