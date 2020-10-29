import PatientNotes from "./components/Patient/PatientNotes_components/PatientNotes.vue";
import PatientAppointments from "./components/Patient/PatientNotes_components/PatientAppointments.vue";
import Documents from "./components/Patient/PatientNotes_components/Documents.vue"
import AppointmentPage from "./components/Clinic/Doctor/DoctorAppointmentPage/AppointmentPage";
import DoctorSettings from "./components/Clinic/Doctor/DoctorSettings";
import PendingBookingRes from "./components/Clinic/PendingBooking_component/PendingBookingRes.vue";
import PendingBooking from "./components/Clinic/PendingBooking_component/PendingBooking.vue";
import PendingPatient from "./components/Patient/PendingBooking_component/Pending.vue"
import MakeBooking from "./components/Patient/MakeBooking_component/MakeBooking1.vue"
import MakeBookingTer from "./components/Patient/MakeBooking_component/MakeBookingTer.vue"
import MakeBookingPass from "./components/Patient/MakeBooking_component/MakeBookingPass.vue"
import MakeBookingConfirmation from "./components/Patient/MakeBooking_component/MakeBookingConfirmationOnline.vue"
import PatientHome from "./components/Patient/PatientHomepage"
import ClinicHome from "./components/Clinic/ClinicHomepage"
import ViewDocuments from "./components/Patient/ViewDocument_component/ViewDocuments.vue"
import ViewDocumentsInner from "./components/Patient/ViewDocument_component/ViewDocumentsInner.vue"

export default [
  { path: "/patienthome", component: PatientHome },
  { path: "/clinichome", component: ClinicHome },
  { path: "/viewdocuments", component: ViewDocuments },
  { path: "/viewdocuments/view", name:"view", props: true, component: ViewDocumentsInner },
  { path: "/pending", component: PendingPatient },
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/pendingbooking/resolve", name:"resolve", props: true, component: PendingBookingRes },
  { path: "/patientsnotes", component: PatientNotes },
  { path: "/patientsnotes/appointments", name: "appointments", props: true, component: PatientAppointments },
  { path: "/patientsnotes/appointments/uploaddocuments", name: "uploaddocuments", props: true, component: Documents},
  { path: "/appointment", component: AppointmentPage },
  { path: "/doctorsettings", component: DoctorSettings },
  { path: "/makebooking", component: MakeBooking},
  { path: "/makebooking/makebookingter", component: MakeBookingTer},
  { path: "/makebooking/makebookingpass", name:"makebookingpass", props: true, component: MakeBookingPass},
  { path: "/makebooking/makebookingpass/makebookingconfirmation", props: true, name:"makebookingconfirmation", component: MakeBookingConfirmation},
];

