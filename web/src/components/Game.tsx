import { useState, useRef, useEffect, useCallback } from "react";
import type { Category } from "../types";

const WORDS: Record<Category, string[]> = {
  Animals: [
    "ELEPHANT", "GIRAFFE", "PENGUIN", "DOLPHIN", "KANGAROO", "CHEETAH", "GORILLA", "LEOPARD",
    "BUFFALO", "PANTHER", "FLAMINGO", "PELICAN", "OCTOPUS", "WALRUS", "HAMSTER", "PARROT",
    "FALCON", "IGUANA", "JAGUAR", "KOALA", "LOBSTER", "MEERKAT", "NARWHAL", "OSTRICH",
    "PIRANHA", "QUOKKA", "RACCOON", "SALMON", "TOUCAN", "VULTURE", "WOMBAT", "ZEBRA",
    "ALPACA", "BADGER", "CAMEL", "DONKEY", "FERRET", "GAZELLE", "HERON", "JACKAL",
    "LEMUR", "MOOSE", "NEWT", "OTTER", "PANDA", "RABBIT", "SHARK", "TURTLE",
    "VIPER", "WHALE", "BISON", "COBRA", "CRANE", "EAGLE", "GECKO", "HORSE",
    "HYENA", "LLAMA", "MACAW", "MOUSE", "ORIOLE", "PYTHON", "RAVEN", "SLOTH",
    "SNAIL", "SQUID", "STORK", "SWALLOW", "TIGER", "TROUT", "WEASEL", "WOLVERINE",
    "COYOTE", "DINGO", "ERMINE", "FINCH", "GOOSE", "HAWK", "IMPALA", "KIWI",
    "LYNX", "MANTA", "OSPREY", "PUMA", "QUAIL", "ROBIN", "SKUNK", "TAPIR",
    "URCHIN", "VOLE", "WREN", "ANCHOVY", "BEETLE", "CICADA", "DRAGONFLY", "EGRET",
    "FROG", "GROUSE", "HERMIT", "IBIS", "JELLYFISH",
  ],
  Countries: [
    "ARGENTINA", "AUSTRALIA", "BELGIUM", "BRAZIL", "CAMBODIA", "CANADA", "COLOMBIA", "CROATIA",
    "DENMARK", "ECUADOR", "EGYPT", "ENGLAND", "ETHIOPIA", "FINLAND", "FRANCE", "GERMANY",
    "GREECE", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRELAND", "ISRAEL", "ITALY",
    "JAMAICA", "JAPAN", "JORDAN", "KENYA", "LATVIA", "LEBANON", "MALAYSIA", "MEXICO",
    "MONGOLIA", "MOROCCO", "NEPAL", "NETHERLANDS", "NIGERIA", "NORWAY", "PAKISTAN", "PANAMA",
    "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "ROMANIA", "RUSSIA", "SCOTLAND",
    "SENEGAL", "SINGAPORE", "SLOVENIA", "SOMALIA", "SPAIN", "SWEDEN", "SWITZERLAND", "TAIWAN",
    "TANZANIA", "THAILAND", "TUNISIA", "TURKEY", "UGANDA", "UKRAINE", "URUGUAY", "VENEZUELA",
    "VIETNAM", "WALES", "ZAMBIA", "ZIMBABWE", "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANGOLA",
    "ARMENIA", "AUSTRIA", "BAHAMAS", "BANGLADESH", "BARBADOS", "BELARUS", "BOLIVIA", "BOSNIA",
    "BOTSWANA", "BULGARIA", "BURUNDI", "CAMEROON", "CHILE", "CHINA", "CONGO", "COSTA RICA",
    "CUBA", "CYPRUS", "DOMINICA", "ERITREA", "ESTONIA", "FIJI", "GABON", "GEORGIA",
    "GHANA", "GUATEMALA", "GUINEA", "GUYANA",
  ],
  Foods: [
    "AVOCADO", "BURRITO", "CASHEW", "DUMPLING", "EGGPLANT", "FALAFEL", "GNOCCHI", "HUMMUS",
    "JAMBALAYA", "KEBAB", "LASAGNA", "MANGO", "NACHOS", "OMELETTE", "PANCAKE", "QUINOA",
    "RAVIOLI", "SAUSAGE", "TIRAMISU", "WAFFLE", "BAGUETTE", "BROWNIE", "CALZONE", "CROISSANT",
    "EDAMAME", "FOCACCIA", "GRANOLA", "HAZELNUT", "JALAPENO", "KETCHUP", "LEMONADE", "MACARON",
    "NOODLES", "OLIVE", "PRETZEL", "RHUBARB", "SAFFRON", "TEMPURA", "VANILLA", "WALNUT",
    "ALMOND", "BANANA", "CANNOLI", "DONUT", "ESPRESSO", "FONDUE", "GAZPACHO", "HONEY",
    "ICECREAM", "JELLY", "KIMCHI", "LINGUINE", "MUSHROOM", "NUTMEG", "OREGANO", "PAPAYA",
    "RISOTTO", "SPINACH", "TACO", "YOGURT", "ANCHOVY", "BISCUIT", "CARAMEL", "DILL",
    "FENNEL", "GUAVA", "HALIBUT", "JASMINE", "KUMQUAT", "LOBSTER", "MOZZARELLA", "NECTARINE",
    "OYSTER", "PUMPKIN", "RADISH", "SARDINE", "TRUFFLE", "VINEGAR", "WASABI", "ZUCCHINI",
    "APRICOT", "BLUEBERRY", "CINNAMON", "DRAGONFRUIT", "ENDIVE", "GARLIC", "GINGER", "KIWI",
    "LETTUCE", "MELON", "PAPRIKA", "PEACH", "PINEAPPLE", "SALMON", "SHRIMP", "TOMATO",
    "TURNIP", "CABBAGE", "CELERY", "COCONUT",
  ],
  Sports: [
    "ARCHERY", "BADMINTON", "BASEBALL", "BASKETBALL", "BIATHLON", "BOBSLED", "BOWLING", "BOXING",
    "CANOEING", "CRICKET", "CROQUET", "CURLING", "CYCLING", "DIVING", "FENCING", "FOOTBALL",
    "GOLF", "GYMNASTICS", "HANDBALL", "HOCKEY", "JAVELIN", "JUDO", "KARATE", "KAYAKING",
    "LACROSSE", "LUGE", "MARATHON", "NETBALL", "PENTATHLON", "POLO", "RACING", "ROWING",
    "RUGBY", "SAILING", "SHOOTING", "SKATING", "SKIING", "SNOWBOARD", "SOCCER", "SOFTBALL",
    "SPRINTING", "SQUASH", "SURFING", "SWIMMING", "TENNIS", "TRIATHLON", "VOLLEYBALL", "WATERSKI",
    "WRESTLING", "BILLIARDS", "CLIMBING", "DARTS", "EQUESTRIAN", "FISHING", "FRISBEE", "HURDLES",
    "KICKBOXING", "PARKOUR", "POWERLIFTING", "RAFTING", "SKATEBOARD", "SNOOKER", "TAEKWONDO",
    "TRAPEZE", "WEIGHTLIFTING", "AEROBICS", "DECATHLON", "DODGEBALL", "HEPTATHLON",
    "HORSEBACK", "ICESTOCK", "JOGGING", "KENDO", "MOTOCROSS", "ORIENTEERING", "PARACHUTING",
    "PICKLEBALL", "PILATES", "RAPPELLING", "RODEO", "SKELETON", "SLALOM", "STEEPLECHASE",
    "TOBOGGANING", "TRAMPOLINING", "VAULTING", "WAKEBOARD", "WINDSURF",
    "WUSHU", "HANDBALL", "LACROSSE", "ARCHERY", "BADMINTON", "BASEBALL", "BASKETBALL",
    "BIATHLON", "BOWLING", "CANOEING", "CRICKET", "CROQUET", "CURLING",
  ],
};

const CATEGORIES: Category[] = ["Animals", "Countries", "Foods", "Sports"];
const MAX_WRONG = 6;

interface GameProps {
  onScore: (streak: number) => void;
  onGameOver: () => void;
}

function pickWord(): { word: string; category: Category } {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]!;
  const wordList = WORDS[category];
  const word = wordList[Math.floor(Math.random() * wordList.length)]!;
  return { word, category };
}

function drawHangman(ctx: CanvasRenderingContext2D, wrong: number, animProgress: number) {
  const dpr = window.devicePixelRatio || 1;
  const w = ctx.canvas.width / dpr;
  const h = ctx.canvas.height / dpr;
  const scale = Math.min(w, h) / 300;
  const cx = w / 2;
  const baseY = h - 30 * scale;

  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Get colors from CSS variables
  const style = getComputedStyle(document.documentElement);
  const lineColor = style.getPropertyValue("--ink").trim() || "#1a1a1a";
  const gallowsColor = style.getPropertyValue("--muted").trim() || "#6b7280";

  // Gallows (always drawn)
  ctx.strokeStyle = gallowsColor;
  ctx.lineWidth = 3 * scale;
  // Base
  ctx.beginPath();
  ctx.moveTo(cx - 80 * scale, baseY);
  ctx.lineTo(cx + 30 * scale, baseY);
  ctx.stroke();
  // Upright
  ctx.beginPath();
  ctx.moveTo(cx - 40 * scale, baseY);
  ctx.lineTo(cx - 40 * scale, baseY - 200 * scale);
  ctx.stroke();
  // Top beam
  ctx.beginPath();
  ctx.moveTo(cx - 40 * scale, baseY - 200 * scale);
  ctx.lineTo(cx + 40 * scale, baseY - 200 * scale);
  ctx.stroke();
  // Rope
  ctx.beginPath();
  ctx.moveTo(cx + 40 * scale, baseY - 200 * scale);
  ctx.lineTo(cx + 40 * scale, baseY - 170 * scale);
  ctx.stroke();

  // Body parts
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3 * scale;

  const personX = cx + 40 * scale;
  const headY = baseY - 170 * scale;
  const headR = 18 * scale;

  const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

  const drawPart = (index: number, p: number) => {
    const ep = ease(p);
    switch (index) {
      case 0: {
        // Head
        ctx.beginPath();
        ctx.arc(personX, headY + headR, headR, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ep);
        ctx.stroke();
        break;
      }
      case 1: {
        // Body
        const bodyTop = headY + headR * 2;
        const bodyLen = 60 * scale;
        ctx.beginPath();
        ctx.moveTo(personX, bodyTop);
        ctx.lineTo(personX, bodyTop + bodyLen * ep);
        ctx.stroke();
        break;
      }
      case 2: {
        // Left arm
        const armY = headY + headR * 2 + 15 * scale;
        ctx.beginPath();
        ctx.moveTo(personX, armY);
        ctx.lineTo(personX - 30 * scale * ep, armY + 35 * scale * ep);
        ctx.stroke();
        break;
      }
      case 3: {
        // Right arm
        const armY2 = headY + headR * 2 + 15 * scale;
        ctx.beginPath();
        ctx.moveTo(personX, armY2);
        ctx.lineTo(personX + 30 * scale * ep, armY2 + 35 * scale * ep);
        ctx.stroke();
        break;
      }
      case 4: {
        // Left leg
        const legY = headY + headR * 2 + 60 * scale;
        ctx.beginPath();
        ctx.moveTo(personX, legY);
        ctx.lineTo(personX - 25 * scale * ep, legY + 40 * scale * ep);
        ctx.stroke();
        break;
      }
      case 5: {
        // Right leg
        const legY2 = headY + headR * 2 + 60 * scale;
        ctx.beginPath();
        ctx.moveTo(personX, legY2);
        ctx.lineTo(personX + 25 * scale * ep, legY2 + 40 * scale * ep);
        ctx.stroke();
        break;
      }
    }
  };

  for (let i = 0; i < Math.min(wrong, MAX_WRONG); i++) {
    if (i < wrong - 1) {
      drawPart(i, 1);
    } else {
      drawPart(i, animProgress);
    }
  }

  ctx.restore();
}

export function Game({ onScore, onGameOver }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordRef = useRef(pickWord());
  const guessedRef = useRef<Set<string>>(new Set());
  const wrongCountRef = useRef(0);
  const streakRef = useRef(0);
  const gameActiveRef = useRef(true);
  const animFrameRef = useRef(0);
  const animStartRef = useRef<number | null>(null);
  const [, setTick] = useState(0);

  const rerender = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  const animateNewPart = useCallback(() => {
    const ANIM_DURATION = 300;
    const start = animStartRef.current;
    if (start === null) return;

    const now = performance.now();
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / ANIM_DURATION);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawHangman(ctx, wrongCountRef.current, progress);
      }
    }

    if (progress < 1) {
      animFrameRef.current = requestAnimationFrame(animateNewPart);
    } else {
      animStartRef.current = null;
    }
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawHangman(ctx, wrongCountRef.current, 1);
  }, []);

  const startNewRound = useCallback(() => {
    wordRef.current = pickWord();
    guessedRef.current = new Set();
    wrongCountRef.current = 0;
    gameActiveRef.current = true;
    animStartRef.current = null;
    cancelAnimationFrame(animFrameRef.current);
    redraw();
    rerender();
  }, [redraw, rerender]);

  const handleGuess = useCallback((letter: string) => {
    if (!gameActiveRef.current) return;
    if (guessedRef.current.has(letter)) return;

    guessedRef.current.add(letter);
    const word = wordRef.current.word;

    if (!word.includes(letter)) {
      wrongCountRef.current++;
      // Animate the new body part
      animStartRef.current = performance.now();
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(animateNewPart);

      if (wrongCountRef.current >= MAX_WRONG) {
        gameActiveRef.current = false;
        rerender();
        setTimeout(() => {
          onScore(streakRef.current);
          onGameOver();
        }, 1500);
        return;
      }
    }

    // Check win: all letters in word are guessed
    const wordLetters = new Set(word.replace(/ /g, "").split(""));
    const allGuessed = [...wordLetters].every((l) => guessedRef.current.has(l));
    if (allGuessed) {
      gameActiveRef.current = false;
      streakRef.current++;
      onScore(streakRef.current);
      rerender();
      setTimeout(() => {
        startNewRound();
      }, 1200);
      return;
    }

    rerender();
  }, [animateNewPart, rerender, startNewRound, onScore, onGameOver]);

  // Keyboard input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key.length === 1 && key >= "A" && key <= "Z") {
        handleGuess(key);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleGuess]);

  // Canvas resize and initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      redraw();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [redraw]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const word = wordRef.current.word;
  const category = wordRef.current.category;
  const guessed = guessedRef.current;
  const wrongCount = wrongCountRef.current;
  const isWon = [...new Set(word.replace(/ /g, "").split(""))].every((l) => guessed.has(l));
  const isLost = wrongCount >= MAX_WRONG;
  const displayWord = word
    .split("")
    .map((ch) => {
      if (ch === " ") return "  ";
      if (guessed.has(ch) || isLost) return ch;
      return "_";
    })
    .join(" ");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-col items-center h-full w-full px-2 py-1 gap-1 overflow-hidden">
      {/* Category + wrong count */}
      <div className="flex items-center gap-3 shrink-0">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-lg"
          style={{ background: "var(--panel)", color: "var(--accent)" }}
        >
          {category}
        </span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {wrongCount}/{MAX_WRONG} wrong
        </span>
      </div>

      {/* Canvas — fills available space between header and keyboard */}
      <div className="flex-1 min-h-0 w-full max-w-[280px] relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Word display */}
      <div
        className="text-lg font-bold tracking-[0.25em] text-center px-1 shrink-0"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        {displayWord}
      </div>

      {/* Win / Lose message */}
      {isWon && (
        <div className="text-xs font-bold shrink-0" style={{ color: "var(--success)" }}>
          Correct! Next word...
        </div>
      )}
      {isLost && (
        <div className="text-xs font-bold shrink-0" style={{ color: "var(--error)" }}>
          The word was: {word}
        </div>
      )}

      {/* On-screen keyboard — compact grid, always visible */}
      <div className="grid grid-cols-9 gap-1 w-full max-w-[400px] shrink-0 pb-1">
        {letters.map((letter) => {
          const isGuessed = guessed.has(letter);
          const isCorrect = isGuessed && word.includes(letter);
          const isWrong = isGuessed && !word.includes(letter);

          let bg = "var(--panel)";
          let color = "var(--ink)";
          if (isCorrect) {
            bg = "var(--success)";
            color = "#fff";
          } else if (isWrong) {
            bg = "var(--error)";
            color = "#fff";
          }

          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={isGuessed || !gameActiveRef.current}
              className="font-semibold rounded-lg transition-colors aspect-square"
              style={{
                background: bg,
                color,
                opacity: isGuessed ? 0.6 : 1,
                border: "1px solid var(--line)",
                cursor: isGuessed || !gameActiveRef.current ? "default" : "pointer",
                fontSize: "0.75rem",
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
