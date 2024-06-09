const USD_FRACTION = {
  PENNY: 0.01,
  NICKLE: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100
};
const userCashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const price = 3.26;
let flag;

function getTotalCid() {
  return cid.reduce((sum, curr) => sum + curr[1], 0);
}

function getRequiredCid(_change) {
  const fractions = [...Object.entries(USD_FRACTION)];
  const cashInDrawer = [...cid];
  for (let i = 0; i < fractions.length; i++) {
    if (_change < fractions[i][1]) {
      cashInDrawer.splice(i);
      break;
    }
  }
  return cashInDrawer.reverse();
}

function getTotalRequiredCid(_change) {
  return getRequiredCid(_change).reduce((sum, curr) => sum + curr[1], 0);
}

function getFraction(_change) {
  const listFraction = [];
  const requiredCid = getRequiredCid(_change);

  for (let i = 0; i < requiredCid.length; i++) {
    let [frac, value] = requiredCid[i];

    while (_change - USD_FRACTION[frac] >= 0 && value > 0) {
      _change = (_change - USD_FRACTION[frac]).toFixed(2);
      value = (value - USD_FRACTION[frac]).toFixed(2);

      const fracIndex = listFraction.findIndex(([_frac]) => _frac === frac);
      if (fracIndex === -1) {
        listFraction.push([frac, 1]);
      } else {
        listFraction[fracIndex][1] += 1;
      }
    }
  }

  return listFraction;
}

function isCidAvailable(_change) {
  const cashInDrawer = getTotalCid();
  const totalRequiredCid = getTotalRequiredCid(_change);

  if (cashInDrawer < _change || totalRequiredCid < _change) {
    flag = "INSUFFICIENT_FUNDS";
    render();
    return false;
  }

  if (cashInDrawer === _change) {
    flag = "CLOSED";
  } else if (cashInDrawer > _change) {
    flag = "OPEN";
  }
  return true;
}

function isUserGetChange(_change) {
  if (_change === 0) {
    changeDue.innerHTML = "No change due - customer paid with exact cash";
    return false;
  }

  if (_change < 0) {
    alert("Customer does not have enough money to purchase the item");
    return false;
  }

  if (_change > 0) {
    return isCidAvailable(_change);
  }
}

function render(listFrac = []) {
  changeDue.innerHTML = `Status: ${flag}`;

  if (listFrac.length > 0) {
    const element = listFrac
      .map(([frac, count]) => {
        return `<p>${frac}: $${count * USD_FRACTION[frac]}</p>`;
      })
      .join("");
    changeDue.innerHTML += element;
  }
}

function eventHandler() {
  changeDue.innerHTML = "";

  const userCash = parseFloat(userCashInput.value);
  const change = parseFloat((userCash - price).toFixed(2));

  if (isUserGetChange(change)) {
    render(getFraction(change));
  }
}

purchaseBtn.addEventListener("click", eventHandler);
