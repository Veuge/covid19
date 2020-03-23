import axios from "axios";
import { capitalize } from "../helpers/dataHelper";

const URL = "https://corona.lmao.ninja/historical";

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

export { getHistoric };