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
    formatDate: function(date) {
        let ldate = date.toDate().toLocaleDateString().split("/")
        let i0 = ldate[0]
        ldate[0] = ldate[1]
        ldate[1] = i0
        return ldate.join("/")
    },

    formatTime: function(time) {
        let ltime =  time.toDate().toLocaleTimeString().replace(" ", ":").split(":")
        ltime.splice(2,1)
        return ltime[0] + ":" + ltime[1] + " " + ltime[2]
    },
    
    routeHome: function() {
      this.$router.push('/patienthome')
      //To update again where to push this button
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