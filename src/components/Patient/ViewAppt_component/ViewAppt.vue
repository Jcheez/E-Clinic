<template>
  <div>
      <h1>{{ msg }}</h1>
      <div id="online">
        <span>{{ "Clinic: " + this.itemsList[0].clinic }}</span>
        <span>{{ "Doctor: " + this.itemsList[0].name }}</span>
        <span>{{ "Date: " + formatDate(this.date) + " " + formatTime(this.date) }}</span>
        <span>{{ "Zoom Link: " }} <a v-bind:href="this.itemsList[0].zoom">Link</a> </span>
      </div>
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
                .collection("consultslots")
                .where("patient", "==", x)
                .get()
                .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        var today = new Date()
                        item = doc.data();
                        if (item.date.seconds * 1000 >= today.getTime()) {
                            this.date = new Date(item.date.seconds * 1000)
                            console.log(item.doctor)
                            database
                                .collection("doctors")
                                .where(firebase.firestore.FieldPath.documentId(), "==", item.doctor)
                                .get()
                                .then((querySnapShot) => {
                                    let item1 = {};
                                    querySnapShot.forEach((doc) => {
                                        item1 = doc.data();
                                        this.itemsList.push(item1);
                                        console.log(this.itemsList)
                                        })
                                        
                                })
                        }
                    });
                });
            },
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
span {
  display: block;
  text-align: left;
}
</style>