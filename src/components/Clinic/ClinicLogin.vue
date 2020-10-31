<template>
  <div class="columns" v-if="!isUserAuth">
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
          <!-- <HelloWorld msg="Welcome to E-Clinic"/> -->
          <form class="login">
            <div class="field">
              <label class="label">E-mail</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="text"
                  autocomplete="email"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="field">
              <p class="control">
                <button @click.prevent="validate()" class="button is-success">
                  Login
                </button>
              </p>
            </div>
            <p class="acc">No account yet?
              <router-link to="/cliniclogin/clinicsignup">Sign up!</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "../HelloWorld.vue"
import { mapGetters, mapActions } from "vuex";

export default {
  // components: {
  //   HelloWorld,
  // },
  data() {
    return {
      email: null,
      password: null,
      validationErrors: [],
      firebaseError: ""
    };
  },
  computed: {
    ...mapGetters(["isUserAuth"])
  },
  methods: {
    ...mapActions(["signInAction"]),
    resetError() {
      this.validationErrors = [];
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError();

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
      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.signIn();
      }
    },
    signIn() {
      this.signInAction({ email: this.email, password: this.password }).then(() => {
        if (this.isUserAuth) {
          this.$router.push({ name: "clinichome" });
        }
      })
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

.login {
  background-color: white;
  width: 380px;
  height: 300px;
  margin: auto;
  border-radius: 20px;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  margin-top: -460px;
}

.label {
  display: block;
  text-align: left;
  font-family: Nunito;
  font-weight: bold;
  padding: 20px 0px 0px 30px;
}

input[type=text], input[type=password] {
  display:block;
  text-align: left;
  color: rgb(0, 114, 180);
  font-family: Nunito;
  font-size: 14px;
  width: 280px;
  padding: 10px;
  margin: 10px 0px 0px 30px;
  border:none;
  background-color: rgba(122, 113, 113, 0.04);
}

.control button {
  display:block;
  margin: 40px 0px 0px 30px;
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

.acc {
  display: block;
  margin: -38px 0px 0px 130px;
  font-family: Nunito;
  font-size: 14px;
}

.acc a {
  text-decoration: none;
  color: rgb(0, 114, 180);
  font-weight: bolder;
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