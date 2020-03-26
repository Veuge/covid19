const getDataLabels = timeline => Object.keys(timeline);

const getData = timeline => Object.values(timeline);

const getCountries = historic => historic.map(hist => ({
  id: hist.id,
  name: hist.name,
  province: hist.province
}));

const capitalize = string => 
  string.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

const getCountryFromId = (countries, id) => countries.find(o => o.id === id);

const getCountriesFromIds = (countries, ids) => {
  return ids.map(id => {
    const selectedCountry = getCountryFromId(countries, id);
    return selectedCountry || null;
  });
}

export {
  getDataLabels,
  getData,
  getCountries,
  capitalize,
  getCountriesFromIds
}