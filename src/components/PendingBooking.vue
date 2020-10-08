<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <ul>
      <template v-for="patient in itemsList">
        <li v-bind:key="patient">
          <div id="inner">
            <span>{{ "Patient: " + patient.name }}</span>
            <span v-if="patient.firstTime">Reason: First Time Patient</span>
            <span v-elseif="patient.physical"
              >Reason: Physical Examination Required</span
            >
          </div>
          <button>Make A Booking</button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      msg: "Pending Booking",
      itemsList: [],
    };
  },
  components: {},
  methods: {
    fetchItems: function () {
      database
        .collection("pendingbooking")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            this.itemsList.push(item);
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

li {
  position: relative;
  width: 562px;
  height: 100px;
  left: 73px;
  top: 210px;

  border: 1px solid #000000;
  box-sizing: border-box;

  list-style-type: none; /* Remove bullets */
  padding-left: 10px;
  padding-top: 20px;
  display: block;
}

div#inner {
  width: 70%;
  display: inline-block;
}
span {
  display: block;
  text-align: left;
}
button {
  width: 125px;
  height: 30px;

  background: rgba(169, 47, 47, 0.4);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 15px;
}
</style>
