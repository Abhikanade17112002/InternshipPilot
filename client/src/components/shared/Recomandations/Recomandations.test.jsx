import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import axios from 'axios';
import Recomandations from './Recomandations';
import { configureStore } from '@reduxjs/toolkit';

// Mock axios
vi.mock('axios');

// Mock child components
vi.mock('../Sidebar/Sidebar', () => ({
  default: () => <div>Sidebar Mock</div>,
}));

vi.mock('../Jobs/JobsCard', () => ({
  default: ({ job }) => <div>{job.title}</div>,
}));

// Create proper mock store structure that matches your actual store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      userSlice: (state = {
        userInfo: {
          firstName: 'John',
          lastName: 'Doe',
          profile: { skills: ['JavaScript', 'React'] },
        },
        isLoading: false,
        isAuthenticated: true,
        error: null
      }) => state,
      jobSlice: (state = {
        allJobs: [
          { _id: '1', title: 'Frontend Developer', location: 'Pune', jobType: 'Full Time' },
          { _id: '2', title: 'Backend Developer', location: 'Mumbai', jobType: 'Full Time' },
        ],
        isLoading: false,
        error: null
      }) => state,
    },
    preloadedState: initialState
  });
};

// Mock your selectors to match the actual implementation
vi.mock('@/store/userSlice/userSlice', () => ({
  getUserInfo: (state) => state.userSlice.userInfo,
  getIsLoading: (state) => state.userSlice.isLoading,
  getIsAuthenticated: (state) => state.userSlice.isAuthenticated,
}));

vi.mock('@/store/jobSlice/jobSlice', () => ({
  getAllJobs: (state) => state.jobSlice.allJobs,
}));

describe('Recomandations Component', () => {
  let store;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    store = createMockStore();

    // Mock successful API response
    axios.post.mockResolvedValue({
      data: {
        recommendations: {
          recommendations: [{ jobId: '1', score: 0.9 }],
        },
      },
    });
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Recomandations />
      </Provider>
    );
  });

  test('fetches recommendations on mount', async () => {
    render(
      <Provider store={store}>
        <Recomandations />
      </Provider>
    );

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledOnce();
    });
  });

  test('displays recommended jobs after API call', async () => {
    render(
      <Provider store={store}>
        <Recomandations />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
      expect(screen.queryByText('Backend Developer')).not.toBeInTheDocument();
    });
  });

  test('shows "No Jobs Available" if no recommendations', async () => {
    axios.post.mockResolvedValue({
      data: { recommendations: { recommendations: [] } },
    });

    render(
      <Provider store={store}>
        <Recomandations />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No Jobs Available')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));

    render(
      <Provider store={store}>
        <Recomandations />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No Jobs Available')).toBeInTheDocument();
    });
  });
});