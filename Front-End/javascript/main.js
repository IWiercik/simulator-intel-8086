const registerBoxes = [...document.querySelectorAll(".register-box-content")];
const inputsArray = [...document.querySelectorAll("input")];
let firstChoosedRegister;
let secondChoosedRegister;
registerBoxes.forEach((box) =>
  box.addEventListener("click", function (e) {
    if (e.target.localName == "div") {
      //   const isMoreTh = counterOfActiveClasses();
      //   isMoreThanTwoActive  > 2? alert("Mozesz wybrac tylko 2 rejestry!") :
      box.classList.toggle("active");
    }
  })
);

inputsArray.forEach(input => input.addEventListener("input", function(){
  let regEx = /^[0-9a-fA-F]+$/;
  let isHex = regEx.test(input.value.toString());
  if(!isHex) {
    input.value = input.value.slice(0, -1);
  }

}))

const counterOfActiveClasses = () => {
  let counter;
  registerBoxes.forEach((item) =>
    item == item.classList[1] ? counter++ : false
  ); //classList[1] active/undefined
  return counter;
};
