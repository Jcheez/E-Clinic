<template>
<div>
  <HelloWorld v-bind:about="true"></HelloWorld>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="card">
        <div class="card-content">
          <div
            v-if="validationErrors.length"
            class="notification is-danger is-light"
          >
            <div class="content">
              Please resolve the following error(s) before proceeding.
              <ul style="list-style-type: none">
                <li
                  v-for="(error, index) in validationErrors"
                  :key="`error-${index}`"
                  v-html="error"
                />
              </ul>
              <button @click="resetError()" class="delete">Ok</button>
            </div>
          </div>
          <form class="signup">
            <div class="field">
              <!-- <label class="label">Name</label> -->
              <div class="control">
                <input
                  v-model="name"
                  class="input"
                  type="text"
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div class="field">
              <!-- <label class="label">E-mail</label> -->
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="text"
                  autocomplete="email"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div class="field">
              <!-- <label class="label">E-mail</label> -->
              <div class="control">
                <input
                  v-model="phoneNumber"
                  class="input"
                  type="text"
                  placeholder="Enter Phone No."
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  v-model="birthday"
                  class="input"
                  type="date"
                  placeholder="Date of Birth"
                />
              </div>
            </div>
            <div class="field">
              <!-- <label class="label">Password</label> -->
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            <div class="field">
              <!-- <label class="label">Repeat password</label> -->
              <div class="control">
                <input
                  v-model="passwordRepeat"
                  class="input"
                  type="password"
                  autocomplete="new-password"
                  placeholder="Repeat Password"
                />
              </div>
            </div>
            <div class="field">
              <p class="control">
                <button @click.prevent="validate()" class="button is-success">
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import HelloWorld from "../HelloWorld.vue" 
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
     HelloWorld,
   },
  data() {
    return {
      name: null,
      email: null,
      phoneNumber: null,
      birthday: null,
      password: null,
      passwordRepeat: null,
      validationErrors: []
    };
  },
  computed: {
    ...mapGetters(["isUserAuth", "getUser"])
  },
  methods: {
    ...mapActions(["signUpAction", "signOutAction"]),
    resetError() {
      this.validationErrors = [];
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError();
      if (!this.name) {
        this.validationErrors.push("<strong>Name</strong> cannot be empty.");
      }
      if (!this.birthday) {
        this.validationErrors.push("<strong>DOB</strong> cannot be empty.");
      }
      if (!this.phoneNumber) {
        this.validationErrors.push("<strong>Phone no.</strong> cannot be empty.");
      }
      // email validation
      if (!this.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
      }
      if (/.+@.+/.test(this.email) != true) {
        this.validationErrors.push("<strong>E-mail</strong> must be valid.");
      }
      // password validation
      if (!this.password) {
        this.validationErrors.push("<strong>Password</strong> cannot be empty");
      }
      if (/.{6,}/.test(this.password) != true) {
        this.validationErrors.push(
          "<strong>Password</strong> must be at least 6 characters long"
        );
      }
      if (!(this.password === this.passwordRepeat)) {
        this.validationErrors.push("<strong>Passwords</strong> did not match");
      }

      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.signUp();
      }
    },
    signUp() {
      this.signUpAction({ email: this.email, password: this.password, 
      clinic: false, name: this.name,
      birthday: this.birthday, phoneNumber: this.phoneNumber }).then(() => {
        if (this.isUserAuth) {
          this.signOutAction()
          this.$router.replace({ name: "patientlogin" });
          alert("Signed up successfully!")
        }
      })
    }
  }
};
</script>

<style scoped>
.signup {
  background-color: white;
  width: 380px;
  height: 400px;
  margin: auto;
  border-radius: 20px;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  margin-top: -380px;
  margin-left: 775px;
}

input[type=text], input[type=password], input[type=date] {
  position: relative;
  top: 20px;
  display:block;
  text-align: left;
  color: rgb(0, 114, 180);
  font-family: Nunito;
  font-size: 14px;
  width: 280px;
  padding: 10px;
  margin: 15px 0px 5px 30px;
  border:none;
  background-color: rgba(122, 113, 113, 0.04);
}

.control button {
  display:block;
  margin: 40px 0px 0px 250px;
  transition: box-shadow 0.3s;
  transition: 0.3s;
  background-color: rgb(0, 114, 180);
  letter-spacing: 2px;
  width: 80px;
  height: 36px;
  color: white;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
}

.control button:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

.delete {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  background-color: rgb(0, 114, 180);
  letter-spacing: 2px;
  width: 80px;
  height: 36px;
  color: white;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  margin-bottom: 15px;
}

.delete:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
</style>