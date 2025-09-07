import type { Meta, StoryObj } from '@storybook/react';
import { AsciiFileUpload } from '../components/AsciiFileUpload';

// Mock upload function that simulates a real upload with progress
const mockUpload = async (file: File, progressCallback: (progress: number) => void): Promise<void> => {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      progressCallback(Math.min(progress, 100));
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate some uploads failing randomly
        if (Math.random() < 0.2) {
          reject(new Error('Upload failed: Network error'));
        } else {
          resolve();
        }
      }
    }, 200);
  });
};

const meta: Meta<typeof AsciiFileUpload> = {
  title: 'Components/AsciiFileUpload',
  component: AsciiFileUpload,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' }
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    maxFiles: {
      control: { type: 'range', min: 1, max: 20 },
      description: 'Maximum number of files',
    },
    maxFileSize: {
      control: { type: 'range', min: 1024, max: 100 * 1024 * 1024 },
      description: 'Maximum file size in bytes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the upload area',
    },
    showPreview: {
      control: 'boolean',
      description: 'Show image previews',
    },
    autoUpload: {
      control: 'boolean',
      description: 'Automatically upload files when selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AsciiFileUpload>;

export const Default: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    onFilesSelect: (files) => {
      console.log('Files selected:', files.map(f => f.name));
    },
    onUpload: mockUpload,
    onRemove: (fileId) => {
      console.log('File removed:', fileId);
    },
    onError: (error, file) => {
      console.log('Upload error:', error, file?.name);
    },
  },
};

export const SingleFileUpload: Story = {
  args: {
    multiple: false,
    maxFiles: 1,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    uploadText: 'Click to select a single file',
    onFilesSelect: (files) => {
      console.log('File selected:', files[0]?.name);
    },
    onUpload: mockUpload,
  },
};

export const ImageOnlyWithPreview: Story = {
  args: {
    accept: 'image/*',
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    multiple: true,
    maxFiles: 10,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    showPreview: true,
    uploadText: 'Upload images',
    dragText: 'Drop your images here',
    onFilesSelect: (files) => {
      console.log('Images selected:', files.map(f => f.name));
    },
    onUpload: mockUpload,
  },
};

export const AutoUpload: Story = {
  args: {
    multiple: true,
    maxFiles: 8,
    autoUpload: true,
    uploadText: 'Files will upload automatically',
    onFilesSelect: (files) => {
      console.log('Files will auto-upload:', files.map(f => f.name));
    },
    onUpload: mockUpload,
    onError: (error, file) => {
      alert(`Upload failed for ${file?.name}: ${error}`);
    },
  },
};

export const DocumentUpload: Story = {
  args: {
    accept: '.pdf,.doc,.docx,.txt,.rtf',
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf'
    ],
    multiple: true,
    maxFiles: 5,
    maxFileSize: 20 * 1024 * 1024, // 20MB for documents
    showPreview: false,
    uploadText: 'Upload documents (PDF, Word, Text)',
    onFilesSelect: (files) => {
      console.log('Documents selected:', files.map(f => f.name));
    },
    onUpload: mockUpload,
  },
};

export const RestrictedUpload: Story = {
  args: {
    accept: 'image/*,video/*',
    multiple: true,
    maxFiles: 3,
    maxFileSize: 2 * 1024 * 1024, // 2MB - very restrictive
    showPreview: true,
    uploadText: 'Small media files only',
    onFilesSelect: (files) => {
      console.log('Media files selected:', files.map(f => f.name));
    },
    onUpload: mockUpload,
    onError: (error, file) => {
      alert(`Error: ${error}${file ? ` (${file.name})` : ''}`);
    },
  },
};

export const ManualUpload: Story = {
  args: {
    multiple: true,
    maxFiles: 10,
    autoUpload: false, // Manual upload only
    uploadText: 'Select files for manual upload',
    onFilesSelect: (files) => {
      console.log('Files selected for manual upload:', files.map(f => f.name));
    },
    onUpload: mockUpload,
    onRemove: (fileId) => {
      console.log('File removed:', fileId);
    },
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    uploadText: 'Upload is currently disabled',
    multiple: true,
    maxFiles: 5,
  },
};

export const CompactMode: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    showPreview: false,
    uploadText: 'Quick Upload',
    dragText: 'Drop files',
    onFilesSelect: (files) => {
      console.log('Files selected in compact mode:', files.map(f => f.name));
    },
    onUpload: mockUpload,
    style: { maxWidth: '400px' },
  },
};

// Demo component showing real-world usage
export const RealWorldExample = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2 text-green-400">
          ASCII File Upload System
        </h1>
        <p className="text-cyan-400">
          Retro-styled file upload with ASCII progress indicators
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Picture Upload */}
        <div className="border border-green-600 p-4">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">
            Profile Picture
          </h2>
          <AsciiFileUpload
            accept="image/*"
            multiple={false}
            maxFiles={1}
            maxFileSize={2 * 1024 * 1024} // 2MB
            autoUpload={true}
            showPreview={true}
            uploadText="Choose profile image"
            onFilesSelect={(files) => console.log('Profile pic:', files[0]?.name)}
            onUpload={mockUpload}
            onError={(error) => alert(`Profile upload error: ${error}`)}
          />
        </div>

        {/* Document Upload */}
        <div className="border border-green-600 p-4">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">
            Project Documents
          </h2>
          <AsciiFileUpload
            accept=".pdf,.doc,.docx,.txt"
            multiple={true}
            maxFiles={5}
            maxFileSize={10 * 1024 * 1024} // 10MB
            autoUpload={false}
            uploadText="Upload project files"
            onFilesSelect={(files) => console.log('Project files:', files.map(f => f.name))}
            onUpload={mockUpload}
          />
        </div>

        {/* Media Gallery Upload */}
        <div className="border border-green-600 p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">
            Media Gallery
          </h2>
          <AsciiFileUpload
            accept="image/*,video/*"
            multiple={true}
            maxFiles={12}
            maxFileSize={50 * 1024 * 1024} // 50MB
            autoUpload={true}
            showPreview={true}
            uploadText="Upload photos and videos"
            dragText="Drop your media files here"
            onFilesSelect={(files) => console.log('Gallery files:', files.map(f => f.name))}
            onUpload={mockUpload}
            onError={(error, file) => console.error('Gallery upload error:', error, file?.name)}
          />
        </div>
      </div>
    </div>
  );
};

RealWorldExample.parameters = {
  layout: 'fullscreen',
};