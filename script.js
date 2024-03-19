document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const fromTokenOptionsContainer =
    document.getElementById("from-token-options");
  const toTokenOptionsContainer = document.getElementById("to-token-options");

  console.log("fromTokenOptionsContainer:", fromTokenOptionsContainer);
  console.log("toTokenOptionsContainer:", toTokenOptionsContainer);

  if (!fromTokenOptionsContainer || !toTokenOptionsContainer) {
    console.error("Dropdown options containers not found in the DOM");
    return; // Stop the function if elements are not found
  }

  fetch(
    "https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell="
  )
    .then((response) => response.json())
    .then((data) => {
      populateSelect(fromTokenOptionsContainer, data);
      populateSelect(toTokenOptionsContainer, data);
    })
    .catch((error) => console.error("Error fetching data: ", error));

  function populateSelect(optionsContainer, currencies) {
    optionsContainer.innerHTML = ""; // Clear existing options
    currencies.forEach((currency) => {
      let option = document.createElement("div");
      option.className = "custom-option";
      option.innerHTML = `
          <img src="${currency.image}" alt="${currency.name}" class="currency-icon">
          <span>${currency.name}</span>
        `;
      option.dataset.value = currency.ticker;
      option.addEventListener("click", function () {
        let dropdown = this.closest(".custom-select");
        let img = dropdown.querySelector("img");
        let span = dropdown.querySelector("span");
        img.src = currency.image;
        img.alt = currency.name;
        span.textContent = currency.name;
        optionsContainer.classList.remove("active");
        // Optionally handle updating hidden input values here
      });
      optionsContainer.appendChild(option);
    });
  }
});
