<template>
  <div>
      <h1>{{ msg }}</h1>
      <p id="nodoc" v-if="!docschecker()">Clinic has not uploaded documents, please check back later</p>
      <ul v-if="docschecker()" id="patients">
          <li v-for="(doc, name, index) in this.itemsList[0]" :key="index">
            <div id="inner">
              <span>{{ name + ": " }} <p id="url" v-on:click="opendoc(doc)">Retreive</p></span>
            </div>
          </li>
        </ul>
        <button id="back" v-on:click="routeBack()">Back</button>
  </div>
</template>

<script>
import database from "../../../firebase.js";
export default {
    data() {
        return {
            msg: "Patient's Notes ",
            itemsList: []
        }
    },

    props: {
      apptDate: String,
      patientId: String
    },

    methods: {
        fetchItems: function () {
            //var x = this.patientName;
            database
                .collection("patients")
                .doc(this.patientId)
                .get()
                .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.data().notes;
                        console.log(this.apptDate)
                        console.log(item[this.apptDate]["invoice"] == undefined)
                        console.log(Object.keys(item[this.apptDate]))
                        if (Object.keys(item[this.apptDate]).length > 0) {
                            this.itemsList.push(item[this.apptDate]);
                        }
                    });
                });
        },

        docschecker: function() {
          console.log(this.itemsList[0])
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
li {
  position: relative;
  width: 562px;
  height: 100px;
  left: 73px;
  top: 230px;
  list-style-type: none; /* Remove bullets */
  padding-left: 10px;
  padding-top: 20px;
}
span {
  position: relative;
  top: 14px;
  display: block;
  text-align: left;
  font-size: 20px;
}
p#nodoc{
  position: relative;
  width: 562px;
  height: 100px;
  left: 70px;
  top: 230px;
}
p#url{
  display: inline;
  color: blue;
  text-decoration: underline;
}
button#back{
  position: relative;
  top: 250px;
}
</style>