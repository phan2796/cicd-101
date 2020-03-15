export const colors = [
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#00b894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#ffeaa7",
  "#fab1a0",
  "#ff7675",
  "#fd79a8",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#e84393",
  "#b2bec3",
  "#636e72"
];

//  random hex string generator
export const addHexColor = (c1, range) => {
  var hexStr = (parseInt(c1, 16) + range).toString(16);
  while (hexStr.length < 6) {
    hexStr = "0" + hexStr;
  } // Zero pad.
  return hexStr;
};
