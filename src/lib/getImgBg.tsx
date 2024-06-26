export function getAverageRGB(imgEl: HTMLImageElement): string {
  imgEl.crossOrigin = "";

  const blockSize = 5; // onl   y visit every 5 pixels
  const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  let data;
  let width;
  let height;
  let i = -4;
  let length;
  const rgb = { r: 0, g: 0, b: 0 };
  let count = 0;

  if (!context) {
    return `rgb(${defaultRGB.r}, ${defaultRGB.g}, ${defaultRGB.b})`;
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    console.log("Error getting image data:", e);
    return `rgb(${defaultRGB.r}, ${defaultRGB.g}, ${defaultRGB.b})`;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
