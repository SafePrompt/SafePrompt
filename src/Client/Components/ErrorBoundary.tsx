import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps{
    children: ReactNode
}

interface ErrorBoundaryState{
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = {
        hasError: false,
      };
    }
  
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      // You can log the error to an error reporting service
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  
    render(): ReactNode {
      if (this.state.hasError) {
        // You can render a fallback UI
        return <div>Something went wrong.</div>;
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;