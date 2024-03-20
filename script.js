document.addEventListener("DOMContentLoaded", () => {
  const fromTokenDropdown = document.getElementById("from-token-dropdown");
  const fromTokenOptions = document.getElementById("from-token-options");

  // Fetch and populate the list of tokens
  fetchTokens();

  // Event listener for opening the dropdown
  fromTokenDropdown.addEventListener("click", function () {
    // Toggle dropdown here
    fromTokenOptions.style.display =
      fromTokenOptions.style.display === "block" ? "none" : "block";
  });

  // Function to fetch tokens and populate the dropdown
  function fetchTokens() {
    fetch(
      "https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell="
    )
      .then((response) => response.json())
      .then((data) => populateDropdown(data))
      .catch((error) => console.error("Error fetching tokens:", error));
  }

  // Function to populate the dropdown with token data
  function populateDropdown(data) {
    data.forEach((token) => {
      const option = document.createElement("div");
      option.className = "dropdown-option";
      option.innerHTML = `
          <img src="${token.image}" alt="${token.name}" class="currency-icon">
          <span>${token.name}</span>
        `;
      option.addEventListener("click", function () {
        // Set the selected token somewhere in your app's state
      });
      fromTokenOptions.appendChild(option);
    });
  }

  // Clicking outside the dropdown closes it
  window.addEventListener("click", function (event) {
    if (!fromTokenDropdown.contains(event.target)) {
      fromTokenOptions.style.display = "none";
    }
  });
});
