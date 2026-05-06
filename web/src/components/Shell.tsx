import type { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
  sidebar?: ReactNode;
  dock?: ReactNode;
}

export function Shell({ children, sidebar, dock }: ShellProps) {
  return (
    <>
      {/* Desktop: sidebar + main */}
      <div className="hidden md:flex h-screen">
        <aside
          className="flex flex-col border-r h-full shrink-0"
          style={{
            width: "17rem",
            borderColor: "var(--line)",
            background: "var(--panel)",
          }}
        >
          <div className="p-6 font-bold text-lg" style={{ fontFamily: "Fraunces, serif" }}>
            Hangman
          </div>
          {sidebar}
          <div className="p-4 text-xs" style={{ color: "var(--muted)" }}>
            <a
              href="https://freegamestore.online"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--muted)" }}
            >
              Part of FreeGameStore — free forever
            </a>
          </div>
        </aside>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>

      {/* Mobile: header + main + dock.
          100dvh (not 100vh / h-screen) — iOS Safari 100vh = URL-bar-hidden
          height, so content sized to 100vh extends past the viewport when
          the URL bar is visible and the page becomes scrollable on first
          load. 100dvh tracks the actual visible area through URL-bar
          transitions. */}
      <div className="flex flex-col md:hidden" style={{ height: '100dvh' }}>
        <header
          className="flex items-center justify-between px-4 h-14 border-b shrink-0"
          style={{ borderColor: "var(--line)", background: "var(--panel)" }}
        >
          <span className="font-bold" style={{ fontFamily: "Fraunces, serif" }}>
            Hangman
          </span>
          {dock && <div className="flex items-center gap-3">{dock}</div>}
        </header>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </>
  );
}
