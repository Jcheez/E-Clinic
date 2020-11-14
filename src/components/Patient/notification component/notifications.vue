<template>
  <div class="navbar">
    <div class="dropdown">
      <button
        v-if="this.newMessages.length == 0"
        class="dropbtn"
        v-on:click="myFunction()"
      >
        <bell-icon :size="40" />
      </button>
      <button
        v-else
        class="dropbtn"
        style="background-color: #ff6961"
        v-on:click="myFunction()"
      >
        <bell-ring-icon :size="40" />
      </button>
      <div class="dropdown-content" id="myDropdown">
        <p v-if="this.newMessages.length == 0 && this.oldMessages.length == 0">
          You do not have any notifications
        </p>
        <p
          id="new"
          v-for="(m, index) in this.newMessages"
          :key="index"
          style="
            background-color: rgb(185, 250, 250);
            margin-bottom: 0px;
            margin-top: 0px;
          "
        >
          {{ m }}
        </p>
        <p
          id="old"
          v-for="(m2, index) in this.oldMessages"
          :key="index + newMessages.length"
          style="margin-bottom: 0px; margin-top: 0px"
        >
          {{ m2 }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../../../firebase.js";
import BellIcon from "vue-material-design-icons/Bell.vue";
import BellRingIcon from "vue-material-design-icons/BellRing.vue";
//import * as firebase from "firebase"

export default {
  data() {
    return {
      msg: "Notifications ",
      newMessages: [],
      oldMessages: [],
    };
  },
  components: {
    BellIcon,
    BellRingIcon,
  },
  methods: {
    fetchitems: function () {
      database
        .collection("patients")
        .doc(localStorage.getItem("uidPatient"))
        .get()
        .then((doc) => {
          let item = doc.data();
          this.newMessages = item.newNotifications;
          this.oldMessages = item.oldNotifications;
          let returnArray = this.newMessages.concat(this.oldMessages);
          if (this.newMessages.length < 5) {
            while (this.oldMessages.length + this.newMessages.length > 5) {
              this.oldMessages.pop();
            }
          } else {
            this.oldMessages = [];
          }

          database
            .collection("patients")
            .doc(localStorage.getItem("uidPatient"))
            .update({
              newNotifications: [],
              oldNotifications: returnArray,
            });
        });
    },

    myFunction: function () {
      document.getElementById("myDropdown").classList.toggle("show");
    },

    windowevent: function (e) {
      if (!e.target.matches(".dropbtn")) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains("show")) {
          myDropdown.classList.remove("show");
        }
      }
    },
  },

  created() {
    this.fetchitems();
    window.addEventListener("click", this.windowevent);
  },

  destroyed() {
    window.removeEventListener("click", this.windowevent);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.navbar {
  position: relative;
  right: 50px;
  top: 55px;
}

.dropdown {
  float: right;
  overflow: auto;
}

.dropbtn {
  cursor: pointer;
  font-size: 16px;
  border: none;
  outline: none;
  color: black;
  padding: 14px 16px;
  border-radius: 50px;
  font-family: inherit;
  margin: 10px;
}

.dropbtn-red {
  cursor: pointer;
  font-size: 16px;
  border: none;
  outline: none;
  color: black;
  padding: 14px 16px;
  border-radius: 50px;
  background-color: #ff6961;
  font-family: inherit;
  margin: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-left: -300px;
}

.dropdown-content p {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;

}

.show {
  display: block;
}
svg {
  pointer-events: none;
}
</style>
