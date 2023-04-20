<template>
  <v-layout row class="mt-3">
    <v-flex xs0 sm3></v-flex>
    <v-flex xs12 sm6>
      <v-card class="text-xs-center ma-3 px-5 card">
        <v-responsive class="pt-4">
          <v-avatar size="100" class="grey lighten-2">
            <img src="../../assets/account.png" alt="" />
          </v-avatar>
        </v-responsive>
        <div class="title mt-2">{{ profile.fullName }}</div>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6 class="text-xs-right mb-2">
              <label class="font-weight-bold body-1">Username</label>
            </v-flex>
            <v-flex xs6 class="pl-3 text-xs-left mb-2">
              <label class="body-1">{{ profile.username }}</label>
            </v-flex>

            <v-flex xs6 class="text-xs-right mb-2">
              <label class="font-weight-bold body-1">Phone</label>
            </v-flex>
            <v-flex xs6 class="pl-3 text-xs-left mb-2">
              <label class="body-1">{{ profile.phone }}</label>
            </v-flex>

            <v-flex xs6 class="text-xs-right mb-2">
              <label class="font-weight-bold body-1">Email</label>
            </v-flex>
            <v-flex xs6 class="pl-3 text-xs-left mb-2">
              <label class="body-1">{{ profile.email }}</label>
            </v-flex>

            <v-flex xs6 class="text-xs-right mb-2">
              <label class="font-weight-bold body-1">Address</label>
            </v-flex>
            <v-flex xs6 class="pl-3 text-xs-left mb-2">
              <label class="body-1">{{ profile.address }}</label>
            </v-flex>

            <v-flex xs6 class="text-xs-right mb-2">
              <label class="font-weight-bold body-1">Role</label>
            </v-flex>
            <v-flex xs6 class="pl-3 text-xs-left mb-2" v-if="profile.userRole">
              <label class="body-1">{{ profile.userRole.name }}</label>
            </v-flex>

            <template v-if="profile.companyName">
              <v-flex xs6 class="text-xs-right mb-2">
                <label class="font-weight-bold body-1">Company</label>
              </v-flex>
              <v-flex xs6 class="pl-3 text-xs-left mb-2">
                <label class="body-1">{{ profile.companyName }}</label>
              </v-flex>
            </template>

            <v-flex xs12 md6 class="text-xs-center mb-2">
              <v-btn
                small
                outline
                class="font-weight-black mt-5 ml-0 mb-3"
                color="primary"
                @click="ProfileEdit(profile)"
                >Update Profile
              </v-btn>
            </v-flex>

            <v-flex xs12 md6 class="text-xs-center mb-2">
              <v-btn
                small
                outline
                class="font-weight-black mt-5 ml-0 mb-3"
                color="primary"
                @click="OpenPassUpdate()"
              >
                Change Password
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs0 sm3></v-flex>
  </v-layout>
</template>

<script>
import { AccountService } from "@/services";
import AccountCreate from "@/views/userAccount/UserAccountCreate";
import UpdatePassword from "@/views/account/UpdatePassword";
import UserAccountAPI from "../../api/user-account.api";

export default {
  data() {
    return {
      profile: {},
    };
  },
  methods: {
    ProfileEdit(profile) {
      this.$modal.show(
        AccountCreate,
        {
          modalName: "Update Profile",
          account: profile,
          pullData: this.pullData,
        },
        {
          name: "Update Profile",
          height: "auto",
          width: 600,
          scrollable: true,
        }
      );
    },
    OpenPassUpdate() {
      this.$modal.show(
        UpdatePassword,
        {
          modalName: "Password-update-modal",
        },
        {
          name: "Password-update-modal",
          height: "auto",
          width: 400,
          scrollable: true,
        }
      );
    },
    pullData() {
      UserAccountAPI.getByUsername(AccountService.getProfile().username).then(
        (res) => {
          this.profile = res;
          console.log(res);
        }
      );
    },
  },
  created() {
    this.pullData();
  },
};
</script>

<style scoped>
.title {
  font-family: "Poppins" !important;
  font-weight: bold !important;
}
.card {
  border-radius: 30px;
}
</style>
