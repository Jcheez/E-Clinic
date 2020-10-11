<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <h2>Patients</h2>
    <ul>
      <li v-for="patient in itemsList" :key="patient">
        <div id="inner">
          <span>{{ "Patient: " + patient.name }}</span>
        </div>
        <button id="view">View</button>
      </li>
    </ul>
    <input
      id="searchbox"
      type="text"
      placeholder="Search patient..."
      name="search"
    />
    <button id="searchbutton" type="submit">Search</button>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      msg: "Patient's Notes ",
      itemsList: [],
    };
  },

  methods: {
    fetchItems: function () {
      database
        .collection("patients")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            this.itemsList.push(item);
            console.log(doc.data());
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
hr {
  position: absolute;
  width: 1459px;
  height: 40px;
  left: 520px;
  top: 250px;
  background-color: #1677cf;
}

h2 {
  position: absolute;
  top: 310px;
  left: 330px;
  text-decoration: underline;
  font-size: 30px;
}

div#inner {
  width: 70%;
  display: inline-block;
}

li {
  position: relative;
  width: 562px;
  height: 100px;
  left: 73px;
  top: 230px;
  border: 1px solid #000000;
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding-left: 10px;
  padding-top: 20px;
  display: block;
}

span {
  position: relative;
  top: 14px;
  display: block;
  text-align: left;
  font-size: 20px;
}

input#searchbox {
  position: absolute;
  top: 400px;
  left: 1100px;
  font-size: 30px;
}

button#view {
  position: relative;
  top: 14px;
  width: 125px;
  height: 30px;
  background: aqua;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 15px;
  font-size: 20px;
}

button:hover {
  cursor: pointer;
}
button:focus {
  outline: none;
}

button#searchbutton {
  position: absolute;
  top: 400px;
  left: 1473px;
  font-size: 30px;
  background-color: aqua;
}
</style>
