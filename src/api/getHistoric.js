import axios from "axios";

const URL = "https://corona.lmao.ninja/historical";

const getHistoric = () => axios.get(URL, {
  transformResponse: [(data) => {
    const parsedData = JSON.parse(data);
    return parsedData.map((country, i) => ({
      id: `country-${i}`,
      name: country.country,
      province: !!country.province ? country.province : undefined,
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