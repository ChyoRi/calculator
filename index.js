const backBtn = document.querySelector('.back');
const clearBtn = document.querySelector('.allclear');
const totalNumberEl = document.querySelector('.total-number');
const inputSpan = document.querySelectorAll('.input-number > span');
const numBerBtn = document.querySelectorAll('.number-button');
const operatorBtn = document.querySelectorAll('.operator-button');

let prevNumber = 0;
let nextNumber = 0;

let totalNumber = 0;

// 키패드 입력 함수
const numberInput = (e) => {
  let target = e.currentTarget;
  let targetValue = target.value;

  if(prevNumber === 0 ) {
    prevNumber = target.value
  } else {
    prevNumber = prevNumber + targetValue
  }

  // if(prevNumber != 0) {
  //   console.log('실행됌');
  //   // totalNumberEl.innerHTML = '';
  //   console.log(totalNumberEl);
  //   nextNumber = nextNumber + targetValue;
  // }

  render();
}

const numberOperator = (e) => {
  let target = e.currentTarget;
  let targetOperator = target.textContent;
  if(targetOperator === '=') return;
  prevNumber = Number(totalNumberEl.textContent);
  inputSpan[0].innerHTML = prevNumber;
  inputSpan[1].innerHTML = targetOperator;
}

// 뒤에서부터 숫자 삭제 함수
const backSpace = () => {
  if(totalNumber === 0) return;
  let deleteNumber = totalNumber.slice(0, totalNumber.length - 1);
  if(!deleteNumber.length) deleteNumber = 0
  totalNumber = deleteNumber;
  render();
}

// 키패드 랜더 함수
const render = () => {
  totalNumberEl.innerHTML = prevNumber;
}

backBtn.addEventListener('click', backSpace);

clearBtn.addEventListener('click', () => {
  prevNumber = 0;
  nextNumber = 0;
  totalNumber = 0;
  render();
});

operatorBtn.forEach(item => {
  item.addEventListener('click', numberOperator);
});

numBerBtn.forEach(item => {
  item.addEventListener('click', numberInput);
});

render();