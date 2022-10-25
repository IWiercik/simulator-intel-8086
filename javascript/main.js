const registerBoxes = [...document.querySelectorAll(".register-box-content")];
const inputsArray = [...document.querySelectorAll("input")];
let firstChoosedRegister;
let secondChoosedRegister;

const counterOfActiveClasses = () => {
  let counter = 0;
  registerBoxes.forEach((item) => (item.classList[1] ? counter++ : false)); //classList[1] active/undefined
  console.log(registerBoxes[7].classList[1]);
  console.log(counter);
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
  if (e.target.localName == "div") {
    if (checkIfUserFillInputs()) {
      if (counterOfActiveClasses() == 2) {
        if (box.classList[1]) {
          box.classList.remove("active");
        } else {
          alert("Osiagnieto maksymalna ilosc!");
        }
      } else {
        box.classList.toggle("active");
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
  console.log(areAllFieldsFilledCorrectly);
};

registerBoxes.forEach((box) =>
  box.addEventListener("click", function (e) {
    graphicChoosingRegister(e, box);
  })
);

inputsArray.forEach((input) =>
  input.addEventListener("input", listenerOnHexadecimalFormat)
);
