let Email, phoneNumber, password;
let clientDetails = document.querySelector('#clientDetails');
// let adminName = document.querySelector("#admin_name");
let total_client = document.querySelector("#total_client");

function createCard() {
    const cardDiv = document.createElement('div');
    const cardHead = document.createElement('div');
    const cardBody = document.createElement('div');
    const table = document.createElement('table');
    const tableRowEmail = document.createElement('tr');
    const tableRowPassword = document.createElement('tr');
    const tableRowHeadEmail = document.createElement('th');
    const tableRowHeadPassword = document.createElement('th');
    const tableDataEmail = document.createElement('td');
    const tableDataPassword = document.createElement('td');
    const cardFooter = document.createElement('div');

    cardDiv.className = "card";
    cardHead.className = "card-header text-center bg-dark text-light";
    cardHead.textContent = "Client Details";
    cardBody.className = "card-body p-5";

    table.className = "table";
    tableRowHeadEmail.scope = tableRowHeadPassword.scope = "row";
    tableRowHeadEmail.textContent = "Email";
    tableDataEmail.textContent = Email;
    tableRowHeadPassword.textContent = "Password";
    tableDataPassword.textContent = password;

    cardFooter.className = "card-footer text-center";


    tableRowEmail.appendChild(tableRowHeadEmail);
    tableRowEmail.appendChild(tableDataEmail);

    tableRowPassword.appendChild(tableRowHeadPassword);
    tableRowPassword.appendChild(tableDataPassword);

    table.appendChild(tableRowEmail);
    table.appendChild(tableRowPassword);

    cardBody.append(table);

    cardDiv.appendChild(cardHead);
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(cardFooter);

    clientDetails.appendChild(cardDiv);
}


window.addEventListener('DOMContentLoaded', () => {
    fetch('https://databasecollector2.angry-creator.repl.co/all').then((response) => {
        return response.json();
    }).then((data) => {
        data = data["data"];
        if (data.length >= 1) {
            for (let client of data) {
                Email = client.email;
                password = client.password;
                createCard();
            }
        }
        total_client.textContent = data.length;
    });
});