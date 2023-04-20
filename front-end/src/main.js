import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import sharedComponents from "@/components/shared.js";
//
import VModal from "vue-js-modal";
import VeeValidate from "vee-validate";
import VueMoment from "vue-moment";

Vue.config.productionTip = false;

Vue.use(VModal, { dynamic: true });
Vue.use(VeeValidate);
Vue.use(VueMoment);

Vue.use(sharedComponents);

export const eventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
