<template>
  <div>
    <div>
      <p class="up">Upload a file:</p>
      <input type="file" @change="previewFile" accept="application/pdf" class="up"/>
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
import database from "../../../firebase.js";

export default {
  name: "Upload",
  data() {
    return {
      fileData: null,
      pdf: null,
      uploadValue: 0,
      doc: {},
      clinic: localStorage.getItem("clinicName"),
      newMessages: [],
    };
  },

  props: {
    type: String,
    doc_id: String,
    date: String,
    name: String,
  },

  methods: {
    previewFile(event) {
      this.uploadValue = 0;
      this.pdf = null;
      this.fileData = event.target.files[0];      
    },

    formatDate: function(date) {
      let filter_year = date.getFullYear()
      let filter_month = date.getMonth() + 1
      let filter_day = date.getDate()
      return filter_day + "/" + filter_month + "/" + filter_year
    },

    fetchItems: function () {
        database
        .collection("patients")
        .where('name', '==', this.name)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.doc = doc.data().notes;
            this.newMessages = doc.data().newNotifications
            console.log("Fetched")
          }); 
        });
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

            console.log(this.doc)
            
            if (this.doc[this.clinic] == undefined) {
              console.log(1)
              this.doc[this.clinic] = {}
              this.doc[this.clinic][this.date] = {}
              this.doc[this.clinic][this.date][this.type] = url
            } else if (this.doc[this.clinic][this.date] == undefined) {
              this.doc[this.clinic][this.date] = {}
              this.doc[this.clinic][this.date][this.type] = url
            } else {
              this.doc[this.clinic][this.date][this.type] = url
            }
            
            let today = this.formatDate(new Date())
            this.newMessages.splice(0, 0, today + ": " + this.type + " has been updated")

            database
            .collection('patients')
            .doc(this.doc_id)
            .update({
              notes: this.doc,
              newNotifications: this.newMessages
              })
            .then(() => {
            alert(this.type + " has been uploaded successfully")
            location.reload()
            
            })
          });
        },
      );
    },
  },
  
  updated() {
    this.fetchItems()
  }
  
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");

img.preview {
    width: 200px;
}
.up {
  font-size: 16px;
  font-family: Nunito;
  text-align: left;
}

button {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  position: absolute;
  top: 95px;
  right: -20px;
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
