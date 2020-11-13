<template>
  <div>
    <p>{{ msg }}</p>
    <v-date-picker :attributes='attributes' v-model="date" is-inline :min-date="new Date()" id="datepicker"/>
    <ul id="slots">
      <li v-for="(s, index) in this.docsName" :key="index">
        <div id="inner">
          <h3 style="font-size:30px; text-decoration: underline;">{{s}}</h3>
            <div v-for="(v, index) in slot" :key="index">
              <button v-if="s.localeCompare(v.doctorName) == 0" v-on:click="getdoc(v.id); changeBooking(v.id); updateApptHist();">{{formatTime(v.date)}}</button>
            </div>
        </div>
      </li>
    </ul>
    <p v-if="this.docsName.length == 0">There are no available appointment slots today</p>
    <button id="home" v-on:click="routeHome()">Back</button>
  </div>
</template>

<script>
import database from "../../../firebase.js"
import * as firebase from "firebase";

export default {
  data() {
    return {
        msg: "Reschedule Appointment",
        date: new Date(),
        slot: [],
        datadoc: {},
        docsName: [],
        all: [],
        show: []
    };
  },
  computed: {
    attributes() {
      return this.show.map(t => ({
        //key: `todo.${t.id}`,
        dot: true,
        dates: t.date.toDate(),
        customData: t,
      }));
    },
  },

  methods: {
      fetchitems: function() {
          database
          .collection("consultslots")
          .where("clinic", "==", this.clinic)
          .orderBy("date")
          .get()
          .then((querySnapShot) => {
              let temp = []
              let temp2 = []
              let temp3 = {}
              let temp4 = [];
              this.docsName = []
              let item = {};
              querySnapShot.forEach((doc) => {
                item = doc.data();

                let item_year = item.date.toDate().getFullYear()
                let item_month = item.date.toDate().getMonth()
                let item_day = item.date.toDate().getDate()
                
                let filter_year = this.date.getFullYear()
                let filter_month = this.date.getMonth()
                let filter_day = this.date.getDate()

                if (item.patient == null && new Date() <= item.date.toDate()) {
                    if (temp3[item_year + " " + item_month + " " + item_day] == undefined) {
                        temp3[item_year + " " + item_month + " " + item_day] = [item]
                      } else {
                        temp3[item_year + " " + item_month + " " + item_day].push(item)
                      }
                    let item2 = item
                    item2.id = doc.id;
                    database
                    .collection("doctors")
                    .doc(item.doctor)
                    .get()
                    .then((doc) => {
                      let docName = doc.data().name;
                      //console.log(docName)
                      item2.doctorName = docName
                      //console.log(item)
                      temp.push(item2)
                      
                      if (item_year == filter_year && item_month == filter_month && item_day == filter_day) {
                      temp2.push(item2);
                      if (this.docsName.includes(docName) == false){
                        this.docsName.push(docName)
                      }}
                    })
                } 
              });
              this.all = temp
              this.slot = temp2
              for (var s in temp3) {
              while (temp3[s].length > 3) {
                if (temp3[s][0].patient) {
                  let item = temp3[s][0]
                  temp3[s].pop()
                  temp3[s].push(item)
                }
                temp3[s].pop()
              }
              for (var ss in temp3[s]) {
                temp4.push(temp3[s][ss])
              }
            }
            this.show = temp4
            });
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
                          conditions: this.consult[0].conditions
                      })
                      .then(() => {
                        this.$router.push("/patienthome")
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
        .where(firebase.firestore.FieldPath.documentId(), "==", this.consult[0].patient)
        .get()
        .then((querySnapShot) => {
                let item = {};
                querySnapShot.forEach((doc) => {
                    item = doc.id;
                    let itema = doc.data()
                    console.log(itema.upcoming[1])
                    let newmap = itema.appointment_history
                    var index = newmap[this.clinic].indexOf(itema.upcoming[1])
                    if (index != -1) {
                      newmap[this.clinic].splice(index, 1, day + ' ' + monthNames[monthIndex] + ' ' + year)
                    }
                    database.collection("patients").doc(item).update({
                      appointment_history: newmap
                    })
                    /*
                    database.collection("patients").doc(item).update({
                      appointment_history: firebase.firestore.FieldValue.arrayRemove(itema.upcoming[1])
                    })
                    database.collection("patients").doc(item).update({
                      appointment_history: firebase.firestore.FieldValue.arrayUnion(day + ' ' + monthNames[monthIndex] + ' ' + year)
                    })
                    */
                    database.collection("patients").doc(item).update({
                            upcoming: {
                                0: "online",
                                1: day + ' ' + monthNames[monthIndex] + ' ' + year,
                                2: this.formatTime(this.datadoc.date),
                                3: itema.upcoming[3]
                            }
                        })
                    console.log("online appt has been changed")
                })
        })

      },

       changeBooking: function(id) {
        database
        .collection("consultslots")
        .where("doctor", "==", this.consult[0].doctor)
        .where("date", "==", this.consult[0].date)
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.id;
            database.collection("consultslots").doc(item).update({
              patient: null,
              conditions: null,
              rating: 0,
            })
          })
        })

        this.getdoc(id);
        database
        .collection("consultslots")
        .doc(id)
        .update({
            patient: this.consult[0].patient,
            conditions: this.consult[0].conditions,
            rating: 0
        })
        .then(() => {
          alert("Appointment Changed")
        })
        },

        routeHome: function() {
            this.$router.push('/patienthome')
        },
  },
    created() {
      this.fetchitems();
      console.log(this.consult)
    },
    
  watch: {
    date: function () {
      this.slot = [];
      this.docsName = []
      let date_year = this.date.getFullYear();
      let date_month = this.date.getMonth()
      let date_day = this.date.getDate()
      this.slot = this.all.filter(t => t.date.toDate().getDate() == date_day && 
      t.date.toDate().getMonth() == date_month && t.date.toDate().getFullYear() == date_year)
      for (var s of this.slot) {
        if (this.docsName.includes(s.doctorName) == false) {
          this.docsName.push(s.doctorName)
        }
      }
    },
  },

  props: {
      consult: Array,
      patientId: String,
      clinic: String
  },
}
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
</style>