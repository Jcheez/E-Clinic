<template>
  <div>
    <h4>Manage Payments</h4>
    <div id="sideNavBar">
      <router-link to="/patienthome" id="clinic">E-Clinic</router-link>

      <router-link to="/makebooking">Make A Booking</router-link>

      <router-link to="/pending">Pending Booking</router-link>

      <router-link to="/viewdocuments">View Documents</router-link>

      <router-link to="/managepayments">Manage Payments</router-link>

      <router-link to="/patientsettings">Settings</router-link>

      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <!--hr /-->
    <div id="hard">
      <span>
        You have <b>{{ Object.keys(outstanding).length }}</b> outstanding
        invoices
      </span>
      <span>Digital payment methods accepted:</span>
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
            <span style="white-space: nowrap">
              Outstanding payment from {{ value }}
            </span>
            <span>Outstanding amount: ${{ name[0].toFixed(2) }}</span>
            <span>
              Please make payment by
              <p
                style="color: red; display: inline-block"
                v-html="getDueDate(value)"
              >
                <!--{{ this.getDueDate(value) }}{{ this.getDueDate(value)
                }}-->
              </p>
            </span>

            <div v-for="(clinic, index) in qrCode" :key="index">
              <div v-if="clinic[0] == name[1]" id="paydetails">
                <p style="position: relative; margin-left: 10px">
                  Interbank transfer: {{ clinic[2] }}
                </p>
                <img
                  v-bind:src="clinic[1]"
                  width="175"
                  height="175"
                  alt="Clinic does not presently accept digital payments via QR code. Please use interbank transfer."
                />
              </div>
            </div>
          </div>

          <div v-else-if="name[0] == amountPaid[value][0]">
            <span
              style="position: relative; top: 65px; left: 5px; font-size: 35px"
            >
              Payment Completed for {{ value }}!
            </span>
          </div>

          <div v-else>
            <span style="white-space: nowrap">
              Outstanding payment from {{ value }}
            </span>
            <span>
              Outstanding amount: ${{
                (name[0] - amountPaid[value][0]).toFixed(2)
              }}
            </span>
            <span
              >Please make payment by
              <p
                style="color: red; display: inline-block"
                v-html="getDueDate(value)"
              >
                <!--{{ this.getDueDate(value) }}-->
              </p>
            </span>
            <div v-for="(clinic, index) in qrCode" :key="index">
              <div v-if="clinic[0] == name[1]" id="paydetails">
                <p style="position: relative; margin-left: 10px">
                  Interbank transfer: {{ clinic[2] }}
                </p>
                <img v-bind:src="clinic[1]" width="175" height="175" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!--button id="home" v-on:click="routeHome()">Back to Home</button-->
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
      this.$router.push("/patientlogin");
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
          //console.log("empty");
        } else if (this.amountPaid[x][0] == details[0]) {
          //console.log(2);
          delete this.outstanding[x];
        } else {
          //console.log(this.outstanding);
        }
      }
      this.$forceUpdate();
    },
    getDueDate: function (dateString) {
      let DMY = dateString.split(" ");
      //console.log(DMY);
      let formatDateString =
        DMY[1] + " " + DMY[0] + ", " + DMY[2] + " 00:00:00";
      //console.log(formatDateString);
      let dueDate = new Date(formatDateString);
      dueDate.setDate(dueDate.getDate() + 14);
      const allMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let newString =
        dueDate.getDate().toString() +
        " " +
        allMonths[dueDate.getMonth()] +
        " " +
        dueDate.getFullYear().toString();
      //console.log(newString);
      return newString;
    },
  },

  created() {
    this.getQrCode();
    this.getMoneyInOut();
  },

  beforeUpdate() {
    //console.log(this.outstanding);
    this.formatter();
    //console.log("Done");
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
  /*overflow-y: hidden; /*idk why some will have vertical scroll bar on sideNavBar */
}

#sideNavBar #clinic {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
}

#sideNavBar #clinic:hover {
  cursor: pointer;
}

div#hard {
  position: absolute;
  top: 120px;
  left: 300px;
  /*font-size: 25px;*/
  font-size: 20px;
  text-align: left;
  font-family: Nunito;
}
span {
  display: block;
  margin: 10px 0px 10px 10px;
}
#payments {
  position: absolute;
  left: 280px;
  top: 300px;
  font-size: 16px;
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
  width: 700px;
  height: 250px;
  /*left: 73px;
  top: 400px;*/
  border: 1px solid rgb(0, 114, 180);
  border-radius: 8px;
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding-left: 10px;
  /*padding-top: 20px;*/
  display: block;
  font-family: Nunito;
  font-size: 18px;
  margin: 20px;
  text-align: left;
}

p {
  position: relative;
  left: 0px;
  display: block;
  text-align: left;
  font-size: 18px;
  width: 400px;
  margin: 10px 0px 10px 10px;
}

div#paydetails {
  position: absolute;
  text-align: left;
  float: left;
  display: inline-block;
  font-size: 18px;
  width: 300px;
  left: 410px;
  top: 0px;
  border-left: 1px solid rgb(0, 114, 180);
  height: 100%;
}
img {
  display: inline-block;
  position: absolute;
  margin: 10px;
  left: 10px;
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