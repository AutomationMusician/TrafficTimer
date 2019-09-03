const form = document.getElementById("form");
const submit = document.createElement("input");
submit.type = "submit";
submit.id = "submit";

async function main() {
  const trip = await getCurrentTrip();
  console.log(trip);
  if (trip == null)
    startTrip();
  else
    endTrip(trip);
}

async function getCurrentTrip() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const output = await fetch('/currentTrip', options);
  return await output.json();
}

function startTrip() {
  form.action = "/leavetime";
  submit.value = "Start Trip";
  submit.style.backgroundColor = "green";
  form.appendChild(submit);
}

function endTrip(trip) {
  form.action = "/arrivetime";
  const idInput = document.createElement("input");
  idInput.type = "hidden";
  idInput.name = "id";
  idInput.value = trip._id;
  submit.value = "End Trip";
  submit.style.backgroundColor = "#f00";
  form.appendChild(idInput);
  form.appendChild(submit);
}

main();
