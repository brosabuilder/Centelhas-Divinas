import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="flex min-h-screen flex-col items-center justify-center gap-4 px-6"
          style={{
            background: "var(--bg)",
            color: "var(--text)",
            fontFamily: "Lora, serif",
          }}
        >
          <p className="text-center text-lg" style={{ color: "var(--gold)" }}>
            Algo deu errado
          </p>
          <pre
            className="max-w-lg overflow-auto rounded border p-4 text-left text-xs"
            style={{
              borderColor: "var(--divider)",
              color: "var(--text-muted)",
            }}
          >
            {this.state.error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-none border px-4 py-2 text-sm transition-opacity hover:opacity-80"
            style={{
              borderWidth: "1px",
              borderColor: "var(--gold-dim)",
              color: "var(--gold-dim)",
            }}
          >
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
