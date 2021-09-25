const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

/* const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
]; */

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const html = `
        <li class="${transaction.amount < 0 ? "minus" : "plus"}">
            ${transaction.text}
            <span>${sign}${Math.abs(transaction.amount)}
            </span>
            <button class="delete-btn" onclick="removeTransaction(${
              transaction.id
            })">x</button>
        </li>
    `;

  list.insertAdjacentHTML("beforeend", html);
}

// balance - income - expense

function updateValues(transactions) {
  const totalMinus = (
    transactions
      .filter(trans => trans.amount < 0)
      .reduce((acc, cur) => acc + cur.amount, 0) * -1
  ).toFixed(2);

  const totalPlus = transactions
    .filter(trans => trans.amount > 0)
    .reduce((acc, cur) => acc + cur.amount, 0)
    .toFixed(2);

  const totalBalance = transactions
    .map(trans => trans.amount)
    .reduce((acc, cur) => (acc += cur), 0)
    .toFixed(2);

  money_minus.textContent = `-$${totalMinus}`;
  money_plus.textContent = `$${totalPlus}`;
  balance.textContent = `$${totalBalance}`;
}

// delete transaction

function removeTransaction(id) {
  transactions = transactions.filter(trans => trans.id !== id);

  updateLocalStorage();
  init();
}

// add transaction to list

function addTransactionList(e) {
  e.preventDefault();
  if (!e.target.matches(".btn") || !text.value.trim() || !amount.value.trim())
    return;

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: parseInt(amount.value),
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);
  updateValues(transactions);
  updateLocalStorage();
  text.value = "";
  amount.value = "";
}

// add localStorage

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues(transactions);
}

init();

// Event Listeners

form.addEventListener("click", addTransactionList);
