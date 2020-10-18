<template>
  <form v-on:submit.prevent="successfulSubmit">
    <label>Please create a Zoom link and paste it in the box provided:</label>
    <input
      type="text"
      placeholder="Zoom Link for this new Consulation Slot"
      v-model="inputZoomLink"
      v-bind:zoomlink="inputZoomLink"
      id="zoomLinkInput"
    />
    <span> <input id="submitButton" type="submit" value="Submit" /></span>
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputZoomLink: "",
    };
  },
  methods: {
    successfulSubmit() {
      alert("Successfully submitted Zoom Link");
      console.log(this.inputZoomLink);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
form {
  align-items: center;
  display: inline-block;
}
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

span {
  display: block;
  margin: 40px;
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