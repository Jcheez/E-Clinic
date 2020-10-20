<template>
  <div>
    <p>{{ msg }}</p>
    <v-date-picker v-model="date" is-inline :min-date="new Date()" id="datepicker"/>
    <ul id="slots">
      <li v-for="(s, index) in this.slot" :key="index">
        <div id="inner">
          <span>Date: {{  formatDate(s.date) }}</span>
          <span>Time: {{  formatTime(s.date) }}</span>
          <span>Doctor: {{ s.doctor }}</span>
        </div>
        <button id="view" v-on:click="makeBooking(s.id)">
          Make Booking
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../../../firebase.js"


export default {
  data() {
    return {
        msg: "This page will allow patients to make bookings",
        date: new Date(),
        slot: []
    };
  },
  
  methods: {
      fetchitems: function() {
          database
          .collection("consultslots")
          .get()
          .then((querySnapShot) => {
              this.slot = []
              let item = {};
            querySnapShot.forEach((doc) => {
                item = doc.data();
                let item_date = item.date
                .toDate()
                .toLocaleDateString()
                .split("/")
                .reverse()
                .join("-");

                console.log(item_date)
                let filtered_date = this.date.toLocaleDateString()
                .split("/")
                .reverse()
                .join("-")
                console.log(filtered_date)
                console.log(item_date.localeCompare(filtered_date))
                console.log("Next")
                if (item_date.localeCompare(filtered_date) == 0 && item.patient == null) {
                item.id = doc.id;
                this.slot.push(item);
                }
              });
          });
      },

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

      makeBooking: function(id) {
          database
          .collection("consultslots")
          .doc(id)
          .update({
              patient: this.patientName
          })
          .then(() => {
            alert("Appointment Slot booked")
            })
          
      }
        
  },
  created() {
      this.fetchitems();
  },

  watch: {
    date: function () {
      this.fetchitems();
    },
  },

  props: {
      conditions: Array,
      patientName: String
  },
};
</script>

<style scoped>
div#inner {
  width: 70%;
  display: inline-block;
}

ul#slots {
    position:absolute;
    left: 500px;
    top: -10px
}

li {
  position: relative;
  width: 562px;
  height: 100px;
  left: 73px;
  top: 300px;
  border: 1px solid #000000;
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding-left: 10px;
  padding-top: 20px;
  display: block;
}

span {
  position: relative;
  display: block;
  text-align: left;
  font-size: 20px;
}

button#view {
  position: relative;
  bottom: 35px;
  width: 125px;
  height: 50px;
  background: aqua;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 15px;
  font-size: 20px;
}

button:hover {
  cursor: pointer;
}
button:focus {
  outline: none;
}

#datepicker {
    position: absolute;
    left: 200px;
}
</style>