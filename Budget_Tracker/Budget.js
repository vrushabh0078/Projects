
const balance = document.getElementById("balance");
const money_add = document.getElementById("money-add");
const money_sub = document.getElementById("money-sub");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTrans = [ 
//     { id: 1, text: "Salary", amount: +5000 },
//     { id: 1, text: "Party", amount: -500 },
//     { id: 1, text: "Grocerries", amount: -1000 },
// ];

// let transactions = [];
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


function addTransaction(e){
    e.preventDefault();
    if( text.value.trim() === '' || amount.value.trim() === '')
    {
        alert("Please provide twxt and amount")
    }else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

function generateID(){
    return Math.floor(Math.random()*10000000000000);
}


function addTransactionDOM(transaction){

    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "sub" : "add");

    item.innerHTML = ` 
    ${transaction.text} <span> ${sign} ${Math.abs(transaction.amount)} </span>
    <button class = "delete-btn" onclick="removeTransaction(${transaction.id})"> x </button>`;

    list.appendChild(item);

}



function updateValues(){
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter((item) => item > 0).reduce((acc,item) => (acc += item),0).toFixed(2);
    const expenditure = (amounts.filter((item) => item < 0 ).reduce((acc,item) => (acc += item),0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_add.innerText = `$${income}`;
    money_sub.innerText = `$${expenditure}`;

}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}

function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}



function Init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener("submit", addTransaction);