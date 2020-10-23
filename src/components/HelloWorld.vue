<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul v-if="!isUserAuth">
      <li>
        <router-link to="/cliniclogin">Clinic</router-link>
      </li>
      <li>
        <router-link to="/patienthome">Patient</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"])
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
