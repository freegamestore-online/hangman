import { describe, it, expect } from "vitest";
import { CATEGORIES, WORDS, createWordDeck, isSolved } from "./words";

describe("word lists", () => {
  it.each(CATEGORIES)("%s has no duplicate words", (category) => {
    const list = WORDS[category];
    expect(new Set(list).size).toBe(list.length);
  });
});

describe("createWordDeck", () => {
  const total = CATEGORIES.reduce((n, c) => n + WORDS[c].length, 0);

  it("deals every word once before repeating", () => {
    const next = createWordDeck();
    const seen = new Set<string>();
    for (let i = 0; i < total; i++) {
      const { word, category } = next();
      const key = `${category}:${word}`;
      expect(seen.has(key)).toBe(false);
      expect(WORDS[category]).toContain(word);
      seen.add(key);
    }
    expect(seen.size).toBe(total);
  });

  it("reshuffles once the deck is exhausted", () => {
    const next = createWordDeck();
    for (let i = 0; i < total; i++) next();
    expect(CATEGORIES).toContain(next().category);
  });
});

describe("isSolved", () => {
  it("ignores spaces in multi-word answers", () => {
    expect(isSolved("COSTA RICA", new Set("COSTARI"))).toBe(true);
    expect(isSolved("COSTA RICA", new Set("COSTR"))).toBe(false);
  });
});
