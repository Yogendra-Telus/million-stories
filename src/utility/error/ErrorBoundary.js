import React, { Component } from 'react';
import AwsLogger from '../logging/AwsLogger';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    AwsLogger.LogError(error.toString(), errorInfo.componentStack);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-page">
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children; // Render children if there's no error
  }
}

export default ErrorBoundary;
