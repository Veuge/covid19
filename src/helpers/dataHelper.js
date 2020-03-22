const getDataLabels = timeline => Object.keys(timeline);

const getData = timeline => Object.values(timeline);

const getCountries = historic => historic.map(hist => ({
  id: hist.id,
  name: hist.name,
  province: hist.province
}));

export {
  getDataLabels,
  getData,
  getCountries
}