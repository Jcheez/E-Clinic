<template>
  <div class="docs">
    <h1>Doctor Profiles</h1>
    <div id="sideNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/clinichome">Dashboard</router-link><br />
      <router-link to="/doctorslist">Doctors</router-link><br />
      <router-link to="/patientsnotes">Patient Notes</router-link><br />
      <router-link to="/pendingbooking">Pending</router-link><br />
      <router-link to="/clinicsettings">Settings</router-link><br />
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <div v-if="!status">
      <ul id="indivDoctor" style="list-style-type: none">
        <li v-for="d in doctors" v-bind:key="d.dNum">
          {{ d.dName }} <br /><br />
          {{ d.dNum }}
          <router-link
            id="apptment"
            :to="{ name: 'doctorAppt', params: { currDoctor: d } }"
          ></router-link>
        </li>
      </ul>
    </div>
    <button id="manageD" v-on:click="toggle">
      {{ text }}
    </button>
    <div id="manageDoc" v-if="status">
      <!--class="manageDoc"-->
      <manageDoctor
        v-bind:doctors="this.doctors"
        @fetchItems="fetchItems"
      ></manageDoctor>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import database from "../../firebase";
import manageDoctor from "./ManageDoctors";

export default {
  data() {
    return {
      doctors: [],
      text: "Manage Doctors",
      status: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  components: {
    manageDoctor,
  },
  watch: {
    status: function () {
      if (this.text == "Manage Doctors") {
        this.text = "Back";
      } else {
        this.text = "Manage Doctors";
      }
      //this.fetchItems();
    },
  },

  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
    toggle: function () {
      this.status = !this.status;
    },
    //Must modify clinic to be the one currently logged in not hardcode a clinic
    fetchItems: function () {
      let x = this.getUser.displayName;
      console.log(x);
      //let doctorList = [];
      database
        .collection("doctors")
        .where("clinic", "==", x)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var doctorIndiv = { dNum: doc.id, dName: doc.data().name };
            this.doctors.push(doctorIndiv);
            //this.doctorNames.push(doc.data().name);
            //this.doctorList[doc.id] = doc.data().name;
            console.log(doc.id);
            console.log(doc.data().name);
          });
        });
      //console.log(this.doctorList);
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 18px;
  letter-spacing: 2px;
  margin: 60px 0 0 0;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

a:hover {
  font-size: 18px;
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

h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 20px 0px;
}

li {
  color: black;
  width: 100px;
  height: 100px;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 3px;
  position: relative;
  margin: 10px;
  left: 200px;
  text-align: center;
  display: inline-block;
  float: left;
  font-family: Nunito;
  font-size: 18px;
}
#apptment {
  display: block;
  width: 100px;
  height: 100px;
  cursor: pointer;
  left: 0px;
  top: -120px;
  position: relative;
}

a[href="/appointment"] {
  margin: 0 0 0 0;
}
p {
  display: block;
  float: left;
  left: 200px;
}
#manageD {
  transition: 0.3s;
  position: absolute;
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  font-weight: bold;
  font-size: 14px;
  color: white;
  letter-spacing: 3px;
  outline: none;
  display: inline-block;
  width: 100px;
  text-align: center;
  left: 1000px;
}
button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
#indivDoctor {
  width: 700px;
}
#manageDoc {
  width: 800px;
  margin: 10px;
  flex-direction: column;
  align-items: center;
}
</style>