// src/components/AppErrorBoundary.tsx
import React from "react";

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error in AppErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-[var(--imperium-gold)]">
              Something went wrong.
            </h1>
            <p className="text-gray-300 mb-6">
              {this.state.error?.message || "An unknown error occurred."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg bg-[var(--imperium-gold)] hover:bg-[var(--imperium-gold-light)] text-black font-semibold transition"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;