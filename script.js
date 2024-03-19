document.addEventListener('DOMContentLoaded', () => {
  // Elements for the 'from' token dropdown
  const fromTokenDropdown = document.getElementById('from-token-dropdown');
  const fromTokenOptions = document.getElementById('from-token-options');

  // Elements for the 'to' token dropdown
  const toTokenDropdown = document.getElementById('to-token-dropdown');
  const toTokenOptions = document.getElementById('to-token-options');

  // Fetch the list of currencies from ChangeNow
  fetch('https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell=')
    .then((response) => response.json())
    .then((data) => {
      populateSelect(fromTokenOptions, data); // Populate 'from' options
      populateSelect(toTokenOptions, data); // Populate 'to' options
    })
    .catch((error) => console.error('Error fetching data: ', error));

  function populateSelect(optionsContainer, currencies) {
    optionsContainer.innerHTML = ''; // Clear existing options
    currencies.forEach(currency => {
      let option = document.createElement('div');
      option.className = 'custom-option';
      option.innerHTML = `
        <img src="${currency.image}" alt="${currency.name}" class="currency-icon">
        <span>${currency.name}</span>
      `;
      option.dataset.value = currency.ticker; // Use this in your form submission logic
      option.addEventListener('click', function () {
        // Update the dropdown display with the selected currency's image and name
        const dropdown = this.closest('.custom-select');
        dropdown.querySelector('img').src = currency.image;
        dropdown.querySelector('span').textContent = currency.name;
        optionsContainer.classList.remove('active');
        dropdown.classList.remove('open'); // Rotate arrow icon back
        // Store the selected currency ticker in a hidden input for form submission
      });
      optionsContainer.appendChild(option);
    });
  }
});
