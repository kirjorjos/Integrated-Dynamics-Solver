export async function JSONtoNBT(nbt) {
  if (typeof (nbt) == "object") nbt = JSON.stringify(nbt);
  nbt = nbt.replaceAll("\\\\", "\\");
  nbt = nbt.replaceAll(/{"number":([0-9]),"type":"([fdlsbFDLSB])"}/g, `"$1$2"`);
 return nbt;
}

export async function NBTtoJSON(nbtString) {
    nbtString = nbtString.replaceAll(/((?<=[\{\,])[A-Za-z]+?(?=[\:\}]))/g, `\"$1\"`);
    nbtString = nbtString.replaceAll(/([0-9]+)([fdlsbFDLSB])/g, `{
    "number": $1,
    "type": $2
  }`);
    nbtString = nbtString.replaceAll("\\", "\\\\")
    let obj = JSON.parse(nbtString);
    return obj;
  }