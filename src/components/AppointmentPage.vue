<template>
  <div class="container">
    <div class="leftColumn">
      <v-date-picker v-model="date" is-inline :min-date="new Date()" />
      <join-zoom class="zoom" v-bind:href="zoomString"></join-zoom>
      <schedule v-bind:consultData="slots" class="schedule" />
    </div>
    <div v-if="status" class="addslot">
      <addSlot v-bind:selectedDate="date" />
    </div>
    <div v-else-if="!status" class="inner">
      <div class="placeholder">
        <p v-if="slots.length == 0">
          No slots yet! Add slots by clicking on "Add Slots"
        </p>
        <tile v-bind:consultData="slots" class="tile" />
      </div>
    </div>
    <button v-on:click="toggle" class="button">{{ text }}</button>
  </div>
</template>

<script>
import database from "../firebase.js";
import create from "./CreateSlot";
import scheduled from "./ScheduledAppointments";
import tile from "./ConsultationTile";
import joinTeleConsult from "./JoinTeleconsult";

export default {
  data() {
    return {
      date: new Date(),
      slots: [],
      status: false,
      text: "Add Slots",
      zoomString: "",
    };
  },
  methods: {
    toggle: function () {
      this.status = !this.status;
    },
    fetchItems: function () {
      this.slots = [];
      let date = this.date.toLocaleDateString().split("/").reverse().join("-");
      database
        .collection("consultslots")
        .orderBy("date")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            /*database.collection("consultslots").doc(doc.id).set({
              id: doc.id,
              hover: false 
              }, { merge: true });*/
            item = doc.data();
            let item_date = item.date
              .toDate()
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("-");
            if (item_date == date) {
              item.id = doc.id;
              item.hover = false;
              item.reschedule = false;
              this.slots.push(item);
            }
          });
        });
    },
  },
  components: {
    addSlot: create,
    tile: tile,
    schedule: scheduled,
    joinZoom: joinTeleConsult,
  },
  watch: {
    date: function () {
      this.fetchItems();
    },
    status: function () {
      if (this.text == "Add Slots") {
        this.text = "Back";
      } else {
        this.text = "Add Slots";
      }
      this.fetchItems();
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  left: 0px;
  margin-top: 10px;
  height: 450px;
}

.zoom {
  margin: 10px;
  margin-bottom: 0px;
  left: -110px;
}
.addslot {
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0px;
  width: 500px;
  height: 500px;
}

.schedule {
  left: 120px;
  margin: 20px;
  display: flex;
}
.vc-container {
  left: -100px;
}

.leftColumn {
  width: 200px;
  height: 500px;
  float: left;
  margin: 10px;
}

.placeholder {
  width: 500px;
  height: 350px;
  align-items: center;
  justify-content: center;
}
.button {
  position: relative;
  top: -100px;
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  font-weight: bold;
  font-size: 14px;
  color: white;
  letter-spacing: 3px;
  outline: none;
  display: inline-block;
  top: -220px;
  width: 80px;
  text-align: center;
}

button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
.tile {
  margin-top: 50px;
}
</style>
