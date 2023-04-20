<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-12 pa-3 login">
              <v-card-text>
                <v-card-title>
                  <div class="layout column align-center">
                    <span class="font-weight-regular">
                      <img
                        class="logo"
                        :src="require('../../assets/tenaBlue.png')"
                        alt="TenaMahder"
                        height="80px"
                        width="140px"
                      />
                    </span>
                  </div>
                </v-card-title>
                <form-error-messages :messages="errorMessages" />
                <v-alert v-if="authError" :value="true" type="error">
                  {{ authError }}
                </v-alert>
                <v-form>
                  <v-text-field
                    v-validate="'required'"
                    :error-messages="errors.collect('username')"
                    autofocus
                    append-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    v-model="model.username"
                    @keypress.enter="login"
                  ></v-text-field>
                  <v-text-field
                    v-validate="'required'"
                    :error-messages="errors.collect('password')"
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.password"
                    @keypress.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  outline
                  class="font-weight-black"
                  color="primary"
                  @click="login"
                  >Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { AccountService } from "@/services";
import PatientService from "../../services/patient.service";

export default {
  data: () => ({
    loading: false,
    model: {
      username: "",
      password: "",
    },
    authError: false,
    errorMessages: null,
  }),

  methods: {
    login() {
      const self = this;

      this.$validator.validateAll().then((result) => {
        if (result) {
          this.errorMessages = null;
          AccountService.login(this.model.username, this.model.password)
            .then(() => {
              if (PatientService.isPatientThere()) {
                this.$router.push("/patient");
              } else {
                this.$router.push("/start");
              }
            })
            .catch((err) => {
              if (err.statusCode === 401 || err.statusCode === 400) {
                self.authError = "Username or password is incorrect";
              } else {
                self.errorMessages = err.message;
              }
            });
        }
      });
    },
  },
};
</script>
<style scoped lang="css">
#login {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
     background-image: -webkit-linear-gradient(180deg, #1697F6 50%, #F5EDED 50%);
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.display-1 {
    font-family: "Poppins" !important;
    font-weight: normal !important;
}
.login{
border-radius: 30px;
}
</style>
