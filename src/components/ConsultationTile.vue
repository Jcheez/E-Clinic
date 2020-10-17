<template>
    <div>
        <ul id="tile-list" style="list-style-type:none">
            <li v-for="data in consultData" v-bind:key="data.id" :id="data.id">
                <button v-if="data.hover==false" @mouseover="data.hover = true">
                    <span v-if="data.patient==null" class="freeSlot"></span>
                    <span v-if="data.patient!=null" class="bookedSlot"></span>            
                    <span class="time" v-html="showTime(data)"></span>
                </button>
                <button v-if="data.hover == true && data.patient == null" @mouseleave="data.hover=false" v-on:click="removeSlot(data)">
                    <span class="removeSlot">Remove Slot</span>
                </button>
                <button v-if="data.hover == true && data.patient != null" @mouseleave="data.hover=false">
                    <span class="rescheduleSlot">Reschedule</span>
                </button>                
            </li>
        </ul>
    </div>
    
</template>

<script>
import database from '../firebase.js'
export default {
    props:{
      consultData:{
          type:Array
      }
    },
    methods: {
        removeSlot: function(data) {
            database.collection("consultslots").doc(data.id).get().then( doc => {
                let li = document.getElementById(doc.id);
                li.parentNode.removeChild(li);
                database.collection("consultslots").doc(data.id).delete();
            })
        },
        showTime: function(data) {
            let min = data.date.toDate().getMinutes();
            if (min==0) {
                return data.date.toDate().getHours() + ":" + data.date.toDate().getMinutes() + "0";
            } else {
                return data.date.toDate().getHours() + ":" + data.date.toDate().getMinutes();
            }
        }
    }
}
</script>

<style scoped>
button {
    transition: box-shadow 0.3s;
    transition: 0.3s;
    color: rgb(0, 114, 180);
    letter-spacing: 2px;
    width: 125px;
    height: 45px;
    background-color: white;
    border: 1px solid rgb(0, 114, 180);
    border-radius: 5px;
}

button:hover {
    background-color: rgb(0, 114, 180);
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
.freeSlot {
    height: 14px;
    width: 14px;
    margin-left: -30px;
    background-color: rgb(177, 218, 177);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
}

.bookedSlot {
    height: 14px;
    width: 14px;
    margin-left: -30px;
    background-color: rgb(230, 161, 144);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
}

.time {
    position: relative;
    margin-right: -35px;
}

.removeSlot, .rescheduleSlot {
    color: white;
}


li {
    padding-bottom: 2px;
}
</style>