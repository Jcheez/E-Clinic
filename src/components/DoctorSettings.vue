<template>
  <div>
    <label>Please create a Zoom link and paste it in the box provided:</label>
    <input
      type="text"
      placeholder="Zoom Link for this new Consulation Slot"
      v-bind="zoomLink"
      id="zoomLinkInput"
    />
  </div>
</template>

<script>
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
  display: inline-block;
  font-family: Roboto;
}
</style>



  
