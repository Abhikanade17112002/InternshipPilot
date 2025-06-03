import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EvaluateResultDialogBox from './EvaluateResultDialogBox';
import '@testing-library/jest-dom';

describe('EvaluateResultDialogBox', () => {
  const mockProps = {
    score: 75,
    content_score: 80,
    keyword_score: 70,
    missing_keywords: ['TypeScript', 'React Hooks', 'Redux'],
    skillGapAnalysis: 'Consider adding more details about your experience with state management and modern React features.'
  };

  test('renders dialog trigger button', () => {
    render(<EvaluateResultDialogBox {...mockProps} />);
    expect(screen.getByText('View Result 📊')).toBeInTheDocument();
  });

  test('opens dialog when trigger button is clicked', () => {
    render(<EvaluateResultDialogBox {...mockProps} />);
    fireEvent.click(screen.getByText('View Result 📊'));
    expect(screen.getByText('Resume Evaluation Summary')).toBeInTheDocument();
  });

  test('displays all score circles with correct values', () => {
    render(<EvaluateResultDialogBox {...mockProps} />);
    fireEvent.click(screen.getByText('View Result 📊'));
    
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
    
    expect(screen.getByText('Content Score')).toBeInTheDocument();
    expect(screen.getByText('Keyword Score')).toBeInTheDocument();
    expect(screen.getByText('ATS Score')).toBeInTheDocument();
  });

  test('displays missing keywords correctly', () => {
    render(<EvaluateResultDialogBox {...mockProps} />);
    fireEvent.click(screen.getByText('View Result 📊'));
    
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React Hooks')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
  });

  test('displays skill gap analysis', () => {
    render(<EvaluateResultDialogBox {...mockProps} />);
    fireEvent.click(screen.getByText('View Result 📊'));
    
    expect(screen.getByText(/Consider adding more details about your experience/i)).toBeInTheDocument();
  });

  test('closes dialog when close button is clicked', () => {
    render(<EvaluateResultDialogBox {...mockProps} />);
    fireEvent.click(screen.getByText('View Result 📊'));
    
    // Target the specific footer close button by its text content
    const closeButtons = screen.getAllByText('Close');
    const footerCloseButton = closeButtons.find(button => 
      button.className.includes('bg-green-600')
    );
    
    fireEvent.click(footerCloseButton);
    expect(screen.queryByText('Resume Evaluation Summary')).not.toBeInTheDocument();
  });

  test('shows correct icons based on score values', () => {
    render(<EvaluateResultDialogBox {...mockProps} />);
    fireEvent.click(screen.getByText('View Result 📊'));
    
    // Check for icons based on mockProps scores
    expect(screen.getAllByTestId('alert-triangle-icon')).toHaveLength(1);
  
  });

  test('renders correctly with minimum props', () => {
    const minimalProps = {
      score: 30,
      content_score: 35,
      keyword_score: 25,
      missing_keywords: [],
      skillGapAnalysis: ''
    };
    
    render(<EvaluateResultDialogBox {...minimalProps} />);
    fireEvent.click(screen.getByText('View Result 📊'));
    
    expect(screen.getByText('30%')).toBeInTheDocument();

  });
});