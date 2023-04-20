<template>
  <div>
    <div v-if="allHaematology.length > 0">
      <template v-for="(haematology, index) in allHaematology">
        <v-card
          class="cursorz mb-3 mt-2"
          @click="showLaboratoryDetail(haematology, false)"
          :key="index"
        >
          <v-toolbar flat dense class="pa-0 primary--text">
            <v-flex class="text-xs-left ml-0 pl-0">
              <span>{{
                haematology.createdAt | moment("MM-DD-YYYY, h:mm:ss a")
              }}</span>
            </v-flex>
            <v-flex
              class="text-xs-right mr-0 pr-0"
              v-if="haematology.orderedBy"
            >
              <span>By {{ haematology.orderedBy.fullName }}</span>
            </v-flex>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <div class="px-2 py-2">{{ haematology.status }}</div>
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
import HaematologyDetail from "./HaematologyCreateOrDetail";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Haematology",
  data() {
    return {
      authenticatedUserRole: null,
    };
  },
  methods: {
    showLaboratoryDetail(hResult, inputEnabled) {
      this.$modal.show(
        HaematologyDetail,
        {
          modalName: "haematology-result-modal",
          inputEnabled: inputEnabled,
          haematologyResult: hResult,
        },
        {
          name: "haematology-result-modal",
          height: "auto",
          width: 1200,
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
          this.goHemaNextPageAction();
        }
      };
    },
    ...mapActions(["fetchHaematologies", "goHemaNextPageAction"]),
  },
  mounted() {
    this.scroll();
    if (AccountService.getProfile())
      this.authenticatedUserRole = AccountService.getProfile().role;
  },
  created() {
    this.fetchHaematologies();
  },
  computed: mapGetters(["allHaematology"]),
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
