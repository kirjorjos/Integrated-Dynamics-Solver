module.exports = async (nbtString) => {
  nbtString = nbtString.replaceAll(/((?<=[\{\,])[A-Za-z]+?(?=[\:\}]))/g, `\"$1\"`);
  nbtString = nbtString.replaceAll(/([0-9]+)([fdlsbFDLSB])/g, `{
    "number": $1,
    "type": $2
  }`);
  nbtString = nbtString.replaceAll("\\", "\\\\")
  let obj = JSON.parse(nbtString);
  return obj;
}