<template>
    <div>
        <button v-if="hover==false" @mouseover="hover = true">
            <span v-if="consultData.patient" class="freeSlot"></span>
            <span v-if="!consultData.patient" class="bookedSlot"></span>            
            <span class="time">{{consultData[0].time}}</span>
        </button>
        <button v-if="hover == true" @mouseleave="hover=false">
            <span class="removeSlot">Remove Slot</span>
        </button>
    </div>
    
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            consultData: [],
            hover: false
        }
    },
    methods: {
        fetchItems: function () {
            database.collection("consultslots").get().then((querySnapShot) => {
                let item = {};
                querySnapShot.forEach((doc) => {
                    item = doc.data();
                    this.consultData.push(item);
                });
            });
        }
    },
    created() {
        this.fetchItems();
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

.removeSlot {
    color: white;
}
</style>