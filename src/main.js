import Vue from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar'
import VueRouter from "vue-router";
import Routes from "./routes.js";
import store from "./store/store"
import firebase from "firebase"

Vue.use(VueRouter);
Vue.use(VCalendar);
Vue.config.productionTip = false;

const myRouter = new VueRouter({
  routes: Routes,
  mode: "history",
});

myRouter.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = firebase.auth().currentUser
  //console.log(currentUser)

  if (authorize) {
      if (!currentUser) {
          alert("Page requires login")
          // not logged in so redirect to login page with the return url
          if (to.name == "clinichome") {
            return next({ path: '/cliniclogin'});
          } else {
            return next({ path: '/patientlogin'});
          }
      }
      // check if route is restricted by role
      if (authorize.length && !authorize.includes(currentUser.photoURL)) {
          alert("Restricted page access, not available")
          store.dispatch('signOutAction')
          // role not authorised so redirect to home page
          return next({ path: '/' });
      }
  }

  next();
})

firebase.auth().onAuthStateChanged(function(user) {
  //console.log(user)
  if (user != null && user.photoURL.localeCompare("patient") == 0) {
    localStorage.setItem("uidPatient", user.uid)
  } else if (user != null && user.photoURL.localeCompare("clinic") == 0) {
    localStorage.setItem("uidClinic", user.uid)
  }
  new Vue({
      router: myRouter,
      render: h => h(App),
      store
    }).$mount('#app')
  })
