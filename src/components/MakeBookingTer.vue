<template>
  <div>
    <p>{{ msg }}</p>
    <p>{{ msg2 }}</p>
    <button v-on:click="home">
      Return Home
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Your condition is not available for teleconsult / You have not been to this clinic",
      msg2: "Clinic staff will contact you to make arrangements"
    };
  },
  methods: {
    home: function () {
      // change to the route for the patient page after login component is complete
      this.$router.push('/')
    }
  }
};
</script>

<style>
</style>