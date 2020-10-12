<template>
  <div class = "container">
    <v-date-picker 
    v-model="date" 
    is-inline 
    :min-date='new Date()'
    />
    <div v-if = status class = "inner">
      <addSlot class = "addslot"/>
    </div>
    <div v-else-if = !status class = "inner">
      <div class = "placeholder">
        <!--p>No slots yet! Add slots by clicking on "Add Slots"</p-->
        <tile v-bind:consultData="slots" class = "tile"/>
        <schedule v-bind:consultData="slots" class = "schedule"/>
      </div>
    </div>
    <button v-on:click = "addslot" class = "button">Add Slots</button>
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
      status: false
    };
  },
  methods: {
    addslot: function() {
      this.status = !this.status
    },
    fetchItems: function() {
      this.slots = []
      let date = this.date.toLocaleDateString()
      database
        .collection("consultslots")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            if (item.date === date) {
              this.slots.push(item)
            }
          });
        });
    }
  },
  components: {
    "addSlot": create,
    "tile": tile,
    "schedule": scheduled
  },
  watch: {
    date: function () {
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
  margin-top: 200px
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
