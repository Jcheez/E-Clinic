import { Bar } from "vue-chartjs";
import database from "../../firebase.js";

export default {
  extends: Bar,
  data: function() {
    return {
      datacollection: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [],
      },
      options: {
        title: {
          display: true,
          text: "Monthly Number of Patients",
          fontColor: "Black",
          fontSize: 15,
          response: true,
          maintainAspectRatio: false,
        },
      },
    };
  },
  methods: {
    getRandomColor: function() {
      var letters = "0123456789ABCDEF".split("");
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    //Must modify clinic to be the one currently logged in not hardcode a clinic
    fetchItems: function() {
      var doctors = {};
      //store doctor ID and name as key:value pair
      database
        .collection("doctors")
        .where("clinic", "==", "Ruffles")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doctors[doc.id] = doc.data().name;
          });
        });

      database
        .collection("consultslots")
        .where("clinic", "==", "Ruffles")
        .where("patient", "!=", null)
        .get()
        .then((querySnapshot) => {
          let doctorList = [];
          let numOfPatients = [];
          querySnapshot.forEach((doc) => {
            //console.log(doc.id);
            let docID = doc.data().doctor;
            if (doctorList.includes(docID)) {
              //console.log("i am adding for " + docID)
              let index = doctorList.indexOf(docID);
              //console.log(index);
              let month = doc
                .data()
                .date.toDate()
                .getMonth();
              // var year = doc.data().date.toDate().getYear(); //have to ensure same year else it accumulates
              numOfPatients[index][month] += 1;
              this.datacollection.datasets[index].data[month] =
                numOfPatients[index][month];
              //console.log(this.datacollection.datasets[index].data[month]);
            } else {
              //console.log("i am pushing for " + docID)
              this.datacollection.datasets.push({
                label: doctors[docID],
                backgroundColor: this.getRandomColor(),
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              });
              doctorList.push(docID);
              numOfPatients.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
              let m = doc
                .data()
                .date.toDate()
                .getMonth();
              let i = doctorList.indexOf(docID);
              numOfPatients[i][m] = 1;
              this.datacollection.datasets[i].data[m] = numOfPatients[i][m];
            }
          });
          let total = {
            label: "Overall",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "black",
          };
          let index = this.datacollection.datasets.length;
          this.datacollection.datasets.push(total);
          for (var i = 1; i <= 12; i++) {
            //for every month
            let totalPatients = 0;
            for (var j = 0; j < index; j++) {
              //for every doctor list
              totalPatients += numOfPatients[j][i];
            }
            this.datacollection.datasets[index].data[i] = totalPatients;
          }
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
