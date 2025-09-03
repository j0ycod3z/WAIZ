export function bright(hex, b) {
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  function rgbToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  let rgb = hexToRgb(hex);
  rgb.r = Math.floor(b * rgb.r)
  rgb.g = Math.floor(b * rgb.g)
  rgb.b = Math.floor(b * rgb.b)
  if (rgb.r > 255) rgb.r = 255;
  if (rgb.g > 255) rgb.g = 255;
  if (rgb.b > 255) rgb.b = 255;
  if (rgb.r < 0) rgb.r = 0;
  if (rgb.g < 0) rgb.g = 0;
  if (rgb.b < 0) rgb.b = 0;
  return "#" + rgbToHex(rgb.r) + rgbToHex(rgb.g) + rgbToHex(rgb.b);
}

const colors = [
  '#11C26F',
  '#198CE5',
  '#5B558B',
  '#F96276',
  '#FF7F50',
  '#FFD700'
]

export function getColor(idx) {
  return colors[idx % colors.length]
}

export function getColors(len) {
  let res = [];
  for (let i = 0; i < len; i++)
    res.push(colors[i % colors.length])
  return res;
}

export function format(str, maxLen = 14) {
  if ( str == null || str.length == 0) return "" 
  const res = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, " ");
  if (res.length > maxLen) return res.substring(0, maxLen) + "…"
  return res;
};