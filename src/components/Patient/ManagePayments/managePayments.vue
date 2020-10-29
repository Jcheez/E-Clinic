<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <div id="hard">
        <p>You have <b>{{Object.keys(outstanding).length}}</b> outstanding invoices</p>
        <p>Digital payments are available for:</p>
        <ul>
            <li>
                PayNow
            </li>
            <li>
                DBS PayLah
            </li>
            <li>
                UOB Mighty
            </li>
            <li>
                OCBC PayAnyone
            </li>
        </ul>
    </div>
    <p>{{this.qrCode}}</p>
    <p>{{this.amountPaid}}</p>
    <p>{{this.outstanding}}</p>
    <ul id="payments">
      <li v-for="(name, value, index) in this.outstanding" :key="index" id="iter">
        <div id="inner">
          <div v-if="amountPaid[value] == undefined">
            <span style="white-space: nowrap;">Outstanding payment from {{value}}</span>
            <span>
              Outstanding amount: ${{name[0].toFixed(2)}}
            </span>
            <div v-for="(clinic, index) in qrCode" :key="index">
              <div v-if="clinic[0] == name[1]" id='paydetails'>
                  <p style="font-size:20px; position:relative; left:65px;">Interbank transfer: {{clinic[2]}}</p>
                  <img v-bind:src="clinic[1]">
              </div>
            </div> 
          </div>
          
          <div v-else-if="name[0] == amountPaid[value][0]">
              <span style="position:relative; top: 65px; left:5px; font-size:35px">Payment Completed for {{value}}!</span>
          </div>

          <div v-else>
            <span style="white-space: nowrap;">Outstanding payment from {{value}}</span>
            <span>
              Outstanding amount: ${{(name[0] - amountPaid[value][0]).toFixed(2)}}
            </span>
            <div v-for="(clinic, index) in qrCode" :key="index">
              <div v-if="clinic[0] == name[1]" id='paydetails'>
                  <p style="font-size:20px; position:relative; left:65px;">Interbank transfer: {{clinic[2]}}</p>
                  <img v-bind:src="clinic[1]">
              </div>
            </div>
          </div>
          
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../../../firebase.js";

export default {
  data() {
    return {
      msg: "Manage Payments",
      patient: "Timothy", // To get Patient Name from localstorage after login logout done
      qrCode: [],
      amountPaid: {},
      outstanding: {}
    };
  },

  methods: {
    getQrCode: function() {
        database
        .collection("clinics")
        .get()
        .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
                item = doc.data();
                if (item.qrCode == undefined ) {
                    this.qrCode.push([item.name, "", ""])
                } else {
                    this.qrCode.push([item.name, item.qrCode, item.interBank])
                }
            });
        });

    },

    getMoneyInOut: function() {
        database
        .collection("patients")
        .where("name", "==", this.patient)
        .get()
        .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
                item = doc.data();
                this.amountPaid = item.amountPaid
                this.outstanding = item.outstandingAmount
            });
        });
    },

    formatter: function() {
        for(let x in {...this.outstanding}) {
            let details = this.outstanding[x]
            if (this.amountPaid[x] == undefined) {
                return
            } else if (this.amountPaid[x][0] == details[0]) {
                console.log(2)
                delete this.outstanding[x]
            } else {
                console.log(this.outstanding)
            }
        }
    }
  },

  created() {
      this.getQrCode()
      this.getMoneyInOut()
  },

  beforeUpdate() {
    console.log(this.outstanding)
    this.formatter()
  },

  props: {

  }
};
</script>

<style scoped>
h1 {
  position: absolute;
  width: 372px;
  height: 57px;
  left: 86px;
  top: 220px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 42px;
  line-height: 57px;
  color: #000000;
}

hr {
  position: absolute;
  width: 1459px;
  height: 40px;
  left: 520px;
  top: 250px;
  background-color: #1677cf;
}

div#hard {
    position: absolute;
    top: 350px;
    left:100px;
    font-size: 25px;
    text-align: left;
}

div#inner {
  width: 70%;
  display: inline-block;
}

li#iter {
  position: relative;
  width: 562px;
  height: 320px;
  left: 73px;
  top: 400px;
  border: 1px solid #000000;
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding-left: 10px;
  padding-top: 20px;
  display: block;
}

span {
  position: relative;
  top: 14px;
  left:-50px;
  display: block;
  text-align: left;
  font-size: 20px;
}

div#paydetails {
    position: relative;
    left: -162px
}
</style>