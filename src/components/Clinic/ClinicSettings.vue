<template>
  <div class="settings">
    <h1>Clinic Settings</h1>
    <div id="sideNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/clinichome">Dashboard</router-link><br />
      <router-link to="/doctorslist">Doctors</router-link><br />
      <router-link to="/clinicsettings"> Settings</router-link><br />
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <div id="instructions">
      <label>Update Email Address:</label><br />

      <label>Change Password:</label><br />
      <label>Repeat New Password:</label>
    </div>
    <div id="inputFields">
      <input
        type="text"
        placeholder="Enter New Email"
        id="changeEmail"
        v-model="newEmail"
      /><input
        type="text"
        placeholder="Enter New Password"
        id="changePW"
        v-model="newPassword"
      /><input
        type="text"
        placeholder="Please Re-enter New Password To Confirm"
        id="repeatPW"
        v-model="repeatPassword"
      />
    </div>
    <!--div id="buttons"-->
    <button id="submitEmail" v-on:click="changeEmail">Update Email</button
    ><button id="submitPW" v-on:click="changePassword">Update Password</button>
    <!--/div-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      newEmail: "",
      newPassword: "",
      repeatPassword: "",
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
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 18px;
  letter-spacing: 2px;
  margin: 60px 0 0 0;
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
}
label {
  color: black;
  font-weight: bolder;
  padding: 10px 0px 20px 0px;
  float: left;
  margin-bottom: 30px;
}
h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 20px 0px;
}
input {
  width: 300px;
  height: 20px;
  display: block;
  margin: 10px;
  margin-bottom: 50px;
}
#inputFields {
  width: 350px;
  display: inline-block;
  margin-top: 100px;
  position: relative;
  left: -200px;
}
#instructions {
  width: 300px;
  margin: 10px;
  margin-left: 400px;
  margin-top: 100px;
  display: inline-block;
  height: 300px;
  float: left;
}
#submitEmail {
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
  display: block;
  width: 150px;
  text-align: center;
  margin-left: 20px;
  left: 950px;
  margin-bottom: 70px;
  height: 50px;
  top: 180px;
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
  font-weight: bold;
  font-size: 14px;
  color: white;
  letter-spacing: 3px;
  outline: none;
  display: block;
  width: 150px;
  text-align: center;
  margin-left: 20px;
  height: 60px;
  left: 950px;
  top: 330px;
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