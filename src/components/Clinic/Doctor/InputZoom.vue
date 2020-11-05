<template>
  <div>
    <div id="topNavBar">
      <h3>E-Clinic</h3>
      <!--router-link to="/doctorslist/appointment/doctorsettings">Doctor's Settings</router-link-->
      <router-link to="/doctorslist/appointment">Appointments</router-link>
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <form v-on:submit.prevent="zoomLinkSubmit()">
      <label>Please create a Zoom link and paste it in the box provided:</label>
      <input
        type="text"
        placeholder="Zoom Link for this new Consulation Slot"
        v-model="inputZoomLink"
        v-bind:zoomlink="inputZoomLink"
        id="zoomLinkInput"
      />
      <span> <input id="submitButton" type="submit" value="Submit" /></span>
    </form>
  </div>
</template>

<script>
import database from "../../../firebase";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      inputZoomLink: "",
    };
  },
  props: {
    currDoctorNum: {
      type: String,
    },
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
    zoomLinkSubmit() {
      console.log(this.inputZoomLink);
      var doctorRef = database.collection("doctors").doc(this.currDoctorNum);

      // Set the "capital" field of the city 'DC'
      return doctorRef.update({
        zoom: this.inputZoomLink,
        /*})
        .then((doc) => {
          alert("Successfully submitted Zoom Link", doc);
          this.inputZoomLink = "";*/
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
form {
  align-items: center;
  display: inline-block;
  margin-top: 100px;
}
#zoomLinkInput {
  display: block;
  width: 550px;
  font-family: Roboto;
  float: left;
  margin-left: 10px;
  height: 20px;
}
label {
  float: left;
  font-family: Roboto;
}

span {
  display: block;
  margin: 40px;
}
#submitButton {
  background-color: white;
  border: 1px solid rgb(0, 114, 180);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  color: rgb(0, 114, 180);
  letter-spacing: 3px;
  font-weight: bold;
  outline: none;
}

#submitButton:hover {
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  color: white;
}

#topNavBar {
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
  width: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
}

a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 16px;
  letter-spacing: 2px;
  margin-right: 50px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

a:hover {
  font-size: 17px;
  color: white;
  cursor: pointer;
}

h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>