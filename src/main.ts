import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/store";
import "./scss/reset.scss";

Vue.config.productionTip = false;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  console.log("生产环境");
} else if (process.env.NODE_ENV === "pre") {
  console.log("预发环境");
} else if (process.env.NODE_ENV === "development") {
  console.log("测试环境");
  console.log(process.env);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
