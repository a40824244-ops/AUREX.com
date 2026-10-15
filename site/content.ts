// All text and data for AUREX. *word* = the italic word of a heading (see Rich in components/Rich.tsx).
// Prices are samples (concept website).


export const rail = {
  chapters: [
    { id: "light", label: "Light" },
    { id: "drop", label: "Drop" },
    { id: "glass", label: "Glass" },
    { id: "skin", label: "Skin" },
    { id: "shop", label: "Shop" },
  ],
};

export const loader = {
  value: 22,
  unit: "%",
  label: "extrait",
  note: "AUREX · extrait de parfum",
};

export const hero = {
  frames: "",
  poster: "/images/nocturne/hero-lit.webp",
  eyebrow: "AUREX — extrait de parfum",
  lines: ["night has", "*a scent.*"],
  sub: "Bergamot in the dark, rose through smoke, amber until morning.",
  hint: "Scroll to turn on the light",
};

export const statement = {
  text: "Some things are only *noticed* in the dark. A scent is one of them.",
  foot: "Composed for after dark · 22% concentration · lasts 10–12 hours",
};

export const drop = {
  frames: "/frames/nocturne-drop",
  eyebrow: "The scent",
  title: ["one drop,", "*three acts.*"],
  notes: [
    {
      id: "top",
      act: "Act I · Top",
      name: "Bergamot & pink pepper",
      text: "A bright, green-citrus spark with a peppered edge. The first thing they notice.",
      lasts: "First 15 minutes",
      image: "/images/nocturne/note-top.webp",
    },
    {
      id: "heart",
      act: "Act II · Heart",
      name: "Rose & smoke",
      text: "Dark rose petals held over a struck match. Soft, then not quite innocent.",
      lasts: "The first hours",
      image: "/images/nocturne/note-heart.webp",
    },
    {
      id: "base",
      act: "Act III · Base",
      name: "Amber, vanilla & oud",
      text: "Warm resin, black vanilla pod and a thread of oud. What stays on the collar.",
      lasts: "Until morning",
      image: "/images/nocturne/note-base.webp",
    },
  ],
};

export const ticker = [
  "Complimentary samples with every order",
  "Free engraving",
  "Delivered in 48 hours",
  "Discovery set Rs. 4,999",
  "Gift-wrapped by hand",
];

export const collection = {
  eyebrow: "The collection",
  title: ["three glasses,", "*one night.*"],
  glasses: [
    {
      id: "noir",
      name: "Janan Sports",
      mood: "Crisp aquatic energy with a diamond cut. Fresh, vibrant, unforgettable.",
      notes: "Marine · Bergamot · Pink Pepper · White Cedar",
      size: "50 ml",
      price: "Rs. 2,199",
      image: "/images/nocturne/bottle-noir.webp",
      glow: "#1a3b5c",
      chip: "#254b77",
    },
    {
      id: "ambre",
      name: "Legend",
      mood: "Candlelight on skin. The house signature warm amber aura.",
      notes: "Amber Resin · Warm Vanilla · Pink Pepper · Tonka",
      size: "50 ml",
      price: "Rs. 1,699",
      image: "/images/nocturne/bottle-ambre.webp",
      glow: "#7a4a16",
      chip: "#c9802e",
    },
    {
      id: "velours",
      name: "9pm Night Light",
      mood: "The night begins at nine. Smoked rose and a ruby red flame.",
      notes: "Smoked Rose · Black Vanilla · Amber · Oud Wood",
      size: "50 ml",
      price: "Rs. 1,699",
      image: "/images/nocturne/bottle-velours.webp",
      glow: "#6b1e2e",
      chip: "#8a1b2c",
    },
  ],
};

export const wrist = {
  eyebrow: "The ritual",
  title: ["wear it", "*close.*"],
  text: "Two sprays, twenty centimetres away. Let it dry, never rub. Warm skin does the rest.",
  image: "/images/nocturne/wrist.webp",
  points: [
    { name: "The wrist", text: "Where it meets every handshake." },
    { name: "The neck", text: "For whoever leans in." },
    { name: "Behind the ear", text: "The one place it lasts all night." },
  ],
};

export const sizes = {
  eyebrow: "Choose your size",
  title: ["the same night,", "*four ways.*"],
  items: [
    { name: "Discovery vial", ml: 3, price: "Rs. 200", note: "Attar" },
    { name: "Pocket spray", ml: 5, price: "Rs. 180", note: "Fits anywhere" },
    { name: "Mini extrait", ml: 6, price: "Rs. 400", note: "Attar" },
    { name: "Extrait", ml: 50, price: "Rs. 1,699", note: "The full bottle" },
  ],
};

export const finder = {
  eyebrow: "Find your night",
  title: ["three questions,", "*one scent.*"],
  questions: [
    { q: "Where does your night begin?", options: ["A quiet room", "A late dinner", "A rooftop"], pick: 1 },
    { q: "What do you reach for?", options: ["Something fresh", "Something warm", "Something dark"], pick: 1 },
    { q: "How close?", options: ["Arm's length", "Close enough to notice", "Only you"], pick: 1 },
  ],
  result: {
    label: "Your night",
    name: "Azzaro Wanted",
    text: "Vibrant lemon, spicy ginger and warm tonka. A daring signature for unforgettable nights.",
    price: "50 ml · Rs. 1,699",
    image: "/images/nocturne/bottle-azzaro.webp",
    cta: "Try the discovery set",
  },
};

export const gifting = {
  eyebrow: "Gifting",
  title: ["for someone", "*after dark.*"],
  tiles: [
    {
      id: "discovery",
      title: "The discovery set",
      text: "Janan Sports, 9pm Night Light & Legend in 2 ml. The full price is credited back on your first bottle.",
      price: "Rs. 4,999",
      image: "/images/nocturne/discovery-set.webp",
    },
    { id: "engrave", title: "Free engraving", text: "An initial on the glass, by hand.", initial: "N" },
    { id: "wrap", title: "Gift-wrapped by hand", text: "Black paper, wax seal, a handwritten card.", image: "/images/nocturne/note-heart.webp" },
    { id: "samples", title: "Samples with every order", text: "Two 1 ml vials, chosen for you.", image: "/images/nocturne/note-top.webp" },
    { id: "refill", title: "Refill and save 20%", text: "Bring the bottle back, keep the glass.", image: "/images/nocturne/note-base.webp" },
  ],
};

export const reviews = {
  eyebrow: "Worn after dark",
  title: ["what they", "*remember.*"],
  items: [
    { quote: "Someone stopped me on the stairs to ask what it was. Janan Sports is incredible.", name: "Hamza R.", city: "Lahore", wears: "Janan Sports · 50 ml" },
    { quote: "Still on my collar the next morning. Legend is pure class.", name: "Kabir S.", city: "Karachi", wears: "Legend · 50 ml" },
    { quote: "9pm Night Light is a whole evening in a bottle. I save it for special occasions.", name: "Meher A.", city: "Islamabad", wears: "9pm Night Light · 50 ml" },
    { quote: "Fresh, energetic, but never harsh. My friends keep asking for it.", name: "Bilal M.", city: "Rawalpindi", wears: "Janan Sports · 50 ml" },
    { quote: "Ten hours later it is still there, just richer.", name: "Usman P.", city: "Faisalabad", wears: "Legend · 50 ml" },
    { quote: "The scent quality and packaging made it the best gift I have ever given.", name: "Zainab Q.", city: "Multan", wears: "9pm Night Light · 50 ml" },
  ],
};

export const closing = {
  image: "/images/nocturne/bottle-afshan.webp",
  lines: ["stay a little", "*longer.*"],
  cta: "Shop AUREX",
  note: "Fast delivery across Pakistan · authentic fragrances",
};

export const contact = {
  title: ["questions,", "*after dark?*"],
  text: "Need a hand choosing a scent, finding your order, or sending a gift? Leave the house a note.",
  email: "aurex261@gmail.com",
  whatsapp: "923108116918",
};

export const footer = {
  word: "AUREX",
  columns: [
    { title: "Shop", links: ["Janan Sports", "Legend", "9pm Night Light", "Impreal Valley"] },
    { title: "The scent", links: ["Notes", "The ritual", "Sizes", "Refills"] },
    { title: "Gifting", links: ["Engraving", "Gift wrap", "Gift cards"] },
  ],
  letter: "Letters, after dark",
  letterNote: "New nights, first. Once a month.",
  note: "AUREX Perfume — Luxury Fragrances.",
};
