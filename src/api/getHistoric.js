import axios from "./axios";
import { capitalize } from "../helpers/stringHelper";
import data from "./historical.json";

// const URL = "https://corona.lmao.ninja/historical";
const URL = "/v2/historical";

const getHistoric = () => axios.get(URL, {
  transformResponse: [(data) => {
    const parsedData = JSON.parse(data);
    return parsedData.map((country, i) => ({
      id: `country-${i}`,
      name: capitalize(country.country),
      province: !!country.province ? capitalize(country.province) : undefined,
      timeline: country.timeline
    })).sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }]
});

const getHistoricDev = () => new Promise((res) => {
  const x = {};
  x.data = data.map((country, i) => ({
    id: `country-${i}`,
    name: capitalize(country.country),
    province: !!country.province ? capitalize(country.province) : undefined,
    timeline: country.timeline
  })).sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  res(x);
})

export { getHistoric, getHistoricDev };