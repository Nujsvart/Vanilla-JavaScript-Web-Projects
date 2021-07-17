const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");

let data = [];

// Update DOM

const updateDOM = function (providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(item => {
    const el = document.createElement("div");
    el.classList.add("person");
    el.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`;
    main.appendChild(el);
  });
};

// Format number as money

const formatMoney = number =>
  number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

// Add new obj to data arr

const addData = obj => {
  data.push(obj);

  updateDOM();
};
// fetch random user and add money

const getRandomUser = async function () {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

getRandomUser();
getRandomUser();
getRandomUser();

console.log(data);

const doubleMoney = function () {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
};

const sortRichest = function () {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

const showMillionaires = function () {
  data = data.filter(el => el.money >= 1000000);
  updateDOM();
};

const calculateWealth = function () {
  const sum = data.reduce((acc, cur) => acc + cur.money, 0);
  const markup = `
    <div><h3>Total Wealth: <strong>$${formatMoney(sum)}</strong></h3></div>
  `;
  main.insertAdjacentHTML("beforeEnd", markup);
};

// Event Listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
