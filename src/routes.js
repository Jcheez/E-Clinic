import PendingBooking from "./components/PendingBooking_component/PendingBooking.vue";

// All routes for Patient Notes Component
import PatientNotes from "./components/PatientNotes_components/PatientNotes.vue";
import PatientAppointments from "./components/PatientNotes_components/PatientAppointments.vue";
import Documents from "./components/PatientNotes_components/Documents.vue"
import AppointmentPage from "./components/AppointmentPage";
import DoctorSettings from "./components/DoctorSettings";
import PendingBookingRes from "./components/PendingBooking_component/PendingBookingRes.vue";
import MakeBooking from "./components/MakeBooking_component/MakeBooking1.vue"
import MakeBookingTer from "./components/MakeBooking_component/MakeBookingTer.vue"

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/pendingbooking/resolve", name:"resolve", props: true, component: PendingBookingRes },
  { path: "/patientsnotes", component: PatientNotes },
  { path: "/patientsnotes/appointments", name: "appointments", props: true, component: PatientAppointments },
  { path: "/patientsnotes/appointments/uploaddocuments", name: "uploaddocuments", props: true, component: Documents},
  { path: "/appointment", component: AppointmentPage },
  { path: "/doctorsettings", component: DoctorSettings },
  { path: "/patientsnotes/appointments", name:"appointments", props: true, component: PatientAppointments },
  { path: "/makebooking", component: MakeBooking},
  { path: "/makebookingter", component: MakeBookingTer},
];

