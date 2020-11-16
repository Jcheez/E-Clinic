<template>
  <div class="container">
    <div class="heading">
      <h4 v-if="filteredData.length > 0">Upcoming Appointments</h4>
      <h4 v-else-if="filteredData.length == 0">No appointments yet</h4>
    </div>
    <div class="containerBtm">
      <ul>
        <li
          v-for="data in filteredData"
          v-bind:key="data.patient"
          :id="data.id"
        >
          <!-- <div class="labels">
            <span >Time: {{showTime(data)}}</span><br />
            <span>Patient: {{ getPatientName(data.patient) }}</span>
          </div> -->
           <div class="labels">
              <span>Time:</span><br>
              <span>Patient:</span>
            </div>
            <div class="data">
              <span v-html="showTime(data)"></span><br>
              <span>{{getPatientName(data.patient)}}</span>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import database from "../../../../firebase";
export default {
  data() {
    return {
      patients: []
    };
  },
  props: {
    consultData: {
      type: Array,
    },
  },
  methods: {
    showTime: function (data) {
      let min = data.date.toDate().getMinutes();
      let h = data.date.toDate().getHours();
      if (h < 10) {
        h = "0" + h;
      }
      if (min == 0) {
        min = "00";
      }
      return h + ":" + min;
    },

    getPatients: function() {
      database
      .collection("patients")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          let item = doc.data();
          item.id = doc.id
          this.patients.push(item)
        })
      })
    },

    getPatientName: function(docId) {
      for (let index = 0; index < this.patients.length; index++) {
        let currentId = this.patients[index]["id"]
        if (currentId.localeCompare(docId) == 0) {
          return this.patients[index]["name"]
        }
      }
    }
  },
  computed: {
    filteredData: function () {
      return this.consultData.filter(function (data) {
        return data.patient != null;
      });
    },
  },
  watch: {
    filteredData: function () {
      database.collection("consultslots").onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type == "removed") {
            let li = document.getElementById(change.doc.id);
            li.parentNode.removeChild(li);
          }
        });
      });
    },
  },

  created() {
    this.getPatients();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
div .container {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  background-color: rgb(0, 114, 180);
  width: 260px;
  height: 200px;
  border-radius: 10px;
  position: absolute;
  margin-bottom: 8px;
  text-align: left;
  z-index: 1;
}

div .container:after {
  content: "";
  display: table;
  clear: both;
}

div .container:hover {
  background-color: rgb(0, 135, 212);
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

div .containerBtm {
  overflow: hidden;
  overflow-y: scroll;
  height: 120px;
  width: 300px;
  position: absolute;
  left: 0px;
  bottom: 5px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
div .containerBtm::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
div .containerBtm {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
  z-index: 100; 
  display: block;
}

li {
  color: white;
  text-align: left;
  list-style: none;
}

/* div .labels {
  float: left;
  width: 45%;
  padding: 12px 0px 0px 0px;
  font-family: Roboto;
}

div .data {
  float: left;
  font-family: Roboto;
  padding: 12px 0px 0px 0px;
} */

div .labels {
    position: relative;
    width: 30%;
    top: -10px;
    left: -15px;
    font-family: Roboto;
}
div .data {
    position: relative;
    font-family: Roboto;
    top: -48px;
    left: 50px;
    overflow-x: hidden;
}
</style>