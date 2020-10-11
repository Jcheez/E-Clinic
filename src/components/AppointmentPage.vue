<template>
  <div>
    <v-date-picker 
    v-model="date" 
    is-inline 
    :min-date='new Date()'
    />
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      date: new Date(),
      slots: []
    };
  },
  watch: {
    date: function () {
      this.slots = []
      let date = this.date.toLocaleDateString()
      database
        .collection("consultslots")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            console.log(item.date)
            if (item.date === date) {
              this.slots.push(item)
            }
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
