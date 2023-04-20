<template>
    <v-card>
        <v-toolbar flat color="white">
            <span class="title">Confirmation</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <div class="subheading">
                Are you sure to delete {{ name }} ?
            </div>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click="deleteData">Yes</v-btn>
            <v-btn color="primary darken-1" flat @click="closeDialog">No</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { eventBus } from "../main";

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
            id: {
                type: String,
                default: ""
            },
            api: {
                type: Object,
                default: () => {}
            },
            callback: {
                type: Function
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            deleteData(){
                this.api.remove(this.id)
                    .then(() => {
                        this.$modal.hide(this.modalName);
                        eventBus.$emit('openSb', {message: 'Successfully Deleted!', color: "primary"});
                        this.callback();
                    })
            }
        }
    }
</script>

<style scoped>

</style>
