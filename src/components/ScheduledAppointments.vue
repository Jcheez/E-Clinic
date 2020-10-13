<template>
    <div class="container">
        <div class="heading">
            <h4>Upcoming Appointments</h4>
        </div>
        <div class="data">
            <ul>
                <li v-for="data in consultData" v-bind:key="data.patient">
                    <div class="column">
                        <span>Time:</span><br>
                        <span>Patient:</span>
                    </div>
                    <div class="column">
                        <span>{{data.date.toDate().getHours() + ":" + data.date.toDate().getMinutes()}}</span><br>
                        <span>{{data.patient}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
//import database from '../firebase.js'
export default {
    data() {
        return {
        }
    },
    props:{
      consultData:{
          type:Array
      }
    },
    methods: {
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
div .container {
    transition: box-shadow 0.3s;
    transition: 0.3s;
    background-color:rgb(0, 114, 180); 
    width: 450px;
    height: 200px;
    border-radius: 10px;
}

div .container:after {
  content: "";
  display: table;
  clear: both;
}

div .container:hover {
    background-color:rgb(0, 135, 212);
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

div .data {
    overflow: hidden;
    overflow-y: scroll;
    height: 150px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
div .data::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
div .data {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

div .heading {
    height: 30px;
}
h4 {
    color: white;
    font-size: 18px;
    font-family: Nunito;
    letter-spacing: 2px;
    margin-left: 15px;
    text-align: left;
    padding: 0px;
}

li {
    color: white;
    text-align: left;
    list-style: none;
    margin-left: -30px;
}

div .column {
    float: left;
    width: 30%;
    padding: 0px 20px 30px 7px;
    font-family: Roboto;
}

</style>