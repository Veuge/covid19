const getDataLabels = timeline => Object.keys(timeline);

const getData = timeline => Object.values(timeline);

const getCountries = historic => historic.map((hist, index) => ({
  id: `${index}`,
  name: hist.country,
  province: hist.province
})).sort();

export {
  getDataLabels,
  getData,
  getCountries
}