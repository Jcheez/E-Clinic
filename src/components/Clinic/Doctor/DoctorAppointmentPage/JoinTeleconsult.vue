<template>
  <div id="zoom">
    <a v-bind:href="format(zoomlink)" target="_blank">Start Teleconsult</a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    zoomlink: {
      type: String,
    },
  },

  methods: {
    format: function(link) {
      if (link.includes("https://")) {
        return link
      } else {
        return "https://" + link;
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
div #zoom {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  width: 255px;
  height: 40px;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 3px;
  position: relative;
  margin-bottom: 0px;
  cursor: pointer;
  color: rgb(0, 114, 180);
}
div #zoom:hover {
  color: white;
  background-color: rgb(0, 114, 180);
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
a {
  font-size: 16px;
  font-family: Nunito;
  letter-spacing: 3px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  padding: 10px;
  color: rgb(0, 114, 180);
}

a:hover {
  color: white;
}
</style>