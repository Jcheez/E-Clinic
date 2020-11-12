<template>
  <div>
    <div>
      <input type="file" @change="previewFile" accept="image/*" class="up"/>
    </div>
    <div>
      <p class="up">
        Progress: {{ uploadValue.toFixed() + "%" }}
        <progress id="progress" :value="uploadValue" max="100"></progress>
      </p>
    </div>
    <div v-if="fileData != null">
      <br />
      <button @click="onUpload">Upload</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import database from "../../firebase.js";

export default {
  name: "Upload",
  data() {
    return {
      fileData: null,
      pdf: null,
      uploadValue: 0,
    };
  },

  methods: {
    previewFile(event) {
      this.uploadValue = 0;
      this.pdf = null;
      this.fileData = event.target.files[0];      
    },

    onUpload() {
      this.pdf = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.fileData.name}`)
        .put(this.fileData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.pdf = url;
            console.log(this.pdf)

            database
            .collection('clinics')
            .doc(localStorage.getItem("uidClinic"))
            .update({qrCode: this.pdf})
            .then(() => {
            console.log('user updated!')
            
            })
          });
        },
      );
    },
  },  
};
</script>

<style scoped>
img.preview {
    width: 200px;
}
.up {
  font-size: 16px;
  text-align: left;
  margin-left: -30px;
}

button {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  position: relative;
  bottom: 55px;
  left: 100px;
  font-family: Nunito;
  background-color:  rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
  color: white;
}

button:hover {
    cursor: pointer;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
</style>
