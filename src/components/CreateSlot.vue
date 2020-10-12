<template>
  <div>
    <h3>Add a Consultation Slot</h3>

    <form v-on:submit.prevent="createSelectedSlots">

        <label>Choose Slot <b>Start Time</b></label>
        <input type="time" id="startTime" name="consultStart" step="1800" min="08:30" max="18:00" required v-model="slotStartTime">

        <!--label>Choose Slot <b>End Time</b></label-->
        <!--input type="time" id="endTime" name="consultEnd" step="1800" min=this.slotStartTime max="18:00" required v-model="slotEndTime"-->
        <!--min and max can be the opening and closing time of the clinic :D -->


      <br/>
      <label for="repeatSlot">How often do you want the selected slots to repeat?</label>
        <select name="freqOfSlots" id="repeatSlots" v-model="selectedValue">
            <option>Does Not Repeat</option>
            <option>Daily</option>
            <option>Every Monday</option>
            <option>Every Tuesday</option>
            <option>Every Wednesday</option>
            <option>Every Thursday</option>
            <option>Every Friday</option>
            <option>Every Saturday</option>
            <option>Every Sunday</option>            
            <option>Only on Weekdays</option>
            <option>Only on Weekends</option>
        </select>
        <br/>
        <label v-if="selectedValue != doesNotRepeat" >Please choose the start and end dates for the slots selected to repeat.</label>
        <v-date-picker color="blue" mode="range" v-model="range" v-if="selectedValue != doesNotRepeat" />
        
        <input
        id="submitButton"
        type="submit"
        value="Submit"
        />
    </form>
  </div>
</template>
 
<script>
import VDatePicker from "v-calendar/lib/components/date-picker.umd";
import database from "../firebase.js";

export default {
  components: {
    VDatePicker,
  },
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date(),
      },
      slotStartTime: "08:30",
      slotEndTime: "09:00",
      selectedValue: "Does Not Repeat",
      doesNotRepeat: "Does Not Repeat",
    }
  }, methods: {
    /* Given a start date, end date and day name, return
    ** an array of dates between the two dates for the
    ** given day inclusive
    ** @param {Date} start - date to start from
    ** @param {Date} end - date to end on
    ** @param {string} dayName - name of day
    ** @returns {Array} array of Dates
    */
    getDaysBetweenDates:function(start, end, dayName) {
      var result = [];
      var days = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
      var day = days[dayName];
      // Copy start date
      var current = new Date(start);
      // Shift to next of required days
      current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
      // While less than end date, add dates to result array
      while (current < end) {
        result.push(new Date(+current));
        current.setDate(current.getDate() + 7);
      }
      return result;
    },
    createSelectedSlots:function() {
      //create new document in the consultSlots collection
      //but also need take into account if this slot is gonna be looped

      //if "Does Not Repeat", create slot object
      if (this.selectedValue == this.doesNotRepeat) {
        database.collection("consultslots").add({
          date: "" , //jerlyn's datepick current date -> should be a global variable across the entire AppointmentPage component
          time: this.slotStartTime,
          patient: null,
          doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
        });
      }
      else {
        let monArray = this.getDaysBetweenDates(this.range.start, this.range.end, 'mon')
        let tueArray = this.getDaysBetweenDates(this.range.start, this.range.end, 'tue')
        let wedArray = this.getDaysBetweenDates(this.range.start, this.range.end, 'wed')
        let thuArray = this.getDaysBetweenDates(this.range.start, this.range.end, 'thu')
        let friArray = this.getDaysBetweenDates(this.range.start, this.range.end, 'fri')
        let satArray = this.getDaysBetweenDates(this.range.start, this.range.end, 'sat')
        let sunArray = this.getDaysBetweenDates(this.range.start, this.range.end, 'sun')
        
        //if (this.selectedValue == "Daily") { 
        //}
        if (this.selectedValue == "Only on Weekdays") {
          let weekdayArray = monArray.concat(tueArray, wedArray, thuArray, friArray)
          for (let d in weekdayArray) {
            database.collection("consultslots").add({
            date: d , 
            time: this.slotStartTime,
            patient: null,
            doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
            });
          }
        }
        if (this.selectedValue == "Only on Weekends") {
          let weekendArray = satArray.concat(sunArray)
          for (let d in weekendArray) {
            database.collection("consultslots").add({
              date: d , 
              time: this.slotStartTime,
              patient: null,
              doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
            });
          }              
        }
        //if "Every Monday"/Tuesday/Wed/Thu/Fri/Sat/Sun
        else {
          let datesOfDayArray = this.getDaysBetweenDates(this.range.start, this.range.end, this.selectedValue.substr(0,3).toLowerCase())
          for (let d in datesOfDayArray) {
            database.collection("consultslots").add({
              date: d.toString() , 
              time: this.slotStartTime,
              patient: null,
              doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
            });
          }
        }
      }   
    }
  }
};
</script>
 
<style scoped>
#defaultSlot {
  border: 2px lightblue;
  border-radius: 8px;
  background-color: white;
  border: 2px solid lightblue;
  padding: 10px;
  width: 150px;
  margin: 10px;
  display: block;
}

#submitButton {
  background-color: lightblue;
  border: 2px solid darkslateblue;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

form {
  align-items: center;
  display: inline-block;
  margin: 10px;
}

#createCustomSlot {
  padding: 10px;
  margin: 10px;
  display: inline-block;
}
label {
  margin: 20px;
  display: inline-block;
}

#startTime,
#endTime {
  padding: 10px;
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  display: inline-block;
  align-items: center;
}
</style>
