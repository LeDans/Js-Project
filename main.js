document.getElementById("searchBar").addEventListener("input", filterSearch);

async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

function countryProfile(country) {
  const countryGroup = document.createElement("div");
  const countryName = document.createElement("div");
  const countryPop = document.createElement("div");
  const countryRegion = document.createElement("div");
  const countryCapital = document.createElement("div");
  const buttonExpand = document.createElement("BUTTON");
  const moreCountryInfo = document.createElement("div");
  const countryOfficialName = document.createElement("div");
  const countryContinent = document.createElement("div");
  const countryLanguages = document.createElement("div");
  const countryCurrency = document.createElement("div");
  const countryFlag = document.createElement("img");

  countryName.textContent = country.name.common;
  countryPop.textContent = `Population: ${country.population.toLocaleString()}`;
  countryRegion.textContent = `Region: ${country.region}`;
  countryCapital.textContent = `Capital: ${country.capital}`;
  buttonExpand.textContent = `↓`;
  buttonExpand.addEventListener("click", function () {
    if (moreCountryInfo.style.display == "block") {
      moreCountryInfo.style.display = "none";
      buttonExpand.textContent = `↓`;
    } else {
      moreCountryInfo.style.display = "block";
      buttonExpand.textContent = `↑`;
    }
  });
  countryOfficialName.textContent = `Official Name: ${country.name.official}`;
  if (country.continents.length < 2) {
    countryContinent.textContent = `Continent: ${country.continents[0]}`;
  } else {
    let index = 0;
    countryContinent.textContent = `Continents: `;
    for (index = 0; index < country.continents.length; index++)
      countryContinent.textContent =
        countryContinent.textContent + `${country.continents[index]} `;
  }
  // if (country.languages == undefined) {
  //   return;
  // } else if (country.languages.length < 2) {
  //   countryLanguages.textContent = `Official Language: ${country.languages[0]}`;
  // } else {
  //   let index = 0;
  //   for (index = 0; index < country.languages.length; index++)
  //     countryLanguages.textContent =
  //       countryLanguages.textContent = `Official Languages: ${country.languages[0]}`;
  // }
  // for..in(wont work) dynamic object property/key
  // countryCurrency.textContent = `Currency: ${country.currencies[(0)[0]]}`;
  countryFlag.src = `${country.flags.svg}`;

  countryGroup.appendChild(countryName).setAttribute("id", "name");
  countryGroup.appendChild(countryPop).toLocaleString("id", "population");
  countryGroup.appendChild(countryRegion).setAttribute("id", "region");
  countryGroup.appendChild(countryCapital).setAttribute("id", "capital");
  countryGroup.appendChild(buttonExpand).setAttribute("id", "button-expand");
  countryGroup
    .appendChild(moreCountryInfo)
    .setAttribute("id", "further-info-list");
  moreCountryInfo
    .appendChild(countryOfficialName)
    .setAttribute("id", "official-name");
  moreCountryInfo.appendChild(countryContinent).setAttribute("id", "continent");
  moreCountryInfo.appendChild(countryLanguages).setAttribute("id", "languages");
  moreCountryInfo.appendChild(countryFlag).setAttribute("id", "flag");
  moreCountryInfo.appendChild(countryCurrency).setAttribute("id", "currency");
  document.getElementById("countries").appendChild(countryGroup);
}

function filterSearch() {
  const value = document.getElementById("searchBar").value.toLowerCase();
  const countriesContainer = document.getElementById("countries");
  countriesContainer.innerHTML = ""; // Clear previous results

  fetchCountries().then((data) => {
    console.log(data[0].cou);

    const renderedCountries = new Set();

    const filteredData = data.filter(
      (country) =>
        country.name.common.toLowerCase().includes(value) ||
        country.region.toLowerCase().includes(value) ||
        (country?.capital &&
          country?.capital[0].toLowerCase().includes(value)) ||
        String(country.population).includes(value) ||
        (country?.flags.alt &&
          country?.flags.alt.toLowerCase().includes(value)) ||
        (country.altSpellings &&
          country.altSpellings.some((spelling) =>
            spelling.toLowerCase().includes(value)
          ))
    );

    filteredData.forEach((country) => {
      if (!renderedCountries.has(country.name.common)) {
        countryProfile(country);
        renderedCountries.add(country.name.common);
      }
    });
  });
}

// Initial fetch and display of countries
fetchCountries().then((data) => {
  data.forEach((country) => {
    countryProfile(country);
  });
});
