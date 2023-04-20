<template>
  <div>
    <div v-if="allSerumChemistry.length > 0">
      <template v-for="(serumChemistry, index) in allSerumChemistry">
        <v-card
          class="cursorz mb-3 mt-2"
          @click="showSerumChemistryDetail(serumChemistry, false)"
          :key="index"
        >
          <v-toolbar flat dense class="pa-0 primary--text">
            <v-flex class="text-xs-left ml-0 pl-0">
              <span>{{
                serumChemistry.createdAt | moment("MM-DD-YYYY, h:mm:ss a")
              }}</span>
            </v-flex>
            <v-flex
              class="text-xs-right mr-0 pr-0"
              v-if="serumChemistry.orderedBy"
            >
              <span>By {{ serumChemistry.orderedBy.fullName }}</span>
            </v-flex>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <div class="px-2 py-2">{{ serumChemistry.status }}</div>
          </v-card-text>
        </v-card>
      </template>
    </div>

    <div v-else>
      <v-card class="mt-2 mb-3 pa-4">
        <span class="body-1 text-xs-center"
          >There is nothing to show. You can add Laboratory orders for it.</span
        >
      </v-card>
    </div>
  </div>
</template>
<script>
import { AccountService } from "@/services";
import SCCreateOrDetail from "./SerumChemistryCreateOrDetail";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SerumChemistry",
  data() {
    return {
      authenticatedUserRole: "",
    };
  },
  methods: {
    showSerumChemistryDetail(scResult, inputEnabled) {
      this.$modal.show(
        SCCreateOrDetail,
        {
          modalName: "serum-chemistry-result-modal",
          inputEnabled: inputEnabled,
          scResult: scResult,
        },
        {
          name: "serum-chemistry-result-modal",
          height: "auto",
          width: 1250,
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
          this.goScNextPageAction();
        }
      };
    },
    ...mapActions(["fetchSerumChemistries", "goScNextPageAction"]),
  },
  mounted() {
    this.scroll();
    if (AccountService.getProfile())
      this.authenticatedUserRole = AccountService.getProfile().role;
  },
  created() {
    this.fetchSerumChemistries();
  },
  computed: mapGetters(["allSerumChemistry"]),
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
