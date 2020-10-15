import PendingBooking from "./components/PendingBooking.vue";
import PatientNotes from "./components/PatientNotes_components/PatientNotes.vue";
import PatientAppointments from "./components/PatientNotes_components/PatientAppointments.vue";

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/patientsnotes", component: PatientNotes },
  { path: "/patientsnotes/appointments", name:"appointments", props: true, component: PatientAppointments },
];
