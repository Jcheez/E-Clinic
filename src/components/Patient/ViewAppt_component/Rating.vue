<template>
  <div>
    <div class="rate">
    <br>
    <p>Please rate your experience of the consultation.</p>
    <input type="radio" id="star5" name="rate" value=5 v-model="doctorscore"/>
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" name="rate" value=4 v-model="doctorscore"/>
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" name="rate" value=3 v-model="doctorscore"/>
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" name="rate" value=2 v-model="doctorscore"/>
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" name="rate" value=1 v-model="doctorscore"/>
    <label for="star1" title="text">1 star</label>
  </div>
  </div>
</template>

<script>
import database from "../../../firebase.js";

export default {
    data() {
        return {
        doctorscore: 0,
        name: "Timothy"
        /* Remember to change this part when login is finished and props can be passed
                props: {
                    name: "",
                } */
        };
    },

    props: {
      consult: {
        type: Array
      }
    },
    methods: {
        updatedoctorrating: function() {
          console.log("im called")
          var x = this.name;
          database
            .collection("consultslots")
            .where("patient", "==", x)
            .get()
            .then((querySnapShot) => {
              let item = {};
              querySnapShot.forEach((doc) => {
                item = doc.id;
                database.collection("consultslots").doc(item).update({
                  rating: parseInt(this.doctorscore)
                })
              })
            })
        },
    },

    watch: {
      doctorscore: function() {
        this.updatedoctorrating();
      }
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.rate {
    float: left;
    height: 46px;
    padding: 0 10px;
}
.rate:not(:checked) > input {
    position:absolute;
    top:-9999px;
}
.rate:not(:checked) > label {
    float:right;
    width:1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color:#ccc;
}
.rate:not(:checked) > label:before {
    content: '★ ';
}
.rate > input:checked ~ label {
    color: #ffc700;    
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
    color: #deb217;  
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
    color: #c59b08;
}
</style>