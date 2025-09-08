import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';
import { useTerminalSounds } from '../sound/hooks';
import { 
  CodeEditorOptions, 
  CodeEditorState, 
  CursorPosition, 
  Selection, 
  SyntaxToken,
  ASCII_CODE_THEMES,
  DEFAULT_CODE_EDITOR_OPTIONS,
  CodeEditorTheme
} from './types';
import { getLanguageDefinition, getLanguageFromExtension } from './languages';

export interface AsciiCodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onCursorPositionChange?: (position: CursorPosition) => void;
  onSelectionChange?: (selection: Selection | null) => void;
  options?: Partial<CodeEditorOptions>;
  filename?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AsciiCodeEditor: React.FC<AsciiCodeEditorProps> = ({
  value = '',
  onChange,
  onCursorPositionChange,
  onSelectionChange,
  options = {},
  filename,
  placeholder = 'Start typing...',
  className = '',
  style = {}
}) => {
  const { theme: asciiTheme } = useAsciiTheme();
  const { playKeyPress, playEnter, playBackspace } = useTerminalSounds();
  
  // Merge options with defaults
  const editorOptions: CodeEditorOptions = { ...DEFAULT_CODE_EDITOR_OPTIONS, ...options };
  
  // Determine language from filename if not provided
  const detectedLanguage = filename ? getLanguageFromExtension(filename) : null;
  const currentLanguage = editorOptions.language || detectedLanguage || 'javascript';
  
  // Get theme
  const editorTheme: CodeEditorTheme = typeof editorOptions.theme === 'string' 
    ? ASCII_CODE_THEMES[editorOptions.theme] || ASCII_CODE_THEMES.green
    : editorOptions.theme || ASCII_CODE_THEMES.green;
  
  // State
  const [editorState, setEditorState] = useState<CodeEditorState>({
    content: value,
    cursorPosition: { line: 0, column: 0 },
    selection: null,
    scrollPosition: { x: 0, y: 0 },
    highlightedTokens: [],
    errors: [],
    warnings: []
  });
  
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Syntax highlighting
  const highlightSyntax = useCallback((text: string): SyntaxToken[] => {
    const languageDef = getLanguageDefinition(currentLanguage);
    if (!languageDef) return [];
    
    try {
      return languageDef.tokenizer(text);
    } catch (error) {
      console.error('Syntax highlighting error:', error);
      return [];
    }
  }, [currentLanguage]);
  
  // Update highlighted tokens when content changes
  useEffect(() => {
    const tokens = highlightSyntax(editorState.content);
    setEditorState(prev => ({ ...prev, highlightedTokens: tokens }));
  }, [editorState.content, highlightSyntax]);
  
  // Update content when value prop changes
  useEffect(() => {
    if (value !== editorState.content) {
      setEditorState(prev => ({ ...prev, content: value }));
    }
  }, [value, editorState.content]);
  
  // Handle text changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setEditorState(prev => ({ ...prev, content: newContent }));
    onChange?.(newContent);
  };
  
  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!editorOptions.soundEffects) return;
    
    if (e.key === 'Enter') {
      playEnter();
    } else if (e.key === 'Backspace') {
      playBackspace();
    } else if (e.key.length === 1) {
      playKeyPress();
    }
    
    // Handle tab insertion
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      const tabString = editorOptions.insertSpaces 
        ? ' '.repeat(editorOptions.tabSize || 2)
        : '\t';
      
      const newContent = editorState.content.slice(0, start) + tabString + editorState.content.slice(end);
      setEditorState(prev => ({ ...prev, content: newContent }));
      onChange?.(newContent);
      
      // Set cursor position after tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + tabString.length;
      }, 0);
    }
  };
  
  // Handle cursor position changes
  const handleSelectionChange = () => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Calculate line and column for cursor position
    const beforeCursor = editorState.content.slice(0, start);
    const lines = beforeCursor.split('\n');
    const cursorPosition: CursorPosition = {
      line: lines.length - 1,
      column: lines[lines.length - 1].length
    };
    
    setEditorState(prev => ({ ...prev, cursorPosition }));
    onCursorPositionChange?.(cursorPosition);
    
    // Handle selection
    if (start !== end) {
      const beforeEnd = editorState.content.slice(0, end);
      const endLines = beforeEnd.split('\n');
      const endPosition: CursorPosition = {
        line: endLines.length - 1,
        column: endLines[endLines.length - 1].length
      };
      
      const selection: Selection = {
        start: cursorPosition,
        end: endPosition
      };
      
      setEditorState(prev => ({ ...prev, selection }));
      onSelectionChange?.(selection);
    } else {
      setEditorState(prev => ({ ...prev, selection: null }));
      onSelectionChange?.(null);
    }
  };
  
  // Render syntax highlighted content
  const renderHighlightedContent = () => {
    const lines = editorState.content.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (line.length === 0) {
        return (
          <div key={lineIndex} style={{ minHeight: '1.4em' }}>
            <br />
          </div>
        );
      }
      
      // Get tokens for this line
      const lineTokens = editorState.highlightedTokens.filter(token => token.line === lineIndex);
      
      if (lineTokens.length === 0) {
        return (
          <div key={lineIndex}>
            {line}
          </div>
        );
      }
      
      // Render tokens
      let renderedContent: React.ReactNode[] = [];
      let lastEnd = 0;
      
      lineTokens.forEach((token, tokenIndex) => {
        // Add any text before this token
        if (token.column > lastEnd) {
          const beforeToken = line.slice(lastEnd, token.column);
          if (beforeToken) {
            renderedContent.push(
              <span key={`before-${tokenIndex}`}>{beforeToken}</span>
            );
          }
        }
        
        // Add the token with appropriate styling
        const tokenColor = editorTheme.colors[token.type] || editorTheme.colors.text;
        renderedContent.push(
          <span
            key={tokenIndex}
            style={{
              color: tokenColor,
              fontWeight: token.type === 'keyword' ? 'bold' : 'normal'
            }}
          >
            {token.value}
          </span>
        );
        
        lastEnd = token.column + token.value.length;
      });
      
      // Add any remaining text after last token
      if (lastEnd < line.length) {
        const afterLastToken = line.slice(lastEnd);
        renderedContent.push(
          <span key="after-last">{afterLastToken}</span>
        );
      }
      
      return (
        <div key={lineIndex}>
          {renderedContent}
        </div>
      );
    });
  };
  
  // Render line numbers
  const renderLineNumbers = () => {
    const lines = editorState.content.split('\n');
    const maxLineLength = lines.length.toString().length;
    
    return lines.map((_, index) => (
      <div
        key={index}
        style={{
          color: editorTheme.colors.lineNumber,
          textAlign: 'right',
          paddingRight: '8px',
          minWidth: `${maxLineLength + 1}ch`,
          userSelect: 'none'
        }}
      >
        {(index + 1).toString().padStart(maxLineLength, ' ')}
      </div>
    ));
  };
  
  const containerStyle = {
    fontFamily: editorTheme.styles.fontFamily,
    fontSize: editorOptions.fontSize || editorTheme.styles.fontSize,
    lineHeight: editorTheme.styles.lineHeight,
    backgroundColor: editorTheme.colors.background,
    color: editorTheme.colors.text,
    border: `1px solid ${isFocused ? asciiTheme.colors.primary : asciiTheme.colors.border}`,
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative' as const,
    ...style
  };
  
  const editorStyle = {
    display: 'flex',
    minHeight: '200px',
    height: '100%'
  };
  
  const gutterStyle = {
    backgroundColor: editorTheme.colors.gutter,
    padding: '8px 4px',
    fontSize: editorTheme.styles.fontSize,
    lineHeight: editorTheme.styles.lineHeight
  };
  
  const contentStyle = {
    flex: 1,
    position: 'relative' as const,
    overflow: 'auto'
  };
  
  const textareaStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: '8px',
    margin: 0,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'transparent',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    resize: 'none' as const,
    caretColor: editorTheme.colors.cursor,
    whiteSpace: 'pre' as const,
    overflowWrap: 'normal' as const,
    tabSize: editorOptions.tabSize || 2
  };
  
  const highlightStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: '8px',
    margin: 0,
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    whiteSpace: 'pre' as const,
    overflowWrap: 'normal' as const,
    pointerEvents: 'none' as const,
    zIndex: 1
  };
  
  return (
    <div 
      ref={containerRef}
      className={`ascii-code-editor ${className}`}
      style={containerStyle}
    >
      {/* Header with filename and language */}
      {(filename || currentLanguage) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4px 8px',
          backgroundColor: editorTheme.colors.gutter,
          borderBottom: `1px solid ${asciiTheme.colors.border}`,
          fontSize: '0.9em'
        }}>
          <span style={{ color: editorTheme.colors.text }}>
            {filename || 'Untitled'}
          </span>
          <span style={{ color: editorTheme.colors.lineNumber }}>
            {currentLanguage.toUpperCase()}
          </span>
        </div>
      )}
      
      <div style={editorStyle}>
        {/* Line numbers */}
        {editorOptions.lineNumbers && (
          <div style={gutterStyle}>
            {renderLineNumbers()}
          </div>
        )}
        
        {/* Code content */}
        <div style={contentStyle}>
          {/* Syntax highlighting overlay */}
          <div style={highlightStyle}>
            {renderHighlightedContent()}
          </div>
          
          {/* Text input */}
          <textarea
            ref={textareaRef}
            value={editorState.content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onSelect={handleSelectionChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            readOnly={editorOptions.readOnly}
            style={textareaStyle}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>
      
      {/* Status bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 8px',
        backgroundColor: editorTheme.colors.gutter,
        borderTop: `1px solid ${asciiTheme.colors.border}`,
        fontSize: '0.8em'
      }}>
        <span style={{ color: editorTheme.colors.lineNumber }}>
          Ln {editorState.cursorPosition.line + 1}, Col {editorState.cursorPosition.column + 1}
        </span>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {editorState.content.length > 0 && (
            <span style={{ color: editorTheme.colors.lineNumber }}>
              {editorState.content.length} chars
            </span>
          )}
          
          {editorState.selection && (
            <span style={{ color: editorTheme.colors.info }}>
              Selection: {Math.abs(
                (editorState.selection.end.line - editorState.selection.start.line) + 
                (editorState.selection.end.column - editorState.selection.start.column)
              )}
            </span>
          )}
          
          <span style={{ color: editorTheme.colors.lineNumber }}>
            {editorOptions.insertSpaces ? 'Spaces' : 'Tabs'}: {editorOptions.tabSize}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AsciiCodeEditor;