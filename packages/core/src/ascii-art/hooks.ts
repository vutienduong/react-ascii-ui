import { useState, useCallback, useRef } from 'react';
import { convertToAsciiArt, convertToAsciiArtWithDithering, captureWebcamFrame } from './utils';
import { AsciiArtOptions, AsciiArtResult } from './types';

export interface UseAsciiArtState {
  result: AsciiArtResult | null;
  isProcessing: boolean;
  error: string | null;
  progress: number;
}

export interface UseAsciiArtActions {
  convertImage: (source: string | File, options?: AsciiArtOptions) => Promise<void>;
  convertWithDithering: (source: string | File, options?: AsciiArtOptions) => Promise<void>;
  clear: () => void;
  downloadResult: () => void;
  copyToClipboard: () => Promise<boolean>;
}

/**
 * Hook for ASCII art conversion with state management
 */
export const useAsciiArt = (): UseAsciiArtState & UseAsciiArtActions => {
  const [result, setResult] = useState<AsciiArtResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const convertImage = useCallback(async (source: string | File, options?: AsciiArtOptions) => {
    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      setProgress(25);
      const asciiResult = await convertToAsciiArt(source, options);
      setProgress(100);
      setResult(asciiResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert image');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, []);

  const convertWithDithering = useCallback(async (source: string | File, options?: AsciiArtOptions) => {
    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      setProgress(25);
      const asciiResult = await convertToAsciiArtWithDithering(source, options);
      setProgress(100);
      setResult(asciiResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert image');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  const downloadResult = useCallback(() => {
    if (!result) return;

    const blob = new Blob([result.ascii], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-art-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [result]);

  const copyToClipboard = useCallback(async (): Promise<boolean> => {
    if (!result) return false;

    try {
      await navigator.clipboard.writeText(result.ascii);
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  }, [result]);

  return {
    result,
    isProcessing,
    error,
    progress,
    convertImage,
    convertWithDithering,
    clear,
    downloadResult,
    copyToClipboard
  };
};

/**
 * Hook for webcam ASCII art conversion
 */
export const useWebcamAsciiArt = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startWebcam = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      setStream(mediaStream);
      setError(null);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      setError('Failed to access webcam');
      console.error('Webcam error:', err);
    }
  }, []);

  const stopWebcam = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  }, [stream]);

  const captureFrame = useCallback(async (options?: AsciiArtOptions): Promise<AsciiArtResult | null> => {
    if (!videoRef.current || !stream) {
      setError('Webcam not started');
      return null;
    }

    setIsCapturing(true);
    try {
      const result = await captureWebcamFrame(videoRef.current, options);
      setError(null);
      return result;
    } catch (err) {
      setError('Failed to capture frame');
      console.error('Capture error:', err);
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, [stream]);

  return {
    videoRef,
    stream,
    isCapturing,
    error,
    startWebcam,
    stopWebcam,
    captureFrame
  };
};

/**
 * Hook for batch ASCII art conversion
 */
export const useBatchAsciiArt = () => {
  const [results, setResults] = useState<AsciiArtResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const convertBatch = useCallback(async (
    files: File[], 
    options?: AsciiArtOptions,
    onProgress?: (current: number, total: number, filename: string) => void
  ) => {
    setIsProcessing(true);
    setResults([]);
    setErrors([]);
    setProgress(0);

    const batchResults: AsciiArtResult[] = [];
    const batchErrors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFile(file.name);
      setProgress((i / files.length) * 100);
      
      onProgress?.(i + 1, files.length, file.name);

      try {
        const result = await convertToAsciiArt(file, options);
        batchResults.push(result);
      } catch (err) {
        const errorMsg = `${file.name}: ${err instanceof Error ? err.message : 'Unknown error'}`;
        batchErrors.push(errorMsg);
      }
    }

    setResults(batchResults);
    setErrors(batchErrors);
    setProgress(100);
    setCurrentFile('');
    setIsProcessing(false);
  }, []);

  const downloadAllResults = useCallback(() => {
    if (results.length === 0) return;

    // Create a zip-like text file with all results
    const combinedContent = results
      .map((result, index) => {
        return `=== ASCII Art ${index + 1} ===\n` +
               `Size: ${result.width}x${result.height}\n` +
               `Processing Time: ${result.processingTime.toFixed(1)}ms\n` +
               `Original: ${result.originalImage.width}x${result.originalImage.height}\n\n` +
               result.ascii + '\n\n';
      })
      .join('\n' + '='.repeat(50) + '\n\n');

    const blob = new Blob([combinedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-ascii-art-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [results]);

  const clearResults = useCallback(() => {
    setResults([]);
    setErrors([]);
    setProgress(0);
    setCurrentFile('');
  }, []);

  return {
    results,
    isProcessing,
    progress,
    currentFile,
    errors,
    convertBatch,
    downloadAllResults,
    clearResults
  };
};

/**
 * Hook for real-time ASCII art effects
 */
export const useRealTimeAsciiArt = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentFrame, setCurrentFrame] = useState<AsciiArtResult | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRealTime = useCallback((
    videoElement: HTMLVideoElement,
    options: AsciiArtOptions = {},
    fps: number = 10,
    onFrame?: (result: AsciiArtResult) => void
  ) => {
    if (isRunning) return;

    setIsRunning(true);
    const interval = 1000 / fps;

    intervalRef.current = setInterval(async () => {
      try {
        const result = await captureWebcamFrame(videoElement, options);
        setCurrentFrame(result);
        onFrame?.(result);
      } catch (err) {
        console.error('Real-time conversion error:', err);
      }
    }, interval);
  }, [isRunning]);

  const stopRealTime = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setCurrentFrame(null);
  }, []);

  return {
    isRunning,
    currentFrame,
    startRealTime,
    stopRealTime
  };
};