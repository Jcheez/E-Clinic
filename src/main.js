import Vue from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar'
import VueRouter from "vue-router";
import Routes from "./routes.js";
import firebase from "firebase"

Vue.use(VueRouter);
Vue.use(VCalendar);
Vue.config.productionTip = false;

const myRouter = new VueRouter({
  routes: Routes,
  mode: "history",
});

myRouter.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  console.log(isAuthenticated)
  if(isAuthenticated && to.path == '/') {
    next('/clinichome')
  }
  if (requiresAuth && !isAuthenticated) {
    next('/cliniclogin')
  } else {
    next()
  }
}) 

new Vue({
  render: (h) => h(App),
  router: myRouter,
}).$mount("#app");
