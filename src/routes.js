import PendingBooking from "./components/PendingBooking.vue";

// All routes for Patient Notes Component
import PatientNotes from "./components/PatientNotes_components/PatientNotes.vue";
import PatientAppointments from "./components/PatientNotes_components/PatientAppointments.vue";
import Documents from "./components/PatientNotes_components/Documents.vue"

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/patientsnotes", component: PatientNotes },
  { path: "/patientsnotes/appointments", name: "appointments", props: true, component: PatientAppointments },
  { path: "/patientsnotes/appointments/uploaddocuments", name: "uploaddocuments", props: true, component: Documents}
];
