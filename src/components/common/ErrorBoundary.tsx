import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In a real production app, you would send this to a service like Sentry
    console.error("FinancePulse Global Error Caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center border border-slate-200 dark:border-slate-700">
            <AlertTriangle className="h-16 w-16 text-rose-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              System Interruption
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              We encountered an unexpected visual error. Your data is safe, but
              the page needs to be reloaded to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
