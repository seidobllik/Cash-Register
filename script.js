function checkCashRegister(price, cash, cid) {
  const _CURRENCY = [["ONE HUNDRED", 100.0], ["TWENTY", 20.0], ["TEN", 10.0], ["FIVE", 5.0], ["ONE", 1.0], ["QUARTER", 0.25], ["DIME", 0.1], ["NICKEL", 0.05], ["PENNY", 0.01]];
  let changeValue = parseFloat((cash - price).toFixed(2));
  let cidObj = {};
  let changeArr = [];

  cid.forEach(arr => { cidObj[arr[0]] = arr[1]})

  console.log(price, cash, changeValue);

  for (let i = 0; i < _CURRENCY.length; i++) {
    if (cidObj.hasOwnProperty(_CURRENCY[i][0]) && changeValue >= _CURRENCY[i][1]) {
      let value = 0;
      while (changeValue >= _CURRENCY[i][1] && cidObj[_CURRENCY[i][0]] >= _CURRENCY[i][1]) {
        value = _CURRENCY[i][1] +Math.round(value * 100) / 100;
        changeValue = Math.round(changeValue * 100) / 100 - _CURRENCY[i][1];
        cidObj[_CURRENCY[i][0]] = Math.round(cidObj[_CURRENCY[i][0]] * 100) / 100 - _CURRENCY[i][1];
      }
      changeArr.push([_CURRENCY[i][0], value]);
      if (cidObj[_CURRENCY[i][0]] <= 0 ) {
        delete cidObj[_CURRENCY[i][0]];
      }
    }
  }

  if (changeValue > 0) { 
    console.log({status: "INSUFFICIENT_FUNDS", change: []});
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (Object.values(cidObj).every(value => value == 0)) {
    console.log({status: "CLOSED", change: [...cid]});
    return {status: "CLOSED", change: [...cid]};
  } else {
    console.log({status: "OPEN", change: [...changeArr]});
    return {status: "OPEN", change: [...changeArr]};
  }
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
