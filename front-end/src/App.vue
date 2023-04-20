<template>
  <div id="app">
    <template v-if="!$route.meta.public">
      <v-app class="grey lighten-4" style="background: #dae0e6 !important;">
        <modals-container/>
        <Navbar />
        <v-content class="py-3">
          <router-view></router-view>
        </v-content>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>



<script>

  import Navbar from '@/components/Navbar';

  export default {
    name: 'App',
    components:{
      Navbar
    },
    data () {
      return {
        // sth
      }
    }
  }
</script>

<style lang="css">
  #app {
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
