const totalNumberEl = document.querySelector('.total-number');
const backBtn = document.querySelector('.back');
const clearBtn = document.querySelector('.allclear');
const persentBtn = document.querySelector('.persent');
const inputSpan = document.querySelectorAll('.input-number > span');
const numBerBtn = document.querySelectorAll('.number-button');
const operatorBtn = document.querySelectorAll('.operator-button');
const assignBtn = document.querySelector('.assign-button');

let operatorState = false;

let prevNumber = 0;
let nextNumber = 0;

let totalNumber = 0;

// 키패드 입력 함수
const numberInput = (e) => {
  let target = e.currentTarget;
  
  if(operatorState === false) {
    if(prevNumber === 0) {
      prevNumber = target.value;
    } else {
      prevNumber += target.value;
    }
    render(prevNumber);
  } else {
    if(nextNumber === 0) {
      nextNumber = target.value;
    } else {
      nextNumber += target.value;
    }
    render(nextNumber);
  }

}

// AllClear 함수
const allClear = () => {
  prevNumber = 0;
  nextNumber = 0;
  totalNumber = 0;
  operatorState = false;

  operatorBtn.forEach(item => {
    item.classList.remove('active');
  });

  inputSpan.forEach(item => {
    item.innerHTML = '';
  })

  render();
}

// 뒤에서부터 숫자 삭제 함수
const backSpace = () => {

  if(operatorState === false) {
    if(prevNumber === 0) return;
    let prevDelete = prevNumber.slice(0, prevNumber.length - 1);
    if(!prevDelete.length) prevDelete = 0
    prevNumber = prevDelete;
    render(prevNumber);
  } else {
    if(nextNumber === 0) return;
    let nextDelete = nextNumber.slice(0, nextNumber.length - 1);
    if(!nextDelete.length) nextDelete = 0
    nextNumber = nextDelete;
    render(nextNumber);
  }
}

// 연산자 버튼 클릭 함수
const operator = (e) => {
  let target = e.currentTarget;
  operatorState = true;

  operatorBtn.forEach(item => {
    item.classList.remove('active');
  });

  target.classList.add('active');

  let targetOperator = target.textContent;

  if(targetOperator === '=') return;

  prevNumber = Number(totalNumberEl.textContent);
  inputSpan[0].innerHTML = prevNumber;
  inputSpan[1].innerHTML = targetOperator;

  if(totalNumber != 0) {
    prevNumber = totalNumber
    nextNumber = 0;
  }
}

// plus 함수
const plus = () => {
  totalNumber = prevNumber + nextNumber
}

// Minus 함수
const minus = () => {
  totalNumber = prevNumber - nextNumber
}

// Mulitply 함수
const mulitply = () => {
  totalNumber = prevNumber * nextNumber
}

// Division 함수
const division = () => {
  totalNumber = prevNumber / nextNumber
}

// 키패드 랜더 함수
const render = (number = 0) => {
  totalNumberEl.innerHTML = number;
}

// Calc 함수
const calc = (e) => {
  if(prevNumber === 0 || nextNumber === 0) return;

  let target = e.currentTarget;

  nextNumber = Number(totalNumberEl.textContent);
  inputSpan[2].innerHTML = nextNumber;
  inputSpan[3].innerHTML = target.textContent;

  switch(inputSpan[1].textContent) {
    case '+':
      plus();
      render(totalNumber);
      break;
    case '-':
      minus();
      render(totalNumber);
      break;
    case '×':
      mulitply();
      render(totalNumber);
      break;
    case '÷':
      division();
      render(totalNumber);
  }

  operatorBtn.forEach(item => {
    item.classList.remove('active');
  });
}

backBtn.addEventListener('click', backSpace);

clearBtn.addEventListener('click', allClear);

persentBtn.addEventListener('click', () => {
  if(prevNumber === 0) return;
  prevNumber = prevNumber * 0.01
  render(prevNumber);
})

operatorBtn.forEach(item => {
  item.addEventListener('click', operator);
});

numBerBtn.forEach(item => {
  item.addEventListener('click', numberInput);
});

assignBtn.addEventListener('click', calc);

render();