<template>
  <div class="container">
    <div id="topNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/clinichome">Home</router-link>
      <router-link to="/doctorslist">Back to Doctors</router-link>
      <router-link
        :to="{
          name: 'doctorSettings',
          params: { currDoctor: this.currDoctor },
        }"
        >Doctor's Settings</router-link
      >
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>

    <div class="leftColumn">
      <v-date-picker
        :attributes="attributes"
        v-model="date"
        is-inline
        :min-date="new Date()"
      />
      <join-zoom class="zoom" v-bind:zoomlink="zoomString"></join-zoom>
      <schedule v-bind:consultData="slots" class="schedule" />
    </div>
    <div v-if="status" class="addslot">
      <addSlot
        @fetchItems="fetchItems"
        v-bind:selectedDate="date"
        v-bind:doctorLicense="this.currDoctor.dNum"
      />
    </div>
    <div v-else-if="!status" class="inner">
      <div class="placeholder">
        <p v-if="slots.length == 0">
          No slots yet! Add slots by clicking on "Add Slots"
        </p>
        <tile
          @fetchItems="fetchItems"
          v-bind:consultData="slots"
          class="tile"
        />
      </div>
    </div>
    <button v-on:click="toggle" class="addSlotButton">{{ text }}</button>
  </div>
</template>

<script>
import database from "../../../../firebase";
import create from "./CreateSlot";
import scheduled from "./ScheduledAppointments";
import tile from "./ConsultationTile";
import joinTeleConsult from "./JoinTeleconsult";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      date: new Date(),
      slots: [],
      status: false,
      text: "Add Slots",
      zoomString: "",
      all: [],
    };
  },
  props: {
    currDoctor: {
      type: Object,
    },
  },
  computed: {
    attributes() {
      return this.all.map((t) => ({
        //key: `todo.${t.id}`,
        dot: t.dot,
        dates: t.date.toDate(),
        customData: t,
      }));
    },
  },
  methods: {
    toggle: function () {
      this.status = !this.status;
    },
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
    fetchItems: function () {
      let temp = [];
      let temp2 = [];
      let date = this.date.toLocaleDateString().split("/").reverse().join("-");
      //console.log(this.currDoctor);
      database
        .collection("consultslots")
        .where("doctor", "==", this.currDoctor.dNum)
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
            /*let item_date = item.date
              .toDate()
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("-");*/
            let item_date = item.date.toDate().getTime();
            item.id = doc.id;
            item.hover = false;
            item.reschedule = false;
            if (item.patient) {
              item.dot = "red";
            } else {
              item.dot = "green";
            }
            let today = new Date();
            if (item_date >= today.getTime()) {
              //today.toLocaleDateString().split("/").reverse().join("-")) {
              temp.push(item);
            }
            if (item_date == date) {
              temp2.push(item);
            }
          });
          this.all = temp;
          this.slots = temp2;
        });
    },
    getZoomString: function () {
      database
        .collection("doctors")
        .doc(this.currDoctor.dNum) //.get().data().zoom;
        /*.where("doctor", "==", this.currDoctor.dNum)*/
        .get()
        .then((doc) => {
          console.log(doc.data().zoom);
          this.zoomString = doc.data().zoom;
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
    status: function () {
      if (this.text == "Add Slots") {
        this.text = "Back";
      } else {
        this.text = "Add Slots";
      }
    },
    date: function () {
      this.slots = [];
      let date = this.date.toLocaleDateString().split("/").reverse().join("-");
      this.slots = this.all.filter(
        (t) =>
          t.date.toDate().toLocaleDateString().split("/").reverse().join("-") ==
          date
      );
    },
  },
  created() {
    this.fetchItems();
    this.getZoomString();
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
  left: 420px;
  /*margin-top: 10px;*/
  top: 90px;
  height: 450px;
  position: absolute;
}

.zoom {
  margin: 10px;
  margin-bottom: 0px;
  left: -110px;
  position: absolute;
}
.addslot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 450px;
  top: 150px;
  left: 450px;
  position: absolute;
}

.schedule {
  margin: 20px;
  display: flex;
  position: absolute;
  left: -120px;
}
.vc-container {
  left: -100px;
}

.leftColumn {
  width: 200px;
  height: 500px;
  float: left;
  margin: 10px;
  top: 100px;
  position: absolute;
  left: 200px;
}

.placeholder {
  width: 500px;
  height: 350px;
  align-items: center;
  justify-content: center;
}
.addSlotButton {
  transition: 0.3s;
  position: absolute;
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
  top: 120px;
  width: 80px;
  text-align: center;
  left: 1000px;
}

.addSlotButton:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
.tile {
  margin-top: 50px;
}

#topNavBar {
  height: 80px;
  position: absolute;
  top: 0;
  /*left:0*/
  overflow-x: hidden;
  width: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
}

a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 16px;
  letter-spacing: 2px;
  margin-right: 50px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

a:hover {
  font-size: 17px;
  color: white;
  cursor: pointer;
}
h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
