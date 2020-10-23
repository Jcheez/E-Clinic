//Monthly Earnings to Date: line graph to show the trend of earnings
//15 * # of patients
//Fix price at $15
import database from "../../firebase";
import firebase from "firebase/app";
import { Line } from "vue-chartjs";
import { mapGetters} from "vuex";

export default {
  extends: Line,
  data: () => ({
    today: new Date(),
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Monthly Revenue from Teleconsultations ($)",
          data: [],
          //backgroundColor: ["aqua", "lightgreen", "red", "orange"],
          borderWidth: 2,
          borderColor: "rgb(0, 114, 180)",
          fill: false,
          pointStyle: "circle",
          pointRadius: 2,
          pointBackgroundColor: "rgb(0, 114, 180)",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Monthly Revenue",
        fontColor: "Black",
        fontSize: 15,
      },
      display: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              labelString: "$",
            },
            ticks: {
              min: 0,
            },
          },
        ],
      },
    },
  }),
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    getPastSixMonthsString: function(monthsNumArray) {
      let pastSixMonthsString = [];
      const allMonths = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
      };

      for (var m of monthsNumArray) {
        pastSixMonthsString.push(allMonths[m]);
      }
      return pastSixMonthsString;
      //this.labels = pastSixMonthsString;
    },

    getPastSixMonthsNum: function() {
      let pastSixMonthsNum = [];
      console.log(this.today);
      const currentMonth = this.today.getMonth();
      //console.log(currentMonth);
      for (var i = 5; i >= 0; i--) {
        pastSixMonthsNum.push(currentMonth - i);
        //console.log(i);
      }
      //console.log(pastSixMonthsNum);
      return pastSixMonthsNum;
    },

    fetchData: function() {
      var monthsArray = this.getPastSixMonthsNum();
      let x = this.getUser.displayName
      console.log(monthsArray);
      this.chartdata.labels = this.getPastSixMonthsString(monthsArray);
      console.log(this.getPastSixMonthsString(monthsArray));
      console.log(this.chartdata.labels);

      for (var month of monthsArray) {
        console.log(month);
        var startOfMonth = new Date(this.today.getFullYear(), month); //new Date(year, month, day, hours, minutes, seconds, milliseconds)
        var endOfMonth = new Date(this.today.getFullYear(), month + 1);

        startOfMonth.setMilliseconds(0);
        endOfMonth.setMilliseconds(0);
        console.log(startOfMonth, endOfMonth);
        var clinicMonthTotal = database
          .collection("consultslots")
          .where("clinic", "==", x)
          //.where("patient", "!=", null) not allowed:(
          .where(
            "date",
            ">=",
            new firebase.firestore.Timestamp.fromDate(startOfMonth)
          )
          .where(
            "date",
            "<",
            new firebase.firestore.Timestamp.fromDate(endOfMonth)
          );

        clinicMonthTotal.get().then((snap) => {
          let results = [];
          let it = {};
          snap.forEach((doc) => {
            it = doc.data();
            if (it.patient != null) {
              results.push(it);
            }
          });

          //console.log(snap.size);
          this.chartdata.datasets[0].data.push(results.length * 15);
          this.renderChart(this.chartdata, this.options);
        });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
