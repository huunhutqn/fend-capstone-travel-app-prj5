/** Change departing time */
function tripHandler(newDepartingTime) {
  const tripDepartingOuput = document.getElementById("trip-departing");
  console.log("::: Running tripHandler :::");
  console.log("newDepartingTime: ", newDepartingTime);
  tripDepartingOuput.innerHTML = newDepartingTime;
}

export { tripHandler };
