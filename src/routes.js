import PendingBooking from "./components/PendingBooking.vue";
import PendingBookingRes from "./components/PendingBookingRes.vue";
//import PatientNotes from "./components/PatientNotes.vue";
import MakeBooking from "./components/MakeBooking1.vue"
import MakeBookingTer from "./components/MakeBookingTer.vue"

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/pendingbooking/resolve", name:"resolve", props: true, component: PendingBookingRes },
 // { path: "/patientsnotes", component: PatientNotes },
  { path: "/makebooking", component: MakeBooking},
  { path: "/makebookingter", component: MakeBookingTer},
];
