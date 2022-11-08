// TOP SIDE REGISTERS
const registerBoxes = [...document.querySelectorAll('.register-box-content')];
const registerInputsArray = [...document.querySelectorAll('.register-input')];
// MIDDLE SIDE OPTIONS
const operationBoxes = [...document.querySelectorAll('.options-box-content')];
const operationPlace = document.querySelector('.operation-place');
// BOTTOM SIDE OPERATION
const operaionUsedMultiChildWrapper = document.querySelector('.multi-operation');
const operationUsedBoxes = [...document.querySelectorAll('#multi-box')];
const operationArrow = document.querySelector('.result-box-arrow');
const operationUsedSingleChildWrapper = document.querySelector('.single-operation');
const operationUsedSingleBox = document.querySelector('#single-box');
const operationInput = document.querySelector('#single-box-input');
// OPERATION DATA TYPES
let dataTypesDivs = [...document.querySelectorAll('.data-type-wrapper')].map((item) => [
  item.children[0],
  item.children[2],
]);
const cursivesBettwenDataTypes = [...document.querySelectorAll('.cursive-parent')];
// ENDING PROGRAM
const submitButton = document.querySelector('.confirm-operation');

// EVENT LISTENERS
registerInputsArray.forEach((input) => input.addEventListener('input', listenerOnHexadecimalFormat));
operationInput.addEventListener('input', listenerOnHexadecimalFormat);
operationBoxes.forEach((box) => box.addEventListener('click', choosingOperation));
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
// registerInputsArray.forEach((input) =>
//   input.addEventListener('click', function (event) {
//     console.log(event.target);
//     event.stopPropagation();
//   })
// );

submitButton.addEventListener('click', submittingProgram);
