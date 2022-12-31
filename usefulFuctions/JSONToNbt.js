module.exports = async (obj) => {
  if (typeof(obj) == "string") obj = JSON.parse(obj);
  // obj = obj.replaceAll("\\\\", "\\");
  //loop over values and if type is number, add the b and convert to string
  let getInner = (obj) => {
    let valuesList = [];
    for (const key of Object.keys(obj)) {
      if (typeof(obj) == "object") return getInner(obj[key]);
      valuesList.push(obj[key]);
    }
    return valuesList;
  }
  console.log(getInner(obj));
}