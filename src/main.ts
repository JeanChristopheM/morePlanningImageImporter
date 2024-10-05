import "./style.scss";
import { CURRENT_SIZE, MAX_SIZE, setup } from "./functions";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>ASCII Image Converter</h1>
<h3>Upload an image or paste an image from the clipboard to convert it to a blueprint importable in the mod toolbar.</h3>
<canvas id="image-canvas" style="display:none;"></canvas>
<section id="inputs">
  <label for="file-input" class="button">
    <span class="inputLabel">Upload an image</span>
    <input type="file" id="file-input" accept="image/*">
  </label>
  <label for="map-select">
    <span class="inputLabel">Color mapping:</span>
    <select id="map-select">
      <option value="1">Color distance</option>
      <option value="2">Brightness</option>
      <option value="3">HSL</option>
    </select>
  </label>
  <label for="scale-slider">
    <span class="inputLabel">Image Scale:</span>
    <input type="range" id="scale-slider" min="10" max="${MAX_SIZE}" step="1" value="${CURRENT_SIZE}">
    <span id="scale-value">${CURRENT_SIZE}px</span>
  </label>
</section>
<div id="container">
  <div id="text-side">
    <textarea id="ascii-output" rows="30" cols="30"></textarea>
    <button id="copy-btn">Copy to Clipboard</button>
  </div>
  <div id="preview-side">
    <canvas id="preview-canvas"></canvas>
  </div>
</div>

`;
setup();
