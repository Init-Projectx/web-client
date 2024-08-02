import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onDrop, className }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles),
    accept: 'image/*',
  });

  return (
    <div
      {...getRootProps({ className })}
      className={`border-dashed border-2 border-gray-300 p-4 flex ${className}`}
    >
      <input {...getInputProps()} />
      <div className='flex flex-col mt-2 w-full'>
        <p className='text-center'>Drag 'n' drop some files here, or click to select files</p>
        <div className='w-full text-center flex justify-center mt-2'>
          <p className='text-2xl'>+</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
