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
        <input type="checkbox" id="Fever" value="Fever" v-model="checkedConditions">
        <label for="Fever">Fever</label>
        <input type="checkbox" id="Cough" value="Cough" v-model="checkedConditions">
        <label for="Cough">Cough</label>
        <input type="checkbox" id="Runny Nose" value="Runny Nose" v-model="checkedConditions">
        <label for="Runny Nose">Runny Nose</label>
        <input type="checkbox" id="Sore Throat" value="Sore Throat" v-model="checkedConditions">
        <label for="Sore Throat">Sore Throat</label>
        <input type="checkbox" id="Chest Pain" value="Chest Pain" v-model="checkedConditions">
        <label for="Chest Pain">Chest Pain</label>
        <br>
        <input type="checkbox" id="Diarrhoea" value="Diarrhoea" v-model="checkedConditions">
        <label for="Diarrhoea">Diarrhoea</label>
        <input type="checkbox" id="Skin Conditions" value="Skin Conditions" v-model="checkedConditions">
        <label for="Skin Conditions">Skin Conditions</label>
        <input type="checkbox" id="High Blood Pressure" value="High Blood Pressure" v-model="checkedConditions">
        <label for="High Blood Pressure">High Blood Pressure</label>
        <input type="checkbox" id="Diabetes" value="Diabetes" v-model="checkedConditions">
        <label for="Diabetes">Diabetes</label>
        <input type="checkbox" id="Family Planning" value="Family Planning" v-model="checkedConditions">
        <label for="Family Planning">Family Planning</label>
        <br>
        <span>Checked Conditions: {{ checkedConditions }}</span>
        <br>
        <br>
        <p id=error>{{this.errorstring}}</p>
        <button @click=next>Next</button>
  </div>
</template>

<script>
import database from "../../firebase.js";

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
                var physicalbool = (a.includes('Fever') || a.includes('Cough') || a.includes('Sore Throat') || a.includes('Runny Nose') || a.includes('Chest Pain')) 
                database.collection('patients').where("name", "==", this.name)
                .get()
                .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.data();
                        console.log(item.verifiedclinics)
                        var firstbool = !item.verifiedclinics.includes(this.selected)
                        
                        console.log(physicalbool)

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