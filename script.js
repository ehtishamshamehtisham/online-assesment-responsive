document.addEventListener("DOMContentLoaded", function () {
    const countryList = document.getElementById("country-list");
    const selectedCountryButton = document.getElementById("selected-country");
    const phoneInput = document.getElementById("phone");

    // Fetch countries from your countries.json file
    fetch('countries.json')
        .then(response => response.json())
        .then(countries => {
            // Populate country dropdown
            countries.forEach(country => {
                const countryOption = document.createElement("div");
                countryOption.classList.add("country-option");
                countryOption.innerHTML = `
                    <img src="https://flagcdn.com/16x12/${country.iso_code.toLowerCase()}.png" alt="${country.name} Flag" class="flag-icon">
                    <span>${country.name} (+${country.dial_code})</span>
                `;
                countryOption.setAttribute("data-dial-code", country.dial_code);
                countryOption.setAttribute("data-country", country.name);

                // Click event to select country
                countryOption.addEventListener("click", function () {
                    selectedCountryButton.innerHTML = countryOption.innerHTML;
                    phoneInput.value = `+${country.dial_code} `;
                    countryList.classList.remove("show");
                });

                countryList.appendChild(countryOption);
            });
        })
        .catch(error => console.error('Error loading countries:', error));

    // Show/hide dropdown on button click
    selectedCountryButton.addEventListener("click", function () {
        countryList.classList.toggle("show");
    });

    // Close dropdown if clicking outside
    window.addEventListener("click", function (event) {
        if (!event.target.closest('.custom-dropdown')) {
            countryList.classList.remove("show");
        }
    });
});
