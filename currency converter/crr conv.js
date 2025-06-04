
  
  async function populateCurrencies() {
    try {
      
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const data = await response.json();
      const currencyCodes = Object.keys(data.rates);
      const fromSelect = document.getElementById("fromCurrency");
      const toSelect = document.getElementById("toCurrency");

     
      fromSelect.innerHTML = "";
      toSelect.innerHTML = "";

     
      currencyCodes.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.text = currency;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.text = currency;
        toSelect.appendChild(optionTo);
      });

      
      fromSelect.value = "USD";
      toSelect.value = "INR";
    } catch (error) {
      console.error("Error loading currencies:", error);
      document.getElementById("result").innerText =
        "Error loading currency list. Please try again later.";
    }
  }

  
  async function convertCurrency() {
    
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (isNaN(amount)) {
      document.getElementById("result").innerText = "Please enter a valid number.";
      return;
    }

    try {
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Error fetching exchange rates.");
      const data = await response.json();

     
      const rate = data.rates[toCurrency];
      if (!rate) {
        document.getElementById("result").innerText =
          "Conversion rate not available for the selected currencies.";
        return;
      }
      
      const convertedAmount = (amount * rate).toFixed(2);
      document.getElementById("result").innerText =
        `${amount} ${fromCurrency} equals ${convertedAmount} ${toCurrency}`;
    } catch (error) {
      console.error("Conversion Error:", error);
      document.getElementById("result").innerText =
        "There was an error converting the currency.";
    }
  }

  window.onload = populateCurrencies;