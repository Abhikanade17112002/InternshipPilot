import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterCompany from './RegisterCompany';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

// Mock dependencies
vi.mock('axios');
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Wrap component with Router
const WrappedComponent = () => (
  <BrowserRouter>
    <RegisterCompany />
  </BrowserRouter>
);

describe('RegisterCompany Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input and buttons correctly', () => {
    render(<WrappedComponent />);
    expect(screen.getByPlaceholderText(/Google , Meta , Microsoft/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it('updates the input value on change', () => {
    render(<WrappedComponent />);
    const input = screen.getByPlaceholderText(/Google , Meta , Microsoft/i);
    fireEvent.change(input, { target: { value: 'OpenAI' } });
    expect(input.value).toBe('OpenAI');
  });


  it('calls API and shows success toast on successful registration', async () => {
    axios.post.mockResolvedValueOnce({ 
      data: { 
        status: true,
        message: 'Company registered successfully!' 
      } 
    });
  
    render(<WrappedComponent />);
  
    const input = screen.getByPlaceholderText(/Google , Meta , Microsoft/i);
    fireEvent.change(input, { target: { value: 'Meta' } });
  
    const registerButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerButton);
  
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Company registered successfully!');
    });
  });

  it('calls API and shows error toast on failed registration', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        status: false,
        message: 'Company already exists',
      },
    });

    render(<WrappedComponent />);
    const input = screen.getByPlaceholderText(/Google , Meta , Microsoft/i);
    fireEvent.change(input, { target: { value: 'Meta' } });

    const button = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Company already exists');
    });
  });

});