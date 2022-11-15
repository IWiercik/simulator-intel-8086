// TOP SIDE REGISTERS
const registerBoxes = [...document.querySelectorAll('.register-box-content')];
const registersInputs = [...document.querySelectorAll('.register-input')];
// MIDDLE SIDE OPTIONS
const optionsBoxes = [...document.querySelectorAll('.options-box-content')];
const operationPlace = document.querySelector('.operation-place');
// BOTTOM SIDE OPERATION
const operationUsedMultiChildWrapper = document.querySelector('.multi-operation');
const operationArrow = document.querySelector('.result-box-arrow');
const operationUsedSingleChildWrapper = document.querySelector('.single-operation');
// OPERATION DATA TYPES
let dataTypesDivs = [...document.querySelectorAll('.data-type-wrapper')].map((item) => [
  item.children[0], //REGISTER
  item.children[2], // CELL
]);
const cursivesBettwenDataTypes = [...document.querySelectorAll('.cursive-parent')];
// ENDING PROGRAM
let operationBoxes = [...document.querySelectorAll('.visible .result-box .box-value')];
const submitButton = document.querySelector('.confirm-operation');

// EVENT LISTENERS
registersInputs.forEach((input) => input.addEventListener('input', listenerOnHexadecimalFormat));
optionsBoxes.forEach((box) => box.addEventListener('click', choosingOperation));
dataTypesDivs.forEach((array, parentIndex) =>
  array.forEach((item, boxIndex) =>
    item.addEventListener('click', function () {
      choosingDataType(item, array, parentIndex, boxIndex);
    })
  )
);
registerBoxes.forEach((box) =>
  box.addEventListener('click', function (event) {
    if (event.target.localName != 'input') {
      choosingRegister(event, box);
    }
    event.stopPropagation();
  })
);
submitButton.addEventListener('click', submittingProgram);
//DOM FUNCTIONS
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
// SECURITY
function listenerOnHexadecimalFormat() {
  let regEx = /^[0-9a-fA-F]+$/;
  let isHex = regEx.test(this.value.toString());
  if (!isHex) {
    this.value = this.value.slice(0, -1);
  }
}
