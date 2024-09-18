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
    const input = document.getElementById("amount");
    const select2 = document.getElementById("selector2");
    const rates = dataTaux.conversion_rates;
    console.log(rates);

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
    select1.addEventListener("change", convertCurrency);
    select2.addEventListener("change", convertCurrency);
    input.addEventListener("input", convertCurrency);
}

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const selector1 = document.getElementById("selector1");
    const selector2 = document.getElementById("selector2");
    const result1 = document.getElementById("result");
    const rate1 = selector1.value;
    const rate2 = selector2.value;
    const resultValue = (amount * rate2) / rate1;
    result1.value = resultValue;
    console.log(resultValue);
    const result = document.getElementById("result");
    if (amount === "") {
        result.innerHTML = "0";
    } else {
        result.innerHTML = resultValue.toFixed(4);
    }
}

createSelectOptions();
convertCurrency();