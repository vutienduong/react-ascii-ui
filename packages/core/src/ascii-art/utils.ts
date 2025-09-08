import { AsciiArtOptions, AsciiArtResult, ImageData, ASCII_CHARACTER_SETS } from './types';

/**
 * Load an image from a URL or File and return ImageData
 */
export const loadImageData = async (source: string | File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      
      resolve({
        data: imageData.data,
        width: img.width,
        height: img.height
      });
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    
    if (typeof source === 'string') {
      img.src = source;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(source);
    }
  });
};

/**
 * Calculate brightness of a pixel (0-255)
 */
export const calculateBrightness = (r: number, g: number, b: number, a: number = 255): number => {
  // Account for transparency
  const alpha = a / 255;
  // Use luminance formula for more accurate brightness
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) * alpha;
  return Math.round(luminance);
};

/**
 * Resize image data to target dimensions
 */
export const resizeImageData = (
  imageData: ImageData, 
  targetWidth: number, 
  targetHeight: number,
  preserveAspectRatio = true
): ImageData => {
  const { data, width, height } = imageData;
  
  // Calculate actual dimensions preserving aspect ratio
  let actualWidth = targetWidth;
  let actualHeight = targetHeight;
  
  if (preserveAspectRatio) {
    const aspectRatio = width / height;
    if (targetWidth / targetHeight > aspectRatio) {
      actualWidth = Math.round(targetHeight * aspectRatio);
    } else {
      actualHeight = Math.round(targetWidth / aspectRatio);
    }
  }
  
  const newData = new Uint8ClampedArray(actualWidth * actualHeight * 4);
  
  for (let y = 0; y < actualHeight; y++) {
    for (let x = 0; x < actualWidth; x++) {
      // Calculate source pixel position
      const srcX = Math.floor((x / actualWidth) * width);
      const srcY = Math.floor((y / actualHeight) * height);
      
      const srcIndex = (srcY * width + srcX) * 4;
      const destIndex = (y * actualWidth + x) * 4;
      
      // Copy pixel data
      newData[destIndex] = data[srcIndex];     // R
      newData[destIndex + 1] = data[srcIndex + 1]; // G
      newData[destIndex + 2] = data[srcIndex + 2]; // B
      newData[destIndex + 3] = data[srcIndex + 3]; // A
    }
  }
  
  return {
    data: newData,
    width: actualWidth,
    height: actualHeight
  };
};

/**
 * Apply brightness and contrast adjustments
 */
export const adjustImageData = (
  imageData: ImageData,
  brightness = 0,
  contrast = 1
): ImageData => {
  const { data, width, height } = imageData;
  const adjustedData = new Uint8ClampedArray(data);
  
  const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
  
  for (let i = 0; i < adjustedData.length; i += 4) {
    // Apply contrast first, then brightness
    adjustedData[i] = Math.max(0, Math.min(255, factor * (adjustedData[i] - 128) + 128 + brightness));
    adjustedData[i + 1] = Math.max(0, Math.min(255, factor * (adjustedData[i + 1] - 128) + 128 + brightness));
    adjustedData[i + 2] = Math.max(0, Math.min(255, factor * (adjustedData[i + 2] - 128) + 128 + brightness));
    // Alpha remains unchanged
  }
  
  return { data: adjustedData, width, height };
};

/**
 * Convert brightness value to ASCII character
 */
export const brightnessToCharacter = (brightness: number, characters: string, invert = false): string => {
  const normalizedBrightness = brightness / 255;
  const adjustedBrightness = invert ? 1 - normalizedBrightness : normalizedBrightness;
  
  const charIndex = Math.floor(adjustedBrightness * (characters.length - 1));
  return characters[Math.max(0, Math.min(characters.length - 1, charIndex))];
};

/**
 * Convert ImageData to ASCII art
 */
export const imageDataToAscii = (
  imageData: ImageData,
  options: AsciiArtOptions = {}
): AsciiArtResult => {
  const startTime = performance.now();
  
  const {
    width: targetWidth = 80,
    height: targetHeight = 40,
    style = 'detailed',
    characters: customCharacters,
    invert = false,
    contrast = 1,
    brightness = 0,
    preserveAspectRatio = true
  } = options;
  
  // Get character set
  const characterSet = customCharacters || ASCII_CHARACTER_SETS[style]?.characters || ASCII_CHARACTER_SETS.detailed.characters;
  
  // Resize image to target dimensions
  let processedImageData = resizeImageData(imageData, targetWidth, targetHeight, preserveAspectRatio);
  
  // Apply brightness and contrast adjustments
  if (brightness !== 0 || contrast !== 1) {
    processedImageData = adjustImageData(processedImageData, brightness, contrast);
  }
  
  const { data, width, height } = processedImageData;
  let ascii = '';
  
  // Convert each pixel to ASCII
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      
      const pixelBrightness = calculateBrightness(r, g, b, a);
      const char = brightnessToCharacter(pixelBrightness, characterSet, invert);
      line += char;
    }
    ascii += line + (y < height - 1 ? '\n' : '');
  }
  
  const processingTime = performance.now() - startTime;
  
  return {
    ascii,
    width,
    height,
    originalImage: {
      width: imageData.width,
      height: imageData.height
    },
    processingTime
  };
};

/**
 * Convert image source to ASCII art (main function)
 */
export const convertToAsciiArt = async (
  source: string | File,
  options: AsciiArtOptions = {}
): Promise<AsciiArtResult> => {
  const imageData = await loadImageData(source);
  return imageDataToAscii(imageData, options);
};

/**
 * Advanced ASCII art with dithering
 */
export const convertToAsciiArtWithDithering = async (
  source: string | File,
  options: AsciiArtOptions = {}
): Promise<AsciiArtResult> => {
  const imageData = await loadImageData(source);
  
  // Apply Floyd-Steinberg dithering for better quality
  const ditheredImageData = applyFloydSteinbergDithering(imageData);
  
  return imageDataToAscii(ditheredImageData, options);
};

/**
 * Apply Floyd-Steinberg dithering to image data
 */
export const applyFloydSteinbergDithering = (imageData: ImageData): ImageData => {
  const { data, width, height } = imageData;
  const newData = new Uint8ClampedArray(data);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      
      // Convert to grayscale
      const gray = Math.round(0.299 * newData[index] + 0.587 * newData[index + 1] + 0.114 * newData[index + 2]);
      const newGray = gray < 128 ? 0 : 255;
      const error = gray - newGray;
      
      // Apply new value
      newData[index] = newGray;
      newData[index + 1] = newGray;
      newData[index + 2] = newGray;
      
      // Distribute error to neighboring pixels
      const distributeError = (dx: number, dy: number, factor: number) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIndex = (ny * width + nx) * 4;
          const errorAmount = error * factor;
          newData[nIndex] = Math.max(0, Math.min(255, newData[nIndex] + errorAmount));
          newData[nIndex + 1] = Math.max(0, Math.min(255, newData[nIndex + 1] + errorAmount));
          newData[nIndex + 2] = Math.max(0, Math.min(255, newData[nIndex + 2] + errorAmount));
        }
      };
      
      // Floyd-Steinberg error distribution
      distributeError(1, 0, 7/16);
      distributeError(-1, 1, 3/16);
      distributeError(0, 1, 5/16);
      distributeError(1, 1, 1/16);
    }
  }
  
  return { data: newData, width, height };
};

/**
 * Generate ASCII art from webcam stream
 */
export const captureWebcamFrame = async (
  video: HTMLVideoElement,
  options: AsciiArtOptions = {}
): Promise<AsciiArtResult> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  ctx.drawImage(video, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  return imageDataToAscii({
    data: imageData.data,
    width: canvas.width,
    height: canvas.height
  }, options);
};