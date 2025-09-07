export default function FormsDocs() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Forms & Validation</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Comprehensive form system with validation, multi-step wizards, and file upload capabilities.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Components</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.4em', marginBottom: '10px' }}>AsciiForm</h3>
        <p style={{ color: '#ccc', marginBottom: '15px' }}>
          Single-step forms with comprehensive validation and field organization.
        </p>
        <pre style={{ 
          backgroundColor: '#111', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px', 
          overflow: 'auto',
          marginBottom: '20px',
          color: '#ccc'
        }}>
{`import { AsciiForm, createValidationRules } from 'react-ascii-ui';

const contactFields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    width: 'half',
    validation: [createValidationRules.required()]
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    width: 'half',
    validation: [createValidationRules.required()]
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: [
      createValidationRules.required(),
      createValidationRules.email()
    ]
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    validation: [
      createValidationRules.required(),
      createValidationRules.minLength(10)
    ]
  }
];

function ContactForm() {
  return (
    <AsciiForm 
      fields={contactFields}
      onSubmit={async (values) => {
        console.log('Form submitted:', values);
        // Handle form submission
      }}
      submitButtonText="Send Message"
    />
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.4em', marginBottom: '10px' }}>AsciiMultiStepForm</h3>
        <p style={{ color: '#ccc', marginBottom: '15px' }}>
          Multi-step wizards with progress indicators and step validation.
        </p>
        <pre style={{ 
          backgroundColor: '#111', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px', 
          overflow: 'auto',
          marginBottom: '20px',
          color: '#ccc'
        }}>
{`import { AsciiMultiStepForm } from 'react-ascii-ui';

const registrationSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        validation: [createValidationRules.required()]
      },
      // ... more fields
    ]
  },
  {
    id: 'account',
    title: 'Account Setup',
    description: 'Create your credentials',
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        validation: [
          createValidationRules.required(),
          createValidationRules.minLength(3)
        ]
      },
      // ... more fields
    ],
    validation: (values) => {
      const errors = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return errors;
    }
  }
];

function RegistrationWizard() {
  return (
    <AsciiMultiStepForm 
      steps={registrationSteps}
      onSubmit={async (values) => {
        console.log('Registration complete:', values);
      }}
      showProgress={true}
    />
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.4em', marginBottom: '10px' }}>AsciiFileUpload</h3>
        <p style={{ color: '#ccc', marginBottom: '15px' }}>
          Advanced file uploader with drag & drop, progress indicators, and validation.
        </p>
        <pre style={{ 
          backgroundColor: '#111', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px', 
          overflow: 'auto',
          marginBottom: '20px',
          color: '#ccc'
        }}>
{`import { AsciiFileUpload } from 'react-ascii-ui';

function ImageUploader() {
  const mockUpload = async (file, progressCallback) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      progressCallback(progress);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return (
    <AsciiFileUpload
      accept="image/*"
      multiple={true}
      maxFiles={5}
      maxFileSize={5 * 1024 * 1024} // 5MB
      showPreview={true}
      autoUpload={true}
      onUpload={mockUpload}
      onFilesSelect={(files) => {
        console.log('Files selected:', files);
      }}
      onError={(error, file) => {
        console.error('Upload error:', error, file?.name);
      }}
    />
  );
}`}
        </pre>
      </div>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Validation System</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        The form system includes a comprehensive validation framework with built-in rules and custom validation support.
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Built-in Validation Rules</h3>
        <pre style={{ 
          backgroundColor: '#111', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px', 
          overflow: 'auto',
          marginBottom: '20px',
          color: '#ccc'
        }}>
{`import { createValidationRules } from 'react-ascii-ui';

// Available validation rules:
createValidationRules.required('This field is required')
createValidationRules.email('Please enter a valid email')
createValidationRules.minLength(5, 'Must be at least 5 characters')
createValidationRules.maxLength(100, 'Must be no more than 100 characters')
createValidationRules.pattern(/^[A-Za-z]+$/, 'Only letters allowed')
createValidationRules.custom(
  (value) => value !== 'admin',
  'Username cannot be "admin"'
)`}
        </pre>
      </div>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Field Types</h2>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><strong>text</strong> - Standard text input</li>
        <li><strong>email</strong> - Email input with validation</li>
        <li><strong>password</strong> - Password input (hidden text)</li>
        <li><strong>number</strong> - Numeric input</li>
        <li><strong>textarea</strong> - Multi-line text input</li>
        <li><strong>select</strong> - Dropdown selection</li>
        <li><strong>checkbox</strong> - Boolean checkbox</li>
        <li><strong>radio</strong> - Radio button group</li>
      </ul>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Field Layout</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        Fields can be organized in flexible layouts using width properties:
      </p>

      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><code>width: 'full'</code> - Full width (default)</li>
        <li><code>width: 'half'</code> - 50% width (2 fields per row)</li>
        <li><code>width: 'third'</code> - 33% width (3 fields per row)</li>
        <li><code>width: 'quarter'</code> - 25% width (4 fields per row)</li>
      </ul>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Examples</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        Check out our form examples:
      </p>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><a href="/email" style={{ color: '#00ff00' }}>Email Composer</a> - Complex form with rich text</li>
        <li><a href="/settings" style={{ color: '#00ff00' }}>Settings Page</a> - Multi-section form</li>
      </ul>
    </div>
  );
}