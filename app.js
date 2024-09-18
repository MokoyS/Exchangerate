async function fetchApi() {
    const response = await fetch(
        "https://v6.exchangerate-api.com/v6/fd2f93ef27f7592ffcdd9c49/latest/USD"
    );
    const data = await response.json();
    return data;
}

async function createSelectOptions() {
    const dataTaux = await fetchApi();
    console.log(dataTaux);
    const select1 = document.getElementById("selector1");
    const select2 = document.getElementById("selector2");
    const rates = dataTaux.conversion_rates; // Accéder aux taux de conversion
    console.log(rates);

    // Utilisez Object.entries() pour itérer sur un objet
    Object.entries(rates).forEach(([currency, rate1]) => {
        const option1 = document.createElement("option");
        option1.value = rate1;
        option1.text = `${currency}`;
        select1.appendChild(option1);
    });
    Object.entries(rates).forEach(([currency, rate2]) => {
        const option2 = document.createElement("option");
        option2.value = rate2;
        option2.text = `${currency}`;
        select2.appendChild(option2);
    });
}

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const selector1 = document.getElementById("selector1").value;
    const selector2 = document.getElementById("selector2").value;
    const result = document.getElementById("result");

    const convertedAmount = (amount * selector2) / selector1;
    result.innerHTML = `${amount} ${selector1} = ${convertedAmount.toFixed(
        2
    )} ${selector2}`;
}
console.log(selector1.value);

createSelectOptions();
convertCurrency();
