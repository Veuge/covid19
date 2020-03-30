import uniqBy from "lodash/uniqBy";

const getDataLabels = timeline => Object.keys(timeline);

const getData = timeline => Object.values(timeline);

const getCountries = historic => historic.map(hist => ({
  id: hist.id,
  name: hist.name,
  nameInSpanish: hist.nameInSpanish,
  province: hist.province
}));

const getCountryFromId = (countries, id) => countries.find(o => o.id === id);

const getCountriesFromIds = (countries, ids) => {
  return ids.map(id => {
    const selectedCountry = getCountryFromId(countries, id);
    return selectedCountry || null;
  });
}

const getUniqueCountriesFromIds = (countries, ids) => {
  const newC = getCountriesFromIds(countries, ids);
  return uniqBy(newC, "nameInSpanish");
}

export {
  getDataLabels,
  getData,
  getCountries,
  getCountriesFromIds,
  getUniqueCountriesFromIds
}