// Define the color mappings with RGB values
const colorMapping = {
  a: [128, 128, 128], // Gray
  b: [0, 0, 255], // Blue
  c: [0, 255, 0], // Green
  d: [255, 0, 0], // Red
  e: [255, 255, 0], // Yellow
  f: [255, 192, 203], // Pink
  g: [0, 255, 255], // Cyan
  h: [128, 0, 128], // Purple
  i: [255, 165, 0], // Orange
  j: [0, 0, 0], // Black
};

// Helper function to calculate Euclidean distance between two RGB colors
const getColorDistance = (rgb1: number[], rgb2: number[]) => {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) + // Red difference
      Math.pow(rgb1[1] - rgb2[1], 2) + // Green difference
      Math.pow(rgb1[2] - rgb2[2], 2) // Blue difference
  );
};

// Function to map RGB values to corresponding ASCII character based on color distance
const mapColor = (r: number, g: number, b: number) => {
  // Check for pure white
  if (r >= 245 && g >= 245 && b >= 245) return "-";

  let closestColor = "a";
  let minDistance = Infinity;

  // Compare the pixel's RGB values to all the defined color mappings
  for (const [char, rgbValues] of Object.entries(colorMapping)) {
    const distance = getColorDistance([r, g, b], rgbValues);

    // Find the color with the minimum distance
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = char;
    }
  }
  return closestColor;
};

function resizeImage(image: HTMLImageElement): HTMLCanvasElement {
  const maxSize = 250;

  const originalWidth = image.width;
  const originalHeight = image.height;

  const scaleFactor = Math.min(
    maxSize / originalWidth,
    maxSize / originalHeight
  );

  const newWidth = Math.floor(originalWidth * scaleFactor);
  const newHeight = Math.floor(originalHeight * scaleFactor);

  const canvas = document.getElementById("image-canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d")!;

  // Ensure the canvas is cleared before drawing the new image
  canvas.width = maxSize;
  canvas.height = maxSize;

  // Fill the canvas with a white background to handle any empty space
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, maxSize, maxSize);

  // Calculate the offsets to center the image on the canvas
  const offsetX = Math.floor((maxSize - newWidth) / 2);
  const offsetY = Math.floor((maxSize - newHeight) / 2);

  // Draw the resized image at the centered position
  context.drawImage(image, offsetX, offsetY, newWidth, newHeight);

  return canvas;
}

const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement)?.files;
  if (!files) return;
  const file = files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      processImage(img);
    };
    img.src = e.target!.result as string;
  };
  reader.readAsDataURL(file);
};

// Function to read and process the image
async function processImage(image: HTMLImageElement) {
  try {
    // Resize the image to fit within 250x250 while preserving aspect ratio
    const resizedCanvas = resizeImage(image);
    const context = resizedCanvas.getContext("2d")!;

    // Extract pixel data from the resized canvas
    const width = resizedCanvas.width;
    const height = resizedCanvas.height;
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    // Generate the ASCII grid
    let outputGrid = "";
    for (let y = 0; y < height; y++) {
      let line = "";
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4; // Get the starting index of RGBA for this pixel
        const r = pixels[index]; // Red
        const g = pixels[index + 1]; // Green
        const b = pixels[index + 2]; // Blue

        // Map color using the refined distance-based approach
        line += mapColor(r, g, b);
      }
      console.log(`Line ${y + 1}: ${line}`);
      outputGrid += line + "\n";
    }

    // Display the ASCII art in the output div
    document.getElementById("ascii-output")!.textContent = outputGrid;
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

export const setup = () => {
  // Add event listener for file input
  document
    .getElementById("file-input")
    ?.addEventListener("change", handleFileUpload);
  document
    .getElementById("copy-button")
    ?.addEventListener("click", copyToClipboard);
};
