import { mapColor, mapColor2, mapColor3 } from "./colors";

let image: HTMLImageElement | undefined = undefined;
export const MAX_SIZE = 500;
export let CURRENT_SIZE = 100;

// . Utils
// . ------
/**
 * Resizes an image if it exceeds the maximum dimensions.
 * Otherwise, it returns the original image dimensions.
 *
 * @param {HTMLImageElement} image - The original image object loaded using `loadImage()`.
 * @returns {HTMLCanvasElement} - A canvas containing the resized image, if resized; otherwise, original.
 */
function resizeImage(image: HTMLImageElement): HTMLCanvasElement {
  // Get the original dimensions
  const originalWidth = image.width;
  const originalHeight = image.height;

  // If both dimensions are within the limit, do not resize
  if (originalWidth <= CURRENT_SIZE && originalHeight <= CURRENT_SIZE) {
    // Create a canvas with the exact size of the image
    const canvas = document.createElement("canvas");
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0, originalWidth, originalHeight);
    return canvas;
  }

  // Calculate the scaling factor to maintain the aspect ratio
  const scaleFactor = Math.min(
    CURRENT_SIZE / originalWidth,
    CURRENT_SIZE / originalHeight
  );

  // Calculate the new dimensions based on the scale factor
  const newWidth = Math.floor(originalWidth * scaleFactor);
  const newHeight = Math.floor(originalHeight * scaleFactor);

  // Create a new canvas for the resized image
  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;
  const context = canvas.getContext("2d")!;

  // Draw the resized image onto the canvas
  context.drawImage(image, 0, 0, newWidth, newHeight);

  return canvas;
}

/**
 * Draws the ASCII text onto the preview canvas.
 *
 * @param {string} asciiText - The ASCII text representation of the image.
 * @param {HTMLCanvasElement} canvas - The canvas element to draw the preview.
 */
function drawPreview(asciiText: string, canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");

  if (!context) return;
  context.imageSmoothingEnabled = false; // Disable image smoothing

  // Define the size of each square and padding
  const squareSize = 7;
  const padding = 3;
  const canvasPadding = 100;
  const totalSize = squareSize + padding;
  const width = asciiText.split("\n")[0].length;
  const height = asciiText.split("\n").length;

  const colorMapping = {
    a: "#d2d5d580", // Gray
    b: "#2095f280", // Blue
    c: "#4bae4f80", // Green
    d: "#f2020280", // Red
    e: "#feea3a80", // Yellow
    f: "#ff00f080", // Pink
    g: "#00FFFF80", // Cyan
    h: "#80008080", // Purple
    i: "#FFA50080", // Orange
    j: "#00000080", // Black
    "-": "#FFFFFF80", // Pure white for empty space
  };

  // Resize the canvas to accommodate the grid
  canvas.width = width * totalSize + canvasPadding;
  canvas.height = height * totalSize + canvasPadding;

  // Split the ASCII grid into lines
  const lines = asciiText.split("\n");

  // Iterate through each character in the grid and draw a corresponding square
  for (let y = 0; y < height; y++) {
    const line = lines[y];
    if (!line) continue;

    for (let x = 0; x < width; x++) {
      const char = line[x];
      if (!char) continue;

      // Determine the color for the square
      const color = colorMapping[char as "a"] || "#FFFFFF";

      // Calculate the position to draw the square
      const posX = x * totalSize + canvasPadding / 2;
      const posY = y * totalSize + canvasPadding / 2;
      // Introduce some randomness to the position for a more artistic effect
      const randomOffset = Math.random() * 0.8;
      const jitteredX = posX + randomOffset;
      const jitteredY = posY + randomOffset;

      // Draw a filled square with the specified color
      context.fillStyle = color;
      context.fillRect(jitteredX, jitteredY, squareSize, squareSize);
    }
  }
}

async function processImage() {
  if (!image) return;
  try {
    // Resize the image if necessary (preserving aspect ratio)
    const resizedCanvas = resizeImage(image);
    const context = resizedCanvas.getContext("2d")!;
    const width = resizedCanvas.width;
    const height = resizedCanvas.height;
    const mapSelect = document.getElementById(
      "map-select"
    ) as HTMLSelectElement;
    const mapValue = mapSelect.value;

    // Extract pixel data from the resized canvas
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    // Generate the ASCII grid based on the image size
    let outputGrid = "";
    for (let y = 0; y < height; y++) {
      let line = "";
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4; // Get the starting index of RGBA for this pixel
        const r = pixels[index]; // Red
        const g = pixels[index + 1]; // Green
        const b = pixels[index + 2]; // Blue

        // Map the pixel color to the corresponding ASCII character
        line +=
          mapValue === "1"
            ? mapColor(r, g, b)
            : mapValue === "2"
            ? mapColor2(r, g, b)
            : mapColor3(r, g, b);
        // line += mapColor2(r, g, b);
        // line += mapColor3(r, g, b);
      }
      outputGrid += line + "\n";
    }

    // Display the ASCII art in the output div
    document.getElementById("ascii-output")!.textContent = outputGrid;
    const asciiOutput = document.getElementById(
      "ascii-output"
    ) as HTMLTextAreaElement;
    const previewCanvas = document.getElementById(
      "preview-canvas"
    ) as HTMLCanvasElement;
    drawPreview(asciiOutput.value, previewCanvas);
  } catch (error) {
    console.error("Error processing the image:", error);
  }
}

const copyToClipboard = () => {
  const asciiOutput = document.getElementById("ascii-output")!.textContent;
  if (asciiOutput) {
    navigator.clipboard.writeText(asciiOutput).then(() => {
      alert("ASCII art copied to clipboard!");
    });
  }
};

// Helper function to update the canvas size based on the slider value
function updateCanvasScale(canvas: HTMLCanvasElement, scale: number) {
  if (!canvas) return;
  CURRENT_SIZE = scale;
  processImage();
}

// . Handlers
// . --------
const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement)?.files;
  if (!files) return;
  const file = files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      image = img;
      processImage();
    };
    img.src = e.target!.result as string;
  };
  reader.readAsDataURL(file);
};

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items;
  if (!items) return;

  for (const item of items) {
    // Check if the clipboard contains an image
    if (item.type.startsWith("image")) {
      const blob = item.getAsFile();
      if (blob) {
        // Read the image using FileReader
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            image = img;
            processImage();
          };
          img.src = e.target!.result as string;
        };
        reader.readAsDataURL(blob);
      }
    }
  }
};

// . Setup
// . -----
export const setup = () => {
  // Add event listener for file input
  document
    .getElementById("file-input")
    ?.addEventListener("change", handleFileUpload);
  document.addEventListener("paste", handlePaste);
  document
    .getElementById("copy-btn")
    ?.addEventListener("click", copyToClipboard);
  document
    .getElementById("map-select")
    ?.addEventListener("change", processImage);

  // Add event listener for the scale slider
  const scaleSlider = document.getElementById(
    "scale-slider"
  ) as HTMLInputElement;
  const scaleValue = document.getElementById("scale-value") as HTMLSpanElement;
  const previewCanvas = document.getElementById(
    "preview-canvas"
  ) as HTMLCanvasElement;

  if (scaleSlider) {
    scaleSlider.addEventListener("input", () => {
      const scale = parseFloat(scaleSlider.value);
      if (scale >= (image?.width || MAX_SIZE)) {
        scaleSlider.value = `${image?.width || MAX_SIZE}`;
        scaleValue.textContent = `${image?.width || MAX_SIZE}px`;
      } else if (scale >= (image?.height || MAX_SIZE)) {
        scaleSlider.value = `${image?.height || MAX_SIZE}`;
        scaleValue.textContent = `${image?.height || MAX_SIZE}px`;
      } else scaleValue.textContent = `${scale}px`;
      updateCanvasScale(previewCanvas, scale);
    });
  }
};
