var img = new Image(60, 45);
img.crossOrigin = 'anonymous';
var img = document.getElementById("img")
img.onload = drawImage

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function drawImage() {
  ctx.drawImage(this, 0, 0, this.width, this.height);
}

var original = function() {
  ctx.drawImage(img, 0, 0, img.width, img.height);
}

var grayscale = function() {
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  ctx.putImageData(imageData, 0, 0);
};

const convertToColorscheme = (colorscheme) => {
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    const currentColor = data.slice(i, i + 3)
    const closestColor = findClosestColor(currentColor, colorscheme)
    data[i] = closestColor[0]
    data[i + 1] = closestColor[1]
    data[i + 2] = closestColor[2]

  }
  ctx.putImageData(imageData, 0, 0);

}

const monokai = () => {
  convertToColorscheme(monokaiColorscheme())
}

const matrix = () => {

}

const findClosestColor = (color, colorscheme) => {
  let shortestDistance = Infinity
  let closestColor
  for (let c of colorscheme) {
    const distance = colorDistance(color, c)
    if (distance < shortestDistance) {
      shortestDistance = distance
      closestColor = c
    }
  }
  return closestColor
}

const monokaiColorscheme = [
  [46, 46, 46],
  [121, 121, 121],
  [214, 214, 214],
  [229, 181, 103],
  [180, 210, 115],
  [232, 125, 62],
  [158, 134, 200],
  [176, 82, 121],
  [108, 153, 187],
]

const matrixColorscheme = [
  [54, 186, 1],
  [0, 154, 34],
  [0, 255, 43],
  [0, 154, 34],
  [54, 186, 1],
]

const colorDistance = (c1, c2) => {
  return Math.sqrt(
    Math.pow((c1[0] - c2[0]), 2)
    + Math.pow((c1[1] - c2[1]), 2)
    + Math.pow((c1[2] - c2[2]), 2)
  )
}

const inputs = document.querySelectorAll('[name=color]');
for (const input of inputs) {
  input.addEventListener("change", function(evt) {
    switch (evt.target.value) {
      case "monokai":
        return convertToColorscheme(monokaiColorscheme);
      case "matrix":
        return convertToColorscheme(matrixColorscheme);
      case "grayscale":
        return grayscale();
      default:
        return original();
    }
  });
}
