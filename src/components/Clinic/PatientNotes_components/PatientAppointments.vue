<template>
  <div id="container">
    <div id="sideNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/clinichome">Dashboard</router-link><br />
      <router-link to="/doctorslist">Doctors</router-link><br />
      <router-link to="/patientsnotes">Patient Notes</router-link><br />
      <router-link to="/pendingbooking">Pending</router-link><br />
      <router-link to="/clinicsettings">Settings</router-link><br />
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <h4>Past Appointments</h4>
    <p id="pat">Patient: {{patientName2}}</p>
    <div id="main">
      <div v-if="this.data2.length != 0">
        <ul id="patients">
          <li v-for="(patient, index) in this.data2" :key="index">
            <div id="inner">
              <span>{{ patient }}</span>
            </div>
            <button id="view">
              <router-link :to="{ name:'uploaddocuments', params: {patientName: patientName2, appointmentDate: patient}}">View</router-link>
            </button>
          </li>
        </ul>
      </div>
      <div id="emptyDiv" v-if="this.data2.length == 0">
        <p id="empty"> Past Appointment Date(s) not found</p>
      </div>
    </div>
    <div id="searchBar">
      <input
        id="searchbox"
        type="text"
        placeholder="Search Date..."
        name="search"
        v-model="nameQuery"
        v-on:keyup.enter="dateSearch()"
      />
      <button id="searchbox" type="submit" v-on:click="dateSearch()">Search</button><br>
    </div>
    <button id="home" v-on:click="routeHome()">Back to Patients</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
        msg: "Patient's Notes ",
        data: {...this.apptDates},
        nameQuery: ""   ,
        patientName2: this.patientName,
        clinicName: localStorage.getItem("clinicName"),
        data2: {...this.apptDates}[localStorage.getItem("clinicName")],
    };
  },
  props: {
      apptDates: Object,
      patientName: String,
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
      dateSearch: function() {
      let copied = this.data[this.clinicName];
      copied = copied.filter(x => x.includes(this.nameQuery))
      this.data2 = copied;
      if (this.nameQuery.localeCompare("") == 0) {
        this.data2 = this.apptDates[this.clinicName];
        
      }
      this.$forceUpdate();
    },

    routeHome: function() {
        this.$router.push('/patientsnotes')
    },
  },
  created() {
    if (this.patientName2 == null || this.data == null) {
        console.log("j")
        this.patientName2 = localStorage.getItem('pn4name');
        this.data2 = JSON.parse(localStorage.getItem('pn4date'))[localStorage.getItem("clinicName")];
    } else if (this.patientName2.localeCompare(localStorage.getItem('pn4name')) != 0 || JSON.stringify(this.data).localeCompare(localStorage.getItem('pn4date')) != 0) {
        console.log("k")
        localStorage.setItem('pn4name', this.patientName2);
        localStorage.setItem('pn4date', JSON.stringify(this.data));

        this.patientName2 = localStorage.getItem('pn4name');
        this.data2 = JSON.parse(localStorage.getItem('pn4date'))[localStorage.getItem("clinicName")];
    } else {
         console.log("l")
        this.patientName2 = localStorage.getItem('pn4name');
        this.data2 = JSON.parse(localStorage.getItem('pn4date'))[localStorage.getItem("clinicName")];
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
#container {
  position: relative;
}
#main {
  position: absolute;
  top: 120px;
}

h4 {
  font-family: Nunito;
  padding: 30px 0 0 0;
  margin-bottom: -30px;
  font-size: 32px;
  position: absolute;
  left: 250px;
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
  height: 60px;
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

p#pat {
  position: absolute;
  left: 360px;
  top: 86px;
  font-family: Nunito;
  margin: 40px -30px 0px -100px;
  font-size:22px;
  color: rgb(0, 114, 180);
}

li a {
  color: white;
  text-decoration: none;
}

#emptyDiv {
  border-radius: 8px;
  width: 500px;
  height: 100px;
  font-size: 18px;
  margin-left: 240px;
  margin-top: 40px;
  box-shadow: 0 4px 8px -4px  rgba(0, 0, 0, 0.377);
}

#empty {
  font-family: Nunito;
  text-align: center;
  padding: 40px 10px 10px 10px;
}

button#home {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  color: white;
  letter-spacing: 2px;
  width: 94px;
  height: 46px;
  background-color:  rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  position: absolute;
  top: 300px;
  right: 100px;
  font-size: 14px;
  font-family: Nunito;
}

button#home:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
</style>