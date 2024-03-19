document.addEventListener("DOMContentLoaded", () => {
  const fromTokenDropdown = document.getElementById("from-token-dropdown");
  const fromTokenOptions = document.getElementById("from-token-options");
  const fromTokenImage = document.getElementById("from-token-image");
  const fromTokenName = document.getElementById("from-token-name");

  if (!fromTokenDropdown || !fromTokenOptions) {
    console.error("Dropdown elements not found in the DOM");
    return;
  }

  fromTokenDropdown.addEventListener("click", () => {
    fromTokenOptions.classList.toggle("active");
    fromTokenDropdown.classList.toggle("open");
  });

  fetch(
    "https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell="
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      populateSelect(fromTokenOptions, data);
      // If you have a "to-token-dropdown" you'll need to fetch and populate it similarly
    })
    .catch((error) => console.error("Error fetching data:", error));

  function populateSelect(optionsContainer, currencies) {
    optionsContainer.innerHTML = ""; // Clear existing options
    currencies.forEach((currency) => {
      const optionElement = document.createElement("div");
      optionElement.className = "custom-option";
      optionElement.innerHTML = `
          <img src="${currency.image}" alt="${currency.name}" class="currency-icon">
          <span>${currency.name}</span>
        `;
      optionElement.addEventListener("click", function () {
        fromTokenImage.src = currency.image;
        fromTokenImage.alt = currency.name;
        fromTokenName.textContent = currency.name;
        fromTokenOptions.classList.remove("active");
        fromTokenDropdown.classList.remove("open");
        // Update any hidden input fields or form data here as needed
      });
      optionsContainer.appendChild(optionElement);
    });
  }
});
