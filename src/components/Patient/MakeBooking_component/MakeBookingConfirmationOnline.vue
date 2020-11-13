<template>
  <div>
    <p>{{ msg }}</p>
    <p>Appointment Date: {{formatDate(appdate) }}</p>
    <p>Appointment Time: {{formatTime(appdate) }}</p>
    <p>Doctor: {{doctor}}</p>
    <p>Consultation type: Online</p>
    <button v-on:click="routeHome()">Back to home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Confirmation Details of make Booking",
    };
  },
  methods: {
    formatDate: function (date) {
      let filter_year = date.toDate().getFullYear()
      let filter_month = date.toDate().getMonth() + 1
      let filter_day = date.toDate().getDate()
      return filter_day + "/" + filter_month + "/" + filter_year
    },

    formatTime: function(time) {
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
    
    routeHome: function() {
      this.$router.push('/patienthome')
    }
  },

  props: {
      appdate: Object,
      doctor: String
  }
};
</script>

<style>
</style>