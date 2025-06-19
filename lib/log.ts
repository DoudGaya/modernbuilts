// lib/log.ts
const DEBUG = process.env.NODE_ENV !== 'production';

/**
 * Enhanced logging utility with prefix and optional debug-only mode
 */
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  
  debug: (message: string, data?: any) => {
    if (DEBUG) {
      console.log(`[DEBUG] ${message}`, data || '');
    }
  },
  
  warn: (message: string, data?: any) => {
    console.warn(`[WARNING] ${message}`, data || '');
  },
  
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  
  // Upload specific logs
  upload: {
    start: (file: File, folder: string) => {
      if (DEBUG) console.log(`[UPLOAD] Starting upload: ${file.name} (${file.size} bytes) to ${folder}`);
    },
    progress: (file: string, percent: number) => {
      if (DEBUG) console.log(`[UPLOAD] Progress for ${file}: ${percent}%`);
    },
    complete: (file: string, url: string) => {
      if (DEBUG) console.log(`[UPLOAD] Completed: ${file} → ${url}`);
    },
    error: (file: string, error: any) => {
      console.error(`[UPLOAD ERROR] Failed to upload ${file}:`, error);
    }
  }
};

export default logger;
