import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyALybtUB2icDuddKzoQQQyJI95JDh9582I",
  authDomain: "e-clinic-5cd66.firebaseapp.com",
  databaseURL: "https://e-clinic-5cd66.firebaseio.com",
  projectId: "e-clinic-5cd66",
  storageBucket: "e-clinic-5cd66.appspot.com",
  messagingSenderId: "111652629468",
  appId: "1:111652629468:web:80868a9fcad170d8f9bd19",
  measurementId: "G-GZNZ4659N8",
};

firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();
export default database;
