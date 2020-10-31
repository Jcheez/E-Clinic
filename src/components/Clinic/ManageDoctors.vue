<template>
  <div>
    <div id="addDoctor">
      <h3>Add Doctor</h3>
      <form>
        <div>
          <input
            type="text"
            v-model="this.doctorAdd.name"
            placeholder="Doctor Name"
            required
          /><br />
          <input
            type="text"
            v-model="this.doctorAdd.id"
            placeholder="Doctor License No."
            required
          />
        </div>
        <button id="add" v-on:click="addDoctor()">Submit</button>
      </form>
    </div>

    <div id="deleteDoctor">
      <h3>Delete Doctor</h3>
      <div>
        <ul id="indivDoctor" style="list-style-type: none">
          <li v-for="d in doctors" v-bind:key="d.dNum" :id="d.dNum">
            <b>Doctor Name: </b> {{ d.dName }} <br />
            <b>Doctor License Number: </b> {{ d.dNum }}
            <button id="del" v-on:click="delDoctor(d.dNum)"><b>X</b></button>
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
        id: "",
        name: "",
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
        database.collection("doctors").add({
          id: this.doctorAdd.id,
          name: this.doctorAdd.name,
          clinic: this.getUser.displayName,
        });
        alert("Successfully added new doctor!");
      }
    },
    delDoctor: function (doctorNumber) {
      let li = document.getElementById(doctorNumber);
      li.parentNode.removeChild(li);
      database.collection("doctors").doc(doctorNumber).delete();
      //need to emit back to parent list to not display box
    },

    resetError() {
      this.validationErrors = [];
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError();

      if (!this.doctorAdd.name) {
        this.validationErrors.push(
          "<strong>Doctor name</strong> cannot be empty."
        );
      }
      if (!this.doctorAdd.id) {
        this.validationErrors.push(
          "<strong>Doctor license no.</strong> cannot be empty."
        );
      } else if (
        this.doctorAdd.id.length != 7 ||
        this.doctorAdd.id.substr(0, 1) != "M" ||
        isNaN(this.doctorAdd.id.substr(1, 5)) ||
        !isNaN(this.doctorAdd.id.substr(6, 1))
      ) {
        this.validationErrors.push(
          "<strong>Doctor license no.</strong> entered is not valid."
        );
      }
    },
  },
};
</script>
<style scoped>
#addDoctor {
  height: 300px;
  width: 500px;
  display: inline-block;
}
#deleteDoctor {
  width: 400px;
  display: inline-block;
  border-left: 1px solid rgb(0, 114, 180);
  height: 500px;
}
input {
  margin: 15px 0px 5px 30px;
}
#del {
  color: red;
  cursor: pointer;
  font-family: Nunito;
  font-size: 20px;
  display: inline-block;
  background-color: white;
  border-bottom: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  border-left: 1px solid rgb(0, 114, 180);
  border-top: none;
  border-right: none;
  float: right;
  margin-top: -19px;
  box-shadow: none;
}
li {
  text-align: left;
  height: 60px;
  margin: 10px;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
}
#add {
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
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  color: white;
}
</style>