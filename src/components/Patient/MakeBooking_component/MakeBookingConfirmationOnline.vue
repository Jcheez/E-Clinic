<template>
  <div>
    <div id="topNavBar">
      <span>E-Clinic</span>
      <router-link to="/patienthome">Return Home</router-link>
      <router-link to="/pending">Pending Booking</router-link>
    </div>
    <h4 id="thanks">Thank You</h4>
    <h4 id="patientName">{{ this.getUser.displayName }}</h4>
    <h4 id="confirm">Here Are the Confirmation Details of Your Booking</h4>

    <div id="details">
      <p>Appointment Date: {{ formatDate(appdate) }}</p>
      <p>Appointment Time: {{ formatTime(appdate) }}</p>
      <p>Doctor: {{ doctor }}</p>
      <p>Consultation type: Online</p>
      <p id="print">
        You may want to print this page as proof of booking confirmation
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: "Confirmation Details of make Booking",
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
    formatDate: function (date) {
      let filter_year = date.toDate().getFullYear();
      let filter_month = date.toDate().getMonth() + 1;
      let filter_day = date.toDate().getDate();
      return filter_day + "/" + filter_month + "/" + filter_year;
    },

    formatTime: function (time) {
      let min = time.toDate().getMinutes();
      let h = time.toDate().getHours();
      if (h < 10) {
        h = "0" + h;
      }
      if (min == 0) {
        min = "00";
      }
      return h + ":" + min;
    },
  },

  props: {
    appdate: Object,
    doctor: String,
  },
};
</script>

<style scoped>
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

#confirm {
  position: absolute;
  left: 270px;
  font-family: Nunito;
  font-size: 32px;
  top: 160px;
}
#thanks {
  font-family: Nunito;
  font-size: 32px;
  position: absolute;
  left: 470px;
  top: 100px;
}
#patientName {
  color: rgb(0, 114, 180);
  font-family: Nunito;
  font-size: 32px;
  position: absolute;
  left: 650px;
  top: 100px;
}
p {
  font-size: 20px;
  font-family: Nunito;
}
#print {
  font-size: 16px;
  position: absolute;
  left: -50px;
}
#details {
  position: absolute;
  top: 250px;
  left: 470px;
  text-align: left;
  width: 500px;
}
</style>