module.exports = async (nbtString) => {
  nbtString = nbtString.replaceAll(/((?<=[\{\,])[A-Za-z]+?(?=[\:\}]))/g, `\"$1\"`);
  nbtString = nbtString.replaceAll(/([0-9]+)b/g, `{
    "number": $1,
    "type": "b"
  }`);
  nbtString = nbtString.replaceAll("\\", "\\\\")
  console.log(JSON.parse(nbtString));
  console.log(JSON.parse(nbtString).Book.tag.pages)
}