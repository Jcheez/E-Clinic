import HelloWorld from "./components/HelloWorld";
import { Role } from "./store/role";

// All routes for Patient Notes Component
import PatientNotes from "./components/Clinic/PatientNotes_components/PatientNotes.vue";
import PatientAppointments from "./components/Clinic/PatientNotes_components/PatientAppointments.vue";
import Documents from "./components/Clinic/PatientNotes_components/Documents.vue"
import PendingPatient from "./components/Patient/PendingBooking_component/Pending.vue"
import MakeBooking from "./components/Patient/MakeBooking_component/MakeBooking1.vue"
import MakeBookingTer from "./components/Patient/MakeBooking_component/MakeBookingTer.vue"
import MakeBookingPass from "./components/Patient/MakeBooking_component/MakeBookingPass.vue"
import MakeBookingConfirmation from "./components/Patient/MakeBooking_component/MakeBookingConfirmationOnline.vue"
import PatientHome from "./components/Patient/PatientHomepage"
import ViewDocuments from "./components/Patient/ViewDocument_component/ViewDocuments.vue"
import ViewDocumentsInner from "./components/Patient/ViewDocument_component/ViewDocumentsInner.vue"
import ViewAppt from "./components/Patient/ViewAppt_component/ViewAppt.vue"
import Rebook from "./components/Patient/ViewAppt_component/Rebook.vue"
import ManagePayments from "./components/Patient/ManagePayments/managePayments.vue"
import PatientLogin from "./components/Patient/PatientLogin"
import PatientSignup from "./components/Patient/PatientSignup"
import PatientSettings from "./components/Patient/patientSettings.vue"

//routes for clinics
import AppointmentPage from "./components/Clinic/Doctor/DoctorAppointmentPage/AppointmentPage";
import DoctorSettings from "./components/Clinic/Doctor/DoctorSettings";
import PendingBookingRes from "./components/Clinic/PendingBooking_component/PendingBookingRes.vue";
import PendingBooking from "./components/Clinic/PendingBooking_component/PendingBooking.vue";
import ClinicHome from "./components/Clinic/ClinicHomepage";
import ClinicLogin from "./components/Clinic/ClinicLogin";
import ClinicSignup from "./components/Clinic/ClinicSignup";
import DoctorsList from "./components/Clinic/DoctorsList";
import ClinicSettings from "./components/Clinic/ClinicSettings";

export default [
  { path: "/", name: "main", component: HelloWorld },
  {
    path: "/cliniclogin/clinicsignup",
    name: "clinicsignup",
    component: ClinicSignup,
  },
  { path: "/cliniclogin", name: "cliniclogin", component: ClinicLogin },
  {
    path: "/patientlogin/patientsignup",
    name: "patientsignup",
    component: PatientSignup,
  },
  { path: "/patientlogin", name: "patientlogin", component: PatientLogin },
  {
    path: "/patienthome",
    name: "patienthome",
    component: PatientHome,
    meta: { authorize: Role.Patient },
  },
  {
    path: "/clinichome",
    name: "clinichome",
    component: ClinicHome,
    meta: { authorize: Role.Clinic },
  },
  {
    path: "/doctorslist",
    component: DoctorsList,
    meta: { authorize: Role.Clinic },
  },
  {
    path: "/clinicsettings",
    component: ClinicSettings,
    meta: { authorize: Role.Clinic },
  },
  { path: "/viewdocuments", component: ViewDocuments },
  {
    path: "/viewdocuments/view",
    name: "view",
    props: true,
    component: ViewDocumentsInner,
  },
  { path: "/viewappt", component: ViewAppt },
  { path: "/viewappt/rebook", name: "rebook", props: true, component: Rebook },
  { path: "/pending", component: PendingPatient },
  { path: "/pendingbooking", component: PendingBooking },
  {
    path: "/pendingbooking/resolve",
    name: "resolve",
    props: true,
    component: PendingBookingRes,
  },
  { path: "/patientsnotes", component: PatientNotes },
  {
    path: "/patientsnotes/appointments",
    name: "appointments",
    props: true,
    component: PatientAppointments,
  },
  {
    path: "/patientsnotes/appointments/uploaddocuments",
    name: "uploaddocuments",
    props: true,
    component: Documents,
  },
  {
    path: "/doctorslist/appointment",
    name: "doctorAppt",
    component: AppointmentPage,
    props: true,
  },
  {
    path: "/doctorslist/appointment/doctorsettings",
    component: DoctorSettings,
    name: "doctorSettings",
    props: true
  },
  { path: "/makebooking", component: MakeBooking },
  { path: "/makebooking/makebookingter", component: MakeBookingTer },
  {
    path: "/makebooking/makebookingpass",
    name: "makebookingpass",
    props: true,
    component: MakeBookingPass,
  },
  {
    path: "/makebooking/makebookingpass/makebookingconfirmation",
    props: true,
    name: "makebookingconfirmation",
    component: MakeBookingConfirmation,
  },
  { path: "/managepayments", component: ManagePayments },
  { path: "/patientsettings",
  component: PatientSettings,
  meta: { authorize: Role.Patient },
  }
];
