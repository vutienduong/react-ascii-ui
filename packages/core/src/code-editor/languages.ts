import { LanguageDefinition, SyntaxToken, TokenType } from './types';

/**
 * Simple tokenizer that identifies different types of tokens in code
 */
export const createTokenizer = (language: LanguageDefinition) => {
  return (text: string): SyntaxToken[] => {
    const tokens: SyntaxToken[] = [];
    const lines = text.split('\n');
    
    let globalOffset = 0;
    
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      let i = 0;
      
      while (i < line.length) {
        const char = line[i];
        const remaining = line.slice(i);
        
        // Skip whitespace but track it
        if (/\s/.test(char)) {
          const start = i;
          while (i < line.length && /\s/.test(line[i])) {
            i++;
          }
          tokens.push({
            type: 'whitespace',
            value: line.slice(start, i),
            start: globalOffset + start,
            end: globalOffset + i,
            line: lineIndex,
            column: start
          });
          continue;
        }
        
        // Check for line comments
        let foundComment = false;
        for (const commentStart of language.commentDelimiters.line) {
          if (remaining.startsWith(commentStart)) {
            tokens.push({
              type: 'comment',
              value: line.slice(i),
              start: globalOffset + i,
              end: globalOffset + line.length,
              line: lineIndex,
              column: i
            });
            i = line.length;
            foundComment = true;
            break;
          }
        }
        if (foundComment) continue;
        
        // Check for block comments
        let foundBlockComment = false;
        for (const { start: blockStart, end: blockEnd } of language.commentDelimiters.block) {
          if (remaining.startsWith(blockStart)) {
            const commentStart = i;
            i += blockStart.length;
            let commentContent = blockStart;
            
            // Find end of block comment (can span multiple lines)
            let found = false;
            while (lineIndex < lines.length && !found) {
              while (i < lines[lineIndex].length) {
                commentContent += lines[lineIndex][i];
                if (commentContent.endsWith(blockEnd)) {
                  found = true;
                  i++;
                  break;
                }
                i++;
              }
              if (!found && lineIndex < lines.length - 1) {
                lineIndex++;
                globalOffset += lines[lineIndex - 1].length + 1; // +1 for newline
                i = 0;
                commentContent += '\n';
              }
            }
            
            tokens.push({
              type: 'comment',
              value: commentContent,
              start: globalOffset + commentStart,
              end: globalOffset + i,
              line: lineIndex,
              column: commentStart
            });
            foundBlockComment = true;
            break;
          }
        }
        if (foundBlockComment) continue;
        
        // Check for string literals
        let foundString = false;
        for (const delimiter of language.stringDelimiters) {
          if (char === delimiter) {
            const start = i;
            i++; // Skip opening quote
            let stringContent = delimiter;
            let escaped = false;
            
            while (i < line.length) {
              const currentChar = line[i];
              stringContent += currentChar;
              
              if (escaped) {
                escaped = false;
              } else if (currentChar === '\\') {
                escaped = true;
              } else if (currentChar === delimiter) {
                i++;
                break;
              }
              i++;
            }
            
            tokens.push({
              type: 'string',
              value: stringContent,
              start: globalOffset + start,
              end: globalOffset + i,
              line: lineIndex,
              column: start
            });
            foundString = true;
            break;
          }
        }
        if (foundString) continue;
        
        // Check for numbers
        if (/\d/.test(char) || (char === '.' && /\d/.test(line[i + 1]))) {
          const start = i;
          let numberStr = '';
          
          // Handle decimal numbers
          while (i < line.length && (/[\d.]/.test(line[i]) || 
                 (line[i] === 'e' || line[i] === 'E') ||
                 (numberStr.includes('e') && (line[i] === '+' || line[i] === '-')))) {
            numberStr += line[i];
            i++;
          }
          
          tokens.push({
            type: 'number',
            value: numberStr,
            start: globalOffset + start,
            end: globalOffset + i,
            line: lineIndex,
            column: start
          });
          continue;
        }
        
        // Check for operators
        let foundOperator = false;
        // Sort by length (longer first) to match multi-character operators
        const sortedOperators = [...language.operators].sort((a, b) => b.length - a.length);
        for (const operator of sortedOperators) {
          if (remaining.startsWith(operator)) {
            tokens.push({
              type: 'operator',
              value: operator,
              start: globalOffset + i,
              end: globalOffset + i + operator.length,
              line: lineIndex,
              column: i
            });
            i += operator.length;
            foundOperator = true;
            break;
          }
        }
        if (foundOperator) continue;
        
        // Check for punctuation
        let foundPunctuation = false;
        const sortedPunctuation = [...language.punctuation].sort((a, b) => b.length - a.length);
        for (const punct of sortedPunctuation) {
          if (remaining.startsWith(punct)) {
            tokens.push({
              type: 'punctuation',
              value: punct,
              start: globalOffset + i,
              end: globalOffset + i + punct.length,
              line: lineIndex,
              column: i
            });
            i += punct.length;
            foundPunctuation = true;
            break;
          }
        }
        if (foundPunctuation) continue;
        
        // Check for identifiers (keywords, functions, variables)
        if (/[a-zA-Z_$]/.test(char)) {
          const start = i;
          let identifier = '';
          
          while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) {
            identifier += line[i];
            i++;
          }
          
          // Determine token type
          let tokenType: TokenType = 'identifier';
          const lowerIdentifier = language.caseInsensitive ? identifier.toLowerCase() : identifier;
          
          if (language.keywords.some(k => language.caseInsensitive ? k.toLowerCase() === lowerIdentifier : k === identifier)) {
            tokenType = 'keyword';
          } else if (/^[A-Z_][A-Z0-9_]*$/.test(identifier)) {
            tokenType = 'constant';
          } else if (/^[A-Z]/.test(identifier)) {
            tokenType = 'type';
          } else {
            // Check if it's followed by parentheses (likely a function)
            let j = i;
            while (j < line.length && /\s/.test(line[j])) j++;
            if (j < line.length && line[j] === '(') {
              tokenType = 'function';
            } else {
              tokenType = 'variable';
            }
          }
          
          tokens.push({
            type: tokenType,
            value: identifier,
            start: globalOffset + start,
            end: globalOffset + i,
            line: lineIndex,
            column: start
          });
          continue;
        }
        
        // Unknown character
        tokens.push({
          type: 'unknown',
          value: char,
          start: globalOffset + i,
          end: globalOffset + i + 1,
          line: lineIndex,
          column: i
        });
        i++;
      }
      
      globalOffset += line.length + 1; // +1 for newline
    }
    
    return tokens;
  };
};

// Language definitions
export const LANGUAGE_DEFINITIONS: Record<string, LanguageDefinition> = {
  javascript: {
    name: 'JavaScript',
    extensions: ['.js', '.jsx', '.mjs'],
    keywords: [
      'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch',
      'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
      'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final',
      'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import',
      'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
      'null', 'package', 'private', 'protected', 'public', 'return', 'short',
      'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
      'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while',
      'with', 'yield', 'async'
    ],
    operators: [
      '===', '!==', '==', '!=', '<=', '>=', '<', '>', '&&', '||', '++', '--',
      '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=', '>>>',
      '=>', '...', '??', '?.', '+', '-', '*', '/', '%', '&', '|', '^', '~',
      '<<', '>>', '!', '?', ':', '='
    ],
    punctuation: ['{', '}', '[', ']', '(', ')', ';', ',', '.'],
    stringDelimiters: ['"', "'", '`'],
    commentDelimiters: {
      line: ['//'],
      block: [{ start: '/*', end: '*/' }]
    },
    brackets: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' }
    ],
    tokenizer: createTokenizer
  } as any,
  
  typescript: {
    name: 'TypeScript',
    extensions: ['.ts', '.tsx'],
    keywords: [
      'abstract', 'any', 'as', 'asserts', 'boolean', 'break', 'case', 'catch',
      'class', 'const', 'constructor', 'continue', 'debugger', 'declare', 'default',
      'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally',
      'for', 'from', 'function', 'get', 'if', 'implements', 'import', 'in',
      'infer', 'instanceof', 'interface', 'is', 'keyof', 'let', 'module', 'namespace',
      'never', 'new', 'null', 'number', 'object', 'of', 'package', 'private',
      'protected', 'public', 'readonly', 'require', 'return', 'set', 'static',
      'string', 'super', 'switch', 'symbol', 'this', 'throw', 'true', 'try',
      'type', 'typeof', 'undefined', 'unique', 'unknown', 'var', 'void', 'while',
      'with', 'yield', 'async', 'await'
    ],
    operators: [
      '===', '!==', '==', '!=', '<=', '>=', '<', '>', '&&', '||', '++', '--',
      '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=', '>>>',
      '=>', '...', '??', '?.', '+', '-', '*', '/', '%', '&', '|', '^', '~',
      '<<', '>>', '!', '?', ':', '='
    ],
    punctuation: ['{', '}', '[', ']', '(', ')', ';', ',', '.', '<', '>'],
    stringDelimiters: ['"', "'", '`'],
    commentDelimiters: {
      line: ['//'],
      block: [{ start: '/*', end: '*/' }]
    },
    brackets: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '<', close: '>' }
    ],
    tokenizer: createTokenizer
  } as any,
  
  python: {
    name: 'Python',
    extensions: ['.py', '.pyw'],
    keywords: [
      'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif',
      'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import',
      'in', 'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return',
      'try', 'while', 'with', 'yield', 'async', 'await', 'nonlocal', 'True',
      'False', 'None'
    ],
    operators: [
      '==', '!=', '<=', '>=', '<', '>', '+=', '-=', '*=', '/=', '//=', '%=',
      '&=', '|=', '^=', '<<=', '>>=', '**=', '**', '//', '<<', '>>', '&', '|',
      '^', '~', '+', '-', '*', '/', '%', '=', '!', '?', ':'
    ],
    punctuation: ['{', '}', '[', ']', '(', ')', ';', ',', '.', ':'],
    stringDelimiters: ['"', "'"],
    commentDelimiters: {
      line: ['#'],
      block: [{ start: '"""', end: '"""' }, { start: "'''", end: "'''" }]
    },
    brackets: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' }
    ],
    tokenizer: createTokenizer
  } as any,
  
  css: {
    name: 'CSS',
    extensions: ['.css'],
    keywords: [
      'all', 'auto', 'both', 'bottom', 'break', 'center', 'default', 'hidden',
      'inherit', 'initial', 'left', 'none', 'normal', 'right', 'solid', 'top',
      'transparent', 'unset'
    ],
    operators: [':', ';', ',', '>', '+', '~', '*'],
    punctuation: ['{', '}', '[', ']', '(', ')', ';', ',', ':'],
    stringDelimiters: ['"', "'"],
    commentDelimiters: {
      line: [],
      block: [{ start: '/*', end: '*/' }]
    },
    brackets: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' }
    ],
    tokenizer: createTokenizer
  } as any,
  
  html: {
    name: 'HTML',
    extensions: ['.html', '.htm'],
    keywords: [
      'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
      'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
      'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del',
      'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset',
      'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5',
      'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input',
      'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark',
      'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option',
      'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt',
      'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source',
      'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table',
      'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time',
      'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'
    ],
    operators: ['='],
    punctuation: ['<', '>', '/', '!', '"', "'"],
    stringDelimiters: ['"', "'"],
    commentDelimiters: {
      line: [],
      block: [{ start: '<!--', end: '-->' }]
    },
    brackets: [
      { open: '<', close: '>' }
    ],
    tokenizer: createTokenizer
  } as any,
  
  json: {
    name: 'JSON',
    extensions: ['.json'],
    keywords: ['true', 'false', 'null'],
    operators: [],
    punctuation: ['{', '}', '[', ']', ':', ','],
    stringDelimiters: ['"'],
    commentDelimiters: {
      line: [],
      block: []
    },
    brackets: [
      { open: '{', close: '}' },
      { open: '[', close: ']' }
    ],
    tokenizer: createTokenizer
  } as any
};

// Add the tokenizer function to each language definition
Object.values(LANGUAGE_DEFINITIONS).forEach(lang => {
  lang.tokenizer = createTokenizer(lang);
});

export const getLanguageFromExtension = (filename: string): string | null => {
  const extension = filename.toLowerCase().match(/\.[^.]*$/)?.[0];
  if (!extension) return null;
  
  for (const [langName, lang] of Object.entries(LANGUAGE_DEFINITIONS)) {
    if (lang.extensions.includes(extension)) {
      return langName;
    }
  }
  
  return null;
};

export const getLanguageDefinition = (language: string): LanguageDefinition | null => {
  return LANGUAGE_DEFINITIONS[language] || null;
};