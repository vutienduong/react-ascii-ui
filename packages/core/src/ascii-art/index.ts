// ASCII Art system exports
export * from './types';
export * from './utils';
export * from './AsciiArtGenerator';
export * from './hooks';

// Re-export commonly used items for convenience
export {
  AsciiArtGenerator,
  useAsciiArt,
  useWebcamAsciiArt,
  useBatchAsciiArt,
  useRealTimeAsciiArt
} from './AsciiArtGenerator';

export {
  convertToAsciiArt,
  convertToAsciiArtWithDithering,
  loadImageData,
  imageDataToAscii
} from './utils';

export {
  ASCII_CHARACTER_SETS,
  DEFAULT_ASCII_CONFIG
} from './types';