import type { Category } from "../types";

export const WORDS: Record<Category, string[]> = {
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
    "WUSHU",
  ],
};

export const CATEGORIES: Category[] = ["Animals", "Countries", "Foods", "Sports"];

export interface PickedWord {
  word: string;
  category: Category;
}

function shuffle<T>(items: T[], random: () => number): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j]!, items[i]!];
  }
  return items;
}

/** Deals every word once in random order before any word repeats. */
export function createWordDeck(random: () => number = Math.random): () => PickedWord {
  let deck: PickedWord[] = [];
  return () => {
    if (deck.length === 0) {
      deck = shuffle(
        CATEGORIES.flatMap((category) => WORDS[category].map((word) => ({ word, category }))),
        random,
      );
    }
    return deck.pop()!;
  };
}

export function isSolved(word: string, guessed: ReadonlySet<string>): boolean {
  return [...word.replace(/ /g, "")].every((l) => guessed.has(l));
}
