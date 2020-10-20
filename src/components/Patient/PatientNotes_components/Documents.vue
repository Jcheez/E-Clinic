<template>
    <div>
        <h1>{{ msg }}</h1>
        <hr />
        <p id="name">Patient: {{pName}}</p>
        <p id="date">Appointment Date: {{appDate}}</p>
        <h2 id="mc1">Medical Certificate</h2>
        <uploader v-if=" doc[this.appDate] == this.u || doc[this.appDate][this.mc] == this.u" id="uploadermc1" type="Medical Certificate" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc1">
            <a id="links" v-bind:href="this.doc[this.appDate][mc]">View</a>
            <a id="removers" v-on:click="remove(mc)">Remove</a>
        </div>
        <h2 id="mc2">Invoice</h2>
        <uploader v-if=" doc[this.appDate] == this.u || doc[this.appDate][this.i] == this.u" id="uploadermc2" type="Invoice" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc2">
            <a id="links" v-bind:href="this.doc[this.appDate][i]">View</a>
            <a id="removers" v-on:click="remove(i)">Remove</a>
        </div>
        <h2 id="mc3">Prescription</h2>
        <uploader v-if=" doc[this.appDate] == this.u || doc[this.appDate][this.p] == this.u" id="uploadermc3" type="Prescription" v-bind:name="pName" v-bind:doc_id="docid[0]" v-bind:date="appDate"></uploader>
        <div v-else id="uploadermc3">
            <a id="links" v-bind:href="this.doc[this.appDate][p]">View</a>
            <a id="removers" v-on:click="remove(p)">Remove</a>
        </div>
        <h3>{{this.doc}}</h3>
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
            console.log(this.doc)
          });
        });
        },

        remove: function (field) {

            delete this.doc[this.appDate][field]
            database
            .collection('patients')
            .doc(this.docid[0])
            .update({notes: this.doc})
            .then(() => {
            console.log('user updated!')
            alert("Medical Certificate" + " deleted")
            
            })
            
        },
    },

    created() {
        if (this.pName == null || this.appDate == null) {
            this.pName = localStorage.getItem('pn3name');
            this.appDate = localStorage.getItem('pn3date');
        } else if (this.pName.localeCompare(localStorage.getItem('pn3name')) != 0 && this.appDate.localeCompare(localStorage.getItem('pn3date')) != 0) {
            localStorage.setItem('pn3name', this.pName);
            localStorage.setItem('pn3date', this.appDate);
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
    top: 610px;
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
    top: 840px;
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
    top: 1070px;
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

</style>