import axios from "axios";

const URL = "https://corona.lmao.ninja/countries";

const getByCountry = countryName => axios.get(`${URL}/${countryName}`, {
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  transformResponse: [(data) => {
    const parsedData = JSON.parse(data);
    return parsedData;
  }]
});

export { getByCountry };