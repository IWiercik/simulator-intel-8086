const registers = ['', '']; // "" = free place for register
let choosedDataType = [];
let operation;

function choosingDataType(box, parent, parentIndex, boxIndex) {
  if (counterOfActiveClasses(parent) == 0) {
    box.classList.add('active-data-type');
    cursivesBettwenDataTypes[parentIndex].style.background = `linear-gradient(125deg, ${
      boxIndex == 0 ? 'green' : 'black'
    } 50%, rgba(9, 9, 121, 1) 40%, ${boxIndex == 0 ? 'black' : 'green'} 10%)`;
  } else if (counterOfActiveClasses(parent) == 1) {
    if (box.classList[1]) {
      //if user clicked on actived item
      box.classList.remove('active-data-type');
      cursivesBettwenDataTypes[
        parentIndex
      ].style.background = `linear-gradient(125deg, rgba(2, 0, 36, 1) 50%, rgba(9, 9, 121, 1) 40%, black 10%)`;
    } else {
      showingSweetAlert('Maximum data types', 'Choose only 1 type of data cell or register');
    }
  }
  const arrayWithActiveDataTypes = [];
  dataTypesDivs.forEach((divsArray) =>
    counterOfActiveClasses(divsArray)
      ? arrayWithActiveDataTypes.push(...divsArray.filter((item) => item.classList[1]))
      : false
  );
  choosedDataType = arrayWithActiveDataTypes;
}
function choosingOperation() {
  if (!checkIfUserFillInputs()) {
    showingSweetAlert('Fill Inputs', 'First you need to fill all inputs and choosed data type register or cell');
  } else {
    operationBoxes.forEach((box) => box.classList.remove('active-option'));
    this.classList.add('active-option');
    operationArrow.innerHTML = this.attributes[1].value; // we update operation Arrow with data-content value
    operation = this.textContent;
    operationPlace.textContent = ' ' + operation;
    switch (operation) {
      case 'NOT':
      case 'INC':
      case 'DEC':
        operaionUsedMultiChildWrapper.classList.remove('visible');
        operationUsedSingleChildWrapper.classList.add('visible');
        refetchDataTypes();
        break;
      default:
        operaionUsedMultiChildWrapper.classList.add('visible');
        operationUsedSingleChildWrapper.classList.remove('visible');
        refetchDataTypes();
        break;
    }
  }
}
const choosingRegister = (e, box) => {
  if (e.target.localName == 'div') {
    if (checkIfUserFillInputs()) {
      if (box.classList[1]) {
        // removing
        const indexItemToRemove = registers.indexOf(box.textContent);
        registers[indexItemToRemove] = '';
        box.classList.remove('active');
      } else {
        // ADDING
        if (counterOfActiveClasses(registerBoxes) != 2) {
          const firstFreeSpace = registers.indexOf('');
          if (firstFreeSpace != -1) {
            registers[firstFreeSpace] = box.textContent;
          }
          box.classList.add('active');
        } else {
          showingSweetAlert('Maximum registers', 'You can choose only two registers');
        }
      }
    } else {
      showingSweetAlert('Fill Inputs', 'First you need to fill all inputs');
    }
  }
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
  operationBoxes.forEach((option) => (option.classList[1] ? (operation = option.textContent) : false));
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
const refetchDataTypes = () => {
  // we use it bettwen switching operation
  dataTypesDivs = [...document.querySelectorAll('.visible .data-type-wrapper')].map((item) => [
    item.children[0],
    item.children[2],
  ]);
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



