document.addEventListener("DOMContentLoaded", () => {
  const dropdownTriggers = document.querySelectorAll(".combobox--field");
  const dropdownLists = document.querySelectorAll(".combobox--dropdown");

  // Function to close all dropdowns
  function closeAllDropdowns() {
    dropdownLists.forEach((list) => {
      list.style.display = "none"; // Hide the dropdown list
    });
  }

  // Event listeners for each dropdown trigger
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      closeAllDropdowns(); // Close all dropdowns first
      const dropdown = trigger.nextElementSibling; // Assuming the dropdown is the next sibling
      dropdown.style.display = "block"; // Show the dropdown list
      event.stopPropagation(); // Stop the click from closing the dropdown immediately
    });
  });

  // Clicking outside the dropdowns closes them
  document.addEventListener("click", closeAllDropdowns);

  // Prevent clicks within the dropdown from closing it
  dropdownLists.forEach((list) => {
    list.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
});
