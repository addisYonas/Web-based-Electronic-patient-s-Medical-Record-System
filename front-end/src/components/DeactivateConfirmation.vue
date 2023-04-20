<template>
    <v-card>
        <v-toolbar flat color="white">
            <span class="title">Confirmation</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <div class="subheading">
                Are you sure to {{ (deActivate) ? ' deactivate ' : ' activate' }} {{ name }} ?
            </div>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" flat @click="activateOrDeactivate(userId)">Yes</v-btn>
            <v-btn color="error darken-1" flat @click="closeDialog">No</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    import { UserAccountAPI } from '@/api'
    import {eventBus} from "../main";

    export default {
        name: "Confirmation",
        props: {
            modalName: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                default: ""
            },
            userId: {
                type: String,
                default: ""
            },
            deActivate: {
                type: Boolean
            },
            callback: {
                type: Function
            }
        },

        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            activateOrDeactivate(userId){
                if (this.deActivate){
                    UserAccountAPI.deactivate(userId).then(() => {
                        this.$modal.hide(this.modalName);
                        this.callback();
                        eventBus.$emit('openSb', {message: 'Successfully Deactivated!', color: "primary"});
                    });
                } else {
                    UserAccountAPI.activate(userId).then(() => {
                        this.$modal.hide(this.modalName);
                        this.callback();
                        eventBus.$emit('openSb', {message: 'Successfully Activated!', color: "primary"});
                    });
                }
            }
        }
    }
</script>

