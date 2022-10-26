const registerBoxes = [...document.querySelectorAll('.register-box-content')];
const inputsArray = [...document.querySelectorAll('input')];
const optionBoxes = [...document.querySelectorAll('.options-box-content')];
const resultBoxes = [...document.querySelectorAll('.result-box')];
const operationArrow = document.querySelector('.result-box-arrow');
let firstChoosedRegister;
let secondChoosedRegister;

const counterOfActiveClasses = (array) => {
  let counter = 0;
  array.forEach((item) => (item.classList[1] ? counter++ : false)); //classList[1] active/undefined
  return counter;
};

function listenerOnHexadecimalFormat() {
  let regEx = /^[0-9a-fA-F]+$/;
  let isHex = regEx.test(this.value.toString());
  if (!isHex) {
    this.value = this.value.slice(0, -1);
  }
}

const graphicChoosingRegister = (e, box) => {
  if (e.target.localName == 'div') {
    if (checkIfUserFillInputs()) {
      if (counterOfActiveClasses(registerBoxes) == 2) {
        if (box.classList[1]) {
          box.classList.remove('active');
        } else {
          alert('Osiagnieto maksymalna ilosc!');
        }
      } else {
        box.classList.toggle('active');
      }
    } else {
      alert('First you need to fill all inputs to choose register!');
    }
  }
};
const checkIfUserFillInputs = () => {
  const areAllFieldsFilledCorrectly = inputsArray.every((item) => {
    return item.value.length == 2;
  });
  return areAllFieldsFilledCorrectly;
};
function choosingOption() {
  if (!checkIfUserFillInputs()) {
    alert('First you need to fill all inputs to choose option!');
  } else if (counterOfActiveClasses(registerBoxes) != 2) {
    alert('First you need to choose 2 registers!');
  } else {
    if (counterOfActiveClasses(optionBoxes) == 1) {
      if (this.classList[1]) {
        this.classList.remove('active-option');
      } else {
        alert('Osiagnieto maksymalna ilosc operacji!');
      }
    } else {
      this.classList.toggle('active-option');
    }
  }
}

registerBoxes.forEach((box) =>
  box.addEventListener('click', function (e) {
    graphicChoosingRegister(e, box);
  })
);

inputsArray.forEach((input) => input.addEventListener('input', listenerOnHexadecimalFormat));
optionBoxes.forEach((box) => box.addEventListener('click', choosingOption));
