document.getElementById("searchBar").addEventListener("input", filterSearch);

async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function countryProfile(country) {
  const countryName = document.createElement("div");
  const countryPop = document.createElement("div");
  const countryRegion = document.createElement("div");
  const countryCapital = document.createElement("div");

  countryName.textContent = country.name.common;
  countryPop.textContent = `Population: ${country.population}`;
  countryRegion.textContent = `Region: ${country.region}`;
  countryCapital.textContent = `Capital: ${country.capital}`;

  countryName.appendChild(countryPop);
  countryName.appendChild(countryRegion);
  countryName.appendChild(countryCapital);

  document.getElementById("countries").appendChild(countryName);
}

function filterSearch() {
  const value = document.getElementById("searchBar").value.toLowerCase();
  const countriesContainer = document.getElementById("countries");
  countriesContainer.innerHTML = ""; // Clear previous results

  fetchCountries().then((data) => {
    const filteredData = data.filter((country) =>
      country.name.common.toLowerCase().includes(value)
    );

    filteredData.forEach((country) => {
      countryProfile(country);
    });
  });
}

// Initial fetch and display of countries
fetchCountries().then((data) => {
  data.forEach((country) => {
    countryProfile(country);
  });
});