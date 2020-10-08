import { database } from "firebase";

const pendingList = document.querySelector("#pending-list");

// create element & render list of patients
function renderPending(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let firstTime = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  firstTime.textContent = doc.data().firstTime;

  li.appendChild(name);
  li.appendChild(firstTime);

  pendingList.appendChild(li);
}

// getting data
database
  .collection("pendingbooking")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderPending(doc);
    });
  });
