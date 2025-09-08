// Code Editor system exports
export * from './types';
export * from './languages';
export * from './AsciiCodeEditor';
export * from './hooks';

// Re-export commonly used items for convenience
export {
  AsciiCodeEditor,
  useCodeEditor,
  useCodeTabs
} from './AsciiCodeEditor';

export {
  LANGUAGE_DEFINITIONS,
  getLanguageFromExtension,
  getLanguageDefinition
} from './languages';

export {
  ASCII_CODE_THEMES,
  DEFAULT_CODE_EDITOR_OPTIONS
} from './types';