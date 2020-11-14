<template>
  <div>
    <h4 id="thanks">Thank You</h4>
    <h4 id="patientName">{{ this.getUser.displayName }}</h4>
    <h4 id="confirm">Here Are the Confirmation Details of Your Booking</h4>

    <div id="details">
      <p>Appointment Date: {{ formatDate(appdate) }}</p>
      <p>Appointment Time: {{ formatTime(appdate) }}</p>
      <p>Doctor: {{ doctor }}</p>
      <p>Consultation type: Online</p>
      <p>You may want to print this page as proof of booking confirmation</p>
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
#confirm {
  position: absolute;
  left: 300px;
  font-family: Nunito;
  font-size: 32px;
  top: 160px;
}
#thanks {
  font-family: Nunito;
  font-size: 32px;
  position: absolute;
  left: 500px;
  top: 100px;
}
#patientName {
  color: rgb(0, 114, 180);
  font-family: Nunito;
  font-size: 32px;
  position: absolute;
  left: 680px;
  top: 100px;
}
p {
  font-size: 20px;
  font-family: Nunito;
}
#details {
  position: absolute;
  top: 250px;
  left: 300px;
}
</style>