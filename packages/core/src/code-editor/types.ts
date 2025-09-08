export interface CodeEditorTheme {
  name: string;
  colors: {
    background: string;
    text: string;
    selection: string;
    cursor: string;
    lineNumber: string;
    gutter: string;
    keyword: string;
    string: string;
    number: string;
    comment: string;
    operator: string;
    function: string;
    variable: string;
    type: string;
    constant: string;
    punctuation: string;
    whitespace: string;
    identifier: string;
    unknown: string;
    error: string;
    warning: string;
    info: string;
  };
  styles: {
    fontFamily: string;
    fontSize: string;
    lineHeight: number;
    tabSize: number;
  };
}

export interface SyntaxToken {
  type: TokenType;
  value: string;
  start: number;
  end: number;
  line: number;
  column: number;
}

export type TokenType =
  | 'keyword'
  | 'string' 
  | 'number'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'function'
  | 'variable'
  | 'type'
  | 'constant'
  | 'whitespace'
  | 'identifier'
  | 'unknown';

export interface LanguageDefinition {
  name: string;
  extensions: string[];
  keywords: string[];
  operators: string[];
  punctuation: string[];
  stringDelimiters: string[];
  commentDelimiters: {
    line: string[];
    block: Array<{ start: string; end: string }>;
  };
  brackets: Array<{ open: string; close: string }>;
  caseInsensitive?: boolean;
  tokenizer: (text: string) => SyntaxToken[];
}

export interface CodeEditorOptions {
  language?: string;
  theme?: string | CodeEditorTheme;
  readOnly?: boolean;
  lineNumbers?: boolean;
  wordWrap?: boolean;
  tabSize?: number;
  insertSpaces?: boolean;
  fontSize?: string;
  minimap?: boolean;
  autoIndent?: boolean;
  bracketMatching?: boolean;
  foldingEnabled?: boolean;
  searchEnabled?: boolean;
  autoComplete?: boolean;
  linting?: boolean;
  soundEffects?: boolean;
}

export interface CodeEditorState {
  content: string;
  cursorPosition: CursorPosition;
  selection: Selection | null;
  scrollPosition: { x: number; y: number };
  highlightedTokens: SyntaxToken[];
  errors: DiagnosticMessage[];
  warnings: DiagnosticMessage[];
}

export interface CursorPosition {
  line: number;
  column: number;
}

export interface Selection {
  start: CursorPosition;
  end: CursorPosition;
}

export interface DiagnosticMessage {
  message: string;
  severity: 'error' | 'warning' | 'info';
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
}

export interface AutoCompleteItem {
  label: string;
  kind: 'keyword' | 'function' | 'variable' | 'type' | 'constant' | 'snippet';
  detail?: string;
  documentation?: string;
  insertText?: string;
  sortText?: string;
}

export interface CodeAction {
  title: string;
  kind: 'quickfix' | 'refactor' | 'format';
  isPreferred?: boolean;
  action: () => void;
}

// Built-in ASCII-style themes
export const ASCII_CODE_THEMES: Record<string, CodeEditorTheme> = {
  green: {
    name: 'ASCII Green',
    colors: {
      background: '#000000',
      text: '#00ff00',
      selection: '#003300',
      cursor: '#00ff00',
      lineNumber: '#006600',
      gutter: '#001100',
      keyword: '#00ffff',
      string: '#ffff00',
      number: '#ff6600',
      comment: '#666666',
      operator: '#ff00ff',
      function: '#00ff99',
      variable: '#99ff00',
      type: '#0099ff',
      constant: '#ff9900',
      punctuation: '#cccccc',
      whitespace: '#333333',
      identifier: '#00ff00',
      unknown: '#888888',
      error: '#ff0000',
      warning: '#ffaa00',
      info: '#0088ff'
    },
    styles: {
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: 1.4,
      tabSize: 2
    }
  },
  amber: {
    name: 'ASCII Amber',
    colors: {
      background: '#000000',
      text: '#ffb000',
      selection: '#332200',
      cursor: '#ffb000',
      lineNumber: '#cc8800',
      gutter: '#221100',
      keyword: '#ffff00',
      string: '#88ff00',
      number: '#ff6600',
      comment: '#888888',
      operator: '#ff8800',
      function: '#ffcc00',
      variable: '#ccaa00',
      type: '#aaaa00',
      constant: '#ffaa00',
      punctuation: '#cccccc',
      whitespace: '#444444',
      identifier: '#ffb000',
      unknown: '#999999',
      error: '#ff0000',
      warning: '#ffaa00',
      info: '#0088ff'
    },
    styles: {
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: 1.4,
      tabSize: 2
    }
  },
  cyan: {
    name: 'ASCII Cyan',
    colors: {
      background: '#000000',
      text: '#00ffff',
      selection: '#003333',
      cursor: '#00ffff',
      lineNumber: '#006666',
      gutter: '#001111',
      keyword: '#ffff00',
      string: '#ff00ff',
      number: '#ff6600',
      comment: '#666666',
      operator: '#00ff00',
      function: '#66ffff',
      variable: '#99ccff',
      type: '#0099cc',
      constant: '#ffcc00',
      punctuation: '#cccccc',
      whitespace: '#444444',
      identifier: '#00ffff',
      unknown: '#aaaaaa',
      error: '#ff0000',
      warning: '#ffaa00',
      info: '#0088ff'
    },
    styles: {
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: 1.4,
      tabSize: 2
    }
  },
  classic: {
    name: 'ASCII Classic',
    colors: {
      background: '#0c1021',
      text: '#f8f8f2',
      selection: '#44475a',
      cursor: '#f8f8f0',
      lineNumber: '#6272a4',
      gutter: '#191a21',
      keyword: '#ff79c6',
      string: '#f1fa8c',
      number: '#bd93f9',
      comment: '#6272a4',
      operator: '#ff79c6',
      function: '#50fa7b',
      variable: '#f8f8f2',
      type: '#8be9fd',
      constant: '#bd93f9',
      punctuation: '#f8f8f2',
      whitespace: '#44475a',
      identifier: '#f8f8f2',
      unknown: '#6272a4',
      error: '#ff5555',
      warning: '#ffb86c',
      info: '#8be9fd'
    },
    styles: {
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: 1.4,
      tabSize: 2
    }
  }
};

export const DEFAULT_CODE_EDITOR_OPTIONS: CodeEditorOptions = {
  language: 'javascript',
  theme: 'green',
  readOnly: false,
  lineNumbers: true,
  wordWrap: false,
  tabSize: 2,
  insertSpaces: true,
  fontSize: '14px',
  minimap: false,
  autoIndent: true,
  bracketMatching: true,
  foldingEnabled: true,
  searchEnabled: true,
  autoComplete: true,
  linting: false,
  soundEffects: true
};