import PendingBooking from "./components/PendingBooking.vue";
import AppointmentPage from "./components/AppointmentPage";
import DoctorSettings from "./components/DoctorSettings";
import PendingBookingRes from "./components/PendingBookingRes.vue";
import PatientNotes from "./components/PatientNotes_components/PatientNotes.vue";
import PatientAppointments from "./components/PatientNotes_components/PatientAppointments.vue";
import MakeBooking from "./components/MakeBooking1.vue"
import MakeBookingTer from "./components/MakeBookingTer.vue"

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/pendingbooking/resolve", name:"resolve", props: true, component: PendingBookingRes },
  { path: "/patientsnotes", component: PatientNotes },
  { path: "/appointment", component: AppointmentPage },
  { path: "/doctorsettings", component: DoctorSettings },
  { path: "/patientsnotes/appointments", name:"appointments", props: true, component: PatientAppointments },
  { path: "/makebooking", component: MakeBooking},
  { path: "/makebookingter", component: MakeBookingTer},];
