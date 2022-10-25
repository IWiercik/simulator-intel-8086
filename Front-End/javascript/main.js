const registerBoxes = [...document.querySelectorAll('.register-box-content')];
let firstChoosedRegister;
let secondChoosedRegister;
registerBoxes.forEach((box) =>
  box.addEventListener('click', function (e) {
    if (e.target.localName == 'div') {
      //   const isMoreTh = counterOfActiveClasses();
      //   isMoreThanTwoActive  > 2? alert("Mozesz wybrac tylko 2 rejestry!") :
      box.classList.toggle('active');
    }
  })
);

const counterOfActiveClasses = () => {
  let counter;
  registerBoxes.forEach((item) => (item == item.classList[1] ? counter++ : false)); //classList[1] active/undefined
  return counter;
};
