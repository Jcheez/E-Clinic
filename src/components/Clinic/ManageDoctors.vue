<template>
  <div>
    <div id="addDoctor">
      <h3>Add Doctor</h3>
      <form>
        <div>
          <input
            type="text"
            v-model="doctorAdd.dName"
            placeholder="Doctor Name"
            required
          /><br />
          <input
            type="text"
            v-model="doctorAdd.dNum"
            placeholder="Doctor License No."
            required
          />
        </div>
      </form>
      <button id="add" v-on:click="addDoctor()">Submit</button>
    </div>

    <div id="deleteDoctor">
      <h3>Delete Doctor</h3>
      <div>
        <ul
          id="indivDoctor"
          style="list-style-type: none; padding-inline-start: 30px"
        >
          <li v-for="d in doctors" v-bind:key="d.dNum" :id="d.dNum">
            <span>
              <b>Doctor Name: </b> {{ d.dName }} <br />
              <b>Doctor License Number: </b> {{ d.dNum }}
            </span>
            <button id="del" v-on:click="delDoctor(d)"><b>X</b></button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import database from "../../firebase";
export default {
  data() {
    return {
      doctorAdd: {
        dNum: "",
        dName: "",
      },
      validationErrors: [],
    };
  },
  props: {
    doctors: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    addDoctor() {
      // when valid then sign in
      this.validate();
      if (this.validationErrors.length <= 0) {
        this.doctors.push({
          dNum: this.doctorAdd.dNum,
          dName: this.doctorAdd.dName,
        });
        database.collection("doctors").doc(this.doctorAdd.dNum).set({
          name: this.doctorAdd.dName,
          clinic: this.getUser.displayName,
          zoom: "",
        });
        alert("Successfully added new doctor!");
        this.doctorAdd.dName = "";
        this.doctorAdd.dNum = "";
      } else {
        for (var v = 0; v < this.validationErrors.length; v++) {
          alert(this.validationErrors[v]);
        }
      }
    },
    delDoctor: function (doctorObj) {
      let li = document.getElementById(doctorObj.dNum);
      li.parentNode.removeChild(li);
      database.collection("doctors").doc(doctorObj.dNum).delete();
      //need to emit back to parent list to not display box
      let index = this.doctors.indexOf(doctorObj);
      console.log(index);
      this.doctors.splice(index, 1);
      console.log(this.doctors);
      //this.$emit("fetchItems");
    },

    resetError() {
      this.validationErrors = [];
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError();

      if (!this.doctorAdd.dName) {
        this.validationErrors.push("Doctor name cannot be empty.");
      }
      if (!this.doctorAdd.dNum) {
        this.validationErrors.push("Doctor license no. cannot be empty.");
      }
      if (
        this.doctorAdd.dNum.length != 7 ||
        this.doctorAdd.dNum.substr(0, 1) != "M" ||
        isNaN(this.doctorAdd.dNum.substr(1, 5)) ||
        !isNaN(this.doctorAdd.dNum.substr(6, 1))
      ) {
        this.validationErrors.push("Doctor license no. entered is not valid.");
      }
    },
  },
};
</script>
<style scoped>
#addDoctor {
  font-family: Nunito;
  height: 300px;
  width: 350px;
  display: inline-block;
  position: relative;
  left: -40px;
  top: 10px;
}
#deleteDoctor {
  font-family: Nunito;
  width: 400px;
  display: inline-block;
  border-left: 1px solid rgb(0, 114, 180);
  height: 500px;
  position: absolute;
  top: 10px;
}
input {
  margin: 15px 0px 5px 30px;
  width: 250px;
  height: 20px;
}
#del {
  color: rgb(0, 114, 180);
  cursor: pointer;
  font-family: Nunito;
  font-size: 18px;
  display: inline-block;
  background-color: white;
  border: none;
  float: right;
  margin-top: -19px;
  box-shadow: none;
}
li {
  font-family: Nunito;
  text-align: left;
  height: 50px;
  margin-top: 20px;
  /* border: 1px solid rgb(0, 114, 180); */
  width: 320px;
  box-shadow: 0 4px 10px -4px  rgba(0, 0, 0, 0.377);
}

li span {
  position: relative;
  left: 10px;
}
#add {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  background-color: white;
  border: 1px solid rgb(0, 114, 180);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  color: rgb(0, 114, 180);
  letter-spacing: 3px;
  font-weight: bold;
  outline: none;
  margin: 20px;
}
#add:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  color: white;
}
</style>