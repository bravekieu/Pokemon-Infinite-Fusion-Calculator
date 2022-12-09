// import the library to talk to imagemagick
import * as Magick from 'https://knicknic.github.io/wasm-imagemagick/magickApi.js';    

// various html elements
var shiftedImage = [];
shiftedImage[0] = document.getElementById('pic2');
shiftedImage[1] = document.getElementById('pic3');
shiftedImage[2] = document.getElementById('pic4');

// Fetch the image to hue shifted it, and call image magick
let DoMagickCall = async function () {
  for (let i = 0; i < 3; i++) {
    let fetchedSourceImage = await fetch(document.getElementById("pic1").src);
    let arrayBuffer = await fetchedSourceImage.arrayBuffer();
    let sourceBytes = new Uint8Array(arrayBuffer);

    // calling image magick with one source image, and command to hue shift the image
    let files = [{ 'name': 'srcFile.png', 'content': sourceBytes }];

    // The js/ruby hue shift equivalent in calculated with this calc: (shiftHue * 200 / 360) + 100
    let magickHueShift = (window.hueShift[i] * 200 / 360) + 100;

    let command = [ "convert", "srcFile.png", "-modulate", "100,100," + magickHueShift, "out.png" ];
    let processedFiles = await Magick.Call(files, command);
    let firstOutputImage = processedFiles[0];
    shiftedImage[i].src = URL.createObjectURL(new Blob([firstOutputImage['blob']], { type: "image/png" }));
  }
}

// Add listener to the buttons
document.getElementById('random').addEventListener('click', DoMagickCall);
document.getElementById('swap').addEventListener('click', DoMagickCall);
document.getElementById('random1').addEventListener('click', DoMagickCall);
document.getElementById('random2').addEventListener('click', DoMagickCall);
document.getElementById('fuse').addEventListener('click', DoMagickCall);