<template>
  <div class="settings">
    <h4>Clinic Settings</h4>
    <div id="sideNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/clinichome">Dashboard</router-link><br />
      <router-link to="/doctorslist">Doctors</router-link><br />
      <router-link to="/patientsnotes">Patient Notes</router-link><br />
      <router-link to="/pendingbooking">Pending</router-link><br />
      <router-link to="/clinicsettings">Settings</router-link><br />
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <div id="instructions">
      <label>Update Email Address:</label><br />

      <label>Change Password:</label><br />
      <label>Repeat New Password:</label><br />
      <label>Update Interbank Account:</label>
      <br/>
      <label style = "margin-top: -15px">Update QR Code: </label>
    </div>
    <div id="inputFields">
      <input
        type="text"
        placeholder="Enter New Email"
        id="changeEmail"
        v-model="newEmail"
      />
      <br>
      <input
        type="password"
        placeholder="Enter New Password"
        id="changePW"
        style = "margin-top: -15px;"
        v-model="newPassword"
      />
      <br>
      <input
        type="password"
        placeholder="Please Re-enter New Password To Confirm"
        id="repeatPW"
        style = "margin-top: -15px;"
        v-model="repeatPassword"
      />
      <br>
      <input
        type="text"
        placeholder="Enter New Interbank Account"
        id="interbank"
        v-model="interbank"
        style = "margin-top: -13px;"
      /><uploadQr style="margin: 10px; margin-top: -4px"></uploadQr>
    </div>
    <!--div id="buttons"-->
    <button id="submitEmail" v-on:click="changeEmail">Update Email</button>
    <br>
    <button id="submitPW" v-on:click="changePassword">Update Password</button>
    <button id="submitInterBank" v-on:click="changeInterBank">
      Update Interbank
    </button>
    <!--/div-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import database from "../../firebase.js";
import uploadQr from "./uploadQr.vue";

export default {
  data() {
    return {
      newEmail: "",
      newPassword: "",
      repeatPassword: "",
      interbank: "",
      validationErrors: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },

    resetError() {
      this.validationErrors = [];
    },
    validateNewPassword() {
      // Clear the errors before we validate again
      this.resetError();

      if (/.{6,}/.test(this.newPassword) != true) {
        this.validationErrors.push(
          "Password must be at least 6 characters long"
        );
      }
      if (!(this.newPassword === this.repeatPassword)) {
        this.validationErrors.push("Passwords did not match");
      }
    },

    changeEmail() {
      if (/.+@.+/.test(this.newEmail) != true) {
        alert("E-mail must be valid.");
      } else {
        this.getUser.updateEmail(this.newEmail).then(function () {
          // Update successful.
          alert("Successfully Updated Your Email Address.");
        });
        this.newEmail = "";
      }
    },
    changePassword() {
      this.validateNewPassword();
      if (this.validationErrors.length <= 0) {
        this.getUser.updatePassword(this.newPassword).then(function () {
          // Update successful.
          alert("Successfully Updated Your Password.");
        });
        this.newPassword = "";
        this.repeatPassword = "";
      } else {
        for (var v = 0; v < this.validationErrors.length; v++) {
          alert(this.validationErrors[v]);
        }
      }
    },

    changeInterBank() {
      database
        .collection("clinics")
        .doc(localStorage.getItem("uidClinic"))
        .update({
          interBank: this.interbank,
        }).then(() => {
          alert("Interbank account has been updated")
        });
    },
  },

  components: {
    uploadQr: uploadQr,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
.settings {
  display: flex;
  align-items: center;
  justify-content: center;
}
h4 {
  position: absolute;
  left: 250px;
  font-family: Nunito;
  padding: 30px 0 0 0;
  font-size: 32px;
  top: 0px;
}
a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 17px;
  letter-spacing: 2px;
  margin: 50px 0 0 0;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

a:hover {
  font-size: 18px;
  color: white;
  cursor: pointer;
}

#sideNavBar {
  width: 180px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
  height: 100%;
}
label {
  color: black;
  font-weight: bolder;
  padding: 10px 0px 0px 0px;
  margin-bottom: 30px;
  position: relative;
  display: block;
  width: 250px;
  text-align: left;
}
h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 0px 0px;
}
input {
  width: 300px;
  height: 20px;
  display: block;
  margin: 10px;
  margin-bottom: 50px;
  position: relative;
}
#inputFields {
  width: 350px;
  display: block;
  /*margin-top: 100px;
  bottom: 300px;*/
  position: absolute;
  left: 500px;
  top: 160px;
}
#instructions {
  width: 300px;
  margin: 10px;
  left: 260px;
  top: 150px;
  display: inline-block;
  height: 300px;
  float: left;
  position: absolute;
}
#submitEmail {
  transition: 0.3s;
  position: absolute; /*need change to relative?? */
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  /* font-weight: bold; */
  font-size: 14px;
  color: white;
  letter-spacing: 2px;
  outline: none;
  display: block;
  width: 130px;
  text-align: center;
  margin-left: 20px;
  left: 850px;
  margin-bottom: 70px;
  height: 50px;
  top: 160px;
}
#submitPW {
  transition: 0.3s;
  position: absolute;
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  /* font-weight: bold; */
  font-size: 14px;
  color: white;
  letter-spacing: 2px;
  outline: none;
  display: block;
  width: 130px;
  text-align: center;
  margin-left: 20px;
  height: 60px;
  left: 850px;
  top: 310px;
  margin-top: 15px;
}

#submitInterBank {
  transition: 0.3s;
  position: absolute;
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  /* font-weight: bold; */
  font-size: 14px;
  color: white;
  letter-spacing: 2px;
  outline: none;
  display: block;
  width: 130px;
  text-align: center;
  margin-left: 20px;
  height: 60px;
  left: 850px;
  top: 385px;
  margin-top: 15px;
}
button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}

#buttons {
  width: 80px;
  display: inline-block;
  top: 300px;
  margin-top: 100px;
}
</style>