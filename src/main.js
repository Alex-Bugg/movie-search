import Vue from "vue";
import App from "./App.vue";
import Loader from "@/components/Loader";
import router from "./router";
import store from "./store";
import VueLocalStorage from "vue-localstorage";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
import Paginate from "vuejs-paginate";

Vue.component("Paginate", Paginate);
Vue.config.productionTip = false;
Vue.component("Loader", Loader);
Vue.use(VueLocalStorage);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
