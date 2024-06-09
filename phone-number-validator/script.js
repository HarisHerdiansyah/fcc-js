const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

// const inputList = [];

// function updateUI() {
  // resultsDiv.innerHTML = "";
  // inputList.forEach((el) => {
  //   resultsDiv.innerHTML += `
  //     <p><span class="${el.isValid ? "valid" : "invalid"}">${
  //     el.isValid ? "Valid US Number" : "Invalid US Number"
  //   }</span>: ${el.number}</p>
  //   `;
  // });
// }

function validator(input) {
  const phoneNumberRegex =
    /^1?\s?(?:\(\d{3}\)|\d{3})(?:\-?|\s?)(\d{3})(?:\-?|\s?)(\d{4}$)/; // ? US
  const p = document.createElement("p");
  const text = document.createTextNode(
    `${phoneNumberRegex.test(input) ? "Valid" : "Invalid"} US number: ${input}`
  );
  p.appendChild(text);
  resultsDiv.appendChild(p);
}

checkBtn.addEventListener("click", () => {
  if (userInput.value === "") {
    alert("Please provide a phone number");
    return;
  }
  validator(userInput.value);
  userInput.value = "";
});

clearBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = "";
});
