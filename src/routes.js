import PendingBooking from "./components/PendingBooking.vue";
import uploadDocs from "./components/uploadDocs.vue";
import consultTile from "./components/ConsultationTile.vue";
import scheduledAppt from "./components/ScheduledAppointments.vue";

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/uploadDocs", component: uploadDocs },
  { path: "/consultTile", component: consultTile },
  { path: "/scheduledAppt", component: scheduledAppt}
];
