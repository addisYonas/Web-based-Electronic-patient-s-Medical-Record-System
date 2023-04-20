<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout class="py-0">
        <v-flex xs12>
          <div class="headline font-weight-thin grey&#45;&#45;text">
            All Accounts
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
                flat
                solo
                prepend-icon="search"
                placeholder="Type something"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-spacer></v-spacer>

              <v-btn
                color="primary"
                dark
                small
                @click="AccountCreateMethod({})"
              >
                <v-icon class="mr-1">add_circle_outline</v-icon>
                Add Account
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="headers"
                :search="search"
                :items="items"
                hide-actions
                class="elevation-1"
                item-key="id"
              >
                <template slot="items" slot-scope="props">
                  <td class="cptrz" @click="AccountDetailMethod(props.item)">
                    {{ props.item.fullName }}
                  </td>
                  <td class="cptrz" @click="AccountDetailMethod(props.item)">
                    {{ props.item.username }}
                  </td>
                  <td class="cptrz" @click="AccountDetailMethod(props.item)">
                    {{ props.item.phone }}
                  </td>
                  <td class="cptrz" @click="AccountDetailMethod(props.item)">
                    {{ props.item.email }}
                  </td>
                  <td class="cptrz" @click="AccountDetailMethod(props.item)">
                    {{ props.item.userRole.name }}
                  </td>
                  <td>
                    <v-icon
                      small
                      class="mr-2"
                      @click="AccountCreateMethod(props.item)"
                      >edit</v-icon
                    >
                    <v-icon
                      small
                      class="mr-2"
                      color="red"
                      v-if="props.item.isActive"
                      @click="
                        activatOrDeactivateAccount(
                          props.item.id,
                          props.item.fullName,
                          true
                        )
                      "
                      >cancel</v-icon
                    >
                    <v-icon
                      small
                      class="mr-2"
                      color="primary"
                      v-else
                      @click="
                        activatOrDeactivateAccount(
                          props.item.id,
                          props.item.fullName,
                          false
                        )
                      "
                      >verified_user</v-icon
                    >
                    <v-icon small @click="AccountDeleteMethod(props.item)"
                      >delete</v-icon
                    >
                  </td>
                </template>
              </v-data-table>
              <v-card-text class="text-xs-center">
                <v-pagination
                  v-model="page"
                  :length="totalPaginationLength"
                  :total-visible="visibleLength"
                ></v-pagination>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AccountDetail from "@/views/userAccount/UserAccountDetail";
import AccountCreate from "@/views/userAccount/UserAccountCreate";
import { UserAccountAPI } from "@/api";
import Confirmation from "@/components/Confirmation";
import DeactivateConfiramtion from "@/components/DeactivateConfirmation";

export default {
  data() {
    return {
      totalItems: 1,
      totalPaginationLength: 11,
      visibleLength: 10,
      page: 1,
      limit: 7,
      search: "",
      headers: [
        {
          text: "Full Name",
          value: "fullName",
        },
        {
          text: "Username",
          value: "username",
        },
        {
          text: "Phone",
          value: "phone",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Type",
          value: "userRole.name",
        },
        {
          text: "Action",
          value: "",
          sortable: false,
        },
      ],
      items: [],
      adminRoleId: "some",
    };
  },
  methods: {
    AccountDetailMethod(uuid) {
      this.$modal.show(
        AccountDetail,
        {
          modalName: "Account-detail-modalz",
          item: uuid,
        },
        {
          name: "Account-detail-modal",
          height: "auto",
          scrollable: true,
          width: 500,
        }
      );
    },
    AccountCreateMethod(account) {
      this.$modal.show(
        AccountCreate,
        {
          modalName: "userAccount-create-modal",
          account: account,
          pullData: this.pullData,
        },
        {
          name: "userAccount-create-modal",
          height: "auto",
          width: 700,
          scrollable: true,
        }
      );
    },
    AccountDeleteMethod(account) {
      this.$modal.show(
        Confirmation,
        {
          modalName: "confirmation-modal",
          name: "Account - " + account.fullName,
          id: account.id,
          api: UserAccountAPI,
          callback: this.pullData,
        },
        {
          name: "confirmation-modal",
          height: "auto",
          width: 400,
        }
      );
    },

    activatOrDeactivateAccount(userId, userName, deactivate) {
      this.$modal.show(
        DeactivateConfiramtion,
        {
          modalName: "deactivate-confirmation-modal",
          name: "user - " + userName,
          userId: userId,
          deActivate: deactivate,
          callback: this.pullData,
        },
        {
          name: "deactivate-confirmation-modal",
          height: "auto",
          width: 400,
        }
      );
    },

    pullData() {
      const filter = {
        where: {},
        include: [
          {
            relation: "userRole",
            scope: {
              fields: ["name"],
            },
          },
        ],
        limit: this.limit,
        skip: (this.page - 1) * this.limit,
      };

      UserAccountAPI.all({ filter: filter }).then((res) => {
        this.totalItems = res.count;
        this.totalPaginationLength = Math.ceil(res.count / this.limit);
        this.items = res.rows;
      });
    },
  },

  created() {
    this.pullData();
  },
  watch: {
    page() {
      this.pullData();
    },
  },
};
</script>

<style scoped>
.cptrz {
  cursor: pointer;
}
</style>
