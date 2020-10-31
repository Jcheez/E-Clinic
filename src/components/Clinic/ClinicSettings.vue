<template>
    <div class="settings">
        <h1>Clinic Settings</h1>
        <div id="sideNavBar">
            <h3>E-Clinic</h3>
            <router-link to="/clinichome">Dashboard</router-link><br>
            <router-link to="/doctorslist">Doctors</router-link><br>
            <router-link to="/clinicsettings">
            Settings</router-link><br>
            <a @click="signOut" class="button is-primary">Logout</a>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
  }    
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 16px;
  letter-spacing: 2px;
  margin: 60px 0 0 0;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

a:hover {
  font-size: 17px;
  color: white;
  cursor: pointer
}

#sideNavBar {
  width: 180px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
}

h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 20px 0px;
}

</style>