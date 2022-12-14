//Global data
let registers = [];
let choosedDataType = [];
let singleDataType = false;
let operation;

//BASIC FUNCTIONS
function choosingDataType(box, parent, parentIndex, boxIndex) {
  // Checking if user didnt clicked same element
  if (!box.classList[1]) {
    //Program can have only 1 cell
    const amountOfCells = choosedDataType.filter((dataType) => dataType.textContent == "CELL").length;
    const clickedDiv = box.textContent;
    if (clickedDiv == "CELL" && amountOfCells == 1) {
      showingSweetAlert(
        "Maximum amount of cells",
        "For this type of operation you can have only 2 registers or register and cell!"
      );
    } else {
      parent.forEach((item) => item.classList.remove("active-data-type"));
      box.classList.add("active-data-type");
      cursivesBettwenDataTypes[parentIndex].style.background = `linear-gradient(125deg, ${
        boxIndex == 0 ? "green" : "black"
      } 50%, rgba(9, 9, 121, 1) 40%, ${boxIndex == 0 ? "black" : "green"} 10%)`;
      if (registers.length > 0) {
        //When switching data-type we need to clear old data
        const valueOfElementToRemove = parent[0].offsetParent.offsetParent.children[1].textContent; // from wrapper we choose "this" data
        if (valueOfElementToRemove) {
          const registerBoxesValues = registerBoxes.map((box) => box.textContent.trim().slice(0, -1));
          const elementToRemove = registerBoxes[registerBoxesValues.indexOf(valueOfElementToRemove)];
          elementToRemove.classList.remove("active");
          registers = [...document.querySelectorAll(".active")];
        }
      }
      manageDataDivsContent(box, parent);
      choosedDataType = gettingActiveDataTypes(dataTypesDivs);
      refetchOperationBoxesValue();
    }
  }
}
function choosingOperation() {
  if (!checkIfUserFillInputs()) {
    showingSweetAlert("Fill Inputs", "First you need to fill all inputs and choosed data type register or cell");
  } else {
    optionsBoxes.forEach((box) => box.classList.remove("active-option"));
    this.classList.add("active-option");
    operationArrow.innerHTML = this.attributes[1].value; // we update operation Arrow with data-content value
    const latestDataType = singleDataType; // Used for clearning/not clearning data bettwen switching options
    operation = this.textContent;
    operationPlace.textContent = " " + operation;
    switch (operation) {
      case "NOT":
      case "INC":
      case "DEC":
        operationUsedMultiChildWrapper.classList.remove("visible");
        operationUsedSingleChildWrapper.classList.add("visible");
        singleDataType = true;
        break;
      default:
        operationUsedMultiChildWrapper.classList.add("visible");
        operationUsedSingleChildWrapper.classList.remove("visible");
        singleDataType = false;
        break;
    }
    if (singleDataType !== latestDataType) {
      // When we change operation to other dataType we need to refetch data to not hold old data
      refetchDataTypes();
      choosedDataType = gettingActiveDataTypes(dataTypesDivs);
      deleteAllActiveRegisters();
      cleaningOperationBoxesValues();
      refetchOperationBoxesValue();
    }
  }
}
const choosingRegister = (e) => {
  const clickedDiv = e.target;
  const value = clickedDiv.textContent.trim().slice(0, -1);

  const HTMLElementsShowingValue = gettingSpanArray(operationBoxes);
  const HTMLElementsValues = HTMLElementsShowingValue.map((item) => item.textContent);

  const maximumRegisterBasedOnDataType = choosedDataType.filter((item) => item.textContent == "REGISTER").length; // 2 registers are max
  if (clickedDiv.localName == "div") {
    if (checkIfUserFillInputs()) {
      if (!clickedDiv.classList[1]) {
        // Not choosed register
        if (registers.length < maximumRegisterBasedOnDataType) {
          clickedDiv.classList.add("active");
          const indexOfFirstFreeSpace = HTMLElementsValues.indexOf("");
          HTMLElementsShowingValue[indexOfFirstFreeSpace].textContent = value;
          HTMLElementsShowingValue[indexOfFirstFreeSpace].setAttribute("data-value", `${clickedDiv.children[0].value}`);
        } else {
          showingSweetAlert(
            "Maxium amount of registers",
            "You reached maximum amount of register based on choosed data-type"
          );
        }
      } else {
        // Clicked choosed register
        clickedDiv.classList.remove("active");
        const indexOfItemToRemove = HTMLElementsValues.indexOf(value);
        HTMLElementsShowingValue[indexOfItemToRemove].textContent = "";
      }
    } else {
      showingSweetAlert("Fill Inputs", "First you need to fill all inputs");
    }
  }
  registers = [...document.querySelectorAll(".register-box-wrapper .active")];
};
const submittingProgram = () => {
  const maximumRegisterBasedOnDataType = choosedDataType.filter((item) => item.textContent == "REGISTER").length;
  if (operation) {
    if (maximumRegisterBasedOnDataType == registers.length) {
      let cellArray = operationBoxes.filter((item) => item.localName == "input");
      cellArray = cellArray.map((input) => input.value);
      if (cellArray.every((value) => value.length == 4)) {
        // Check if format is 0000, 0F0F
        const values = operationBoxes.map((value, index) => {
          return value.localName == "span"
            ? value.textContent + ":" + operationBoxes[index].dataset.value // span
            : value.value; // input
        });
        operationsOnSubmit(operation, values);
      } else {
        showingSweetAlert("Not correct values of cell", "You need to write cell value");
      }
    } else {
      showingSweetAlert("Not choosed registers", "Change data type or choose correct amount of registers");
    }
  } else {
    showingSweetAlert("Not choosed operation", "You need to choose operation to submit program");
  }
};
// ADDITIONAL + SECURE
const refreshDatasetsOfUsedBoxes = (firstValue, secondValue) => {
  if (registers.length == 2) {
    operationBoxes[0].setAttribute("data-value", firstValue);
    operationBoxes[1].setAttribute("data-value", secondValue);
  } else if (registers.length == 1) {
    const indexOfSpan = operationBoxes.findIndex((item) => item.localName == "span");
    indexOfSpan == 0
      ? operationBoxes[indexOfSpan].setAttribute("data-value", firstValue)
      : operationBoxes[indexOfSpan].setAttribute("data-value", secondValue);
  }
};
const manageDataDivsContent = (element, parent) => {
  const elementWrapper = element.parentElement.parentElement;
  let activeDiv = parent.filter((div) => div.classList[1]);
  if (activeDiv[0]?.textContent == "REGISTER") {
    elementWrapper.removeChild(elementWrapper.lastElementChild);
    elementWrapper.appendChild(createSpan()); // data-box(span) for Register
  } else if (activeDiv[0]?.textContent == "CELL") {
    elementWrapper.removeChild(elementWrapper.lastElementChild);
    elementWrapper.appendChild(createInput()); // data-box(input) for Cell
  }
};
const checkIfUserFillInputs = () => {
  const areAllFieldsFilledCorrectly = registersInputs.every((item) => {
    return item.value.length == 2;
  });
  return areAllFieldsFilledCorrectly;
};
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
function deleteAllActiveRegisters() {
  registers.forEach((item) => item.classList.remove("active"));
  registers = [];
  // with clearing registers we clear values of boxes
}
function gettingSpanArray(array) {
  const transformedArray = array.filter((htmlElement) => htmlElement.localName == "span");
  return transformedArray;
}
function cleaningOperationBoxesValues() {
  operationBoxes.forEach((item) => {
    item.value = "";
    item.textContent = "";
  });
}
function transformValueToEightBytesFormat(value) {
  let firstFourBytesBin = parseInt(value[0], 16).toString(2);
  let nextFourBytesBin = parseInt(value[1], 16).toString(2);
  if (firstFourBytesBin) {
    // We want format 0000 (4bytes showing)
    const zeroString = "0";
    firstFourBytesBin = zeroString.repeat(4 - firstFourBytesBin.length) + firstFourBytesBin;
  }
  if (nextFourBytesBin) {
    const zeroString = "0";
    nextFourBytesBin = zeroString.repeat(4 - nextFourBytesBin.length) + nextFourBytesBin;
  }
  const binaryValue = firstFourBytesBin.concat(nextFourBytesBin);
  return binaryValue;
}
function operationsOnSubmit(operation, values) {
  const firstValueType = values[0].includes(":") ? "register" : "cell";
  const secondValueType = values.length == 2 ? (values[1].includes(":") ? "register" : "cell") : false;
  //Before and after operation
  const firstValueBefore = {
    value: firstValueType == "register" ? values[0].slice(3, 5) : workingOnCell(values[0])?.value,
    name: firstValueType == "register" ? values[0].slice(0, 2) : values[0].toUpperCase(),
  };
  const secondValueBefore = {
    value: secondValueType == "register" ? values[1].slice(3, 5) : workingOnCell(values[1])?.value,
    name: secondValueType == "register" ? values[1].slice(0, 2) : values[1]?.toUpperCase(),
  };
  const firstValueAfter = {
    value: "",
    name: firstValueBefore.name,
  };
  const secondValueAfter = {
    value: "",
    name: secondValueBefore.name,
  };
  switch (operation) {
    case "MOV":
      firstValueAfter.value = firstValueBefore.value;
      secondValueAfter.value = firstValueBefore.value;
      break;
    case "EXH":
      firstValueAfter.value = secondValueBefore.value;
      secondValueAfter.value = firstValueBefore.value;
      break;
    case "NOT":
      {
        const binaryValue = transformValueToEightBytesFormat(firstValueBefore.value);
        const bits = [...binaryValue];
        const negatedBits = bits.map((byte) => (byte == 1 ? 0 : 1));
        const negatedBinary = parseInt(negatedBits.join(""), 2).toString(16).toUpperCase();
        firstValueAfter.value = negatedBinary.length == 1 ? "0" + negatedBinary : negatedBinary;
      }
      break;
    case "INC":
      {
        let decimalData = parseInt(firstValueBefore.value, 16);
        decimalData++;
        let incrementedDataHex = decimalData.toString("16");
        incrementedDataHex.length == 1 ? (incrementedDataHex = "0" + incrementedDataHex) : "";
        incrementedDataHex =
          incrementedDataHex[incrementedDataHex.length - 2] + incrementedDataHex[incrementedDataHex.length - 1]; // we need to get the last 2 position cause overfloat
        firstValueAfter.value = incrementedDataHex.toUpperCase();
      }
      break;
    case "DEC":
      {
        let decData = parseInt(firstValueBefore.value, 16);
        let result;
        if (decData - 1 < 0) {
          // we need to take care about underflow
          result = "FF";
        } else {
          decData--;
          let decrementedDataHex = decData.toString("16");
          decrementedDataHex.length == 1 ? (result = "0" + decrementedDataHex) : (result = decrementedDataHex);
        }
        firstValueAfter.value = result.toUpperCase();
      }
      break;
    case "AND":
      {
        const firstEightBytes = [...transformValueToEightBytesFormat(firstValueBefore.value)];
        const secondEightBytes = [...transformValueToEightBytesFormat(secondValueBefore.value)];
        let transformedOperation = [];
        for (let i = 0; i < 8; i++) {
          transformedOperation[i] = firstEightBytes[i] * secondEightBytes[i];
        }
        transformedOperation = parseInt(transformedOperation.join(""), 2).toString(16).toUpperCase(); // Change array into string
        transformedOperation = transformedOperation.length == 1 ? "0" + transformedOperation : transformedOperation;
        firstValueAfter.value = transformedOperation;
        secondValueAfter.value = secondValueBefore.value;
      }
      break;
    case "OR":
      {
        const firstEightBytes = [...transformValueToEightBytesFormat(firstValueBefore.value)];
        const secondEightBytes = [...transformValueToEightBytesFormat(secondValueBefore.value)];
        let transformedOperation = [];
        for (let i = 0; i < 8; i++) {
          transformedOperation[i] = firstEightBytes[i] == "1" || secondEightBytes[i] == "1" ? 1 : 0;
        }
        transformedOperation = parseInt(transformedOperation.join(""), 2).toString(16).toUpperCase(); // Change array into string
        transformedOperation = transformedOperation.length == 1 ? "0" + transformedOperation : transformedOperation;
        firstValueAfter.value = transformedOperation;
        secondValueAfter.value = secondValueBefore.value;
      }
      break;
    case "XOR":
      {
        const firstEightBytes = [...transformValueToEightBytesFormat(firstValueBefore.value)];
        const secondEightBytes = [...transformValueToEightBytesFormat(secondValueBefore.value)];
        let transformedOperation = [];
        for (let i = 0; i < 8; i++) {
          if (firstEightBytes[i] == "1" || secondEightBytes[i] == "1") {
            if (firstEightBytes[i] == "1" && secondEightBytes[i] == "1") {
              transformedOperation[i] = 0;
            } else {
              transformedOperation[i] = 1;
            }
          } else {
            transformedOperation[i] = 0;
          }
        }
        transformedOperation = parseInt(transformedOperation.join(""), 2).toString(16).toUpperCase(); // Change array into string
        transformedOperation = transformedOperation.length == 1 ? "0" + transformedOperation : transformedOperation;
        firstValueAfter.value = transformedOperation;
        secondValueAfter.value = secondValueBefore.value;
      }
      break;
    case "ADD":
      {
        const decFirstData = parseInt(firstValueBefore.value, 16);
        const decSecData = parseInt(secondValueBefore.value, 16);
        let result = (decFirstData + decSecData).toString(16).toUpperCase();
        result = result[result.length - 2] + result[result.length - 1]; // we need to get the last 2 position cause overfloat
        result.length == 2 ? "" : (result = "0" + result);
        firstValueAfter.value = result;
        secondValueAfter.value = secondValueBefore.value;
      }
      break;
    case "SUB":
      {
        const decFirstData = parseInt(firstValueBefore.value, 16);
        const decSecData = parseInt(secondValueBefore.value, 16);
        let result;
        if (decFirstData - decSecData >= 0) {
          result = (decFirstData - decSecData).toString("16").toUpperCase();
        } else {
          // Underflow
          const higherValue = decFirstData < decSecData ? decSecData : decFirstData;
          const lowerValue = decFirstData > decSecData ? decSecData : decFirstData;
          const valueAfterCalculation = 255 - higherValue + 1; // we need to make some calculations to handle the underflow
          result = (lowerValue + valueAfterCalculation).toString("16").toUpperCase();
        }
        result.length == 2 ? "" : (result = "0" + result);
        firstValueAfter.value = result;
        secondValueAfter.value = secondValueBefore.value;
      }
      break;
    default:
      console.log("Something went wrong!");
      break;
  }
  //After operation we changed(depend of flag) our datas and showing results

  if (firstValueType == "register") {
    const index = registerBoxes.findIndex((item) => item.textContent.trim().slice(0, 2) == firstValueBefore.name);
    registerBoxes[index].children[0].value = firstValueAfter.value;
  } else {
    // Cell
    const index = cells.findIndex((item) => item.name == firstValueAfter.name);
    cells[index].value = firstValueAfter.value;
  }

  if (secondValueType) {
    if (secondValueType == "register") {
      const index = registerBoxes.findIndex((item) => item.textContent.trim().slice(0, 2) == secondValueBefore.name);
      registerBoxes[index].children[0].value = secondValueAfter.value;
    } else {
      // Cell
      const index = cells.findIndex((item) => item.name == secondValueAfter.name);
      cells[index].value = secondValueAfter.value;
    }
  }
  showingOperationsResult(operation, firstValueBefore, secondValueBefore, firstValueAfter, secondValueAfter);
  //at the end we need to refresh datasets to allow resubmiting without choosing
  refreshDatasetsOfUsedBoxes(firstValueAfter.value, secondValueAfter.value);
}
//Config for loading website;
window.addEventListener("load", function () {
  refetchDataTypes();
  choosedDataType = gettingActiveDataTypes(dataTypesDivs);
  setTimeout(() => {
    fillingCells();
  }, 1000);
});
