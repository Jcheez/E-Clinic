<template>
    <div>
        <h1>{{ msg }}</h1>
        <hr />
        <p id="name">Patient: {{pName}}</p>
        <p id="date">Appointment Date: {{appDate}}</p>
        <h2 id="mc1">Medical Certificate</h2>
        <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.mc] == this.u" id="uploadermc1" type="Medical Certificate" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc1">
            <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][mc]" target="_blank">View</a>
            <a id="removers" v-on:click="remove(mc)">Remove</a>
        </div>
        <h2 id="mc2">Invoice</h2>
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
        </div>
        <div id="receivetext" v-else-if="this.amountPaidMap[this.appDate][1].localeCompare(this.clinic) == 0">
            Patient has paid ${{this.amountPaidMap[this.appDate][0].toFixed(2)}}
        </div>
        <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.i] == this.u" id="uploadermc2" type="Invoice" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc2">
            <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][i]" target="_blank">View</a>
            <a id="removers" v-on:click="remove(i)">Remove</a>
        </div>
        <h2 id="mc3">Prescription</h2>
        <uploader v-if=" doc[this.clinic] == this.u || doc[this.clinic][this.appDate] == this.u || doc[this.clinic][this.appDate][this.p] == this.u" id="uploadermc3" type="Prescription" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc3">
            <a id="links" v-bind:href="this.doc[this.clinic][this.appDate][p]" target="_blank">View</a>
            <a id="removers" v-on:click="remove(p)">Remove</a>
        </div>
        <button id="home" v-on:click="routeHome()">Back to Patients</button> 
    </div>
</template>

<script>
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
            clinic: localStorage.getItem("clinicName")
        }
    },

    props: {
      patientName: String,
      appointmentDate: String
    },

    methods: {
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
            console.log(this.doc)
          });
        });
        },

        remove: function (field) {

            delete this.doc[this.clinic][this.appDate][field]
            database
            .collection('patients')
            .doc(this.docid[0])
            .update({notes: this.doc})
            .then(() => {
            console.log('user updated!')
            alert("Medical Certificate" + " deleted")
            
            })
            
        },

        paybutton: function() {
            if (confirm("You can only submit this once, are you sure?")) {

                this.outstandingMap[this.appDate] = [parseFloat(document.getElementById("paybox").value), this.clinic]
                console.log(document.getElementById("paybox").value)
                database
                .collection('patients')
                .doc(this.docid[0])
                .update({
                    outstandingAmount: this.outstandingMap
                })
                .then(() => {
                console.log('Payment Sent!')
                })
                this.$forceUpdate()
                
                
            }
        },

        receivebutton: function() {
            console.log(document.getElementById("receivebox").value)
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
                console.log('Payment received updated!')
                })
                this.$forceUpdate()
        },

        routeHome: function() {
            this.$router.push('/patientsnotes')
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
hr {
  position: absolute;
  width: 1459px;
  height: 40px;
  left: 520px;
  top: 250px;
  background-color: #1677cf;
}

p#name {
    position: absolute;
    top: 310px;
    left: 140px;
    font-size:30px;
    color:brown
}

p#date {
    position: absolute;
    top: 410px;
    left: 140px;
    font-size:30px;
    color:brown
}

h2#mc1 {
    position: absolute;
    top: 550px;
    left: 140px;
    font-size:30px;
    text-decoration: underline;
}

#uploadermc1 {
    position: absolute;
    top: 630px;
    left: 140px;
}

h2#mc2 {
    position: absolute;
    top: 780px;
    left: 140px;
    font-size:30px;
    text-decoration: underline;
}

#uploadermc2 {
    position: absolute;
    top: 860px;
    left: 140px;
}

h2#mc3 {
    position: absolute;
    top: 1010px;
    left: 140px;
    font-size:30px;
    text-decoration: underline;
}

#uploadermc3 {
    position: absolute;
    top: 1090px;
    left: 140px;
}

a#links {
    font-size: 25px;
    position: relative;
    top: 20px;
    color:blue
}

a#removers {
    font-size: 25px;
    position: relative;
    top:20px;
    left: 10px;
    text-decoration: underline;
    color: blue;
    cursor: pointer;
}

label#outpayment {
    position:absolute;
    top:400px;
    left: 1200px;
    font-size: 20px;
}

label#inpayment {
    position:absolute;
    top:500px;
    left: 1200px;
    font-size: 20px;
}

input#paybox {
    position:absolute;
    top:395px;
    left: 1360px;
    height: 24px;
    width:150px;
    font-size: 20px;
}

input#receivebox {
    position:absolute;
    top:495px;
    left: 1360px;
    height: 24px;
    width:150px;
    font-size: 20px;
}

input#submitpay {
    position:absolute;
    top:395px;
    left: 1550px;
    font-size: 20px;
}

input#submitreceive {
    position:absolute;
    top:495px;
    left: 1550px;
    font-size: 20px;
}

div#paybox {
    position:absolute;
    top:400px;
    left: 1360px;
    height: 24px;
    width:150px;
    font-size: 20px;
    white-space: nowrap;
}

div#receivetext{
    position:absolute;
    top:535px;
    left: 1360px;
    height: 24px;
    width:150px;
    font-size: 20px;
    white-space: nowrap;
}

button#home {
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
  position: absolute;
  top:600px;
  left:1380px;
  cursor: pointer;
}
</style>