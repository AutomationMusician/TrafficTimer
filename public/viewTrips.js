async function main() {
  const response = await fetch('/loadTrips');
  const data = await response.json();
  console.log(data);

  const tbody = document.getElementById("tbody");
  for (i=0; i<data.length; i++) {
    const obj = data[i];
    const row = document.createElement("tr");
    const start = document.createElement("td");
    const end = document.createElement("td");
    const duration = document.createElement("td");

    const startTime = new Date(obj.start);
    const endTime = new Date(obj.end);
    const timeDiff = endTime.getTime() - startTime.getTime();

    start.textContent = startTime.toLocaleTimeString('en-US'); //formatTime(startTime);
    end.textContent = endTime.toLocaleTimeString('en-US');//formatTime(endTime);
    duration.textContent = formatTime(timeDiff);

    row.appendChild(start);
    row.appendChild(end);
    row.appendChild(duration);
    tbody.appendChild(row);
  }
}

function formatTime(timeDiff) {
  let sec = Math.round(timeDiff / 1000);
  let min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  min %= 60;
  sec %= 60;
  return pad2(hour) + ":" + pad2(min) + ":" + pad2(sec);
}

function pad2(num) {
  if (num >= 10)
    return String(num);
  else
    return "0" + num
}


main();
/*
function hourDetails(hour24) {
  let am;
  let hour12;
  if (hour24 > 12) {
    hour12 = hour24 - 12;
    am = false;
  } else if (hour24 == 0) {
    hour12 = 12;
    am = true;
  } else if (hour24 == 12) {
    hour12 = 12;
    am = false;
  } else {
    hour12 = hour24;
    am = true;
  }
  return { hour12, am };
}

function formatTime(date) {
  console.log(date);
  const hour24 = date.getHours();
  const hour = hourDetails(hour24);
  const min = date.getMinutes();
  const am = hour.am ? "AM" : "PM";
  return hour.hour12 + ":" + min + " " + am;
}
*/
