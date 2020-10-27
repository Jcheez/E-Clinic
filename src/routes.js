// All routes for Patient Notes Component
import PatientNotes from "./components/Patient/PatientNotes_components/PatientNotes.vue";
import PatientAppointments from "./components/Patient/PatientNotes_components/PatientAppointments.vue";
import Documents from "./components/Patient/PatientNotes_components/Documents.vue"
import AppointmentPage from "./components/Clinic/Doctor/DoctorAppointmentPage/AppointmentPage";
import DoctorSettings from "./components/Clinic/Doctor/DoctorSettings";
import PendingBookingRes from "./components/Clinic/PendingBooking_component/PendingBookingRes.vue";
import PendingBooking from "./components/Clinic/PendingBooking_component/PendingBooking.vue";
import MakeBooking from "./components/Patient/MakeBooking_component/MakeBooking1.vue"
import MakeBookingTer from "./components/Patient/MakeBooking_component/MakeBookingTer.vue"
import PatientHome from "./components/Patient/PatientHomepage"
import ClinicHome from "./components/Clinic/ClinicHomepage"
import ClinicLogin from "./components/Clinic/ClinicLogin"
import ClinicSignup from "./components/Clinic/ClinicSignup"
import DoctorsList from "./components/Clinic/DoctorsList"
import ClinicSettings from "./components/Clinic/ClinicSettings"
import { Role } from './store/role';

export default [
  { path: "/clinicsignup", name: "clinicsignup", component: ClinicSignup },
  { path: "/cliniclogin", name: "cliniclogin", component: ClinicLogin },
  { path: "/patienthome", component: PatientHome, meta: {authorize: [Role.Patient]}},
  { path: "/clinichome", name: "clinichome", component: ClinicHome, meta: {authorize: Role.Clinic} },
  { path: "/doctorslist", component: DoctorsList},
  { path: "/clinicsettings", component: ClinicSettings},
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

