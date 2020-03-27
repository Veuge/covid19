const capitalize = string => 
  string.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

const getCountryProvinceConcat = (country, province) => {
  let result = country;
  if (province) {
    result = `${result} - ${province}`;
  }
  return result;
}

export { capitalize, getCountryProvinceConcat };