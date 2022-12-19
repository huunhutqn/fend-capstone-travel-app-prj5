/** Check URL valid */
function checkForURL(inputText) {
  console.log("::: Running checkForURL :::", inputText);
  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  const res = inputText.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (!res) {
    console.log("Wrong URL format");
    return false;
  } else {
    console.log("Right URL format");
    return true;
  }
}

export { checkForURL };
