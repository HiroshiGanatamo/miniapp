document.addEventListener("DOMContentLoaded", () => {
  // Fetch the list of currencies from ChangeNow
  fetch(
    "https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell="
  )
    .then((response) => response.json())
    .then((data) => {
      populateSelect(document.getElementById("from-token-options"), data);
      populateSelect(document.getElementById("to-token-options"), data);
    })
    .catch((error) => console.error("Error fetching data: ", error));

  // Handle custom dropdown logic
  const fromTokenDropdown = document.getElementById("from-token-dropdown");
  const fromTokenOptions = document.getElementById("from-token-options");

  fromTokenDropdown.addEventListener("click", function () {
    fromTokenOptions.classList.toggle("active");
    fromTokenDropdown.classList.toggle("open"); // Rotate arrow icon
  });

  function populateSelect(optionsContainer, currencies) {
    optionsContainer.innerHTML = ""; // Clear existing options
    currencies.forEach((currency) => {
      let option = document.createElement("div");
      option.className = "custom-option";
      option.innerHTML = `
          <img src="${currency.image}" alt="${currency.name}" class="currency-icon">
          <span>${currency.name}</span>
        `;
      option.dataset.value = currency.ticker; // Use this in your form submission logic
      option.addEventListener("click", function () {
        // When an option is clicked, set the image and name in the dropdown
        fromTokenDropdown.querySelector("img").src = currency.image;
        fromTokenDropdown.querySelector("span").textContent = currency.name;
        fromTokenOptions.classList.remove("active");
        fromTokenDropdown.classList.remove("open"); // Rotate arrow icon back
        // You will also want to store the selected currency ticker in a hidden input for form submission
      });
      optionsContainer.appendChild(option);
    });
  }
});
