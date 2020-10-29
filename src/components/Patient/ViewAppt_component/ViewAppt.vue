<template>
  <div>
      <h1>{{ msg }}</h1>
      <div v-if="noupcoming != null" id="noupcoming">{{ this.noupcoming }}</div>
      <div v-if="this.physicalList.length > 0" id="physical">
        <span>{{ "Date: " + this.physicalList[0][1] + " " + this.physicalList[0][2] }}</span>
        <span>Consult Type: Physical</span>
        <span>Add clinic name when it is props into pendingbooking >> patientupcoming</span>
      </div>
      <div v-if="this.itemsList.length > 0" id="online">
        <span>{{ "Clinic: " + this.itemsList[0].clinic }}</span>
        <span>{{ "Doctor: " + this.itemsList[0].name }}</span>
        <span>{{ "Date: " + this.date}}</span>
       <!-- <span>{{ "Date: " + formatDate(this.date) + " " + formatTime(this.date) }}</span> -->
        <span>{{ "Zoom Link: " }} <a v-bind:href="this.itemsList[0].zoom">Link</a> </span>
        <button id="reschedule" v-on:click="reschedule()">Reschedule Appointment</button>
      </div>
      <button id="home" v-on:click="routeHome()">Back to Home</button>
  </div>
</template>

<script>
import database from "../../../firebase.js";
import * as firebase from "firebase";

export default {
    data() {
        return {
        msg: "View Appointment",
        itemsList: [],
        consult: [],
        physicalList:[],
        noupcoming: null,
        date: "",
        name: "Timothy"
        /* Remember to change this part when login is finished and props can be passed
                props: {
                    name: "",
                    phonenum: ""
                } */
        };
    },

    methods: {
        routeHome: function() {
            this.$router.push('/patienthome')
        },

        reschedule: function() {
            this.$router.push({
                name: "rebook",
                params: {
                    consult: this.consult
                }
            })
        },

        formatDate: function(date) {
          let ldate = date.toLocaleDateString().split("/")
          let i0 = ldate[0]
          ldate[0] = ldate[1]
          ldate[1] = i0
          return ldate.join("/")
        },

        formatTime: function(time) {
          let ltime =  time.toLocaleTimeString().replace(" ", ":").split(":")
          ltime.splice(2,1)
          return ltime[0] + ":" + ltime[1] + " " + ltime[2]
        },

        fetchItems: function () {
            var x = this.name;
            database
                .collection("patients")
                .where("name", "==", x)
                .get()
                .then((querySnapShot) => {
                    let itemx = {};
                    querySnapShot.forEach((doc) => {
                        itemx = doc.data();
                        this.noupcoming = null;
                        var today = new Date()
                        if (Date.parse(itemx.upcoming[1]) > today.getTime() || 
                        (Date.parse(itemx.upcoming[1]) == today.getTime() && 
                        itemx.upcoming[2].localeCompare(today.getHours() + "" + today.getMinutes() > 0 ))) {
                            if (itemx.upcoming[0] == "physical") {
                                console.log("hello")
                                this.physicalList.push(itemx.upcoming);
                            } else if (itemx.upcoming[0] == "online") {
                                database
                                    .collection("consultslots")
                                    .where("patient", "==", x)
                                    .get()
                                    .then((querySnapShot) => {
                                        let item = {};
                                        querySnapShot.forEach((doc) => {
                                            var today = new Date()
                                            item = doc.data();
                                            if (item.date.seconds * 1000 >= today.getTime()) {
                                                this.consult.push(item);
                                                this.date = itemx.upcoming[1] + " " + itemx.upcoming[2];
                                                //this.date = new Date(item.date.seconds * 1000)
                                                database
                                                    .collection("doctors")
                                                    .where(firebase.firestore.FieldPath.documentId(), "==", item.doctor)
                                                    .get()
                                                    .then((querySnapShot) => {
                                                        let item1 = {};
                                                        querySnapShot.forEach((doc) => {
                                                            item1 = doc.data();
                                                            this.itemsList.push(item1);
                                                        })
                                                            
                                                    })
                                            }
                                        });
                                    });
                            }
                        } else {
                            this.noupcoming = "You have no upcoming booking."
                        }
                    })
                })
        }
    },
    created() {
        this.fetchItems();
    },
};
</script>

<style scoped>
h1 {
  position: absolute;
  width: 372px;
  height: 57px;
  left: 86px;
  top: 220px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 42px;
  line-height: 57px;
  color: #000000;
}
div#online {
  position: relative;
  width: 562px;
  height: 140px;
  left: 100px;
  top: 210px;
}
div#physical {
  position: relative;
  width: 562px;
  height: 140px;
  left: 100px;
  top: 210px;
}
div#noupcoming {
  position: relative;
  width: 562px;
  height: 140px;
  left: 100px;
  top: 210px;
}
span {
  display: block;
  text-align: left;
}
button#home{
  position: relative;
  top: 250px;
}
</style>