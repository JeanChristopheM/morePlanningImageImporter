import "./style.scss";
import { setup } from "./functions";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>ASCII Image Converter</h1>
<h3>Upload an image or paste an image from the clipboard to convert it to a blueprint importable in the mod toolbar.</h3>
<input type="file" id="file-input" accept="image/*">
<canvas id="image-canvas" style="display:none;"></canvas>
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
