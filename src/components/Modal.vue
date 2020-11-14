<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <h3 style = "padding:20px; font-family: Nunito;">We are sad to see you go :(</h3>
        <p style = "margin-left: 10px; margin-top: -40px; padding: 20px; font-family: Roboto;">Are you sure you want to delete your account? <br> All your information will be wiped!</p>
        <footer class="modal-footer">
          <slot name="footer">
            <button style = "background-color: #77DD77" class="btn-green" @click="deleteAcct">
              Confirm
            </button>
            <button style = "background-color: #FF6961" class="btn-green" @click="close">
              Cancel
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import * as firebase from "firebase";

export default {
  name: "Modal",
  data: () => ({
    author: "",
    name: ""
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    deleteAcct() {
        this.$router.push("/");
        let user = firebase.auth().currentUser;
        user.delete().then(function() {
            alert("Your account has been deleted permanently.")
        }).catch(function(error) {
            console.log(error)
        });
    }
  }
};
</script>

<style>
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 4px 8px -4px  rgba(0, 0, 0, 0.377);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
.modal-header,
.modal-footer {
  padding: 5px;
  text-align: center;
}
.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.btn-green {
  transition: 0.3s;
  color: white;
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  font-family: Roboto;
  font-size: 16px;
  outline: none;
}

button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}

.input {
  margin-top: 5px;
}
.added-text {
  margin-block-end: -10px;
  margin-block-start: 0.5rem;
}
</style>