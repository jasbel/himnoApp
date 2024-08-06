const convertDecimalToHex = (val: number) => {
  if (val >= 1) {
    return 'ff';
  }
  if (val <= 0) {
    return '00';
  }

  let convert: number | string = parseInt((255 * val).toString(), 10);
  convert = convert.toString(16);
  if (convert.length === 1) {
    convert = '0' + convert;
  }
  return convert;
};

export const opacityColor = (color: string, opacity = 0.5) => {
  let hexString = convertDecimalToHex(opacity);
  const currentOpacityColor = color + hexString;
  return currentOpacityColor;
};
