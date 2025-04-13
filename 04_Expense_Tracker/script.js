document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const displayTotal = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenses.forEach((expense) => {
    renderExpenses(expense);
  });

  expenseForm.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if (name === "" || amount <= 0) return;
    const expense = {
      name: name,
      amount: amount,
      id: Date.now(),
    };

    expenses.push(expense);
    saveExpenses();
    renderExpenses(expense);
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  });

  function renderExpenses(expense) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${expense.name} - $${expense.amount}</span>
    <button data-id = "${expense.id}">remove</button>
    `;
    expenseList.appendChild(li);

    const total = calculateTotal();
    displayTotal.textContent = total.toFixed(2);
  }

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotal() {
    let total = expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );
    return total;
  }

  expenseList.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.tagName === "BUTTON") {
      //remove the expense
      const expenseId = e.target.getAttribute("data-id");
      expenseList.innerHTML = "";
      expenses = expenses.filter((expense) => expense.id !== Number(expenseId));
      saveExpenses();
      expenses.forEach((expense) => renderExpenses(expense));

      const total = calculateTotal();
      displayTotal.textContent = total.toFixed(2);
    }
  });
});
