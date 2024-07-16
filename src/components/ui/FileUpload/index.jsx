import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onDrop, className }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({ className })}
      className={`border-dashed border-2 border-gray-300 p-4 ${className}`}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default FileUpload;
