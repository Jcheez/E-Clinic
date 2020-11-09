<template>
  <div id="container">
    <div id="sideNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/clinichome">Dashboard</router-link><br />
      <router-link to="/doctorslist">Doctors</router-link><br />
      <router-link to="/clinicsettings">Settings</router-link><br />
      <router-link to="/patientsnotes">patientsnotes</router-link><br>
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <h4>List of Patients</h4>
    <div id="emptyDiv" v-if="this.itemsList.length == 0">
      There are no patients yet!
    </div>
    <div id="main">
      <div id="patientList" v-if="this.itemsList.length != 0">
        <ul id="patients">
          <li v-for="(patient, index) in this.itemsList" :key="index">
            <div id="inner">
              <span>{{ "Name: " + patient.name }}</span>
            </div>
            <button id="view">
              <router-link :to="{ name:'appointments', params: {apptDates: patient.appointment_history, patientName: patient.name, clinicName: clinic}}">View</router-link>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div id="searchBar">
      <input
        id="searchbox"
        type="text"
        placeholder="Search patient..."
        name="search"
        v-model="nameQuery"
        v-on:keyup.enter="nameSearch()"
      />
      <button id="searchbox" type="submit" v-on:click="nameSearch()">Search</button>
      <!-- <button id="home" v-on:click="routeHome()">Back to Home</button> -->
    </div>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
import database from "../../../firebase.js";
export default {
  data() {
    return {
      itemsList: [],
      nameQuery: "",
      data: [],
      clinic: localStorage.getItem("clinicName")
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },

  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
    nameSearch: function() {
      let copied = this.data;
      copied = copied.filter(x => x.name.includes(this.nameQuery))
      this.itemsList = copied;
      if (this.nameQuery.localeCompare("") == 0) {
        this.itemsList = this.data;
      }
      this.$forceUpdate();      
    },

    fetchItems: function () {
      database
        .collection("patients")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            if (item.appointment_history[this.clinic] != undefined) {
              this.itemsList.push(item);
              this.data.push(item);
            }
            
          });
        });
    },

    routeHome: function() {
        this.$router.push('/clinichome')
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
#container {
  position: relative;
}

#main {
  position: absolute;
  top: 80px;
}

h4 {
  position: absolute;
  left: 250px;
  font-family: Nunito;
  padding: 30px 0 0 0;
  font-size: 32px;
}

#sideNavBar a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 16px;
  letter-spacing: 2px;
  margin: 60px 0 0 0;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

#sideNavBar a:hover {
  font-size: 17px;
  color: white;
  cursor: pointer;
}

#sideNavBar {
  width: 180px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
}

#sideNavBar h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 20px 0px;
}

div #inner {
  width: 50%;
  display: inline-block;
}

ul {
  float: left;
  margin-left: 200px;
  margin-top: 50px;
}

li {
  width: 400px;
  height: 76px;
  border-radius: 4px;
  box-shadow: 0 4px 8px -4px  rgba(0, 0, 0, 0.377);
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding: 10px 0 0 0;
  display: block;
}

span {
  font-family: Nunito;
  position: relative;
  top: 14px;
  display: block;
  text-align: left;
  font-size: 18px;
}

#searchBar {
  position: absolute;
  top: 30px;
  right: 100px;
}

input#searchbox {
  margin-left: 100px;
  margin-top: 50px;
  font-size: 16px;
  font-family: Nunito;
}

button#view {
  position: relative;
  transition: box-shadow 0.3s;
  transition: 0.3s;
  top: 12px;
  left: 30px;
  width: 85px;
  height: 30px;
  background-color: rgb(0, 114, 180);
  border: none;
  /* border-radius: 15px; */
  font-size: 16px;
  font-family: Nunito;
  border-radius: 4px;
}

button#view:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

button:hover {
  cursor: pointer;
}
button:focus {
  outline: none;
}

button#searchbox {
  font-family: Nunito;
  margin-top: 50px;
  font-size: 16px;
  background-color:rgb(0, 114, 180);
  color: white;
  border-color: rgb(0, 114, 180);
}

li a {
  color: white;
  text-decoration: none;
}

p#display {
  font-size: 30px;
  position:absolute;
  top:500px;
  left: 200px;
}

div#emptyDiv{
    position:absolute;
    top:150px;
    left: 250px;
    height: 40px;
    width: 400px;
    font-size: 18px;
    font-family: Nunito;
    white-space: nowrap;
    padding: 20px 10px 0px 10px;
    text-align: center;
    box-shadow: 0 4px 8px -4px  rgba(0, 0, 0, 0.377);
}
</style>
