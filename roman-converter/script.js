const inputNumber = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const divOutput = document.getElementById("output");

const ROMAN = {
  1000: "M",
  900: "CM",
  500: "D",
  400: "CD",
  100: "C",
  90: "XC",
  50: "L",
  40: "XL",
  10: "X",
  9: "IX",
  5: "V",
  4: "IV",
  1: "I"
};

function toRoman(sequence) {
  let result = "";
  const seqLen = sequence.length;
  for (let i = 0; i < seqLen; i++) {
    const unit = parseInt(sequence[i]);
    const posVal = Math.pow(10, seqLen - (i + 1));
    if (ROMAN.hasOwnProperty(unit * posVal)) {
      // * in case 1, 4, 5, or 9
      result += ROMAN[unit * posVal];
    } else {
      if (unit - 5 > 0) {
        // * in case 6, 7, or 8
        result += ROMAN[5 * posVal];
        result += ROMAN[posVal].repeat(unit - 5);
      } else if (unit - 5 < 0 && unit !== 0) {
        // * in case 2 or 3
        result += ROMAN[posVal].repeat(unit);
      }
    }
  }
  return result;
}

function inputHandler() {
  const inputVal = inputNumber.value;
  if (inputVal === "") {
    divOutput.textContent = "Please enter a valid number";
  } else if (parseInt(inputVal) === -1) {
    divOutput.textContent = "Please enter a number greater than or equal to 1";
  } else if (parseInt(inputVal) === 4000) {
    divOutput.textContent = "Please enter a number less than or equal to 3999";
  } else {
    const result = toRoman(inputNumber.value);
    divOutput.textContent = result;
  }
}

convertBtn.addEventListener("click", inputHandler);
