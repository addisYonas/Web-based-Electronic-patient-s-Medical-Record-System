<template>
  <v-card class="text-xs-center ma-3 ">
    <v-responsive class="pt-4">
      <v-avatar size="100" class="grey lighten-2">
        <img src="../../assets/account.png" alt="" />
      </v-avatar>
    </v-responsive>

    <div class="subheading">{{ item.fullName }}</div>

    <v-card-text>
      <v-layout row wrap>
        <v-flex md3 class="pt-1 pr-2 text-xs-right">
          <label>Username</label>
        </v-flex>
        <v-flex md9>
          <v-text-field
            disabled
            :value="item.username"
            class="pt-0 mt-0"
          ></v-text-field>
        </v-flex>

        <v-flex md3 class="pt-1 pr-2 text-xs-right">
          <label>Phone</label>
        </v-flex>
        <v-flex md9>
          <v-text-field
            disabled
            :value="item.phone"
            class="pt-0 mt-0"
          ></v-text-field>
        </v-flex>

        <v-flex md3 class="pt-1 pr-2 text-xs-right">
          <label>Email</label>
        </v-flex>
        <v-flex md9>
          <v-text-field
            disabled
            :value="item.email"
            class="pt-0 mt-0"
          ></v-text-field>
        </v-flex>

        <v-flex md3 class="pt-1 pr-2 text-xs-right">
          <label>Address</label>
        </v-flex>
        <v-flex md9>
          <v-text-field
            disabled
            :value="item.address"
            class="pt-0 mt-0"
          ></v-text-field>
        </v-flex>

        <v-flex md3 class="pt-1 pr-2 text-xs-right">
          <label>Role</label>
        </v-flex>
        <v-flex md9>
          <v-text-field
            disabled
            :value="item.userRole.name"
            class="pt-0 mt-0"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AccountDetail",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      companyName: "",
    };
  },
  created() {},
};
</script>
