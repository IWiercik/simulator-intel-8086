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
          alert("2 registers are maximum!");
        }
      }
    } else {
      alert("First you need to fill all inputs to choose register!");
    }
  }
};
const checkIfUserFillInputs = () => {
  const areAllFieldsFilledCorrectly = inputsArray.every((item) => {
    return item.value.length == 2;
  });
  // return areAllFieldsFilledCorrectly;
  return true;
};
function choosingOperation() {
  if (!checkIfUserFillInputs()) {
    alert("First you need to fill all inputs to choose option!");
  } else if (counterOfActiveClasses(registerBoxes) != 2) {
    alert("First you need to choose 2 registers!");
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
