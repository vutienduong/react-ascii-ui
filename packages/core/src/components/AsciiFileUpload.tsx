import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';

export interface FileUploadFile {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
  error?: string;
  preview?: string;
}

export interface AsciiFileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop' | 'onError'> {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  disabled?: boolean;
  onFilesSelect?: (files: File[]) => void;
  onUpload?: (file: File, progressCallback: (progress: number) => void) => Promise<void>;
  onRemove?: (fileId: string) => void;
  onError?: (error: string, file?: File) => void;
  showPreview?: boolean;
  uploadText?: string;
  dragText?: string;
  allowedTypes?: string[];
  autoUpload?: boolean;
}

export const AsciiFileUpload: React.FC<AsciiFileUploadProps> = ({
  accept,
  multiple = false,
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  disabled = false,
  onFilesSelect,
  onUpload,
  onRemove,
  onError,
  showPreview = true,
  uploadText = 'Click to upload or drag and drop',
  dragText = 'Drop files here',
  allowedTypes,
  autoUpload = false,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileUploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const generateFileId = () => Math.random().toString(36).substr(2, 9);

  const validateFile = useCallback((file: File): string | null => {
    if (maxFileSize && file.size > maxFileSize) {
      return `File size exceeds ${formatFileSize(maxFileSize)}`;
    }

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed`;
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.match(type.replace('*', '.*'));
      });
      
      if (!isAccepted) {
        return `File type not accepted`;
      }
    }

    return null;
  }, [maxFileSize, allowedTypes, accept]);

  const createFilePreview = useCallback((file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (!showPreview || !file.type.startsWith('image/')) {
        resolve(undefined);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => resolve(undefined);
      reader.readAsDataURL(file);
    });
  }, [showPreview]);

  const addFiles = useCallback(async (newFiles: File[]) => {
    const validFiles: FileUploadFile[] = [];
    
    for (const file of newFiles) {
      if (files.length + validFiles.length >= maxFiles) {
        onError?.(`Maximum ${maxFiles} files allowed`);
        break;
      }

      const error = validateFile(file);
      if (error) {
        onError?.(error, file);
        continue;
      }

      const preview = await createFilePreview(file);
      validFiles.push({
        id: generateFileId(),
        file,
        status: 'pending',
        progress: 0,
        preview,
      });
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      onFilesSelect?.(validFiles.map(f => f.file));

      if (autoUpload && onUpload) {
        validFiles.forEach(fileData => {
          uploadFile(fileData.id);
        });
      }
    }
  }, [files.length, maxFiles, validateFile, createFilePreview, onFilesSelect, autoUpload, onUpload, onError]);

  const uploadFile = useCallback(async (fileId: string) => {
    if (!onUpload) return;

    const fileData = files.find(f => f.id === fileId);
    if (!fileData) return;

    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading', progress: 0 } : f
    ));

    setIsUploading(true);

    try {
      await onUpload(fileData.file, (progress) => {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: Math.min(100, Math.max(0, progress)) } : f
        ));
      });

      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
      ));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'error', error: errorMessage } : f
      ));
      onError?.(errorMessage, fileData.file);
    } finally {
      setIsUploading(false);
    }
  }, [files, onUpload, onError]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    onRemove?.(fileId);
  }, [onRemove]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [addFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  }, [disabled, addFiles]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File): string => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('video/')) return '🎥';
    if (file.type.startsWith('audio/')) return '🎵';
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('text')) return '📝';
    if (file.type.includes('zip') || file.type.includes('rar')) return '📦';
    return '📎';
  };

  const renderProgressBar = (progress: number, status: FileUploadFile['status']) => {
    const barLength = 20;
    const filled = Math.floor((progress / 100) * barLength);
    const empty = barLength - filled;

    let fillChar = '█';
    let color = theme.colors.primary;

    if (status === 'completed') {
      fillChar = '█';
      color = theme.colors.success;
    } else if (status === 'error') {
      fillChar = '█';
      color = theme.colors.error;
    }

    return (
      <div className="flex items-center gap-2 font-mono text-sm">
        <span style={{ color }}>
          {fillChar.repeat(filled)}
        </span>
        <span style={{ color: theme.colors.textSecondary }}>
          {'░'.repeat(empty)}
        </span>
        <span style={{ color: theme.colors.text }}>
          {Math.round(progress)}%
        </span>
      </div>
    );
  };

  const stats = useMemo(() => ({
    total: files.length,
    pending: files.filter(f => f.status === 'pending').length,
    uploading: files.filter(f => f.status === 'uploading').length,
    completed: files.filter(f => f.status === 'completed').length,
    errors: files.filter(f => f.status === 'error').length,
  }), [files]);

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
      style={{
        fontFamily: theme.typography.fontFamily,
        color: theme.colors.text,
        ...style,
      }}
    >
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragOver ? 'border-opacity-100' : 'border-opacity-50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-opacity-80'}
        `}
        style={{
          borderColor: isDragOver ? theme.colors.primary : theme.colors.border,
          backgroundColor: isDragOver ? `${theme.colors.primary}10` : theme.colors.surface,
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div 
            className="text-4xl"
            style={{ color: theme.colors.primary }}
          >
            {isDragOver ? '📂' : '📁'}
          </div>

          <div>
            <p 
              className="text-lg font-medium mb-2"
              style={{ color: theme.colors.text }}
            >
              {isDragOver ? dragText : uploadText}
            </p>
            
            {!isDragOver && (
              <div 
                className="text-sm space-y-1"
                style={{ color: theme.colors.textSecondary }}
              >
                <p>
                  {multiple ? `Up to ${maxFiles} files` : 'Single file'}
                  {maxFileSize && ` • Max ${formatFileSize(maxFileSize)}`}
                </p>
                {allowedTypes && (
                  <p>Supported: {allowedTypes.join(', ')}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6">
          {/* Stats */}
          <div 
            className="flex items-center gap-6 mb-4 pb-2 border-b text-sm"
            style={{ borderColor: theme.colors.border }}
          >
            <span style={{ color: theme.colors.text }}>
              Total: {stats.total}
            </span>
            {stats.pending > 0 && (
              <span style={{ color: theme.colors.warning }}>
                Pending: {stats.pending}
              </span>
            )}
            {stats.uploading > 0 && (
              <span style={{ color: theme.colors.info }}>
                Uploading: {stats.uploading}
              </span>
            )}
            {stats.completed > 0 && (
              <span style={{ color: theme.colors.success }}>
                Completed: {stats.completed}
              </span>
            )}
            {stats.errors > 0 && (
              <span style={{ color: theme.colors.error }}>
                Errors: {stats.errors}
              </span>
            )}
          </div>

          {/* Files */}
          <div className="space-y-3">
            {files.map((fileData) => (
              <div
                key={fileData.id}
                className="flex items-center gap-4 p-3 border rounded"
                style={{ 
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background 
                }}
              >
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {fileData.preview ? (
                    <img
                      src={fileData.preview}
                      alt={fileData.file.name}
                      className="w-12 h-12 object-cover rounded border"
                      style={{ borderColor: theme.colors.border }}
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center text-2xl">
                      {getFileIcon(fileData.file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 
                      className="font-medium truncate"
                      style={{ color: theme.colors.text }}
                    >
                      {fileData.file.name}
                    </h4>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: 
                          fileData.status === 'completed' ? theme.colors.success :
                          fileData.status === 'error' ? theme.colors.error :
                          fileData.status === 'uploading' ? theme.colors.info :
                          theme.colors.warning,
                        color: theme.colors.background,
                      }}
                    >
                      {fileData.status}
                    </span>
                  </div>
                  
                  <p 
                    className="text-sm mb-2"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {formatFileSize(fileData.file.size)}
                  </p>

                  {/* Progress Bar */}
                  {(fileData.status === 'uploading' || fileData.status === 'completed') && (
                    <div className="mb-2">
                      {renderProgressBar(fileData.progress, fileData.status)}
                    </div>
                  )}

                  {/* Error Message */}
                  {fileData.status === 'error' && fileData.error && (
                    <p 
                      className="text-sm flex items-center gap-1"
                      style={{ color: theme.colors.error }}
                    >
                      <span>⚠</span>
                      {fileData.error}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {fileData.status === 'pending' && onUpload && (
                    <button
                      onClick={() => uploadFile(fileData.id)}
                      disabled={isUploading}
                      className="px-3 py-1 border rounded text-sm hover:opacity-80 focus:outline-none disabled:opacity-50"
                      style={{
                        borderColor: theme.colors.success,
                        color: theme.colors.success,
                        backgroundColor: 'transparent',
                      }}
                    >
                      Upload
                    </button>
                  )}
                  
                  <button
                    onClick={() => removeFile(fileData.id)}
                    className="px-3 py-1 border rounded text-sm hover:opacity-80 focus:outline-none"
                    style={{
                      borderColor: theme.colors.error,
                      color: theme.colors.error,
                      backgroundColor: 'transparent',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bulk Actions */}
          {!autoUpload && onUpload && stats.pending > 0 && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.colors.border }}>
              <button
                onClick={() => {
                  files.filter(f => f.status === 'pending').forEach(f => uploadFile(f.id));
                }}
                disabled={isUploading}
                className="px-4 py-2 border rounded hover:opacity-80 focus:outline-none disabled:opacity-50"
                style={{
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                Upload All ({stats.pending})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};