import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  CodeEditorState, 
  CursorPosition, 
  Selection, 
  AutoCompleteItem,
  DiagnosticMessage,
  CodeAction 
} from './types';
import { getLanguageDefinition } from './languages';

export interface UseCodeEditorState {
  content: string;
  cursorPosition: CursorPosition;
  selection: Selection | null;
  isModified: boolean;
  canUndo: boolean;
  canRedo: boolean;
  autoCompleteItems: AutoCompleteItem[];
  diagnostics: DiagnosticMessage[];
  availableActions: CodeAction[];
}

export interface UseCodeEditorActions {
  setContent: (content: string) => void;
  insertText: (text: string, position?: CursorPosition) => void;
  replaceSelection: (text: string) => void;
  selectAll: () => void;
  selectLine: (lineNumber: number) => void;
  selectWord: (position: CursorPosition) => void;
  undo: () => void;
  redo: () => void;
  format: () => void;
  commentToggle: () => void;
  duplicateLine: () => void;
  deleteLine: () => void;
  moveLinesUp: () => void;
  moveLinesDown: () => void;
  indentSelection: () => void;
  outdentSelection: () => void;
  findText: (query: string, options?: { caseSensitive?: boolean; wholeWord?: boolean }) => void;
  replaceText: (query: string, replacement: string, replaceAll?: boolean) => void;
  gotoLine: (lineNumber: number) => void;
}

/**
 * Main hook for code editor functionality
 */
export const useCodeEditor = (
  initialContent = '',
  language = 'javascript'
): UseCodeEditorState & UseCodeEditorActions => {
  const [content, setContentState] = useState(initialContent);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ line: 0, column: 0 });
  const [selection, setSelection] = useState<Selection | null>(null);
  const [undoStack, setUndoStack] = useState<string[]>([initialContent]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [undoIndex, setUndoIndex] = useState(0);
  const [autoCompleteItems, setAutoCompleteItems] = useState<AutoCompleteItem[]>([]);
  const [diagnostics, setDiagnostics] = useState<DiagnosticMessage[]>([]);
  const [availableActions, setAvailableActions] = useState<CodeAction[]>([]);
  
  const isModified = content !== initialContent;
  const canUndo = undoIndex > 0;
  const canRedo = undoIndex < undoStack.length - 1;
  
  // Reference to textarea for operations
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
  const setContent = useCallback((newContent: string) => {
    setContentState(newContent);
    
    // Update undo stack
    setUndoStack(prev => {
      const newStack = prev.slice(0, undoIndex + 1);
      newStack.push(newContent);
      return newStack;
    });
    setUndoIndex(prev => prev + 1);
    setRedoStack([]); // Clear redo stack when new content is added
  }, [undoIndex]);
  
  const insertText = useCallback((text: string, position?: CursorPosition) => {
    const insertPos = position || cursorPosition;
    const lines = content.split('\n');
    const targetLine = lines[insertPos.line] || '';
    
    const newLine = targetLine.slice(0, insertPos.column) + text + targetLine.slice(insertPos.column);
    lines[insertPos.line] = newLine;
    
    const newContent = lines.join('\n');
    setContent(newContent);
    
    // Update cursor position
    const newColumn = insertPos.column + text.length;
    setCursorPosition({ line: insertPos.line, column: newColumn });
  }, [content, cursorPosition, setContent]);
  
  const replaceSelection = useCallback((text: string) => {
    if (!selection || !textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newContent = content.slice(0, start) + text + content.slice(end);
    setContent(newContent);
    
    // Update cursor position
    const beforeText = newContent.slice(0, start + text.length);
    const lines = beforeText.split('\n');
    setCursorPosition({
      line: lines.length - 1,
      column: lines[lines.length - 1].length
    });
    
    setSelection(null);
  }, [selection, content, setContent]);
  
  const selectAll = useCallback(() => {
    if (!textareaRef.current) return;
    
    textareaRef.current.select();
    const lines = content.split('\n');
    setSelection({
      start: { line: 0, column: 0 },
      end: { 
        line: lines.length - 1, 
        column: lines[lines.length - 1].length 
      }
    });
  }, [content]);
  
  const selectLine = useCallback((lineNumber: number) => {
    const lines = content.split('\n');
    if (lineNumber < 0 || lineNumber >= lines.length) return;
    
    const startOffset = lines.slice(0, lineNumber).join('\n').length + (lineNumber > 0 ? 1 : 0);
    const endOffset = startOffset + lines[lineNumber].length;
    
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(startOffset, endOffset);
    }
    
    setSelection({
      start: { line: lineNumber, column: 0 },
      end: { line: lineNumber, column: lines[lineNumber].length }
    });
  }, [content]);
  
  const selectWord = useCallback((position: CursorPosition) => {
    const lines = content.split('\n');
    const line = lines[position.line] || '';
    
    // Find word boundaries
    let start = position.column;
    let end = position.column;
    
    const wordChar = /[a-zA-Z0-9_]/;
    
    // Find start of word
    while (start > 0 && wordChar.test(line[start - 1])) {
      start--;
    }
    
    // Find end of word
    while (end < line.length && wordChar.test(line[end])) {
      end++;
    }
    
    setSelection({
      start: { line: position.line, column: start },
      end: { line: position.line, column: end }
    });
  }, [content]);
  
  const undo = useCallback(() => {
    if (!canUndo) return;
    
    const newIndex = undoIndex - 1;
    setUndoIndex(newIndex);
    setContentState(undoStack[newIndex]);
    
    // Add current content to redo stack
    setRedoStack(prev => [content, ...prev]);
  }, [canUndo, undoIndex, undoStack, content]);
  
  const redo = useCallback(() => {
    if (!canRedo) return;
    
    const newIndex = undoIndex + 1;
    setUndoIndex(newIndex);
    setContentState(undoStack[newIndex]);
  }, [canRedo, undoIndex, undoStack]);
  
  const format = useCallback(() => {
    // Basic formatting - can be enhanced with language-specific formatters
    let formattedContent = content;
    
    // Remove trailing whitespace
    formattedContent = formattedContent.replace(/[ \t]+$/gm, '');
    
    // Ensure final newline
    if (formattedContent && !formattedContent.endsWith('\n')) {
      formattedContent += '\n';
    }
    
    setContent(formattedContent);
  }, [content, setContent]);
  
  const commentToggle = useCallback(() => {
    const languageDef = getLanguageDefinition(language);
    if (!languageDef || languageDef.commentDelimiters.line.length === 0) return;
    
    const commentPrefix = languageDef.commentDelimiters.line[0];
    const lines = content.split('\n');
    
    if (selection) {
      // Comment/uncomment selected lines
      const startLine = selection.start.line;
      const endLine = selection.end.line;
      
      let allCommented = true;
      for (let i = startLine; i <= endLine; i++) {
        const line = lines[i] || '';
        if (!line.trim().startsWith(commentPrefix)) {
          allCommented = false;
          break;
        }
      }
      
      for (let i = startLine; i <= endLine; i++) {
        const line = lines[i] || '';
        if (allCommented) {
          // Uncomment
          const regex = new RegExp(`^(\\s*)${commentPrefix}\\s?`);
          lines[i] = line.replace(regex, '$1');
        } else {
          // Comment
          if (line.trim()) {
            const leadingWhitespace = line.match(/^\s*/)?.[0] || '';
            lines[i] = leadingWhitespace + commentPrefix + ' ' + line.slice(leadingWhitespace.length);
          }
        }
      }
    } else {
      // Comment/uncomment current line
      const line = lines[cursorPosition.line] || '';
      if (line.trim().startsWith(commentPrefix)) {
        // Uncomment
        const regex = new RegExp(`^(\\s*)${commentPrefix}\\s?`);
        lines[cursorPosition.line] = line.replace(regex, '$1');
      } else {
        // Comment
        if (line.trim()) {
          const leadingWhitespace = line.match(/^\s*/)?.[0] || '';
          lines[cursorPosition.line] = leadingWhitespace + commentPrefix + ' ' + line.slice(leadingWhitespace.length);
        }
      }
    }
    
    setContent(lines.join('\n'));
  }, [language, content, selection, cursorPosition, setContent]);
  
  const duplicateLine = useCallback(() => {
    const lines = content.split('\n');
    const currentLine = lines[cursorPosition.line] || '';
    
    lines.splice(cursorPosition.line + 1, 0, currentLine);
    const newContent = lines.join('\n');
    setContent(newContent);
    
    // Move cursor to duplicated line
    setCursorPosition(prev => ({ ...prev, line: prev.line + 1 }));
  }, [content, cursorPosition, setContent]);
  
  const deleteLine = useCallback(() => {
    const lines = content.split('\n');
    if (lines.length <= 1) {
      setContent('');
      setCursorPosition({ line: 0, column: 0 });
      return;
    }
    
    lines.splice(cursorPosition.line, 1);
    const newContent = lines.join('\n');
    setContent(newContent);
    
    // Adjust cursor position
    const newLine = Math.min(cursorPosition.line, lines.length - 1);
    const newColumn = Math.min(cursorPosition.column, lines[newLine]?.length || 0);
    setCursorPosition({ line: newLine, column: newColumn });
  }, [content, cursorPosition, setContent]);
  
  const moveLinesUp = useCallback(() => {
    const lines = content.split('\n');
    const startLine = selection?.start.line ?? cursorPosition.line;
    const endLine = selection?.end.line ?? cursorPosition.line;
    
    if (startLine === 0) return; // Can't move up from first line
    
    // Move lines up
    const linesToMove = lines.splice(startLine, endLine - startLine + 1);
    lines.splice(startLine - 1, 0, ...linesToMove);
    
    setContent(lines.join('\n'));
    
    // Update cursor/selection position
    if (selection) {
      setSelection({
        start: { ...selection.start, line: selection.start.line - 1 },
        end: { ...selection.end, line: selection.end.line - 1 }
      });
    } else {
      setCursorPosition(prev => ({ ...prev, line: prev.line - 1 }));
    }
  }, [content, cursorPosition, selection, setContent]);
  
  const moveLinesDown = useCallback(() => {
    const lines = content.split('\n');
    const startLine = selection?.start.line ?? cursorPosition.line;
    const endLine = selection?.end.line ?? cursorPosition.line;
    
    if (endLine >= lines.length - 1) return; // Can't move down from last line
    
    // Move lines down
    const linesToMove = lines.splice(startLine, endLine - startLine + 1);
    lines.splice(startLine + 1, 0, ...linesToMove);
    
    setContent(lines.join('\n'));
    
    // Update cursor/selection position
    if (selection) {
      setSelection({
        start: { ...selection.start, line: selection.start.line + 1 },
        end: { ...selection.end, line: selection.end.line + 1 }
      });
    } else {
      setCursorPosition(prev => ({ ...prev, line: prev.line + 1 }));
    }
  }, [content, cursorPosition, selection, setContent]);
  
  const indentSelection = useCallback(() => {
    const lines = content.split('\n');
    const startLine = selection?.start.line ?? cursorPosition.line;
    const endLine = selection?.end.line ?? cursorPosition.line;
    
    const indentString = '  '; // 2 spaces
    
    for (let i = startLine; i <= endLine; i++) {
      if (lines[i] !== undefined) {
        lines[i] = indentString + lines[i];
      }
    }
    
    setContent(lines.join('\n'));
  }, [content, cursorPosition, selection, setContent]);
  
  const outdentSelection = useCallback(() => {
    const lines = content.split('\n');
    const startLine = selection?.start.line ?? cursorPosition.line;
    const endLine = selection?.end.line ?? cursorPosition.line;
    
    for (let i = startLine; i <= endLine; i++) {
      if (lines[i] !== undefined) {
        // Remove up to 2 spaces or 1 tab from the beginning
        lines[i] = lines[i].replace(/^(\t|  )/, '');
      }
    }
    
    setContent(lines.join('\n'));
  }, [content, cursorPosition, selection, setContent]);
  
  const findText = useCallback((query: string, options: { caseSensitive?: boolean; wholeWord?: boolean } = {}) => {
    if (!query) return;
    
    const flags = options.caseSensitive ? 'g' : 'gi';
    const pattern = options.wholeWord ? `\\b${query}\\b` : query;
    const regex = new RegExp(pattern, flags);
    
    const matches = [...content.matchAll(regex)];
    // Could store matches in state and highlight them
    console.log(`Found ${matches.length} matches for "${query}"`);
  }, [content]);
  
  const replaceText = useCallback((query: string, replacement: string, replaceAll = false) => {
    if (!query) return;
    
    const flags = replaceAll ? 'g' : '';
    const regex = new RegExp(query, flags);
    const newContent = content.replace(regex, replacement);
    
    setContent(newContent);
  }, [content, setContent]);
  
  const gotoLine = useCallback((lineNumber: number) => {
    const lines = content.split('\n');
    const targetLine = Math.max(0, Math.min(lineNumber - 1, lines.length - 1));
    
    setCursorPosition({ line: targetLine, column: 0 });
    
    if (textareaRef.current) {
      const offset = lines.slice(0, targetLine).join('\n').length + (targetLine > 0 ? 1 : 0);
      textareaRef.current.setSelectionRange(offset, offset);
    }
  }, [content]);
  
  // Auto-completion logic
  useEffect(() => {
    const languageDef = getLanguageDefinition(language);
    if (!languageDef) return;
    
    // Generate autocomplete items based on language keywords
    const items: AutoCompleteItem[] = languageDef.keywords.map(keyword => ({
      label: keyword,
      kind: 'keyword',
      detail: 'Language keyword',
      insertText: keyword
    }));
    
    setAutoCompleteItems(items);
  }, [language]);
  
  return {
    // State
    content,
    cursorPosition,
    selection,
    isModified,
    canUndo,
    canRedo,
    autoCompleteItems,
    diagnostics,
    availableActions,
    
    // Actions
    setContent,
    insertText,
    replaceSelection,
    selectAll,
    selectLine,
    selectWord,
    undo,
    redo,
    format,
    commentToggle,
    duplicateLine,
    deleteLine,
    moveLinesUp,
    moveLinesDown,
    indentSelection,
    outdentSelection,
    findText,
    replaceText,
    gotoLine
  };
};

/**
 * Hook for managing multiple code editor tabs
 */
export interface CodeTab {
  id: string;
  filename: string;
  content: string;
  language: string;
  isModified: boolean;
  isActive: boolean;
}

export const useCodeTabs = () => {
  const [tabs, setTabs] = useState<CodeTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  
  const addTab = useCallback((tab: Omit<CodeTab, 'id' | 'isActive'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newTab: CodeTab = {
      ...tab,
      id,
      isActive: false
    };
    
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(id);
    
    return id;
  }, []);
  
  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId);
      
      // If closing active tab, activate another one
      if (tabId === activeTabId && newTabs.length > 0) {
        setActiveTabId(newTabs[0].id);
      } else if (newTabs.length === 0) {
        setActiveTabId(null);
      }
      
      return newTabs;
    });
  }, [activeTabId]);
  
  const updateTab = useCallback((tabId: string, updates: Partial<CodeTab>) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, ...updates } : tab
    ));
  }, []);
  
  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);
  
  const activeTab = tabs.find(tab => tab.id === activeTabId) || null;
  
  return {
    tabs,
    activeTab,
    activeTabId,
    addTab,
    closeTab,
    updateTab,
    setActiveTab
  };
};