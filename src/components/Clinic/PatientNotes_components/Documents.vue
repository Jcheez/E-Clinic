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
        <h4>Upload Documents</h4>
        <p id="name">Patient: {{pName}}</p>
        <p id="date">Appointment Date: {{appDate}}</p>
        <div id="mc">
            <h2>Medical Certificate</h2>
            <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.mc] == this.u" id="uploadermc1" type="Medical Certificate" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
            <div v-else id="uploadermc1">
                <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][mc]" target="_blank">View</a>
                <a id="removers" v-on:click="remove(mc)">Remove</a>
            </div>
        </div>
        <div id="invoice">
            <h2>Invoice</h2>
                <div v-if="this.outstandingMap[this.appDate] == undefined">
                <label id="outpayment" for="paybox">Enter Cost of Consultation:</label>
                <input type="text" id="paybox" name="paybox" >
                <input type="submit" id="submitpay" v-on:click="paybutton()">
            </div>
            <div v-else-if="this.outstandingMap[this.appDate][1].localeCompare(this.clinic) == 0" id=paybox>
                <label>Amount Outstanding:</label>
                <span>${{this.outstandingMap[this.appDate][0].toFixed(2)}}</span>
            </div>
            <label id="inpayment" for="receivebox">Enter Amount Received From Patient:</label>
            <input type="text" id="receivebox" name="receivebox">
            <input type="submit" id="submitreceive" v-on:click="receivebutton()">
            <div id="receivetext" v-if="this.amountPaidMap[this.appDate] == undefined">
                Patient has not paid.
            </div>
            <div id="receivetext" v-else-if="this.amountPaidMap[this.appDate][1].localeCompare(this.clinic) == 0">
                Patient has paid ${{this.amountPaidMap[this.appDate][0].toFixed(2)}}.
            </div>
            <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.i] == this.u" id="uploadermc2" type="Invoice" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
            <div v-else id="uploadermc2">
                <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][i]" target="_blank">View</a>
                <a id="removers" v-on:click="remove(i)">Remove</a>
            </div>
        </div>
        <div id="prescription">
            <h2>Prescription</h2>
            <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.p] == this.u" id="uploadermc3" type="Prescription" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
            <div v-else id="uploadermc3">
                <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][p]" target="_blank">View</a>
                <a id="removers" v-on:click="remove(p)">Remove</a>
            </div>
            <button id="home" v-on:click="routeHome()">Back to Dates</button> 
        </div>

        <!-- #####JJ's -->
        <!-- <h2 id="mc1">Medical Certificate</h2>
        <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.mc] == this.u" id="uploadermc1" type="Medical Certificate" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc1">
            <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][mc]" target="_blank">View</a>
            <a id="removers" v-on:click="remove(mc)">Remove</a>
        </div> -->
        <!-- <h2 id="mc2">Invoice</h2>
        <label id="outpayment" for="paybox">Amount Paid:</label>
        <div v-if="this.outstandingMap[this.appDate] == undefined">
            <input type="text" id="paybox" name="paybox" >
            <input type="submit" id="submitpay" v-on:click="paybutton()">
        </div>
        <div v-else-if="this.outstandingMap[this.appDate][1].localeCompare(this.clinic) == 0" id=paybox>
            The Patient has been asked to pay ${{this.outstandingMap[this.appDate][0].toFixed(2)}}
        </div>
        <label id="inpayment" for="receivebox">Amount received:</label>
        <input type="text" id="receivebox" name="receivebox">
        <input type="submit" id="submitreceive" v-on:click="receivebutton()">
        <div id="receivetext" v-if="this.amountPaidMap[this.appDate] == undefined">
            Patient has paid $0
        </div> -->
        <!-- <div id="receivetext" v-else-if="this.amountPaidMap[this.appDate][1].localeCompare(this.clinic) == 0">
            Patient has paid ${{this.amountPaidMap[this.appDate][0].toFixed(2)}}
        </div> -->
        <!-- <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.i] == this.u" id="uploadermc2" type="Invoice" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc2">
            <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][i]" target="_blank">View</a>
            <a id="removers" v-on:click="remove(i)">Remove</a>
        </div> -->
        <!-- <h2 id="mc3">Prescription</h2>
        <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.p] == this.u" id="uploadermc3" type="Prescription" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc3"> -->
            <!-- <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][p]" target="_blank">View</a>
            <a id="removers" v-on:click="remove(p)">Remove</a>
        </div>
        <button id="home" v-on:click="routeHome()">Back to Patients</button>  -->
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import uploader from "./uploadDocs.vue";
import database from "../../../firebase.js";

export default {
    data() {
        return {
            msg: "Patient's Notes ",
            pName: this.patientName,
            appDate: this.appointmentDate,
            docid: [],
            doc: {},
            mc: "Medical Certificate",
            i: "Invoice",
            p: "Prescription",
            u: undefined,
            outstandingMap: {},
            amountPaidMap: {},
            clinic: localStorage.getItem("clinicName"),
            newMessages: []
        }
    },

    props: {
      patientName: String,
      appointmentDate: String
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
        fetchItems: function () {
        database
        .collection("patients")
        .where('name', '==', this.pName)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.docid.push(doc.id);
            this.doc = doc.data().notes;
            this.outstandingMap = doc.data().outstandingAmount;
            this.amountPaidMap = doc.data().amountPaid;
            this.newMessages = doc.data().newNotifications;

          });
        });
        },

        remove: function (field) {

            let today = this.formatDate(new Date())
            this.newMessages.splice(0, 0, today + ": " + field + " has been removed")



            delete this.doc[this.clinic][this.appDate][field]
            database
            .collection('patients')
            .doc(this.docid[0])
            .update({
                notes: this.doc,
                newNotifications: this.newMessages
                })
            .then(() => {

            alert("Medical Certificate" + " deleted")
            location.reload()
            
            })
            
        },

        paybutton: function() {
            if (confirm("You can only submit this once, are you sure?")) {

                this.outstandingMap[this.appDate] = [parseFloat(document.getElementById("paybox").value), this.clinic]
                database
                .collection('patients')
                .doc(this.docid[0])
                .update({
                    outstandingAmount: this.outstandingMap
                })
                .then(() => {
                })
                this.$forceUpdate()
                
                
            }
        },

        receivebutton: function() {
            if (this.outstandingMap[this.appDate] == undefined) {
                alert("Invalid entry, patient has not been asked to pay any amount")
                return
            }else if (this.amountPaidMap[this.appDate] == undefined) {
                this.amountPaidMap[this.appDate] = [parseFloat(document.getElementById("receivebox").value), this.clinic]
            } else {
                this.amountPaidMap[this.appDate][0] += parseFloat(document.getElementById("receivebox").value)
            }
            if (this.outstandingMap[this.appDate][0] < this.amountPaidMap[this.appDate][0]) {
                alert("Invalid entry, amount paid by patient is more than amount charged by clinic")
                this.amountPaidMap[this.appDate][0] -= parseFloat(document.getElementById("receivebox").value)
                return
            }
            database
                .collection('patients')
                .doc(this.docid[0])
                .update({
                    amountPaid: this.amountPaidMap
                })
                .then(() => {
                })
                this.$forceUpdate()
        },

        routeHome: function() {
            this.$router.push('/patientsnotes/appointments')
        },

        formatDate: function(date) {
            let filter_year = date.getFullYear()
            let filter_month = date.getMonth() + 1
            let filter_day = date.getDate()
            return filter_day + "/" + filter_month + "/" + filter_year
        },
    },

    created() {

        if (this.pName == null || this.appDate == null) {
            this.pName = localStorage.getItem('pn3name');
            this.appDate = localStorage.getItem('pn3date');
        } else if (this.pName.localeCompare(localStorage.getItem('pn3name')) != 0 || this.appDate.localeCompare(localStorage.getItem('pn3date')) != 0) {
            localStorage.setItem('pn3name', this.pName);
            localStorage.setItem('pn3date', this.appDate);

            this.pName = localStorage.getItem('pn3name');
            this.appDate = localStorage.getItem('pn3date');
        } else {
            this.pName = localStorage.getItem('pn3name');
            this.appDate = localStorage.getItem('pn3date');
        }

        this.fetchItems();
    },

    components: {
        'uploader': uploader,
    }

}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
#container {
  position: relative;
}

#main {
  position: absolute;
  top: 80px;
  margin-left: 200px;
}

h4 {
  position: absolute;
  top: -30px;
  left: 250px;
  font-family: Nunito;
  padding: 30px 0 0 0;
  font-size: 32px;
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
}

#sideNavBar a:hover {
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

#sideNavBar h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bold;
  padding: 10px 0px 0px 0px;
}

p#name, #date {
  position: absolute;
  left: 360px;
  top: 56px;
  font-family: Nunito;
  margin: 40px -30px 0px -100px;
  font-size:22px;
  color: rgb(0, 114, 180);
}

p#date {
    top: 86px;
}

#mc h2 {
    position: absolute;
    top: 170px;
    left: 250px;
    font-size:20px;
    font-family: Nunito;
    text-decoration: underline;
}

#uploadermc1 {
    position: absolute;
    top: 210px;
    left: 250px;
    font-family: Nunito;
}

#invoice h2 {
    position: absolute;
    top: 330px;
    left: 250px;
    font-size:20px;
    font-family: Nunito;
    text-decoration: underline;
}

#uploadermc2 {
    font-family: Nunito;
    position: absolute;
    top: 370px;
    left: 250px;
}

#prescription h2 {
    position: absolute;
    top: 490px;
    left: 250px;
    font-size: 20px;
    font-family: Nunito;
    text-decoration: underline;
}

#uploadermc3 {
    font-family: Nunito;
    position: absolute;
    top: 530px;
    left: 250px;
}

a#links {
    font-size: 20px;
    position: relative;
    top: 20px;
    color:rgb(0, 114, 180)
}

a#removers {
    font-size: 20px;
    position: relative;
    top:20px;
    left: 10px;
    text-decoration: underline;
    color: rgb(0, 114, 180);
    cursor: pointer;
}

label#outpayment {
    position:absolute;
    top:100px;
    right: 240px;
    font-size: 18px;
    font-family: Nunito;
}

label#inpayment {
    position:absolute;
    top:140px;
    right: 240px;
    font-size: 18px;
    font-family: Nunito;
}

input#paybox {
    position:absolute;
    top: 98px;
    right: 128px;
    height: 24px;
    width:100px;
    font-size: 16px;
    font-family: Nunito;
}

input#receivebox {
    position:absolute;
    top:138px;
    right: 128px;
    height: 24px;
    width: 100px;
    font-size: 16px;
    font-family: Nunito;
}

input#submitpay {
    position:absolute;
    top:100px;
    right: 40px;
    font-size: 18px;
    font-family: Nunito;
}

input#submitreceive {
    position:absolute;
    top: 138px;
    right: 40px;
    font-size: 18px;
    font-family: Nunito;
}

div#paybox span {
    position:absolute;
    top: 101px;
    right: 134px;
    font-size: 18px;
    font-family: Nunito;
    font-size: 18px;
    font-family: Nunito;
    white-space: nowrap;
}

div#paybox label {
    position: absolute;
    top:100px;
    right: 240px;
    font-size: 18px;
    font-family: Nunito;
}

div#receivetext{
    position:absolute;
    top:200px;
    right: 40px;
    height: 40px;
    width: 320px;
    font-size: 18px;
    font-family: Nunito;
    font-weight: bold;
    white-space: nowrap;
    padding: 20px 10px 0px 10px;
    text-align: center;
    box-shadow: 0 4px 8px -4px  rgba(0, 0, 0, 0.377);
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
  right: 40px;
  font-size: 14px;
  font-family: Nunito;
}

button#home:hover {
    cursor: pointer;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

input[type=submit] {
    font-family: Nunito;
    background-color:rgb(0, 114, 180);
    color: white;
    border-color: rgb(0, 114, 180);
}

input[type=submit]:hover {
    cursor: pointer;
}
</style>