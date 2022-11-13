let registers = [];
let choosedDataType = [];
let singleDataType = false;
let operation;

//BASIC FUNCTIONS
function choosingDataType(box, parent, parentIndex, boxIndex) {
  if (!box.classList[1]) {
    // Checking if user didnt clciked same element
    parent.forEach((item) => item.classList.remove("active-data-type"));
    box.classList.add("active-data-type");
    cursivesBettwenDataTypes[
      parentIndex
    ].style.background = `linear-gradient(125deg, ${
      boxIndex == 0 ? "green" : "black"
    } 50%, rgba(9, 9, 121, 1) 40%, ${boxIndex == 0 ? "black" : "green"} 10%)`;
    if (registers.length > 0) {
      const valueOfElementToRemove =
        parent[0].offsetParent.offsetParent.children[1].textContent;
      if (valueOfElementToRemove) {
        const registerBoxesValues = registerBoxes.map((box) =>
          box.textContent.trim().slice(0, -1)
        );
        const elementToRemove =
          registerBoxes[registerBoxesValues.indexOf(valueOfElementToRemove)];
        elementToRemove.classList.remove("active");
        registers = [...document.querySelectorAll(".active")];
      }
    }
    manageDataDivsContent(box, parent);
    choosedDataType = gettingActiveDataTypes(dataTypesDivs);
    refetchOperationBoxesValue();
  }
}
function choosingOperation() {
  if (!checkIfUserFillInputs()) {
    showingSweetAlert(
      "Fill Inputs",
      "First you need to fill all inputs and choosed data type register or cell"
    );
  } else {
    optionsBoxes.forEach((box) => box.classList.remove("active-option"));
    this.classList.add("active-option");
    operationArrow.innerHTML = this.attributes[1].value; // we update operation Arrow with data-content value
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
  }
  refetchDataTypes();
  choosedDataType = gettingActiveDataTypes(dataTypesDivs);
  deleteAllActiveRegisters();
  cleaningOperationBoxesValues();
  refetchOperationBoxesValue();
}
const choosingRegister = (e, box) => {
  const clickedDiv = e.target;
  const value = clickedDiv.textContent.trim().slice(0, -1);

  const HTMLElementsShowingValue = gettingSpanArray(operationBoxes);
  const HTMLElementsValues = HTMLElementsShowingValue.map(
    (item) => item.textContent
  );

  const maximumRegisterBasedOnDataType = choosedDataType.filter(
    (item) => item.textContent == "REGISTER"
  ).length;
  if (clickedDiv.localName == "div") {
    if (checkIfUserFillInputs()) {
      if (!clickedDiv.classList[1]) {
        if (registers.length < maximumRegisterBasedOnDataType) {
          clickedDiv.classList.add("active");
          const indexOfFirstFreeSpace = HTMLElementsValues.indexOf("");
          HTMLElementsShowingValue[indexOfFirstFreeSpace].textContent = value;
          HTMLElementsShowingValue[indexOfFirstFreeSpace].setAttribute("data-value",`${clickedDiv.children[0].value}`);
        } else {
          showingSweetAlert(
            "Maxium amount of registers",
            "You reached maximum amount of register based on choosed data-type"
          );
        }
      } else {
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
  const maximumRegisterBasedOnDataType = choosedDataType.filter(
    (item) => item.textContent == "REGISTER"
  ).length;
  if (operation) {
    if (maximumRegisterBasedOnDataType == registers.length) {
      let cellArray = operationBoxes.filter(
        (item) => item.localName == "input"
      );
      cellArray = cellArray.map((input) => input.value);
      if (cellArray.every((value) => value.length == 4)) {
        const values = operationBoxes.map((value,index) =>{
         return value.localName == "span" ? value.textContent + ":" +  operationBoxes[index].dataset.value : value.value;
        });
        operationsOnSubmit(operation, values);
      } else {
        showingSweetAlert(
          "Not correct values of cell",
          "You need to write cell value"
        );
      }
    } else {
      showingSweetAlert(
        "Not choosed registers",
        "Change data type or choose correct amount of registers"
      );
    }
  } else {
    showingSweetAlert(
      "Not choosed operation",
      "You need to choose operation to submit program"
    );
  }
};
// ADDITIONAL + SECURE
const refetchDataTypes = () => {
  // we use it bettwen switching operation
  dataTypesDivs = [
    ...document.querySelectorAll(".visible .data-type-wrapper"),
  ].map((item) => [item.children[0], item.children[2]]);
};
const refetchOperationBoxesValue = () => {
  operationBoxes = [
    ...document.querySelectorAll(".visible .result-box .box-value"),
  ];
};
const manageDataDivsContent = (element, parent) => {
  const elementWrapper = element.parentElement.parentElement;
  let activeDiv = parent.filter((div) => div.classList[1]);
  if (activeDiv[0]?.textContent == "REGISTER") {
    //Remove last child
    elementWrapper.removeChild(elementWrapper.lastElementChild);
    elementWrapper.appendChild(createSpan());
  } else if (activeDiv[0]?.textContent == "CELL") {
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
      ? arrayWithActiveDataTypes.push(
          ...divsArray.filter((item) => item.classList[1])
        )
      : false
  );
  return arrayWithActiveDataTypes;
}
function createInput() {
  const input = document.createElement("input");
  Object.assign(input, {
    type: "text",
    name: "register-value",
    className: "box-value",
    maxLength: 4,
    minLength: 4,
    required: true,
  });
  input.addEventListener("input", listenerOnHexadecimalFormat);
  return input;
}
function createSpan() {
  const span = document.createElement("span");
  span.setAttribute("class", "box-value");
  return span;
}
function deleteAllActiveRegisters() {
  registers.forEach((item) => item.classList.remove("active"));
  registers = [];
  // with clearing registers we clear values of boxes
}
function gettingSpanArray(array) {
  const transformedArray = array.filter(
    (htmlElement) => htmlElement.localName == "span"
  );
  return transformedArray;
}
function cleaningOperationBoxesValues() {
  operationBoxes.forEach((item) => {
    item.value = "";
    item.textContent = "";
  });
}
function operationsOnSubmit(operation, values) {
  const firstValueType = values[0].includes(":") ? "register"  : "cell";
  const secondValueType =  values.length  == 2  ? values[1].includes(":") ? "register"  : "cell" : false ;
  console.log(firstValueType,secondValueType);
   //Before and after operation
  const firstValueBefore = {
    value : firstValueType == "register" ? values[0].slice(3,5) : workingOnCell(values[0])?.value,
    name : firstValueType == "register" ? values[0].slice(0,2) : values[0].toUpperCase(),
  } 
  const secondValueBefore = {
    value : secondValueType == "register" ? values[1].slice(3,5) : workingOnCell(values[1])?.value,
    name :  secondValueType == "register" ? values[1].slice(0,2) : values[1].toUpperCase(),
  }
  const firstValueAfter = {
    value : "",
    name : firstValueBefore.name
  }
  const secondValueAfter ={
    value: "",
    name : secondValueBefore.name
  }
console.log(firstValueAfter,secondValueAfter);
  switch (operation) {
    case "MOV":
      firstValueAfter.value = firstValueBefore.value;
      secondValueAfter.value = firstValueBefore.value;
      break;
    case "INC":
      break;  
    default:
      console.log("Something went wrong!");
      break;
  }
  //After operation we changed our datas and showing results

  if(firstValueType == "register"){
    const index = registerBoxes.findIndex(item => item == registers[registers.length-1]);
  } else { // Cell
    const index = cells.findIndex(item => item.name == firstValueAfter.name);
    cells[index].value = firstValueAfter.value;
  }

  if(secondValueType == "register"){
    const index = registerBoxes.findIndex(item => item == registers[registers.length-1]);
  } else { // Cell
    const index = cells.findIndex(item => item.name == secondValueAfter.name);
    cells[index].value = secondValueAfter.value;
      
  }
  showingOperationsResult(operation, firstValueBefore,secondValueBefore, firstValueAfter, secondValueAfter);
}
//Config for loading website;
window.addEventListener("load", function () {
  refetchDataTypes();
  choosedDataType = gettingActiveDataTypes(dataTypesDivs);
  setTimeout(()=>{
    fillingCells();
  },1000)
});
