import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import JobDetails from './JobDetails';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock axios
vi.mock('axios');

// Mock react-router-dom hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

// Mock useSelector
const mockStore = configureStore([]);
const initialState = {
  user: {
    userInfo: {
      _id: 'user123',
      profile: {
        resume: 'http://example.com/resume.pdf'
      }
    }
  }
};

// Mock components
vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children }) => <div data-testid="badge">{children}</div>
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} data-testid="button">
      {children}
    </button>
  )
}));

vi.mock('../Loader/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn()
  }
}));

describe('JobDetails Component', () => {
  const mockJob = {
    _id: '123',
    title: 'Frontend Developer',
    position: 2,
    jobType: 'Full-time',
    salary: '15',
    location: 'Remote',
    description: 'Job description here',
    experienceLevel: '3',
    applications: [],
    createdAt: '2023-01-01T00:00:00.000Z'
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { job: mockJob } });
    axios.post.mockResolvedValue({ 
      data: { 
        status: true, 
        message: 'Success' 
      } 
    });
  });

  it('renders loading state initially', async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={['/jobs/123']}>
          <JobDetails />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());
  });


//     render(
//       <Provider store={mockStore(initialState)}>
//         <MemoryRouter initialEntries={['/jobs/123']}>
//           <JobDetails />
//         </MemoryRouter>
//       </Provider>
//     );

//     await waitFor(() => {
//       // Use more specific selectors to avoid duplicate matches
//       expect(screen.getByRole('heading', { name: 'Frontend Developer', level: 1 })).toBeInTheDocument();
//       expect(screen.getByText(/Posted over/)).toBeInTheDocument();
//       expect(screen.getByRole('heading', { name: 'Job Details', level: 2 })).toBeInTheDocument();
//       expect(screen.getByText('Remote')).toBeInTheDocument();
//       expect(screen.getByText('15 LPA')).toBeInTheDocument();
//     });
//   });

  it('shows apply button when user has not applied', async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={['/jobs/123']}>
          <JobDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const applyButton = screen.getByRole('button', { name: /Apply Now/ });
      expect(applyButton).toBeInTheDocument();
      expect(applyButton).not.toBeDisabled();
    });
  });


  it('shows evaluate button when user has not evaluated yet', async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={['/jobs/123']}>
          <JobDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const evaluateButton = screen.getByRole('button', { name: /Evaluate/ });
      expect(evaluateButton).toBeInTheDocument();
    });
  });



});