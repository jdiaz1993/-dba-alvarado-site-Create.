'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, Alert, Spinner, Button } from 'react-bootstrap';

export default function ImageUpload({ 
  onImageUpload, 
  maxSize = 5, 
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  className = ''
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = useCallback((file) => {
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

  const handleFile = useCallback((file) => {
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
      setPreview(e.target?.result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    // Call the upload callback
    onImageUpload(file);
  }, [validateFile, onImageUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const removeImage = useCallback(() => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className={`w-100 ${className}`}>
      {/* Upload Area */}
      <Card
        className={`
          text-center
          ${isDragOver ? 'border-primary bg-primary bg-opacity-10' : ''}
          ${error ? 'border-danger bg-danger bg-opacity-10' : ''}
          ${isUploading ? 'opacity-50' : 'cursor-pointer'}
        `}
        style={{
          border: '2px dashed',
          borderColor: isDragOver ? '#0d6efd' : error ? '#dc3545' : '#dee2e6',
          minHeight: '200px',
          cursor: isUploading ? 'not-allowed' : 'pointer'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <Card.Body className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '200px' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />

          {isUploading ? (
            <>
              <Spinner animation="border" variant="primary" className="mb-3" />
              <p className="text-muted">Processing image...</p>
            </>
          ) : preview ? (
            <div className="position-relative">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '200px' }}
              />
              <Button
                variant="danger"
                size="sm"
                className="position-absolute top-0 end-0 rounded-circle"
                style={{ width: '32px', height: '32px', padding: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                ×
              </Button>
            </div>
          ) : (
            <>
              <svg
                width="64"
                height="64"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="text-muted mb-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="h6 mb-2">
                Drop your image here, or click to browse
              </p>
              <p className="text-muted small mb-1">
                Supports: {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
              </p>
              <p className="text-muted small">
                Max size: {maxSize}MB
              </p>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* Upload Tips */}
      {!preview && !error && (
        <div className="mt-3">
          <p className="fw-bold mb-2">📸 Image Requirements:</p>
          <ul className="list-unstyled small text-muted">
            <li>• High resolution images work best (300+ DPI)</li>
            <li>• Use PNG for images with transparency</li>
            <li>• Use JPG for photographs</li>
            <li>• Vector files (SVG, AI, EPS) are preferred for logos</li>
          </ul>
        </div>
      )}
    </div>
  );
}
