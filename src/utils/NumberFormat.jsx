import  numeral  from "numeral";

export const NumberFormat = (num) => {
  return numeral(num).format("0,0");
};
