const baseURL = "http://localhost:8080";
const sentimentAnalysisURL = baseURL + "/sentiment-analysis";

/** Submit form handle */
function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  if (!Client.checkForURL(formText)) {
    return alert("Wrong URL format, please enter another!");
  }

  console.log("::: Form Submitted :::");
  try {
    fetch(sentimentAnalysisURL, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ url: formText }),
    })
      .then((res) => res.json())
      .then(function (res) {
        document.getElementById(
          "agreement"
        ).innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById(
          "subjectivity"
        ).innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
      });
  } catch (error) {
    console.log("Error when call API fetch sentiment analysis: ", error);
  }
}

export { handleSubmit };
