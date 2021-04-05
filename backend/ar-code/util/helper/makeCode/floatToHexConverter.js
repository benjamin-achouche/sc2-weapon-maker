const floatToHexConverter = (value) => {
  const getHex = (i) => ('00' + i.toString(16)).slice(-2);

  var view = new DataView(new ArrayBuffer(4)),
    result;

  view.setFloat32(0, value);

  result = Array.apply(null, { length: 4 })
    .map((_, i) => getHex(view.getUint8(i)))
    .join('');

  return result;
};

module.exports.floatToHexConverter = floatToHexConverter;
