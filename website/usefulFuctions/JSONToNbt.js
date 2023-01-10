module.exports = async (nbt) => {
  if (typeof(nbt) == "object") nbt = JSON.stringify(nbt);
  nbt = nbt.replaceAll("\\\\", "\\");
  nbt = nbt.replaceAll(/{"number":([0-9]),"type":"([fdlsbFDLSB])"}/g, `"$1$2"`);
  return nbt;
}