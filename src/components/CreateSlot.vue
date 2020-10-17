<template>
  <div>
    <h3>
      Add a Consultation Slot
      <!--h2>for {{ selectedDate.toDateString() }}</h2-->
    </h3>

    <form v-on:submit.prevent="createSelectedSlots">
      <label>Choose Slot <b>Start Time</b></label>
      <input
        type="time"
        id="startTime"
        name="consultStart"
        step="1800"
        min="08:30"
        max="18:00"
        list="slotTimes"
        required
        v-model="slotStartTime"
      />

      <!--label>Choose Slot <b>End Time</b></label-->
      <!--input type="time" id="endTime" name="consultEnd" step="1800" min=this.slotStartTime max="18:00" required v-model="slotEndTime"-->
      <!--min and max can be the opening and closing time of the clinic :D -->
      <datalist id="slotTimes">
        <option value="08:30"></option>
        <option value="09:00"></option>
        <option value="09:30"></option>
        <option value="10:00"></option>
        <option value="10:30"></option>
        <option value="11:00"></option>
        <option value="11:30"></option>
        <option value="12:00"></option>
        <option value="12:30"></option>
      </datalist>

      <br />
      <label for="repeatSlot"
        >How often do you want the selected slots to repeat?</label
      >
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
      <br />
      <label v-if="selectedValue != doesNotRepeat"
        >Please choose the start and end dates (inclusive) for the slots
        selected to repeat.</label
      >
      <v-date-picker
        color="blue"
        mode="range"
        v-model="range"
        :min-date="new Date()"
        v-if="selectedValue != doesNotRepeat"
      />

      <input id="submitButton" type="submit" value="Submit" />
    </form>
  </div>
</template>
 
<script>
import database from "../firebase.js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date(),
      },
      slotStartTime: "08:30",
      selectedValue: "Does Not Repeat",
      doesNotRepeat: "Does Not Repeat",
    };
  },
  props: {
    selectedDate: {
      type: Date,
    },
  },
  methods: {
    checkAddEligible(datesToAddArray) {
      //let timestamp = new firebase.firestore.Timestamp.fromDate(dateToAdd);
      let timestampArray = datesToAddArray.map(function (dateobj) {
        return new firebase.firestore.Timestamp.fromDate(dateobj); //not comparing properly???
      });
      let results = [];
      let batches = [];
      let toMerge = [];

      while (timestampArray.length > 0) {
          let removed = timestampArray.splice(0,10)
          batches.push(removed)
      }
      for (var batch of batches) {
        toMerge.push(database
          .collection("consultslots")
          //.where("doctor", "==", "") //doctor that is logged in
          .where("date", "in", batch)
          .get()
          .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            results.push(doc.id, " => ", doc.data());
          })
          if (results.length > 0) {
            return false;
          }
        }))
        if (toMerge.length > 0) {
          break
        }
      }
      console.log(toMerge)
      return toMerge; 
      
      //results.forEach((ele) => console.log(ele));
      /*database.collection("consultslots").get().then((snapshot) => {
        let item = {}
        snapshot.forEach((doc) => {
            item = doc.data();
            console.log(item.date)
            console.log(datesToAddArray[0])
            if (item.date == datesToAddArray[0]) {
              console.log("REACHED")
              results.push(doc.id)
            }
        })
      })*/
      
    },
    /* Given a start date, end date and day name, return
     ** an array of dates between the two dates for the
     ** given day inclusive
     ** @param {Date} start - date to start from
     ** @param {Date} end - date to end on
     ** @param {string} dayName - name of day
     ** @returns {Array} array of Date objects
     */
    getDaysBetweenDates: function (start, end, dayName) {
      var result = [];
      var days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
      var day = days[dayName];
      // Copy start date
      var current = new Date(start);
      var newDate;
      // Shift to next of required days
      current.setDate(current.getDate() + ((day - current.getDay() + 7) % 7));
      // While less than end date, add dates to result array
      while (current <= end) {
        newDate = new Date(+current);
        newDate.setHours(parseInt(this.slotStartTime.substr(0, 2)));
        newDate.setMinutes(parseInt(this.slotStartTime.substr(3, 2)));
        newDate.setSeconds(0);
        result.push(newDate);
        current.setDate(current.getDate() + 7);
      }
      return result;
    },

    createSelectedSlots: function () {
      //let format_date = this.selectedDate
      //  .toLocaleDateString()
      //  .split("/")
      //  .reverse()
      //  .join("-");
      //let datetime = new Date(format_date + "T" + this.slotStartTime + ":00");

      //create new document in the consultSlots collection
      //but also need take into account if this slot is gonna be looped

      //if "Does Not Repeat", create slot object
      if (this.selectedValue == this.doesNotRepeat) {
        const datetime = this.selectedDate;
        datetime.setHours(parseInt(this.slotStartTime.substr(0, 2)));
        datetime.setMinutes(parseInt(this.slotStartTime.substr(3, 2)));
        datetime.setSeconds(0);
        datetime.setMilliseconds(0);
        console.log(datetime);
        
        this.checkAddEligible([datetime])[0].then(res => {
          if (res != false) {
            database.collection("consultslots").add({
            date: new firebase.firestore.Timestamp.fromDate(datetime),
            patient: null,
            doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
            });
            alert("Successfully added slots!");
          } else {
            alert("Slot you are trying to add already exists!");
          }
        })
      } else {
        let monArray = this.getDaysBetweenDates(
          this.range.start,
          this.range.end,
          "mon"
        );
        let tueArray = this.getDaysBetweenDates(
          this.range.start,
          this.range.end,
          "tue"
        );
        let wedArray = this.getDaysBetweenDates(
          this.range.start,
          this.range.end,
          "wed"
        );
        let thuArray = this.getDaysBetweenDates(
          this.range.start,
          this.range.end,
          "thu"
        );
        let friArray = this.getDaysBetweenDates(
          this.range.start,
          this.range.end,
          "fri"
        );
        let satArray = this.getDaysBetweenDates(
          this.range.start,
          this.range.end,
          "sat"
        );
        let sunArray = this.getDaysBetweenDates(
          this.range.start,
          this.range.end,
          "sun"
        );

        if (this.selectedValue == "Only on Weekdays") {
          let weekdayArray = monArray.concat(
            tueArray,
            wedArray,
            thuArray,
            friArray
          );
          this.checkAddEligible(weekdayArray)[0].then(res => {
            if (res != false) {
              for (var weekday = 0; weekday < weekdayArray.length; weekday++) {
                database.collection("consultslots").add({
                  date: new firebase.firestore.Timestamp.fromDate(
                    weekdayArray[weekday]
                  ), //remove toDateString() when we store date as Date obj
                  //time: this.slotStartTime,
                  patient: null,
                  doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
                });
              }
              alert("Successfully added slots!");
            } else {
              alert("Slot you are trying to add already exists!");
            }
          })
        } else if (this.selectedValue == "Only on Weekends") {
          let weekendArray = satArray.concat(sunArray);
          this.checkAddEligible(weekendArray)[0].then(res => {
            if (res != false) {
              for (var weekend = 0; weekend < weekendArray.length; weekend++) {
                database.collection("consultslots").add({
                  date: new firebase.firestore.Timestamp.fromDate(
                    weekendArray[weekend]
                  ), //remove toDateString() when we store date as Date obj
                  //time: this.slotStartTime,
                  patient: null,
                  doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
                });
              }
              alert("Successfully added slots!");
            } else {
              alert("Slot you are trying to add already exists!");
            }
          })
        }
        // if "Daily"
        else if (this.selectedValue == "Daily") {
          let dailyArray = monArray.concat(
            tueArray,
            wedArray,
            thuArray,
            friArray,
            satArray,
            sunArray
          );
          this.checkAddEligible(dailyArray)[0].then(res => {
            if (res != false) {
              for (var daily = 0; daily < dailyArray.length; daily++) {
                database.collection("consultslots").add({
                  date: new firebase.firestore.Timestamp.fromDate(
                    dailyArray[daily]
                  ), //remove toDateString() when we store date as Date obj
                  //time: this.slotStartTime,
                  patient: null,
                  doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
                });
              }
              alert("Successfully added slots!");
            } else {
              alert("Slot you are trying to add already exists!");
            }
          })
        }

        //if "Every Monday"/Tuesday/Wed/Thu/Fri/Sat/Sun
        else {
          let datesOfDayArray = this.getDaysBetweenDates(
            this.range.start,
            this.range.end,
            this.selectedValue.substr(6, 3).toLowerCase()
          );
          this.checkAddEligible(datesOfDayArray)[0].then(res => {
            if (res != false) {
              for (var d = 0; d < datesOfDayArray.length; d++) {
                database.collection("consultslots").add({
                  date: new firebase.firestore.Timestamp.fromDate(
                    datesOfDayArray[d]
                  ), //remove toDateString() when we store date as Date obj
                  //time: this.slotStartTime,
                  patient: null,
                  doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
                });
              }
              alert("Successfully added slots!");
            } else {
              alert("Slot you are trying to add already exists!");
            }
          })
        }
      }
    },
  },
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