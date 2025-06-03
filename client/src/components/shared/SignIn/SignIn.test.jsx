/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './SignIn';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import userReducer from '@/store/userSlice/userSlice';

// ✅ Mock the Redux store
const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

// ✅ Mock the useDispatch and useNavigate hooks
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// ✅ Mock the toast notification
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// ✅ Mock the CustomInput component
vi.mock('../CustomInput/CustomInput', () => ({
  default: ({ label, type, name, errors, placeholder, register }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register}
        data-testid={name}
      />
      {errors && errors[name] && (
        <p className="error-message">{errors[name].message}</p>
      )}
    </div>
  ),
}));

// ✅ Mock the CustomDropDown component
vi.mock('../CustomDropDown/CustomDropDown', () => ({
  default: ({
    control,
    setValue,
    errors,
    name,
    label,
    register,
    placeholder,
    dropDownOptions,
  }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        {...register}
        data-testid={name}
        onChange={(e) => setValue(name, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {dropDownOptions.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <p className="error-message">{errors[name].message}</p>
      )}
    </div>
  ),
}));

describe('SignIn Component', () => {
  const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );
  };

  it('renders the sign-in form with all fields', () => {
    renderComponent();
  
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Role')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('shows validation errors when form is submitted empty', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('User role required')).toBeInTheDocument();
    });
  });

  test('shows email validation error for invalid email format', async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    });
  });

  test('shows password validation error for weak password', async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'weak' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Enter a strong password')).toBeInTheDocument();
    });
  });

  test('enables submit button when form is valid', async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'StrongPass1!' },
    });
    fireEvent.change(screen.getByTestId('role'), {
      target: { value: 'student' },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
    });
  });

  test('shows loading state when form is submitting', async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'StrongPass1!' },
    });
    fireEvent.change(screen.getByTestId('role'), {
      target: { value: 'student' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /please wait/i })).toBeDisabled();
    });
  });
});
