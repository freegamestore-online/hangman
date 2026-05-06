import { useState, useCallback, useEffect, useRef } from "react";
import { Shell } from "./components/Shell";
import { Game } from "./components/Game";
import { Leaderboard } from "./components/Leaderboard";
import { useLeaderboard } from "./hooks/useLeaderboard";
import type { GamePhase } from "./types";

const BEST_SCORE_KEY = "freehangman-best";

function getBestScore(): number {
  const v = localStorage.getItem(BEST_SCORE_KEY);
  return v ? parseInt(v, 10) : 0;
}

export default function App() {
  // Land straight in the game — no menu friction. tetris/2048/snake
  // all auto-start; hangman has nothing to configure pre-game so the
  // start screen was just a tap to skip. "over" still shows a
  // Play Again screen because resetting state is meaningful UX.
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(getBestScore);
  const scoreRef = useRef(0);
  const { topScores, recentScores, submitScore, loading } = useLeaderboard("hangman");

  const handleScore = useCallback((s: number) => {
    scoreRef.current = s;
    setScore(s);
  }, []);

  const handleGameOver = useCallback(() => {
    const final = scoreRef.current;
    const best = getBestScore();
    if (final > best) {
      localStorage.setItem(BEST_SCORE_KEY, String(final));
      setBestScore(final);
    }
    submitScore(final);
    setPhase("over");
  }, [submitScore]);

  const start = useCallback(() => {
    setScore(0);
    scoreRef.current = 0;
    setPhase("playing");
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (phase !== "playing" && (e.key === " " || e.key === "Enter")) {
        start();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, start]);

  return (
    <Shell
      sidebar={
        <nav className="flex-1 px-4 flex flex-col gap-3 py-4">
          <div className="text-sm font-semibold" style={{ color: "var(--muted)" }}>
            Streak
          </div>
          <div
            className="text-3xl font-bold"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {score}
          </div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            Best: {bestScore}
          </div>
          {phase === "over" && (
            <button
              onClick={start}
              className="mt-4 px-4 py-2 rounded-xl font-semibold text-sm"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Play Again
            </button>
          )}
          <div
            className="mt-2 border-t"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="text-xs font-semibold px-4 pt-3" style={{ color: "var(--muted)" }}>
              Leaderboard
            </div>
            <Leaderboard topScores={topScores} recentScores={recentScores} loading={loading} />
          </div>
        </nav>
      }
      dock={
        <>
          <div className="text-sm font-semibold">
            Streak: {score}
          </div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Best: {bestScore}
          </div>
        </>
      }
    >
      <div className="relative w-full h-full">
        {phase === "playing" ? (
          <Game onScore={handleScore} onGameOver={handleGameOver} />
        ) : (
          // Game-over screen — kept because Play Again is meaningful
          // (reset score + new word). The pre-game menu was removed
          // so first load drops you straight into a fresh game.
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p
              className="text-xl font-bold"
              style={{ color: "var(--error)", fontFamily: "Fraunces, serif" }}
            >
              Game Over! Streak: {score}
            </p>
            <button
              onClick={start}
              className="px-6 py-3 rounded-xl font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Play Again
            </button>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Press Space or Enter to play again
            </p>
          </div>
        )}
      </div>
    </Shell>
  );
}
