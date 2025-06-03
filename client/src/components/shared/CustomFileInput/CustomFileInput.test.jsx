import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomFileInput from './CustomFileInput';

describe('CustomFileInput', () => {
  // Create a simple mock register function without using jest.fn()
  const mockRegister = () => ({
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: { current: null },
  });

  const defaultProps = {
    label: 'Test Label',
    register: mockRegister(),
    name: 'testFile',
    errors: {}
  };

  test('renders with label', () => {
    render(<CustomFileInput {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('displays file requirements text', () => {
    render(<CustomFileInput {...defaultProps} />);
    expect(screen.getByText(/PNG, JPG or PDF/i)).toBeInTheDocument();
  });

  test('renders file input', () => {
    render(<CustomFileInput {...defaultProps} />);
    const fileInput = screen.getByLabelText('Choose File');
    expect(fileInput).toBeInTheDocument();
  });

  test('shows error message when errors exist', () => {
    const errorProps = {
      ...defaultProps,
      errors: {
        testFile: {
          message: 'File is required'
        }
      }
    };
    render(<CustomFileInput {...errorProps} />);
    expect(screen.getByText('File is required')).toBeInTheDocument();
  });
});