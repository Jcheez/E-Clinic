import firebase from "firebase";

const actions = {
  authAction({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("setUser", user);
      } else {
        commit("setUser", null);
      }
    });
  },
  signUpAction({ commit }, payload) {
    if (payload.clinic) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: payload.name,
              photoURL: "clinic"
            })
            return firebase.firestore().collection('clinics').doc(data.user.uid).set({
                name: payload.name,
                //openingHours: this.form.hours,
                doctors: [],
            })
        }).then(res => console.log(res))
        .catch(error => {
          commit("setError", error.message);
        });
      } else {
        return firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: payload.name,
              photoURL: "patient"
            })
            return firebase.firestore().collection('patients').doc(data.user.uid).set({
                name: payload.name,
                appointment_history: [],
                verifiedclinics: [],
                notes: {},
                upcoming: {}
            })
        }).then(res => console.log(res))
        .catch(error => {
          commit("setError", error.message);
        });
      }
  },
  signInAction({ commit }, payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        alert(error.message)
        commit("setError", error.message);
      });
  },
  signOutAction({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
      })
      .catch(error => {
        commit("setError", error.message);
      });
  }
};

export default actions;