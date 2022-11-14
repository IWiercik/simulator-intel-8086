// TOP SIDE REGISTERS
const registerBoxes = [...document.querySelectorAll('.register-box-content')];
const registerInputsArray = [...document.querySelectorAll('.register-input')];
// MIDDLE SIDE OPTIONS
const optionsBoxes = [...document.querySelectorAll('.options-box-content')];
const operationPlace = document.querySelector('.operation-place');
// BOTTOM SIDE OPERATION
const operationUsedMultiChildWrapper = document.querySelector('.multi-operation');
const operationArrow = document.querySelector('.result-box-arrow');
const operationUsedSingleChildWrapper = document.querySelector('.single-operation');
const operationInputs = [...document.querySelectorAll('input')];
// OPERATION DATA TYPES
let dataTypesDivs = [...document.querySelectorAll('.data-type-wrapper')].map((item) => [
  item.children[0],
  item.children[2],
]);
const cursivesBettwenDataTypes = [...document.querySelectorAll('.cursive-parent')];
// ENDING PROGRAM
let operationBoxes = [...document.querySelectorAll('.visible .result-box .box-value')];
const submitButton = document.querySelector('.confirm-operation');

// EVENT LISTENERS
registerInputsArray.forEach((input) => input.addEventListener('input', listenerOnHexadecimalFormat));
operationInputs.forEach((input) => input.addEventListener('input', listenerOnHexadecimalFormat));
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
