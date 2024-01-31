const expenses = [
    { name: 'Bought groceries', amount: 50, category: 'Food' },
    { name: 'Watched a movie', amount: 30, category: 'Entertainment' },
];

function add() {
    //extracting values from form
    const nameExpense = document.getElementById('description').value;
    const amountE = document.getElementById('amount').value;
    const categoryE = document.getElementById('category').value;
    const item = { name: nameExpense, amount: parseInt(amountE), category: categoryE };
    expenses.push(item);
    display();
}

function display() {
    const categorizedExpenses = document.querySelector('.categorizedExpenses');
    const total = document.querySelector('.total');
    categorizedExpenses.innerHTML = '';
    total.innerHTML = '';
    const categoryWiseExpenses = {};
    // categorizing expenses 
    expenses.forEach(expense => {
        if (categoryWiseExpenses[expense.category] === undefined) {
            categoryWiseExpenses[expense.category] = [];
        }
        categoryWiseExpenses[expense.category].push(expense);
    });

    for (const category in categoryWiseExpenses) {
        let categoryTotal = 0;
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = '';

        categoryWiseExpenses[category].forEach(expense => {
            const expenseDetails = document.createElement('div');
            expenseDetails.classList.add('expenseDetails');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('deleteBtn');

            expenseDetails.innerHTML = `
                Description: ${expense.name}, Amount: ${expense.amount}, Category: ${expense.category}
            `;
            expenseDetails.appendChild(deleteButton);

            categoryDiv.appendChild(expenseDetails);

            categoryTotal += expense.amount;

            deleteButton.addEventListener('click', () => {
                deleteExpense(expense);
                display();
            });
        });

        categorizedExpenses.appendChild(categoryDiv);

        // total expenses per category
        const totalDetails = document.createElement('p');
        totalDetails.classList.add('totalDetails');
        totalDetails.textContent = `${category}: $${categoryTotal}`;
        total.appendChild(totalDetails);
    }

    // Total expenses
    let totalExpenses = 0;
    expenses.forEach(expense => {
        totalExpenses += expense.amount;
    });

    const totalExpensesElement = document.createElement('p');
    totalExpensesElement.classList.add('totalDetails');
    totalExpensesElement.textContent = `Total: $${totalExpenses}`;
    categorizedExpenses.appendChild(totalExpensesElement);
}

function deleteExpense(expenseToDelete) {
    const index = expenses.indexOf(expenseToDelete);
    if (index !== -1) {
        expenses.splice(index, 1);
    }
}

const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    add();
});

display();

  