export interface AsciiArtOptions {
  width?: number;
  height?: number;
  characters?: string;
  style?: 'detailed' | 'simple' | 'blocks' | 'dots' | 'custom';
  invert?: boolean;
  contrast?: number;
  brightness?: number;
  preserveAspectRatio?: boolean;
}

export interface AsciiArtResult {
  ascii: string;
  width: number;
  height: number;
  originalImage: {
    width: number;
    height: number;
  };
  processingTime: number;
}

export interface ImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export interface AsciiCharacterSet {
  name: string;
  characters: string;
  description: string;
}

// Predefined character sets for different styles
export const ASCII_CHARACTER_SETS: Record<string, AsciiCharacterSet> = {
  detailed: {
    name: 'Detailed',
    characters: '@%#*+=-:. ',
    description: 'High detail with many brightness levels'
  },
  simple: {
    name: 'Simple',
    characters: '█▓▒░ ',
    description: 'Block characters for simple output'
  },
  blocks: {
    name: 'Blocks',
    characters: '██▓▒░  ',
    description: 'Unicode block characters'
  },
  dots: {
    name: 'Dots',
    characters: '●◐◑◒○ ',
    description: 'Circular dot patterns'
  },
  classic: {
    name: 'Classic',
    characters: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`\'. ',
    description: 'Traditional ASCII art character set'
  },
  minimal: {
    name: 'Minimal',
    characters: '█░ ',
    description: 'Minimal two-tone output'
  }
};

export interface AsciiArtConfig {
  maxWidth: number;
  maxHeight: number;
  defaultCharacterSet: keyof typeof ASCII_CHARACTER_SETS;
  enableWebGL: boolean;
  cacheEnabled: boolean;
}

export const DEFAULT_ASCII_CONFIG: AsciiArtConfig = {
  maxWidth: 200,
  maxHeight: 100,
  defaultCharacterSet: 'detailed',
  enableWebGL: false,
  cacheEnabled: true
};