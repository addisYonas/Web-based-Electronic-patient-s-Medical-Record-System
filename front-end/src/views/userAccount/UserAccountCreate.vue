<template>
  <v-card>
    <v-toolbar height="40" flat color="white">
      <span class="subheading font-weight-bold">{{ componentTitle }}</span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert v-if="validationErr" :value="true" type="error">
        {{ validationErr }}
      </v-alert>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-validate="'required|alpha_spaces'"
              :error-messages="errors.collect('fullName')"
              name="fullName"
              autofocus
              v-model="account.fullName"
              label="Name of the user"
              required
              prepend-icon="person"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('phone')"
              name="phone"
              v-model="account.phone"
              label="Phone"
              required
              prepend-icon="phone"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              name="email"
              v-model="account.email"
              label="Email"
              type="email"
              prepend-icon="email"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-validate="'required|alpha_spaces'"
              :error-messages="errors.collect('address')"
              name="address"
              v-model="account.address"
              label="Address"
              required
              prepend-icon="account_box"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-validate="'required|alpha_num'"
              :error-messages="errors.collect('username')"
              name="username"
              v-model="account.username"
              label="User Name"
              required
              prepend-icon="account_box"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-if="!account.id">
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              v-model="account.password"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              counter
              @click:append="showPassword = !showPassword"
              required
              prepend-icon="lock"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 v-if="!account || !account.id">
            <v-select
              v-validate="'required'"
              :error-messages="errors.collect('roleSelect')"
              name="roleSelect"
              :items="roles"
              item-value="id"
              item-text="name"
              prepend-icon="supervisor_account"
              label="Role"
              v-model="account.userRoleId"
            >
            </v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider />
    <v-toolbar height="40" flat color="white">
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
      <v-btn color="blue darken-1" flat @click="saveAccount(account)"
        >Save</v-btn
      >
    </v-toolbar>
  </v-card>
</template>

<script>
import { UserAccountAPI } from "@/api";
import { RoleAPI } from "@/api";
import { eventBus } from "../../main";

export default {
  name: "NewAccount",
  props: {
    modalName: {
      type: String,
      default: "",
    },
    account: {
      type: Object,
      default: () => {
        this.account = {
          fullName: "",
          username: "",
          phone: "",
          email: "",
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
      roles: [],
      validationErr: undefined,
    };
  },
  methods: {
    closeDialog() {
      this.$modal.hide(this.modalName);
    },
    saveAccount(account) {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.errorMessages = null;
          if (account.id) {
            const trimmedAcc = {
              id: account.id,
              fullName: account.fullName,
              username: account.username,
              address: account.address,
              email: account.email,
              phone: account.phone,
              userRoleId: account.userRoleId,
            };

            UserAccountAPI.update(trimmedAcc)
              .then(() => {
                this.pullData();
                eventBus.$emit("openSb", {
                  message: "Account Successfully Updated!",
                  color: "primary",
                });
                this.$modal.hide(this.modalName);
              })
              .catch((err) => {
                console.log(err, " err");
                if (err.statusCode === 422) {
                  if (err.message && err.message.includes("phone"))
                    this.validationErr = "Phone must be unique";
                  else if (err.message && err.message.includes("email"))
                    this.validationErr = "Email must be unique";
                  else if (err.message && err.message.includes("username"))
                    this.validationErr = "Username already exists";
                } else this.validationErr = err && err.message;
              });
          } else {
            account.isActive = true;
            UserAccountAPI.create(account)
              .then(() => {
                this.pullData();
                eventBus.$emit("openSb", {
                  message: "Account Successfully Created!",
                  color: "primary",
                });
                this.$modal.hide(this.modalName);
              })
              .catch((err) => {
                console.log(err, " err");
                if (err.statusCode === 422) {
                  if (err.message && err.message.includes("phone"))
                    this.validationErr = "Phone must be unique";
                  else if (err.message && err.message.includes("email"))
                    this.validationErr = "Email must be unique";
                  else if (err.message && err.message.includes("username"))
                    this.validationErr = "Username already exists";
                } else this.validationErr = err && err.message;
              });
          }
        }
      });
    },
  },

  created() {
    RoleAPI.all().then((res) => {
      this.roles = res.rows;
    });
  },
  computed: {
    componentTitle() {
      if (!this.account.id) return "Create a user";
      else return "Edit a user";
    },
  },
};
</script>
