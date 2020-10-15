<template>
    <div class="container">
        <div class="heading">
            <h4 v-if="consultData.length > 0">Upcoming Appointments</h4>
            <h4 v-else-if="consultData.length == 0">No appointments yet</h4>

        </div>
        <div class="containerBtm">
            <ul>
                <li v-for="data in filteredData" v-bind:key="data.patient">
                    <div class="labels">
                        <span>Time:</span><br>
                        <span>Patient:</span>
                    </div>
                    <div class="data">
                        <span v-html="showTime(data)"></span><br>
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
        showTime: function(data) {
            let min = data.date.toDate().getMinutes();
            if (min==0) {
                return data.date.toDate().getHours() + ":" + data.date.toDate().getMinutes() + "0";
            } else {
                return data.date.toDate().getHours() + ":" + data.date.toDate().getMinutes();
            }
        },
    },
    computed: {
        filteredData: function() {
            return this.consultData.filter(function(data) {
                return data.patient != null;
            })
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
div .container {
    transition: box-shadow 0.3s;
    transition: 0.3s;
    background-color:rgb(0, 114, 180); 
    width: 300px;
    height: 200px;
    border-radius: 10px;
    position: absolute;
    margin-bottom: 8px;
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

div .containerBtm {
    overflow: hidden;
    overflow-y: scroll;
    height: 140px;
    width: 300px;
    position: absolute;
    left: 10px;
    bottom: 5px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
div .containerBtm::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
div .containerBtm {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

div .heading {
    height: 30px;
    position: absolute;
    top: 0px;
    left: 8px;
}
h4 {
    color: white;
    font-size: 18px;
    font-family: Nunito;
    letter-spacing: 2px;
    margin-left: 15px;
    text-align: left;
    padding-bottom: 5px;
}

li {
    color: white;
    text-align: left;
    list-style: none;
}

div .labels {
    float: left;
    width: 50%;
    padding: 10px 0px 10px 7px;
    font-family: Roboto;
}

div .data {
    float: left;
    font-family: Roboto;
    padding: 10px 0px 0px 0px;
}

</style>