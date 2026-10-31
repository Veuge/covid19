import axios from "./axios";

const URL = "/v3/covid-19/countries";

const getByCountry = countryName => axios.get(`${URL}/${countryName}`, {
  transformResponse: [(data) => {
    const parsedData = JSON.parse(data);
    return parsedData;
  }]
});

export { getByCountry };