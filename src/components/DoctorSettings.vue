<template>
  <div>
    <input-zoom></input-zoom>
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
label {
  float: left;
  font-family: Roboto;
}
#submitButton {
  background-color: white;
  border: 1px solid rgb(0, 114, 180);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  color: rgb(0, 114, 180);
  letter-spacing: 3px;
  font-weight: bold;
  outline: none;
}

#submitButton:hover {
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  color: white;
}
</style>



  
