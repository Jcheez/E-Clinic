import PendingBooking from "./components/PendingBooking.vue";
import uploadDocs from "./components/uploadDocs.vue";
import AddSlot from "./components/CreateSlot.vue";

export default [
  { path: "/pendingbooking", component: PendingBooking },
  { path: "/uploadDocs", component: uploadDocs },
  { path: "/CreateSlot", component: AddSlot },
];
