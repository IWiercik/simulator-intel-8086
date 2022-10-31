const registerBoxes = [...document.querySelectorAll(".register-box-content")];
const inputsArray = [...document.querySelectorAll("input")];
const optionBoxes = [...document.querySelectorAll(".options-box-content")];
const resultBoxes = [...document.querySelectorAll(".result-box")];
const operationArrow = document.querySelector(".result-box-arrow");
const submitButton = document.querySelector(".confirm-operation");
const registers = ["", ""]; // "" = free place for register
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
const choosingRegister = (e, box) => {
  if (e.target.localName == "div") {
    if (checkIfUserFillInputs()) {
      if (box.classList[1]) {
        // removing
        const indexItemToRemove = registers.indexOf(box.textContent);
        registers[indexItemToRemove] = "";
        box.classList.remove("active");
      } else {
        // ADDING
        if (counterOfActiveClasses(registerBoxes) != 2) {
          const firstFreeSpace = registers.indexOf("");
          if (firstFreeSpace != -1) {
            registers[firstFreeSpace] = box.textContent;
          }
          box.classList.add("active");
        } else {
          showingSweetAlert(
            "Maximum registers",
            "You can choose only two registers"
          );
        }
      }
    } else {
      showingSweetAlert("Fill Inputs", "First you need to fill all inputs");
    }
  }
};
const checkIfUserFillInputs = () => {
  const areAllFieldsFilledCorrectly = inputsArray.every((item) => {
    return item.value.length == 2;
  });
  return areAllFieldsFilledCorrectly;
};
function choosingOperation() {
  if (!checkIfUserFillInputs()) {
    showingSweetAlert("Fill Inputs", "First you need to fill all inputs");
  } else if (counterOfActiveClasses(registerBoxes) != 2) {
    showingSweetAlert(
      "Choose registers",
      "First you need to choose two registers!"
    );
  } else {
    optionBoxes.forEach((box) => box.classList.remove("active-option"));
    this.classList.add("active-option");
    operationArrow.innerHTML = this.attributes[1].value;
  }
}

const refreshingResultBoxesValues = () => {
  resultBoxes[0].textContent = registers[0];
  resultBoxes[1].textContent = registers[1];
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
  optionBoxes.forEach((option) =>
    option.classList[1] ? (operation = option.textContent) : false
  );
  const isValid =
    firstRegister?.value.length > 0 &&
    secondRegister?.value.length > 0 &&
    operation.length > 0;
  if (isValid) {
    switch (operation) {
      case "MOV":
        secondRegister.value = firstRegister.value;
        break;
      case "EXH":
        const temp = firstRegister.value;
        firstRegister.value = secondRegister.value;
        secondRegister.value = temp;
        break;
      default:
    }
  } else {
    showingSweetAlert(
      "Choose elements!",
      "First you need to choose registers and operation!"
    );
  }
};

registerBoxes.forEach((box) =>
  box.addEventListener("click", function (e) {
    choosingRegister(e, box);
    refreshingResultBoxesValues();
  })
);

inputsArray.forEach((input) =>
  input.addEventListener("input", listenerOnHexadecimalFormat)
);
optionBoxes.forEach((box) => box.addEventListener("click", choosingOperation));
submitButton.addEventListener("click", submittingProgram);
