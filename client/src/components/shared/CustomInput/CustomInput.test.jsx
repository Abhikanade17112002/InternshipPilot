import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomInput from './CustomInput';

describe('CustomInput', () => {
  // Create a more accurate mock of react-hook-form's register
  const mockRegister = (name) => ({
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: name // Include name in the returned object
  });

  const defaultProps = {
    label: 'Test Input',
    placeholder: 'Enter text here',
    type: 'text',
    name: 'testInput',
    register: mockRegister,
    errors: {}
  };

  test('renders with label', () => {
    render(<CustomInput {...defaultProps} />);
    expect(screen.getByText('Test Input')).toBeInTheDocument();
  });

  test('renders input with correct attributes', () => {
    render(<CustomInput {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter text here');
    
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'testInput');
  });

  test('does not show error message when no errors exist', () => {
    render(<CustomInput {...defaultProps} />);
    expect(screen.queryByText(/required/)).not.toBeInTheDocument();
  });

  test('shows error message when errors exist', () => {
    const errorProps = {
      ...defaultProps,
      errors: {
        testInput: {
          message: 'This field is required'
        }
      }
    };
    render(<CustomInput {...errorProps} />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});