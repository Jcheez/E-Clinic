<template>
  <div class="hello">
    <h1>E-Clinic</h1>
    <h2>Empowering Medicine <br>Through the Internet</h2>
    <div v-if ="about" style = "margin-left: 650px; margin-top: 100px">
      <h4>Choose Your Account Type</h4>
      <ul>
        <li>
          <router-link to="/cliniclogin">Clinic</router-link>
        </li>
        <li>
          <router-link to="/patientlogin">Patient</router-link>
        </li>
      </ul>
    </div>
    <div v-else style = "margin-left: 650px; margin-top: 200px">
      <h4>About E-clinic</h4>
      <p> E-clinic enables you to consult your doctor,
        <br> from the comfort of your own home! </p>
      <router-link to="/cliniclogin">
        <button class = "delete" v-on:click="toggle">Proceed</button>
      </router-link>
    </div>
    <a style = "bottom: 100px; left: 370px; position: absolute; font-size: 8px;" href="https://stories.freepik.com/work">Illustration by Freepik Stories</a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    about: {
      type: Boolean,
    },
  },
  
  name: "HelloWorld",
  computed: {
    ...mapGetters(["getUser", "isUserAuth"])
  },
  methods: {
   toggle: function () {
      this.about = !this.about;
    }
  },
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');

.hello {
  background-image: url("~@/assets/Online Doctor-pana.png");
  background-size: 700px auto;
  background-repeat: no-repeat;
  background-position: left;
  background-position-y: 80px;
  background-position-x: 50px;
  height: 700px;
}

h1 {
  text-align: left;
  padding-left: 20px;
  color: rgb(0, 114, 180);
  font-family: Nunito;
  font-weight: bolder;
  font-size: 40px;
}

h2 {
  margin: -20px;
  font-size: 34px;
  font-family: Nunito;
  font-weight: bolder;
}

h4 {
  font-size: 20px;
  font-family: Nunito;
  font-weight: normal;
}

ul {
  list-style-type: none;
  margin-top: -20px;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  font-family: Nunito;
  font-weight: bold;
  color: rgb(0, 114, 180);
  text-decoration: none;
}

.router-link-active {
  text-decoration: underline;
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
  margin-top: 20px;
}

.delete:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

</style>
