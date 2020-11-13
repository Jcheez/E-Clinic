<template>
  <div>
    <ul id="tile-list" style="list-style-type: none; padding-inline-start: 0px">
      <li v-for="data in consultData" v-bind:key="data.id" :id="data.id">
        <button v-if="data.hover == false" @mouseover="data.hover = true">
          <span v-if="data.patient == null" class="freeSlot"></span>
          <span v-if="data.patient != null" class="bookedSlot"></span>
          <span class="time" v-html="showTime(data)"></span>
        </button>
        <button
          v-if="data.hover == true && data.patient == null"
          @mouseleave="data.hover = false"
          v-on:click="removeSlot(data)"
        >
          <span class="removeSlot">Remove Slot</span>
        </button>
        <button
          v-if="data.hover == true && data.patient != null"
          @mouseleave="data.hover = false"
          v-on:click="data.reschedule = true"
        >
          <span class="rescheduleSlot">Reschedule</span>
        </button>
        
        <div
          class="reschedule"
          v-if="data.patient != null && data.reschedule == true"
        >
          <reschedule @fetch = "fetch" @changeTile = "changeTile" v-bind:slotData="data" ></reschedule>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../../../../firebase";
import Reschedule from "./RescheduleSlot";
export default {
  data() {
    return {};
  },
  props: {
    consultData: {
      type: Array,
    },
  },
  components: {
    Reschedule,
  },
  methods: {
    fetch: function() {
      console.log("fetching...")
      this.$emit("fetchItems")
    },
    removeSlot: function (data) {
      database
        .collection("consultslots")
        .doc(data.id)
        .get()
        .then((doc) => {
          let li = document.getElementById(doc.id);
          li.parentNode.removeChild(li);
          database.collection("consultslots").doc(data.id).delete();
          let index = this.consultData.indexOf(data)
          console.log(index)
          this.consultData.splice(index, 1)
          console.log(this.consultData)
          this.$emit("fetchItems");
        });
    },
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
    changeTile: function(removeData, addData, bool) {
      if (bool) {
        this.consultData.push(addData)
      } else {
        let index = this.consultData.indexOf(removeData)
        console.log(index)
        this.consultData.splice(index, 1)
        console.log(this.consultData)
        //if (this.consultData.length == 0) {
        //  this.$emit("fetchItems");
        //}
      }
      this.$emit("fetchItems")
      let li = document.getElementById(removeData.id)
      li.parentNode.removeChild(li)
      
    },
  },
};
</script>

<style scoped>

button {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  color: rgb(0, 114, 180);
  letter-spacing: 2px;
  width: 125px;
  height: 45px;
  background-color: white;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  z-index: -1;
}

button:hover {
  background-color: rgb(0, 114, 180);
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
.freeSlot {
  height: 14px;
  width: 14px;
  margin-left: -30px;
  background-color: rgb(177, 218, 177);
  border-radius: 50%;
  display: inline-block;
  position: absolute;
}

.bookedSlot {
  height: 14px;
  width: 14px;
  margin-left: -30px;
  background-color: rgb(230, 161, 144);
  border-radius: 50%;
  display: inline-block;
  position: absolute;
}

.time {
  position: relative;
  margin-right: -35px;
}

.removeSlot,
.rescheduleSlot {
  color: white;
}

li {
  width: 100px;
  height: 20px;
  display: inline-block;
  margin: 20px;
  float: left;
}

.reschedule {
  position: absolute;
  display: block;
  float: left;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: 370px;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  background-color: white;
  margin: 20px;
  left: 450px;
  z-index: 2;
}
</style>