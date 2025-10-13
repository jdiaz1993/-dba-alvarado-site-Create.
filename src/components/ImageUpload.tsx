'use client';

import { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

export default function ImageUpload({ 
  onImageUpload, 
  maxSize = 5, 
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  className = ''
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use: ${acceptedTypes.join(', ')}`;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    return null;
  }, [acceptedTypes, maxSize]);

  const handleFile = useCallback((file: File) => {
    setError(null);
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    // Call the upload callback
    onImageUpload(file);
  }, [validateFile, onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const removeImage = useCallback(() => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200
          ${isDragOver 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${error ? 'border-red-500 bg-red-50' : ''}
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600">Processing image...</p>
          </div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg shadow-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your image here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports: {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
            </p>
            <p className="text-sm text-gray-500">
              Max size: {maxSize}MB
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Upload Tips */}
      {!preview && !error && (
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium mb-2">📸 Image Requirements:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>High resolution images work best (300+ DPI)</li>
            <li>Use PNG for images with transparency</li>
            <li>Use JPG for photographs</li>
            <li>Vector files (SVG, AI, EPS) are preferred for logos</li>
          </ul>
        </div>
      )}
    </div>
  );
}
