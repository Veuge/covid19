import axios from "./axios";

const URL = "/countries";

const getByCountry = countryName => axios.get(`${URL}/${countryName}`, {
  transformResponse: [(data) => {
    const parsedData = JSON.parse(data);
    return parsedData;
  }]
});

export { getByCountry };