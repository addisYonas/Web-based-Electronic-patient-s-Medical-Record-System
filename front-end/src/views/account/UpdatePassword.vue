<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading font-weight-bold">Update Password</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <form-error-messages
                    :messages="errorMessages"
            />
            <v-alert v-if="invalidPasswordError" :value="true" type="error">{{ invalidPasswordError }}</v-alert>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field v-validate="'required'"
                                      :error-messages="errors.collect('oldPassword')"
                                      v-model="passObj.oldPassword"
                                      :append-icon="showOldPassword ? 'visibility_off' : 'visibility'"
                                      :type="showOldPassword ? 'text' : 'password'"
                                      name="oldPassword"
                                      label="Current Password"
                                      autofocus
                                      @click:append="showOldPassword = !showOldPassword"
                                      required
                                      prepend-icon="lock"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field ref="newPassword"
                                      v-validate="'required'"
                                      :error-messages="errors.collect('newPassword')"
                                        v-model="passObj.newPassword"
                                      :append-icon="showNewPassword ? 'visibility_off' : 'visibility'"
                                      :type="showNewPassword ? 'text' : 'password'"
                                      name="newPassword"
                                      label="New Password"
                                      @click:append="showNewPassword = !showNewPassword"
                                      required
                                      prepend-icon="lock"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field v-validate="'required|confirmed:newPassword'"
                                      :error-messages="errors.collect('confirmNewPassword')"
                                      v-model="confirmNewPassword"
                                      :append-icon="showConfirmNewPassword ? 'visibility_off' : 'visibility'"
                                      :type="showConfirmNewPassword ? 'text' : 'password'"
                                      name="confirmNewPassword"
                                      label="Confirm Password"
                                      @click:append="showConfirmNewPassword = !showConfirmNewPassword"
                                      required
                                      prepend-icon="lock"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="changePass(passObj)">Save</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    import UserAccountAPI from '@/api/user-account.api.js'
     import UpdatePassword from '@/views/account/UpdatePassword'
    import {AccountService} from "@/services"
    import {eventBus} from "../../main";

    export default {
        name: "UpdatePassword",
        props: {
            modalName: {
                type: String,
                default: ""
            }
        },
        data(){
            return {
                dialog: false,
                showOldPassword: false,
                showNewPassword: false,
                showConfirmNewPassword: false,
                invalidPasswordError: false,        //for alert message
                confirmNewPassword: '',
                passObj: {
                    oldPassword: '',
                    newPassword: ''
                },
                errorMessages: null
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            changePass(passObj){
                this.errorMessages = null;
                this.$validator.validateAll().then((isValid) => {
                    if (isValid){
                        UserAccountAPI.updatePassword(passObj).then((res) => {
                            AccountService.updateToken(res.tokenId);
                            this.$modal.hide(this.modalName);
                            eventBus.$emit('openSb', {message: 'Password Successfully Changed!', color: "primary"});
                        }).catch((err) => {
                            if (err.statusCode === 401 || err.statusCode === 400) {
                                this.invalidPasswordError = "Invalid old password";
                            } else {
                                const { messages } = err.details;
                                this.errorMessages = messages;
                            }
                        });
                    }
                });
            }
        },
    }
</script>

<style scoped>

</style>
