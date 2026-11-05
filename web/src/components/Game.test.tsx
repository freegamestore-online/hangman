import { describe, it, expect, vi, afterEach, beforeAll } from "vitest";
import { render, fireEvent } from "@testing-library/react";

vi.mock("../lib/words", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../lib/words")>()),
  createWordDeck: () => () => ({ word: "CAT", category: "Animals" as const }),
}));

import { Game } from "./Game";

// jsdom has no canvas; the drawing is irrelevant to these tests.
beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});
afterEach(() => vi.useRealTimers());

const press = (key: string) => fireEvent.keyDown(window, { key });

describe("Game timers", () => {
  it("does not report game over after unmounting mid-delay", () => {
    vi.useFakeTimers();
    const onGameOver = vi.fn();
    const { unmount } = render(<Game onScore={() => {}} onGameOver={onGameOver} />);
    for (const k of "BDEFGH") press(k);
    unmount();
    vi.advanceTimersByTime(2000);
    expect(onGameOver).not.toHaveBeenCalled();
  });

  it("still reports game over when left mounted", () => {
    vi.useFakeTimers();
    const onGameOver = vi.fn();
    render(<Game onScore={() => {}} onGameOver={onGameOver} />);
    for (const k of "BDEFGH") press(k);
    vi.advanceTimersByTime(2000);
    expect(onGameOver).toHaveBeenCalledOnce();
  });

  it("ignores letter keys pressed with a modifier", () => {
    const onScore = vi.fn();
    render(<Game onScore={onScore} onGameOver={() => {}} />);
    fireEvent.keyDown(window, { key: "c", metaKey: true });
    press("a");
    press("t");
    expect(onScore).not.toHaveBeenCalled();
    press("c");
    expect(onScore).toHaveBeenCalledWith(1);
  });
});
