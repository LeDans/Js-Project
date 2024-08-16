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
  const moreCountryInfo = document.createElement("li");
  const countryOfficialName = document.createElement("ul");
  const countryContinent = document.createElement("ul");
  const countryFlag = document.createElement("img");

  countryName.textContent = country.name.common;
  countryPop.textContent = `Population: ${country.population.toLocaleString()}`;
  countryRegion.textContent = `Region: ${country.region}`;
  countryCapital.textContent = `Capital: ${country.capital}`;
  buttonExpand.textContent = `↓`;
  buttonExpand.addEventListener("click", function () {
    if (moreCountryInfo.style.display == "block") {
      moreCountryInfo.style.display = "none";
      moreCountryInfo.style.animation = "ease-out";
    } else {
      moreCountryInfo.style.display = "block";
      moreCountryInfo.style.animation = "ease-out";
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
  moreCountryInfo.appendChild(countryFlag).setAttribute("id", "flag");

  document.getElementById("countries").appendChild(countryGroup);
}

const searchhelp = (array) => {
  console.log(array);

  array.forEach((el) => {
    console.log(el);
  });
  // if (country.arguements.length > 1) {
  //   for (index = 0; index < country.arguements.length; index++) {
  //     country?.arguements && country?.arguements.toLowerCase().includes(value);
  //   }
  // } else {
  //   country?.arguements && country?.arguements.toLowerCase().includes(value);
  // }
};

function filterSearch() {
  const value = document.getElementById("searchBar").value.toLowerCase();
  const countriesContainer = document.getElementById("countries");
  countriesContainer.innerHTML = ""; // Clear previous results

  fetchCountries().then((data) => {
    console.log(data[0].cou);

    const filteredData = data.filter(
      (country) =>
        country.name.common.toLowerCase().includes(value) ||
        country.region.toLowerCase().includes(value) ||
        (country?.capital &&
          country?.capital[0].toLowerCase().includes(value)) ||
        String(country.population).includes(value) ||
        (country?.flags.alt &&
          country?.flags.alt.toLowerCase().includes(value)) ||
        searchhelp(country.altSpellings)
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
