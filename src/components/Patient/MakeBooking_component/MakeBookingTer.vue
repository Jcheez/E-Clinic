<template>
  <div id="container">
    <div id="topNavBar">
      <span>E-Clinic</span>
      <router-link to="/patienthome">Return Home</router-link>
      <router-link to="/pending">Pending Booking</router-link>
    </div>
    <h4 id="sorry">Sorry,</h4>
    <h4 id="patientName">{{ this.getUser.displayName }}</h4>
    <div id="message">
      <p>{{ msg }}</p>
      <p>{{ msg3 }}</p>
      <p>{{ msg2 }}</p>
    </div>

    <div id="image"></div>
    <a id="credits" href="https://stories.freepik.com/work"
      >Illustration by Freepik Stories</a
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      msg:
        "Your condition is not available for teleconsult,",
      msg3:"and/or you have not been to this clinic.",
      msg2: "Clinic staff will contact you to make arrangements.",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/patientlogin");
    },

    /*home: function () {
      // change to the route for the patient page after login component is complete
      this.$router.push("/patienthome");
    },*/
  },
};
</script>

<style scoped>
#container {
  font-family: Nunito;
}
#sorry {
  font-family: Nunito;
  margin-bottom: -30px;
  font-size: 32px;
  position: absolute;
  left: 680px;
  top: 250px;
}
#patientName {
  color: rgb(0, 114, 180);
  font-family: Nunito;
  margin-bottom: -30px;
  font-size: 32px;
  position: absolute;
  left: 780px;
  top: 250px;
}
#message {
  display: block;
  top: 350px;
  left: 630px;
  position: absolute;
  text-align: left;
  font-size: 20px;
}
p {
  margin-left: 50px;
}
#image {
  background-image: url("~@/assets/MakeBookingTer.png");
  position: relative;
  background-size: 550px auto;
  background-repeat: no-repeat;
  background-position: left;
  background-position-y: -40px;
  /*background-position-x: 50px;*/
  height: 500px;
  margin-top: 200px;
}
#topNavBar span {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  width: 100%;
  display: block;
}
#topNavBar a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 17px;
  letter-spacing: 2px;
  margin: 10px 50px 0 75px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

#topNavBar a:hover {
  font-size: 18px;
  color: white;
  cursor: pointer;
}

#topNavBar {
  height: 80px;
  position: fixed;
  padding-top: 20px;
  top: 0;
  left: 0;
  overflow-x: hidden;
  width: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
}

#credits {
  top: 680px;
  left: 240px;
  position: absolute;
  font-size: 8px;
  color: rgb(0, 114, 180);
  font-style: bold;
}
</style>