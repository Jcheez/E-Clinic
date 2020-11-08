<template>
  <div>
    <h3>Please Choose a Clinic:</h3>
    <select v-model="selected">
      <option
        v-for="(clinic, x) in clinics"
        v-bind:value="clinic.name"
        v-bind:key="x"
      >
        {{ clinic.name }}
      </option>
    </select>
    <br />
    <span v-if="selected"
      >You have selected:
      <div
        style="
          font-family: Nunito;
          color: rgb(0, 114, 180);
          display: inline-block;
        "
      >
        {{ selected }}
      </div></span
    >
    <br />
    <h3>Please Select the Conditions You Are Experiencing:</h3>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Fever"
        value="Fever"
        v-model="checkedConditions"
      />
      <label for="Fever">Fever</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Cough"
        value="Cough"
        v-model="checkedConditions"
      />
      <label for="Cough">Cough</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Runny Nose"
        value="Runny Nose"
        v-model="checkedConditions"
      />
      <label for="Runny Nose">Runny Nose</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Sore Throat"
        value="Sore Throat"
        v-model="checkedConditions"
      />
      <label for="Sore Throat">Sore Throat</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Chest Pain"
        value="Chest Pain"
        v-model="checkedConditions"
      />
      <label for="Chest Pain">Chest Pain</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Diarrhoea"
        value="Diarrhoea"
        v-model="checkedConditions"
      />
      <label for="Diarrhoea">Diarrhoea</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Skin Conditions"
        value="Skin Conditions"
        v-model="checkedConditions"
      />
      <label for="Skin Conditions">Skin Conditions</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="High Blood Pressure"
        value="High Blood Pressure"
        v-model="checkedConditions"
      />
      <label for="High Blood Pressure">High Blood Pressure</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Diabetes"
        value="Diabetes"
        v-model="checkedConditions"
      />
      <label for="Diabetes">Diabetes</label>
    </div>
    <div id="conditionSet">
      <input
        type="checkbox"
        id="Family Planning"
        value="Family Planning"
        v-model="checkedConditions"
      />
      <label for="Family Planning">Family Planning</label>
    </div>

    <br />
    <span>Checked Conditions: {{ checkedConditions }}</span>
    <br />
    <br />
    <div id="buttons">
      <p id="error">{{ this.errorstring }}</p>
      <button @click="next">Next</button>
      <button id="home" v-on:click="routeHome()">Back to Home</button>
    </div>
  </div>
</template>

<script>
import database from "../../../firebase.js";

export default {
  data() {
    return {
      /* Remember to change this part when login is finished and props can be passed
            props: {
                name: "",
                phonenum: ""
            } */
      patientId: localStorage.getItem("uidPatient"),
      //phonenum: "98712345",
      clinics: [],
      selected: "",
      checkedConditions: [],
      errorstring: "",
      firstbool: [],
      availableToBook: "",
    };
  },

  methods: {
    routeHome: function () {
      this.$router.push("/patienthome");
    },

    next: function () {
      console.log(this.availableToBook);
      if (!this.selected && this.checkedConditions.length == 0) {
        this.errorstring = "Please choose a clinic and at least 1 condition";
      } else if (!this.selected) {
        this.errorstring = "Please choose a clinic";
      } else if (this.checkedConditions.length == 0) {
        this.errorstring = "Please choose at least 1 condition";
      } else if (this.availableToBook == false) {
        alert("You have an upcoming appointment. Unable to make a new Booking");
        this.$router.push("/viewappt");
      } else {
        this.errorstring = "";
        var a = this.checkedConditions;
        var physicalbool =
          a.includes("Fever") ||
          a.includes("Cough") ||
          a.includes("Sore Throat") ||
          a.includes("Runny Nose") ||
          a.includes("Chest Pain");
        database
          .collection("patients")
          .doc(this.patientId)
          .get()
          .then((querySnapShot) => {
            let item = {};
            item = querySnapShot.data();
            console.log(item.verifiedclinics);
            var firstbool = !item.verifiedclinics.includes(this.selected);

            console.log(physicalbool);

            if (physicalbool || firstbool) {
              this.$router.push("/makebooking/makebookingter");
              database.collection("pendingbooking").add({
                patientId: this.patientId,
                //phonenum: this.phonenum,
                clinic: this.selected,
                physical: physicalbool,
                firstTime: firstbool,
                conditions: a,
                pendingstatus: "Awaiting clinic staff to contact",
              });
            } else {
              console.log("you have reached here");
              this.$router.push({
                name: "makebookingpass",
                params: {
                  conditions: this.checkedConditions,
                  patientId: this.patientId,
                  clinic: this.selected,
                },
              });
            }
          });
      }
    },

    checkAbleToBook: function () {
      database
        .collection("patients")
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          let item = {};
          item = querySnapShot.data();
          var today = new Date();
          //console.log(Date.parse(item.upcoming[1]) == today.getTime())
          if (item.upcoming == null) {
            this.availableToBook = true;
          } else if (Date.parse(item.upcoming[1]) > today.getTime()) {
            this.availableToBook = false;
          } else if (Date.parse(item.upcoming[1]) == today.getTime()) {
            if (
              item.upcoming[2].localeCompare(
                today.getHours() + "" + today.getMinutes() > 0
              )
            ) {
              this.availableToBook = false;
            }
          } else {
            console.log("asdasd");
            this.availableToBook = true;
            console.log(this.availableToBook);
          }
        });
    },

    fetchItems: function () {
      /*
            database.collection('patients').doc(this.patientId).get().then((querySnapShot) => {
                let item = {};
                item = querySnapShot.data();
                this.phonenum = item.phonenum;
            })*/

      database
        .collection("clinics")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            if (item.doctors) {
              this.clinics.push(item);
            }
          });
        });
    },
  },
  created() {
    this.fetchItems();
    this.checkAbleToBook();
  },
};
</script>

<style scoped>
p#error {
  color: red;
  font-family: Nunito;
}

#conditionSet {
  display: block;
  width: 250px;
  margin: 20px;
  margin-left: 500px;
  font-family: Nunito;
}
input[type="checkbox"] {
  display: inline-block;
  height: 20px;
  width: 20px;
  /*margin-right: 10px;*/
  float: left;
  position: relative;
}
label {
  display: inline-block;
  position: relative;
  font-family: Nunito;
  width: 170px;
  text-align: left;
}
select {
  margin: 20px;
  width: 200px;
  height: 30px;
  font-family: Nunito;
}

#home {
  width: 150px;
}

#buttons {
  width: 600px;
  left: 300px;
  position: absolute;
}
button {
  transition: 0.3s;
  position: relative;
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
  width: 100px;
  text-align: center;
  margin: 20px;
}

button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
span {
  font-family: Nunito;
}
</style>