import firebase from "firebase";
import store from "./store"

const firebaseConfig = {
  apiKey: "AIzaSyCyTYhdAilYNdXSgTAIXNHnbC5J6gu1Cds",
  authDomain: "e-clinic-e8c00.firebaseapp.com",
  databaseURL: "https://e-clinic-e8c00.firebaseio.com",
  projectId: "e-clinic-e8c00",
  storageBucket: "e-clinic-e8c00.appspot.com",
  messagingSenderId: "912281579882",
  appId: "1:912281579882:web:915439768cf00edae4b513",
  measurementId: "G-S36ST5KXWQ",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


var database = firebase.firestore();
export default database;
