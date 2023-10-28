import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
function logErrorToMyService(error: Error, errorInfo: ErrorInfo) {
  console.error(error, errorInfo);
}
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Error occurred: {this.state.error?.message}</h2>
          <button
            onClick={() => {
              throw new Error("Test Error");
            }}
          >
            Throw Error
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
