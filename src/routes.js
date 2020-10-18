import PendingBooking from "./components/PendingBooking.vue";
import PendingBookingRes from "./components/PendingBookingRes.vue";
import PatientNotes from "./components/PatientNotes_components/PatientNotes.vue";
import PatientAppointments from "./components/PatientNotes_components/PatientAppointments.vue";

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/pendingbooking/resolve", name:"resolve", props: true, component: PendingBookingRes },
  { path: "/patientsnotes", component: PatientNotes },
  { path: "/patientsnotes/appointments", name:"appointments", props: true, component: PatientAppointments },
];
