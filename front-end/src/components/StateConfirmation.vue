<template>
    <v-card>
        <v-toolbar height="40" flat color="white">
            <span class="subheading font-weight-bold">Confirmation</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <div class="subheading">
                Are you sure to delete {{ name }} ?
            </div>
        </v-card-text>
        <v-divider/>
        <v-toolbar height="40" flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click="deleteData">Yes</v-btn>
            <v-btn color="primary darken-1" flat @click="closeDialog">No</v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
    export default {
        name: "StateConfirmation",
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
            remover: {
                type: Function
            }
        },
        methods: {
            closeDialog() {
                this.$modal.hide(this.modalName)
            },
            deleteData() {
                this.remover(this.id).then(() => {
                    this.$modal.hide(this.modalName);
                });
            }
        }
    }
</script>

<style scoped>

</style>
