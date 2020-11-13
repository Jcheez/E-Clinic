<template>
  <div>
    <h4>Manage Payments</h4>
    <div id="sideNavBar">
      <h3>E-Clinic</h3>

      <router-link to="/makebooking">Make A Booking</router-link>

      <router-link to="/pending">Pending Booking</router-link>

      <router-link to="/viewdocuments">View Documents</router-link>

      <router-link to="/managepayments">Manage Payments</router-link>

      <router-link to="/patientsettings">Settings</router-link>

      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <!--hr /-->
    <div id="hard">
      <p>
        You have <b>{{ Object.keys(outstanding).length }}</b> outstanding
        invoices
      </p>
      <p>Digital payments are available for:</p>
      <ul>
        <li>PayNow</li>
        <li>DBS PayLah</li>
        <li>UOB Mighty</li>
        <li>OCBC PayAnyone</li>
      </ul>
    </div>
    <ul id="payments">
      <li
        v-for="(name, value, index) in this.outstanding"
        :key="index"
        id="iter"
      >
        <div id="inner">
          <div v-if="amountPaid[value] == undefined">
            <span style="white-space: nowrap"
              >Outstanding payment from {{ value }}</span
            >
            <span> Outstanding amount: ${{ name[0].toFixed(2) }} </span>
            <div v-for="(clinic, index) in qrCode" :key="index">
              <div v-if="clinic[0] == name[1]" id="paydetails">
                <p style="font-size: 20px; position: relative; left: 65px">
                  Interbank transfer: {{ clinic[2] }}
                </p>
                <img v-bind:src="clinic[1]" width="175" height="175" />
              </div>
            </div>
          </div>

          <div v-else-if="name[0] == amountPaid[value][0]">
            <span
              style="position: relative; top: 65px; left: 5px; font-size: 35px"
              >Payment Completed for {{ value }}!</span
            >
          </div>

          <div v-else>
            <span style="white-space: nowrap"
              >Outstanding payment from {{ value }}</span
            >
            <span>
              Outstanding amount: ${{
                (name[0] - amountPaid[value][0]).toFixed(2)
              }}
            </span>
            <div v-for="(clinic, index) in qrCode" :key="index">
              <div v-if="clinic[0] == name[1]" id="paydetails">
                <p style="font-size: 20px; position: relative; left: 65px">
                  Interbank transfer: {{ clinic[2] }}
                </p>
                <img v-bind:src="clinic[1]" width="175" height="175" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button id="home" v-on:click="routeHome()">Back to Home</button>
  </div>
</template>

<script>
import database from "../../../firebase.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      //msg: "Manage Payments",
      patient: localStorage.getItem("uidPatient"),
      qrCode: [],
      amountPaid: {},
      outstanding: {},
    };
  },

  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
    getQrCode: function () {
      database
        .collection("clinics")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            if (item.qrCode == undefined) {
              this.qrCode.push([item.name, "", ""]);
            } else {
              this.qrCode.push([item.name, item.qrCode, item.interBank]);
            }
          });
        });
    },

    getMoneyInOut: function () {
      database
        .collection("patients")
        .doc(this.patient)
        .get()
        .then((doc) => {
          let item = {};
          item = doc.data();
          this.amountPaid = item.amountPaid;
          this.outstanding = item.outstandingAmount;
        });
    },

    formatter: function () {
      for (let x in { ...this.outstanding }) {
        let details = this.outstanding[x];
        if (this.amountPaid[x] == undefined) {
          console.log("empty");
        } else if (this.amountPaid[x][0] == details[0]) {
          console.log(2);
          delete this.outstanding[x];
        } else {
          console.log(this.outstanding);
        }
      }
      this.$forceUpdate();
    },

    routeHome: function () {
      this.$router.push("/patienthome");
    },
  },

  created() {
    this.getQrCode();
    this.getMoneyInOut();
  },

  beforeUpdate() {
    console.log(this.outstanding);
    this.formatter();
    console.log("Done");
  },

  props: {},
};
</script>

<style scoped>
h4 {
  position: absolute;
  left: 300px;
  font-family: Nunito;
  padding: 30px 0 0 0;
  font-size: 32px;
  top: 0px;
}
#sideNavBar h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 0px 0px;
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
}
/*hr {
  position: absolute;
  width: 1459px;
  height: 40px;
  left: 580px;
  top: 75px;
  background-color: rgb(0, 114, 180);
}*/
/*h1 {
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

hr {
  position: absolute;
  width: 1459px;
  height: 40px;
  left: 520px;
  top: 250px;
  background-color: #1677cf;
}*/

div#hard {
  position: absolute;
  top: 120px;
  left: 300px;
  /*font-size: 25px;*/
  font-size: 20px;
  text-align: left;
  font-family: Nunito;
}
#payments {
  position: absolute;
  left: 300px;
  top: 350px;
  font-size: 18px;
  padding-inline-start: 0px;
}
div#inner {
  width: 70%;
  display: inline-block;
  font-size: 18px;
  font-family: Nunito;
}

li#iter {
  position: relative;
  width: 562px;
  height: 320px;
  /*left: 73px;
  top: 400px;*/
  border: 1px solid rgb(0, 114, 180);
  border-radius: 8px;
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  /*padding-left: 10px;
  padding-top: 20px;*/
  display: block;
  font-family: Nunito;
  font-size: 18px;
  margin: 20px;
}

span {
  position: relative;
  top: 14px;
  left: -50px;
  display: block;
  text-align: left;
  font-size: 20px;
}

div#paydetails {
  position: relative;
  left: -162px;
}

button {
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
  display: block;
  width: 150px;
  text-align: center;
  margin-left: 20px;
  height: 60px;
  left: 1000px;
  top: 385px;
}
button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
</style>