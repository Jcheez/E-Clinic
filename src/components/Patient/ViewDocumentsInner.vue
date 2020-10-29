<template>
  <div>
      <h1>{{ msg }}</h1>
      <p id="nodoc" v-if="!this.itemsList[0]">Clinic has not uploaded documents, please check back later</p>
      <ul id="patients">
          <li v-for="(doc, name, index) in this.itemsList[0]" :key="index">
            <div id="inner">
              <span>{{ name + ": " }} <a v-bind:href="doc">Retreive</a></span>
            </div>
          </li>
        </ul>
  </div>
</template>

<script>
import database from "../../firebase.js";
export default {
    data() {
        return {
            msg: "Patient's Notes ",
            itemsList: []
        }
    },

    props: {
      apptDate: String,
      patientName: String
    },

    methods: {
        fetchItems: function () {
            var x = this.patientName;
            database
                .collection("patients")
                .where("name", "==", x)
                .get()
                .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.data().notes;
                        if (item[this.apptDate]) {
                            this.itemsList.push(item[this.apptDate]);
                        }
                    });
                });
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
</style>