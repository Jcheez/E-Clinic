<template>
  <div>
    <input-zoom v-bind:currDoctor="this.currDoctor"></input-zoom>
  </div>
</template>

<script>
import inputZoom from "./InputZoom";
export default {
  data() {
    return {
      zoomLink: "",
    };
  },
  components: {
    inputZoom,
  },
  props: {
    currDoctor: {
      type: Object,
    },
  },
};
</script>
<style scoped>
#zoomLinkInput {
  display: block;
  width: 550px;
  font-family: Roboto;
  float: left;
  margin-left: 10px;
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



  
