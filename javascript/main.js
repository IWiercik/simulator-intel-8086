let registers = [];
let choosedDataType = [];
let singleDataType = false;
let operation;

//BASIC FUNCTIONS
function choosingDataType(box, parent, parentIndex, boxIndex) {
  parent.forEach((item) => item.classList.remove('active-data-type'));
  box.classList.add('active-data-type');
  cursivesBettwenDataTypes[parentIndex].style.background = `linear-gradient(125deg, ${
    boxIndex == 0 ? 'green' : 'black'
  } 50%, rgba(9, 9, 121, 1) 40%, ${boxIndex == 0 ? 'black' : 'green'} 10%)`;
  manageDataDivsContent(box, parent);
  choosedDataType = gettingActiveDataTypes(dataTypesDivs);
  deleteAllActiveRegisters();
}
function choosingOperation() {
  if (!checkIfUserFillInputs()) {
    showingSweetAlert('Fill Inputs', 'First you need to fill all inputs and choosed data type register or cell');
  } else {
    optionsBoxes.forEach((box) => box.classList.remove('active-option'));
    this.classList.add('active-option');
    operationArrow.innerHTML = this.attributes[1].value; // we update operation Arrow with data-content value
    operation = this.textContent;
    operationPlace.textContent = ' ' + operation;
    switch (operation) {
      case 'NOT':
      case 'INC':
      case 'DEC':
        operationUsedMultiChildWrapper.classList.remove('visible');
        operationUsedSingleChildWrapper.classList.add('visible');
        singleDataType = true;
        break;
      default:
        operationUsedMultiChildWrapper.classList.add('visible');
        operationUsedSingleChildWrapper.classList.remove('visible');
        singleDataType = false;
        break;
    }
  }
  refetchDataTypes();
  choosedDataType = gettingActiveDataTypes(dataTypesDivs);
  deleteAllActiveRegisters();
  refetchOperationBoxesValue();
}
const choosingRegister = (e, box) => {
  const clickedDiv = e.target;
  const maximumRegisterBasedOnDataType = choosedDataType.filter((item) => item.textContent == 'REGISTER').length;
  if (clickedDiv.localName == 'div') {
    if (checkIfUserFillInputs()) {
      if (!clickedDiv.classList[1]) {
        if (registers.length < maximumRegisterBasedOnDataType) {
          clickedDiv.classList.add('active');
          refetchOperationBoxesValue();
          // operationBoxes.forEach((HtmlElement, index) => {
          //   if (HtmlElement.localName == 'span') {
          //     HtmlElement.textContent = `${clickedDiv.textContent.trim().slice(0, -1)}`; // Span getting value of register input value;
          //     registers[index] = clickedDiv.children[0].value;
          //   }
          // });
          // for(let i =0 ; i<)
          console.log(operationBoxes);
        } else {
          showingSweetAlert(
            'Maxium amount of registers',
            'You reached maximum amount of register based on choosed data-type'
          );
        }
      } else {
        clickedDiv.classList.remove('active');
      }
    } else {
      showingSweetAlert('Fill Inputs', 'First you need to fill all inputs');
    }
  }
  registers = [...document.querySelectorAll('.register-box-wrapper .active')];
};
const submittingProgram = () => {
  let firstRegister;
  let secondRegister;
  let operation;
  registerBoxes.forEach((box) => {
    if (box.classList[1]) {
      if (box.textContent == registers[0]) {
        firstRegister = box.children[0]; // input value
      } else {
        secondRegister = box.children[0]; // input value
      }
    }
  });
  optionsBoxes.forEach((option) => (option.classList[1] ? (operation = option.textContent) : false));
  const isValid = firstRegister?.value.length > 0 && secondRegister?.value.length > 0 && operation.length > 0;
  if (isValid) {
    switch (operation) {
      case 'MOV':
        secondRegister.value = firstRegister.value;
        break;
      case 'EXH':
        const temp = firstRegister.value;
        firstRegister.value = secondRegister.value;
        secondRegister.value = temp;
        break;
      default:
    }
  } else {
    showingSweetAlert('Choose elements!', 'First you need to choose registers and operation!');
  }
};
// ADDITIONAL + SECURE
const refetchDataTypes = () => {
  // we use it bettwen switching operation
  dataTypesDivs = [...document.querySelectorAll('.visible .data-type-wrapper')].map((item) => [
    item.children[0],
    item.children[2],
  ]);
};
const refetchOperationBoxesValue = () => {
  operationBoxes = [...document.querySelectorAll('.visible .result-box .box-value')];
};
const manageDataDivsContent = (element, parent) => {
  const elementWrapper = element.parentElement.parentElement;
  let activeDiv = parent.filter((div) => div.classList[1]);
  if (activeDiv[0]?.textContent == 'REGISTER') {
    //Remove last child
    elementWrapper.removeChild(elementWrapper.lastElementChild);
    elementWrapper.appendChild(createSpan());
  } else if (activeDiv[0]?.textContent == 'CELL') {
    //Remove all childs
    elementWrapper.removeChild(elementWrapper.lastElementChild);
    elementWrapper.appendChild(createInput());
  }
};
const checkIfUserFillInputs = () => {
  const areAllFieldsFilledCorrectly = registerInputsArray.every((item) => {
    return item.value.length == 2;
  });
  return areAllFieldsFilledCorrectly;
};
const refreshingResultBoxesValues = () => {
  operationUsedBoxes[0].textContent = registers[0];
  operationUsedBoxes[1].textContent = registers[1];
};
function listenerOnHexadecimalFormat() {
  let regEx = /^[0-9a-fA-F]+$/;
  let isHex = regEx.test(this.value.toString());
  if (!isHex) {
    this.value = this.value.slice(0, -1);
  }
}
const counterOfActiveClasses = (array) => {
  let counter = 0;
  array.forEach((item) => (item.classList[1] ? counter++ : false)); //classList[1] active/undefined
  return counter;
};
function gettingActiveDataTypes(array) {
  const arrayWithActiveDataTypes = [];
  array.forEach((divsArray) =>
    counterOfActiveClasses(divsArray)
      ? arrayWithActiveDataTypes.push(...divsArray.filter((item) => item.classList[1]))
      : false
  );
  return arrayWithActiveDataTypes;
}
function createInput() {
  const input = document.createElement('input');
  Object.assign(input, {
    type: 'text',
    name: 'register-value',
    className: 'box-value',
    maxLength: 4,
    minLength: 4,
    required: true,
  });
  input.addEventListener('input', listenerOnHexadecimalFormat);
  return input;
}
function createSpan() {
  const span = document.createElement('span');
  span.setAttribute('class', 'box-value');
  return span;
}
function deleteAllActiveRegisters() {
  registers.forEach((item) => item.classList.remove('active'));
  registers = [];
}
function gettingFirstEmptySpan(array){
  // array.forEach( htmlElement => htmlElement.)
}
//Config for loading website;
window.addEventListener('load', function () {
  refetchDataTypes();
  choosedDataType = gettingActiveDataTypes(dataTypesDivs);
});
