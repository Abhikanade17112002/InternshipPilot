// Jobs.test.jsx
import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Jobs from './Jobs';
import jobReducer from '../../../store/jobSlice/jobSlice';
import store from '@/store/store';
const renderWithStore = (ui) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };
describe('Jobs Component', () => {
  it('renders Jobs component without crashing', () => {
    const preloadedState = {
      job: {
        jobs: [], // 🛠️ Mock an empty job array (or put some test jobs)
      },
    };

    const testStore = configureStore({
      reducer: {
        job: jobReducer,
      },
      preloadedState,
    });

    render(
      <Provider store={testStore}>
        <Jobs />
      </Provider>
    );
  });
});

test('renders Jobs component without crashing', () => {
    renderWithStore(<Jobs />);
    expect(screen.getByTestId('jobs-component')).toBeInTheDocument();
  });
  

  test('renders Sidebar component inside Jobs', () => {
    renderWithStore(<Jobs />);
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Industry')).toBeInTheDocument();
    expect(screen.getByText('Job Type')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
  });

  test('displays message when no jobs are available', () => {
    const preloadedState = {
      job: {
        jobs: [],
      },
    };
  
    const testStore = configureStore({
      reducer: { job: jobReducer },
      preloadedState,
    });
  
    render(
      <Provider store={testStore}>
        <Jobs />
      </Provider>
    );
  
    expect(screen.getByText('No Jobs Available')).toBeInTheDocument();
  });
  

