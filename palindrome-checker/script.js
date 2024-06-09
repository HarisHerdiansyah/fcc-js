function cleanInput(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}

function palindromeChecker(str) {
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i].toLowerCase() !== str[str.length - (1 + i)].toLowerCase()) {
      return false;
    }
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("text-input");
  const checkBtn = document.getElementById("check-btn");
  const resultElement = document.getElementById("result");

  checkBtn.addEventListener("click", () => {
    if (textInput.value === "") alert("Please input a value");
    const isPalindrome = palindromeChecker(cleanInput(textInput.value));
    const resultText = isPalindrome ? `${textInput.value} is a palindrome` : `${textInput.value} is not a palindrome`;
    resultElement.innerText = resultText;
  });
});
