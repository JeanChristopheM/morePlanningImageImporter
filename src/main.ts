import "./style.scss";
import { setup } from "./functions";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>ASCII Image Converter</h1>
<input type="file" id="file-input" accept="image/*">
<canvas id="image-canvas" style="display:none;"></canvas>
<div id="ascii-output"></div>
<div class="button-container">
  <button id="copy-button">Copy to Clipboard</button>
</div>
`;
setup();
