import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FileUpload = ({ onFilesChange, maxFiles = 5, maxSizePerFile = 10 }) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'text/plain', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'video/mp4', 'video/avi', 'video/mov'
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const validateFile = (file) => {
    const errors = [];
    
    if (!allowedTypes?.includes(file?.type)) {
      errors?.push('File type not supported');
    }
    
    if (file?.size > maxSizePerFile * 1024 * 1024) {
      errors?.push(`File size exceeds ${maxSizePerFile}MB limit`);
    }
    
    return errors;
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const validFiles = [];
    
    newFiles?.forEach((file, index) => {
      if (files?.length + validFiles?.length >= maxFiles) {
        return;
      }
      
      const errors = validateFile(file);
      const fileObj = {
        id: Date.now() + index,
        file,
        name: file?.name,
        size: file?.size,
        type: file?.type,
        errors,
        uploaded: false
      };
      
      if (errors?.length === 0) {
        validFiles?.push(fileObj);
        // Simulate upload progress
        simulateUpload(fileObj?.id);
      } else {
        validFiles?.push(fileObj);
      }
    });
    
    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles?.filter(f => f?.errors?.length === 0));
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev?.map(f => 
          f?.id === fileId ? { ...f, uploaded: true } : f
        ));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress?.[fileId];
          return newProgress;
        });
      }
      setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }));
    }, 200);
  };

  const removeFile = (fileId) => {
    const updatedFiles = files?.filter(f => f?.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles?.filter(f => f?.errors?.length === 0));
    
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress?.[fileId];
      return newProgress;
    });
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return 'Image';
    if (fileType?.includes('pdf')) return 'FileText';
    if (fileType?.includes('word') || fileType?.includes('document')) return 'FileText';
    if (fileType?.includes('excel') || fileType?.includes('sheet')) return 'FileSpreadsheet';
    if (fileType?.startsWith('video/')) return 'Video';
    return 'File';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Paperclip" size={20} className="mr-2 text-primary" />
          File Attachments
        </h3>
        <span className="text-sm text-muted-foreground">
          {files?.length}/{maxFiles} files
        </span>
      </div>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          dragActive
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes?.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={files?.length >= maxFiles}
        />
        
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-primary" />
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-foreground">
              {dragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse files
            </p>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Supported: Images, PDF, Documents, Videos</p>
            <p>Max {maxSizePerFile}MB per file, up to {maxFiles} files</p>
          </div>
        </div>
      </div>
      {/* File List */}
      {files?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Attached Files</h4>
          <div className="space-y-2">
            {files?.map((fileObj) => (
              <div
                key={fileObj?.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  fileObj?.errors?.length > 0
                    ? 'border-error/20 bg-error/5'
                    : fileObj?.uploaded
                    ? 'border-success/20 bg-success/5' :'border-border bg-card'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`p-2 rounded ${
                    fileObj?.errors?.length > 0
                      ? 'bg-error/10'
                      : fileObj?.uploaded
                      ? 'bg-success/10' :'bg-muted'
                  }`}>
                    <Icon
                      name={getFileIcon(fileObj?.type)}
                      size={16}
                      className={
                        fileObj?.errors?.length > 0
                          ? 'text-error'
                          : fileObj?.uploaded
                          ? 'text-success' :'text-muted-foreground'
                      }
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {fileObj?.name}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(fileObj?.size)}</span>
                      {fileObj?.uploaded && (
                        <>
                          <span>•</span>
                          <span className="text-success">Uploaded</span>
                        </>
                      )}
                      {fileObj?.errors?.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-error">{fileObj?.errors?.[0]}</span>
                        </>
                      )}
                    </div>
                    
                    {/* Upload Progress */}
                    {uploadProgress?.[fileObj?.id] !== undefined && (
                      <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-1">
                          <div
                            className="bg-primary h-1 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress?.[fileObj?.id]}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploading... {Math.round(uploadProgress?.[fileObj?.id])}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(fileObj?.id)}
                  className="text-muted-foreground hover:text-error"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Upload Guidelines */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          Upload Guidelines
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Screenshots help us understand visual issues</li>
          <li>• Error logs provide detailed diagnostic information</li>
          <li>• Videos can demonstrate step-by-step problems</li>
          <li>• Remove sensitive information before uploading</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;