import React, { PureComponent } from 'react';

import { ErrorLayout } from 'components/ErrorLayout';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    err: Error | null;
}

export class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, err: null };
    }

    static getDerivedStateFromError(err: Error): ErrorBoundaryState {
        return { hasError: true, err };
    }

    // eslint-disable-next-line class-methods-use-this
    override componentDidCatch(err: Error, errorInfo: React.ErrorInfo): void {
        // eslint-disable-next-line no-console
        console.error(err, { type: 'render_error', ...errorInfo });
    }

    override render(): React.ReactNode {
        const { hasError, err } = this.state;
        const { children } = this.props;

        if (hasError && err) {
            return <ErrorLayout title={err.name} text={err.message} withoutBackButton/>;
        }

        return children;
    }
}
