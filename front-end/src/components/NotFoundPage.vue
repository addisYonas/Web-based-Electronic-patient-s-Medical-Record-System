<template>
  <v-app id="notfound" class="error">
    <v-container grid-list-sm>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card round class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <h1>404 - Page Not Found</h1>
              </div>
              <div class="notfound"></div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.notfound {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1 {
  text-align: center;
  color: black;
}
.display-1 {
  font-family: "Poppins" !important;
  font-weight: normal !important;
}
</style>
