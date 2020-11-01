<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <h2>Past Appointments</h2>
    <p id="pat">Patient: {{patientName}}</p>
    <ul id="patients">
      <li v-for="(patient, index) in this.data" :key="index">
        <div id="inner">
          <span>{{ patient }}</span>
        </div>
        <button id="view">
          <router-link :to="{ name:'uploaddocuments', params: {patientName: patientName, appointmentDate: patient}}">View</router-link>
        </button>
      </li>
    </ul>
    <p v-if="this.data.length == 0" id="empty"> This patient does not have any past appointments!</p>
    <input
      id="searchbox"
      type="text"
      placeholder="Search Date..."
      name="search"
      v-model="nameQuery"
      v-on:keyup.enter="dateSearch()"
    />
    <button id="searchbox" type="submit" v-on:click="dateSearch()">Search</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
        msg: "Patient's Notes ",
        data: [...this.apptDates],
        nameQuery: ""   
    };
  },

  props: {
      apptDates: Array,
      patientName: String
  },

  methods: {
      dateSearch: function() {
      let copied = this.data;
      copied = copied.filter(x => x.includes(this.nameQuery))
      this.data = copied;
      if (this.nameQuery.localeCompare("") == 0) {
        this.data = this.apptDates;
        
      }
      this.$forceUpdate();
    },
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
  top: 380px;
  left: 280px;
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
  top: 300px;
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

button#searchbox {
  position: absolute;
  top: 400px;
  left: 1473px;
  font-size: 30px;
  background-color: aqua;
}

p#pat {
    position: absolute;
    top: 310px;
    left: 140px;
    font-size:30px;
    color:brown
}

a {
  color: black;
  text-decoration: none;
}

p#empty {
  position: absolute;
  top:500px;
  left:140px;
  font-size: 25px;
}
</style>