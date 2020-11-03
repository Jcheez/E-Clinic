<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
  },

  created() {
      if (performance.navigation.type == 1 && this.$route.path == '/patientsnotes/appointments') {
          this.$router.push('/patientsnotes')
      } else if (performance.navigation.type == 1 && this.$route.path == '/pendingbooking/resolve') {
          if (confirm('Reload site? You will be redirected back 1 page.')) {
            this.$router.push('/pendingbooking')
        }
      } else if (performance.navigation.type == 1 && this.$route.path == '/makebooking/makebookingpass') {
          if (confirm('Reload site? You will be redirected back to the booking page.')) {
            this.$router.push('/makebooking')
          }
      } else if (performance.navigation.type == 1 && this.$route.path == '/makebooking/makebookingpass/makebookingconfirmation') {
          if (confirm('Reload site? You will be redirected back to the booking page.')) {
            this.$router.push('/makebooking')
          }
      } else if (performance.navigation.type == 0 && this.$route.path == '/makebooking/makebookingpass') {
        this.$router.push("/makebooking")
      }
  },
  mounted() {
    this.authAction();
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"])
  },
  methods: {
    ...mapActions(["authAction"])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
