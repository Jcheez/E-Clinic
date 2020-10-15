<template>
  <div class="container">
    <v-date-picker v-model="date" is-inline :min-date="new Date()" />
    <div v-if="status" class="inner">
      <addSlot class="addslot" v-bind:selectedDate="date" />
    </div>
    <div v-else-if="!status" class="inner">
      <div class="placeholder">
        <p v-if="slots.length == 0" >No slots yet! Add slots by clicking on "Add Slots"</p>
        <tile v-bind:consultData="slots" class="tile" />
        <schedule v-bind:consultData="slots" class="schedule" />
      </div>
    </div>
    <button v-on:click="toggle" class="button">{{text}}</button>
  </div>
</template>

<script>
import database from "../firebase.js";
import create from "./CreateSlot";
import scheduled from "./ScheduledAppointments";
import tile from "./ConsultationTile";

export default {
  data() {
    return {
      date: new Date(),
      slots: [],
      status: false,
      text: 'Add Slots'
    };
  },
  methods: {
    toggle: function () {
      this.status = !this.status;
    },
    fetchItems: function () {
      this.slots = [];
      let date = this.date.toLocaleDateString().split( '/' ).reverse( ).join( '-' )
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
            let item_date = item.date.toDate().toLocaleDateString().split( '/' ).reverse( ).join( '-' )
            if (item_date == date) {
              item.id = doc.id
              item.hover = false
              this.slots.push(item)
            }
          });
        });
    }
  },
  components: {
    addSlot: create,
    tile: tile,
    schedule: scheduled,
  },
  watch: {
    date: function () {
      this.fetchItems();
    },
    status: function() {
      if (this.text == 'Add Slots') {
        this.text = 'Back'
      } else {
        this.text = 'Add Slots'
      }
      this.fetchItems();
    }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
}
.schedule {
  margin-top: 200px;
}
.placeholder {
  width: 450px;
  height: 350px;
  align-items: center;
  justify-content: center;
}
.button {
  position: relative;
  top: -100px;
  background-color: lightblue;
  border: 2px solid darkslateblue;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
.tile {
  margin-top: 50px;
}
</style>
