import PendingBooking from "./components/PendingBooking.vue";
import PatientNotes from "./components/PatientNotes.vue";
import AppointmentPage from "./components/AppointmentPage";
import DoctorSettings from "./components/DoctorSettings";

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/patientsnotes", component: PatientNotes },
  { path: "/appointment", component: AppointmentPage },
  { path: "/doctorsettings", component: DoctorSettings },
];
