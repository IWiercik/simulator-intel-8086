const cells = [];
const gettingRandomHexValue = () => {
  let randomNumber = (Math.random() * 256) | 0;
  randomNumber = randomNumber.toString(16).toUpperCase();
  if (randomNumber.length < 2) { // format: 00, 0F
    randomNumber = '0' + randomNumber;
  }
  return randomNumber;
};
const fillingCells = async () => {
  for (let i = 0; i < 65536; i++) {
    let name = i.toString(16).toUpperCase();
    while (name.length < 4) name = '0' + name;  // Name format: 0000, 0F0F
    const obj = {
      name: name,
      value: gettingRandomHexValue(),
    };
    cells.push(obj);
  }
};
const workingOnCell = (name) => {
  const cell = cells.find((cell) => cell.name === name);
  return cell;
};
