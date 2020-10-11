/*Handle creating consultslot objects in FireStore*/

import database from "../firebase.js";

/* Given a start date, end date and day name, return
** an array of dates between the two dates for the
** given day inclusive
** @param {Date} start - date to start from
** @param {Date} end - date to end on
** @param {string} dayName - name of day
** @returns {Array} array of Dates
*/
function getDaysBetweenDates(start, end, dayName) {
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
}


function createSelectedSlots() {

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

            monArray = getDaysBetweenDates(this.range.start, this.range.end, 'mon')
            tueArray = getDaysBetweenDates(this.range.start, this.range.end, 'tue')
            wedArray = getDaysBetweenDates(this.range.start, this.range.end, 'wed')
            thuArray = getDaysBetweenDates(this.range.start, this.range.end, 'thu')
            friArray = getDaysBetweenDates(this.range.start, this.range.end, 'fri')
            satArray = getDaysBetweenDates(this.range.start, this.range.end, 'sat')
            sunArray = getDaysBetweenDates(this.range.start, this.range.end, 'sun')

            if (this.selectedValue == "Daily") {
                
            }
            if (this.selectedValue == "Only on Weekdays") {
                weekdayArray = monArray.concat(tueArray, wedArray, thuArray, friArray)

                for (d in weekdayArray) {
                    database.collection("consultslots").add({
                        date: d , 
                        time: this.slotStartTime,
                        patient: null,
                        doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
                    });
                } 

            }
            if (this.selectedValue == "Only on Weekends") {
                weekendArray = satArray.concat(sunArray)
                
                for (d in weekendArray) {
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
                datesOfDayArray = getDaysBetweenDates(this.range.start, this.range.end, this.selectedValue.substr(0,3).toLowerCase())
                for (d in datesOfDayArray) {
                    database.collection("consultslots").add({
                        date: d.toString() , 
                        time: this.slotStartTime,
                        patient: null,
                        doctor: "", //get name of the doctor who is currently logged in -> should be a global variable across the entire AppointmentPage component
                      });
                }
            }
        }   
            //form.name.value = "";
            //form.city.value = "";
    }


