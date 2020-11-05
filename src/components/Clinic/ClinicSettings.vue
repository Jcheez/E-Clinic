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
    <div id="inputFields">
      <h3>Update Email Address:</h3>
      <input
        type="text"
        placeholder="Enter New Password"
        id="changeEmail"
        v-model="newEmail"
      />

      <button v-on:click="changeEmail">Update</button>
      <h3>Change Password:</h3>
      <input
        type="text"
        placeholder="Enter New Password"
        id="changePW"
        v-model="newPassword"
      />

      <h3>Repeat New Password:</h3>
      <input
        type="text"
        placeholder="Please Re-enter New Password To Confirm"
        id="repeatPW"
        v-model="repeatPassword"
      />
      <button v-on:click="changePassword">Update</button>
    </div>
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
  font-size: 16px;
  letter-spacing: 2px;
  margin: 60px 0 0 0;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

a:hover {
  font-size: 17px;
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

h3#sideNavBar {
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
}

#inputFields {
  align-items: left;
  margin: 10px;
  margin-left: 50px;
  margin-top: 100px;
}
button {
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
  width: 80px;
  text-align: center;
  margin-left: 50px;
}
button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
</style>