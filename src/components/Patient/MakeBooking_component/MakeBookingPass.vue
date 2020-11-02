<template>
  <div>
    <p>{{ msg }}</p>
    <v-date-picker v-model="date" is-inline :min-date="new Date()" id="datepicker"/>
    <ul id="slots">
      <li v-for="(s, index) in this.docsName" :key="index">
        <div id="inner">
          <h3 style="font-size:30px; text-decoration: underline;">{{s}}</h3>
            <div v-for="(v, index) in slot" :key="index">
              <button v-if="s.localeCompare(v.doctorName) == 0" v-on:click="getdoc(v.id); updateApptHist();">{{formatTime(v.date)}}</button>
            </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../../../firebase.js"
import * as firebase from "firebase";
export default {
  data() {
    return {
        msg: "Make Booking",
        date: new Date(),
        slot: [],
        datadoc: {},
        docsName: [],
    };
  },
  
  methods: {
      fetchitems: function() {
          database
          .collection("consultslots")
          .orderBy("date")
          .get()
          .then((querySnapShot) => {
              this.slot = []
              this.docsName = []
              let item = {};
            querySnapShot.forEach((doc) => {
                item = doc.data();
                let item_date = item.date
                .toDate()
                .toLocaleDateString()
                .split("/")
                .reverse()
                .join("-");
                
                let filtered_date = this.date.toLocaleDateString()
                .split("/")
                .reverse()
                .join("-")

                if (item_date.localeCompare(filtered_date) == 0 && item.patient == null && item.clinic.localeCompare(this.clinic) == 0) {
                  let item2 = item
                  item2.id = doc.id;
                  database
                  .collection("doctors")
                  .doc(item.doctor)
                  .get()
                  .then((doc) => {
                    let docName = doc.data().name;
                    console.log(docName)
                    item2.doctorName = docName
                    console.log(item)
                    this.slot.push(item2);
                    if (this.docsName.includes(docName) == false){
                      this.docsName.push(docName)
                    }
                    });

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
      formatTime2: function(time) {
        let ltime =  time.toDate().toLocaleTimeString().replace(" ", ":").split(":")
        ltime.splice(2,1)
        return ltime[0] + "" + ltime[1]
      },

      getdoc: function(ide) {
          database
          .collection("consultslots")
          .get()
          .then((querySnapShot) => {
              querySnapShot.forEach((doc) => {
                  if (ide.localeCompare(doc.id) == 0) {
                      this.datadoc = doc.data()
                      database
                      .collection("consultslots")
                      .doc(ide)
                      .update({
                          patient: this.patientId,
                          conditions: this.conditions
                      })
                      .then(() => {
                      database.collection('doctors').doc(this.datadoc.doctor).get().then((doc) => {
                        this.$router.push({
                          name: "makebookingconfirmation",
                          params: {
                              appdate: this.datadoc.date,
                              doctor: doc.data().name,
                          }   
                          })
                        })
                      alert("Appointment Slot booked")
                      })
                      
                  }
              })
           })
      },
      updateApptHist: function() {
        var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
        ];
        var day = this.date.getDate();
        var monthIndex = this.date.getMonth();
        var year = this.date.getFullYear();
        database
        .collection('patients')
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          let item = {};
            item = querySnapShot.id;
            database.collection("patients").doc(item).update({
              appointment_history: firebase.firestore.FieldValue.arrayUnion(day + ' ' + monthNames[monthIndex] + ' ' + year)
            })
            database.collection("patients").doc(item).update({
              upcoming: {
                0: "online",
                1: day + ' ' + monthNames[monthIndex] + ' ' + year,
                2: this.formatTime2(this.datadoc.date)
              }
            })
            console.log("online appt has been added")
        })
      },
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
      patientId: String,
      clinic: String
  },
};
</script>

<style scoped>

#datepicker {
    position: absolute;
    left: 200px;
}

button {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  color: rgb(0, 114, 180);
  letter-spacing: 2px;
  width: 125px;
  height: 45px;
  background-color: white;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  z-index: -1;
  cursor: pointer;
}

li {
  list-style-type: none; /* Remove bullets */
}
</style>