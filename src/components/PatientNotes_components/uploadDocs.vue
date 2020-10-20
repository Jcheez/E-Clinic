<template>
  <div>
    <div>
      <p class="up">Upload a pdf to Firebase:</p>
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
import database from "../../firebase.js";

export default {
  name: "Upload",
  data() {
    return {
      fileData: null,
      pdf: null,
      uploadValue: 0,
      doc: {},
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

    fetchItems: function () {
        database
        .collection("patients")
        .where('name', '==', this.name)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.doc = doc.data().notes;
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
            
            if (this.doc[this.date] == undefined) {
              console.log(1)
              this.doc[this.date] = {}
              this.doc[this.date][this.type] = url
            } else {
              this.doc[this.date][this.type] = url
            }

            database
            .collection('patients')
            .doc(this.doc_id)
            .update({notes: this.doc})
            .then(() => {
            console.log('user updated!')
            
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
img.preview {
    width: 200px;
}
.up {
  font-size: 20px;
  text-align: left;
}
</style>
