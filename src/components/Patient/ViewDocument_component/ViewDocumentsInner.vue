<template>
  <div id="container">
    <div id="sideNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/makebooking">Make A Booking</router-link>
      <router-link to="/pending">Pending Booking</router-link>
      <router-link to="/viewdocuments">View Documents</router-link>
      <router-link to="/viewappt">View Appointments</router-link>
      <router-link to="/managepayments">Manage Payments</router-link>
      <router-link to="/patientsettings">Settings</router-link>
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <h4>Documents</h4>
    <div id="main">
      <div id="emptyDiv" v-if="!docschecker()">
        <p>Clinic has not uploaded any documents.<br>Please check again later.</p>
      </div>
      <ul v-if="docschecker()" id="patients">
        <li v-for="(doc, name, index) in this.itemsList[0]" :key="index">
          <div id="inner">
            {{ name + ": " }} <p id="url" v-on:click="opendoc(doc)">Click to View</p>
          </div>
        </li>
      </ul>
    </div>
    <button id="back" v-on:click="routeBack()">Back to Appointment List</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import database from "../../../firebase.js";
export default {
    data() {
        return {
            msg: "Patient's Notes ",
            itemsList: [],
            patientId: localStorage.getItem("uidPatient")
        }
    },

    props: {
      apptDate: String,
      clinic: String
    },
    computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
    },
    methods: {
      ...mapActions(["signOutAction"]),
      signOut() {
        this.signOutAction();
        this.$router.push("/patientlogin");
      },
        fetchItems: function () {
          
          console.log(this.patientId)
            database
                .collection("patients")
                .doc(this.patientId)
                .get()
                .then((querySnapShot) => {
                    let item = {};
                    item = querySnapShot.data().notes[this.clinic];
                    if(item[this.apptDate] != undefined) {
                      if (Object.keys(item[this.apptDate]).length !== 0) {
                        this.itemsList.push(item[this.apptDate]);
                      }
                    }
                });
        },

        docschecker: function() {
          //console.log(this.itemsList)
          if (this.itemsList.length > 0) {
            return true;
          } else {
            return false;
          }
        },

        opendoc: function(url) {
          window.open(url, "_blank");
          console.log("reached here")
        },

        routeBack: function() {
            this.$router.push('/viewdocuments')
        },
    },

    created() {
        this.fetchItems();
    },
};

</script>

<style scoped>
#container {
  position: relative;
}
#main {
  position: absolute;
  top: 100px;
}

#sideNavBar a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 17px;
  letter-spacing: 2px;
  margin: 50px 0 0 0;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  width: 90%;
}

#sideNavBar a:hover {
  font-size: 18px;
  color: white;
  cursor: pointer;
}

#sideNavBar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
  height: 100%;
}

#sideNavBar h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 0px 0px;
}

h4 {
  font-family: Nunito;
  padding: 30px 0 0 0;
  margin-bottom: -30px;
  font-size: 32px;
  position: absolute;
  left: 300px;
}

ul {
  float: left;
  margin-top: 50px;
}

li {
  width: 400px;
  height: 76px;
  border-radius: 4px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.377);
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding: 10px 0 0 0;
  display: block;
  left: 320px;
  position: absolute;
}

div #inner {
  width: 70%;
  display: inline-block;
  font-family: Nunito;
  position: relative;
  top: 14px;
  left: 30px;
  display: block;
  text-align: left;
  font-size: 22px;
  font-weight: bold;
}

p#url{
  display: inline;
  color: rgb(0, 114, 180);
  text-decoration: underline;
  position: relative;
  right: -120px;
  font-size: 20px;
  font-weight: normal;
}

button#back {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  color: white;
  letter-spacing: 2px;
  width: 180px;
  height: 50px;
  background-color:  rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  position: absolute;
  top: 300px;
  right: 40px;
  font-size: 14px;
  font-family: Nunito;
}

button#back:hover {
    cursor: pointer;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

div#emptyDiv {
  position: absolute;
  width: 400px;
  height: 76px;
  display: block;
  left: 320px;
  top: 60px;
  font-size: 18px;
  font-family: Nunito;
  white-space: nowrap;
  padding: 10px 0 0 0;
  text-align: center;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.377);
}
</style>