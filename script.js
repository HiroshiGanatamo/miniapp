document.addEventListener("DOMContentLoaded", () => {
  const dropdownTriggers = document.querySelectorAll(".combobox--field");

  // Function to close all dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll(".combobox--dropdown").forEach((list) => {
      list.style.display = "none"; // Hide the dropdown list
    });
  }

  // Event listeners for each dropdown trigger
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      // Close all dropdowns first
      closeAllDropdowns();

      // Access the next sibling that should be the dropdown list
      const dropdown = trigger.parentNode.querySelector(".combobox--dropdown");
      if (dropdown) {
        // If the dropdown exists, toggle its display
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
        event.stopPropagation(); // Stop the click from closing the dropdown immediately
      } else {
        console.error("Dropdown element not found next to the trigger.");
      }
    });
  });

  // Clicking outside the dropdowns closes them
  document.addEventListener("click", closeAllDropdowns);

  // Prevent clicks within the dropdown from closing it
  document.querySelectorAll(".combobox--dropdown").forEach((list) => {
    list.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
});
