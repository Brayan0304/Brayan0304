const countriesUrl = 'https://restcountries.com/v3.1/all';

const countriesSelectElement = document.getElementById('countries');
const flagImageElement = document.getElementById('flag');
const countryNameElement = document.querySelector('.country-info h2');

function getCountries() {
  axios.get(countriesUrl)
    .then(response => {
      const countriesData = response.data;

      countriesSelectElement.innerHTML = '';

      countriesData.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.textContent = country.name.common;
        countriesSelectElement.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al obtener países:', error.message);
    });
}

function getCountryInfo() {
  const selectedCountryName = countriesSelectElement.value;

  const countryInfoUrl = `https://restcountries.com/v3.1/name/${selectedCountryName}`;

  axios.get(countryInfoUrl)
    .then(response => {
      const countryData = response.data[0];

      flagImageElement.src = countryData.flags.png;
      countryNameElement.textContent = countryData.name.common;
    })
    .catch(error => {
      console.error(`Error al obtener información del país ${selectedCountryName}:`, error.message);
    });
}

getCountries();

