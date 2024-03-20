document.addEventListener("DOMContentLoaded", () => {
    const fromTokenDropdown = document.getElementById("from-token-dropdown");
    const fromTokenOptions = document.getElementById("from-token-options");
    const fromTokenImage = document.getElementById("from-token-image");
    const fromTokenName = document.getElementById("from-token-name");
    const fromTokenSearch = document.getElementById("from-token-search"); // Search input element
  
    if (!fromTokenDropdown || !fromTokenOptions || !fromTokenSearch) {
      console.error("Dropdown elements or search input not found in the DOM");
      return;
    }
  
    fromTokenDropdown.addEventListener("click", () => {
      fromTokenOptions.classList.toggle("active");
      fromTokenDropdown.classList.toggle("open");
      fromTokenSearch.style.display = "block"; // Show search input when dropdown is clicked
      fromTokenSearch.value = ''; // Clear search field
      filterOptions(""); // Reset filter to show all options
    });
  
    fromTokenSearch.addEventListener("input", (e) => {
      filterOptions(e.target.value);
    });
  
    function filterOptions(searchValue) {
      const options = fromTokenOptions.getElementsByClassName("custom-option");
      Array.from(options).forEach((option) => {
        const name = option.textContent.toLowerCase();
        const matches = name.includes(searchValue.toLowerCase());
        option.style.display = matches ? "block" : "none";
      });
    }
  
    fetch("https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell=")
      .then((response) => response.json())
      .then((data) => {
        populateSelect(fromTokenOptions, data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  
    function populateSelect(optionsContainer, currencies) {
      optionsContainer.innerHTML = ""; // Clear existing options
      currencies.forEach((currency) => {
        const optionElement = document.createElement("div");
        optionElement.className = "custom-option";
        optionElement.innerHTML = `
          <img src="${currency.image}" alt="${currency.ticker}" class="currency-icon">
          <span>${currency.ticker}</span>
        `;
        optionElement.addEventListener("click", function () {
          fromTokenImage.src = currency.image;
          fromTokenImage.alt = currency.ticker;
          fromTokenName.textContent = currency.ticker;
          fromTokenOptions.classList.remove("active");
          fromTokenDropdown.classList.remove("open");
          fromTokenSearch.style.display = "none"; // Hide search input when an option is selected
        });
        optionsContainer.appendChild(optionElement);
      });
    }
  });
  
