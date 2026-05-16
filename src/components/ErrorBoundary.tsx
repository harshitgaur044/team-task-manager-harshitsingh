import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from './common/Button';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
          <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 shadow-xl dark:border-red-900/30 dark:bg-slate-900 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20">
              <AlertTriangle size={32} />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Something went wrong</h2>
            <p className="mb-8 text-slate-500 dark:text-slate-400">
              An unexpected error occurred. We've been notified and are working on it.
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Refresh Page
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-2"
              >
                <Home size={18} />
                Back to Dashboard
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left">
                <p className="text-xs font-mono font-bold text-red-500 uppercase mb-2">Error details:</p>
                <pre className="p-4 rounded-lg bg-slate-50 dark:bg-black overflow-auto max-h-40 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
