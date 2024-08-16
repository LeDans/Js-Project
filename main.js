async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = response.json();
    return data
    
  } catch(error) {
    console.log(error);
  }
}

const filterData = () => {
  const searchBar = document.getElementById("searchBar");

  const data = fetchCountries().then(
    data => {
      return data;
    }
  )

  const filteredData = fetchCountries().then(
    data => {
      searchBar.addEventListener('keyup', (event) =>{
        const value = event.target.value;
        filterSearch(value, data)
        
      })
    }
  )
    
  
  
  const filterSearch = (value, data) => {
    
    // const filteredData = data.filter((country) => console.log(country.name.common))
    const filteredData = data.filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase()));
    // console.log(filteredData)

    const countryProfile = (el) =>{

      const countryName = document.createElement("div");
      countryName.classList.add("name");
      countryName.innerText = el.name?.common;
      
      const countryCapital = document.createElement("div");
      countryCapital.classList.add("capital");
      countryCapital.innerText = el.capital;

      const countryPop = document.createElement("div");
      countryPop.classList.add("population")
      countryPop.innerText = el.population.toLocaleString()

      const countryRegion = document.createElement("div")
      countryRegion.classList.add("region")
      countryRegion.innerText = el.region

      
      countryName.appendChild(countryCapital)
      countryName.appendChild(countryPop)
      countryName.appendChild(countryRegion)

      document.getElementById("countries").appendChild(countryName)
    }

    filteredData.forEach((el) => {
      countryProfile(el);
    })

  
    
    

  }
}



filterData()




