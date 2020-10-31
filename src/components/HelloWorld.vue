<template>
  <div class="hello">
    <h1>E-Clinic</h1>
    <h2>Empowering Medicine <br>Through the Internet</h2>
    <h4>Choose Your Account Type</h4>
    <ul v-if="!isUserAuth">
      <li>
        <router-link to="/cliniclogin">Clinic</router-link>
      </li>
      <li>
        <router-link to="/patientlogin">Patient</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  computed: {
    ...mapGetters(["getUser", "isUserAuth"])
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;800;900&display=swap');

.hello {
  background-image: url("~@/assets/main2.jpg");
  background-size: 600px auto;
  background-repeat: no-repeat;
  background-position: right bottom;
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

</style>
