const decimalBtn = document.getElementById('calc-decimal');
const clearBtn = document.getElementById('calc-clear');
const backBtn = document.getElementById('calc-backspace');

let output = document.getElementById('calc-output');
let displayVal = 0;
let pendingVal;
let evalStringArray = [];

const numButtons = document.getElementsByClassName('calc-btn-num');
const operatorButtons = document.getElementsByClassName('calc-btn-operator'); 

Array.from(numButtons).forEach((num) => num.addEventListener('click', updateOutput));
Array.from(operatorButtons).forEach((op) => op.addEventListener('click', performOperation));

function updateOutput(clickObj) {
  let btnText = clickObj.target.innerText;

  if (displayVal === 0) {
    displayVal = '';
  }
  displayVal += btnText;
  
  output.innerHTML = displayVal;
}

function performOperation(clickObj) {
  let operator = clickObj.target.innerHTML;

  switch (operator) {
    case '+':
      pendingVal = displayVal;
      output.innerHTML = displayVal;
      output.classList.add('compute');
      evalStringArray.push(pendingVal);
      evalStringArray.push('+');
      displayVal = 0;
      setTimeout(() => output.classList.remove('compute'), 500);
      break;

    case '-':
      pendingVal = displayVal;
      output.innerHTML = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('-');
      displayVal = 0;
      break;

    case 'x':
      pendingVal = displayVal;
      output.innerHTML = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('*');
      displayVal = 0;
      break;

    case '÷':
      pendingVal = displayVal;
      output.innerHTML = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('/');
      displayVal = 0;
      break;

    case '=':
      evalStringArray.push(displayVal);
      let result = eval(evalStringArray.join(' '));
      output.innerHTML = result;
      displayVal = result;
      evalStringArray = [];
      break;
  }
}

clearBtn.onclick = () => {
  displayVal = 0;
  pendingVal = undefined;
  evalStringArray = [];
  output.innerHTML = displayVal;
}

backBtn.onclick = () => {
  displayVal = displayVal.slice(0, -1);
  if (displayVal.length === 0) {
    displayVal = 0;
  }
  output.innerHTML = displayVal; 
}

decimalBtn.onclick = () => {
  if (!displayVal.includes('.')) {
    displayVal += '.';
  }
  output.innerHTML = displayVal;
}
