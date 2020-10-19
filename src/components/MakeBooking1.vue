<template>
  <div>
      <p>Please Choose a Clinic:</p>
      <select v-model="selected">
            <option v-for="(clinic, x) in clinics" v-bind:value="clinic.name" v-bind:key="x">
            {{clinic.name}}
            </option>
        </select>
        <br>
        <span>Selected: {{ selected }}</span>
        <br>
        <br>
        <input type="checkbox" id="fever" value="fever" v-model="checkedConditions">
        <label for="fever">Fever</label>
        <input type="checkbox" id="cough" value="cough" v-model="checkedConditions">
        <label for="cough">Cough</label>
        <input type="checkbox" id="runny nose" value="runny nose" v-model="checkedConditions">
        <label for="runny nose">Runny Nose</label>
        <input type="checkbox" id="sore throat" value="sore throat" v-model="checkedConditions">
        <label for="sore throat">Sore Throat</label>
        <input type="checkbox" id="chest pain" value="chest pain" v-model="checkedConditions">
        <label for="chest pain">Chest Pain</label>
        <br>
        <input type="checkbox" id="diarrhoea" value="diarrhoea" v-model="checkedConditions">
        <label for="diarrhoea">Diarrhoea</label>
        <input type="checkbox" id="skin conditions" value="skin conditions" v-model="checkedConditions">
        <label for="skin conditions">Skin Conditions</label>
        <input type="checkbox" id="high blood pressure" value="high blood pressure" v-model="checkedConditions">
        <label for="high blood pressure">High Blood Pressure</label>
        <input type="checkbox" id="diabetes" value="diabetes" v-model="checkedConditions">
        <label for="diabetes">Diabetes</label>
        <input type="checkbox" id="family planning" value="family planning" v-model="checkedConditions">
        <label for="family planning">Family Planning</label>
        <br>
        <span>Checked Conditions: {{ checkedConditions }}</span>
        <br>
        <br>
        <p id=error>{{this.errorstring}}</p>
        <button @click=next>Next</button>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
    data() {
        return {
            /* Remember to change this part when login is finished and props can be passed
            props: {
                name: "",
                phonenum: ""
            } */
        name: "Timothy",
        phonenum: "98712345",
        clinics: [],
        selected: "",
        checkedConditions: [],
        errorstring: "",
        firstbool: [],
        }
    },

    methods: {
        next: function () {
            if (!this.selected && this.checkedConditions.length == 0) {
                this.errorstring = "Please choose a clinic and at least 1 condition"
            } else if (!this.selected) {
                this.errorstring = "Please choose a clinic"
            } else if (this.checkedConditions.length == 0) {
                this.errorstring = "Please choose at least 1 condition"
            } else {
                this.errorstring = "";
                var a = this.checkedConditions;
                var physicalbool = (a.includes('fever') || a.includes('cough') || a.includes('sore throat') || a.includes('runny nose') || a.includes('chest pain')) 
                database.collection('patients').where("name", "==", this.name)
                .get()
                .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.data();
                        console.log(item.verifiedclinics)
                        var firstbool = !item.verifiedclinics.includes(this.selected)
                        

                        if (physicalbool || firstbool) {
                            this.$router.push('/makebookingter')
                            database.collection("pendingbooking").add(
                            {
                            name: this.name,
                            phonenum: this.phonenum,
                            clinic: this.selected,
                            physical: physicalbool,
                            firstTime: firstbool,
                            conditions: a,
                            pendingstatus: "Awaiting clinic staff to contact"
                            }
                            )
                        } else {
                            console.log("you have reached here")
                            //this.$router.push('/makebooking1')
                            //include passing of props to the next section
                        }           
                    });
                })
            }
        },
        fetchItems: function () {
            database.collection("clinics").get().then((querySnapShot) => {
                let item = {};
                querySnapShot.forEach((doc) => {
                item = doc.data();
                if (item.doctors) {
                    this.clinics.push(item);
                }
                });
            });
        },

    },
    created() {
        this.fetchItems();
    }
    
}
</script>

<style scoped>
p#error{color: red}
</style>