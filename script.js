document.addEventListener("DOMContentLoaded", function () {
  const fromTokenSelect = document.getElementById("from-token");
  const toTokenSelect = document.getElementById("to-token");

  // Fetch the list of currencies from ChangeNow
  fetch(
    "https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell="
  )
    .then((response) => response.json())
    .then((data) => {
      populateSelect(fromTokenSelect, data);
      populateSelect(toTokenSelect, data);
    })
    .catch((error) => console.error("Error fetching data: ", error));

  function populateSelect(select, data) {
    for (const currency of data) {
      const option = document.createElement("option");
      option.value = currency.ticker;
      option.textContent = currency.name;
      option.dataset.image = currency.image; // store the image URL in data attribute
      select.appendChild(option);
    }
  }

  // Implement event listeners for when a user selects a currency
  // This would typically include updating the UI with the currency image, etc.
});
