import {useEffect, useMemo, useState} from 'react';
import {
  ArrowLeft,
  Cloud,
  CloudRain,
  Flower2,
  Image as ImageIcon,
  Mic,
  Music,
  Puzzle,
  Shapes,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import type {ModuleDef, ModuleId} from './types.ts';

// ---------------------------------------------------------------------------
// Module registry — the home screen is generated from this list.
// Five modules are fully interactive today; five need photos/recordings or a
// hosting decision (see the Firebase conversation) before they can go live.
// They still appear so the layout and navigation are complete and testable.
// ---------------------------------------------------------------------------
const MODULES: ModuleDef[] = [
  {id: 'today', title: 'Today Is...', description: 'See the date, day, and season at a glance.', accent: 'gold', emoji: '☀️', needsContent: false},
  {id: 'garden', title: 'Virtual Garden', description: 'Tap to plant and pick flowers in a calm garden.', accent: 'sage', emoji: '🌷', needsContent: false},
  {id: 'natureSounds', title: 'Nature Sounds', description: 'Rain, ocean, and birdsong to relax to.', accent: 'blue', emoji: '🎧', needsContent: false},
  {id: 'matching', title: 'Simple Matching', description: 'Find the matching pairs. No clock, no pressure.', accent: 'terracotta', emoji: '🃏', needsContent: false},
  {id: 'coloring', title: 'Coloring & Painting', description: 'Tap to fill in gentle pictures with color.', accent: 'gold', emoji: '🎨', needsContent: false},
  {id: 'memoryLane', title: 'Memory Lane Photos', description: 'Family photos, with names to remember them by.', accent: 'sage', emoji: '📷', needsContent: true},
  {id: 'familyVoices', title: 'Family Voices', description: 'Short recorded messages from people who love you.', accent: 'terracotta', emoji: '💬', needsContent: true},
  {id: 'singAlong', title: 'Sing Along', description: 'Familiar old songs with the words on screen.', accent: 'blue', emoji: '🎵', needsContent: true},
  {id: 'sorting', title: 'Sorting & Categories', description: 'Sort everyday objects into simple groups.', accent: 'gold', emoji: '🧺', needsContent: true},
  {id: 'puzzle', title: 'Puzzle Pieces', description: 'Big, easy jigsaw puzzles of pretty pictures.', accent: 'sage', emoji: '🧩', needsContent: true},
];

const ACCENTS: Record<ModuleDef['accent'], {bg: string; bgDeep: string; text: string}> = {
  sage: {bg: 'var(--mg-sage)', bgDeep: 'var(--mg-sage-deep)', text: '#FFFFFF'},
  gold: {bg: 'var(--mg-gold)', bgDeep: 'var(--mg-gold-deep)', text: '#3A362F'},
  blue: {bg: 'var(--mg-blue)', bgDeep: 'var(--mg-blue-deep)', text: '#FFFFFF'},
  terracotta: {bg: 'var(--mg-terracotta)', bgDeep: 'var(--mg-terracotta-deep)', text: '#FFFFFF'},
};

export default function App() {
  const [active, setActive] = useState<ModuleId | null>(null);
  const activeModule = useMemo(() => MODULES.find(m => m.id === active) ?? null, [active]);

  return (
    <div className="min-h-screen w-full" style={{background: 'var(--mg-cream)'}}>
      {activeModule ? (
        <ModuleScreen module={activeModule} onBack={() => setActive(null)} />
      ) : (
        <HomeScreen onOpen={setActive} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Home screen
// ---------------------------------------------------------------------------
function HomeScreen({onOpen}: {onOpen: (id: ModuleId) => void}) {
  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 md:py-14">
      <header className="flex items-center gap-4 mb-10">
        <div
          className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shrink-0"
          style={{background: 'var(--mg-sage)'}}
        >
          🌱
        </div>
        <div>
          <p className="text-lg font-medium" style={{color: 'var(--mg-ink-soft)'}}>{greeting}</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{color: 'var(--mg-ink)'}}>
            MindGarden
          </h1>
        </div>
      </header>

      <p className="text-xl mb-10 max-w-2xl" style={{color: 'var(--mg-ink-soft)'}}>
        Choose something to do. There's no wrong choice, and no rush.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {MODULES.map(m => (
          <ModuleCard key={m.id} module={m} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({module: m, onOpen}: {module: ModuleDef; onOpen: (id: ModuleId) => void}) {
  const accent = ACCENTS[m.accent];
  return (
    <button
      onClick={() => onOpen(m.id)}
      className="mg-tap text-left rounded-[28px] p-6 flex items-center gap-5 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2"
      style={{background: '#FFFFFF', border: `2px solid ${accent.bg}22`}}
    >
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shrink-0"
        style={{background: accent.bg}}
      >
        <span>{m.emoji}</span>
      </div>
      <div className="min-w-0">
        <h2 className="text-2xl font-semibold mb-1" style={{color: 'var(--mg-ink)'}}>{m.title}</h2>
        <p className="text-lg" style={{color: 'var(--mg-ink-soft)'}}>{m.description}</p>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Module screen shell — shared header/back button for every module
// ---------------------------------------------------------------------------
function ModuleScreen({module: m, onBack}: {module: ModuleDef; onBack: () => void}) {
  const accent = ACCENTS[m.accent];
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:px-10 md:py-10 min-h-screen flex flex-col">
      <button
        onClick={onBack}
        className="mg-tap flex items-center gap-2 text-lg font-medium mb-8 rounded-2xl px-4 py-3 w-fit"
        style={{background: '#FFFFFF', color: 'var(--mg-ink)'}}
      >
        <ArrowLeft size={22} /> Back to MindGarden
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{background: accent.bg}}>
          {m.emoji}
        </div>
        <h1 className="text-3xl font-semibold" style={{color: 'var(--mg-ink)'}}>{m.title}</h1>
      </div>

      <div className="flex-1">
        {m.needsContent ? <ComingSoon module={m} /> : <ModuleBody id={m.id} />}
      </div>
    </div>
  );
}

function ComingSoon({module: m}: {module: ModuleDef}) {
  const notes: Record<string, string> = {
    memoryLane: 'This module will show family photos once they\u2019re added — either uploaded directly or synced from a family-sharing page.',
    familyVoices: 'This module will play short voice messages once family members record and upload them.',
    singAlong: 'This module needs a short list of favorite songs (title + lyrics) to display, and audio if you\u2019d like it to play along.',
    sorting: 'This module needs a set of real, recognizable object images to sort into groups.',
    puzzle: 'This module needs a few comforting photos to turn into large-piece puzzles.',
  };
  return (
    <div className="rounded-[28px] p-10 text-center" style={{background: '#FFFFFF'}}>
      <Sparkles className="mx-auto mb-4" size={36} style={{color: 'var(--mg-gold)'}} />
      <p className="text-xl mb-2" style={{color: 'var(--mg-ink)'}}>This module is ready to build.</p>
      <p className="text-lg" style={{color: 'var(--mg-ink-soft)'}}>{notes[m.id]}</p>
    </div>
  );
}

function ModuleBody({id}: {id: ModuleId}) {
  switch (id) {
    case 'today':
      return <TodayIs />;
    case 'garden':
      return <VirtualGarden />;
    case 'natureSounds':
      return <NatureSounds />;
    case 'matching':
      return <SimpleMatching />;
    case 'coloring':
      return <ColoringPage />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// 1. Today Is... — orientation module
// ---------------------------------------------------------------------------
function TodayIs() {
  const now = new Date();
  const weekday = now.toLocaleDateString(undefined, {weekday: 'long'});
  const monthDay = now.toLocaleDateString(undefined, {month: 'long', day: 'numeric'});
  const year = now.getFullYear();
  const month = now.getMonth();
  const season = ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer', 'Summer', 'Summer', 'Fall', 'Fall', 'Fall', 'Winter'][month];
  const timeOfDay = now.getHours() < 12 ? 'Morning' : now.getHours() < 17 ? 'Afternoon' : 'Evening';
  const SeasonIcon = season === 'Winter' ? Cloud : season === 'Summer' ? Sun : season === 'Spring' ? Flower2 : CloudRain;

  return (
    <div className="rounded-[28px] p-10 text-center" style={{background: '#FFFFFF'}}>
      <p className="text-2xl mb-2" style={{color: 'var(--mg-ink-soft)'}}>{timeOfDay}</p>
      <h2 className="text-5xl font-bold mb-3" style={{color: 'var(--mg-ink)'}}>{weekday}</h2>
      <p className="text-3xl mb-8" style={{color: 'var(--mg-ink)'}}>{monthDay}, {year}</p>
      <div
        className="inline-flex items-center gap-3 rounded-3xl px-6 py-4 text-2xl font-medium"
        style={{background: 'var(--mg-cream-deep)', color: 'var(--mg-ink)'}}
      >
        <SeasonIcon size={28} /> {season}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. Virtual Garden — tap to plant/pick, always succeeds
// ---------------------------------------------------------------------------
const FLOWER_EMOJI = ['🌷', '🌼', '🌸', '🌻', '🌹'];

function VirtualGarden() {
  const [flowers, setFlowers] = useState<{id: string; x: number; y: number; emoji: string}[]>([]);

  const plant = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const emoji = FLOWER_EMOJI[Math.floor(Math.random() * FLOWER_EMOJI.length)];
    setFlowers(f => [...f, {id: `${Date.now()}-${Math.random()}`, x, y, emoji}]);
  };

  const pick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlowers(f => f.filter(fl => fl.id !== id));
  };

  return (
    <div>
      <p className="text-xl mb-4 text-center" style={{color: 'var(--mg-ink-soft)'}}>
        Tap anywhere to plant a flower. Tap a flower to pick it.
      </p>
      <div
        onClick={plant}
        className="relative rounded-[28px] w-full"
        style={{
          height: '60vh',
          minHeight: 360,
          background: 'linear-gradient(180deg, #E9F1E5 0%, #DCEBD6 100%)',
          cursor: 'pointer',
        }}
      >
        {flowers.map(f => (
          <span
            key={f.id}
            onClick={e => pick(f.id, e)}
            className="mg-tap absolute text-4xl select-none"
            style={{left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(-50%, -50%)'}}
          >
            {f.emoji}
          </span>
        ))}
        {flowers.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-lg" style={{color: 'var(--mg-ink-soft)'}}>
            Your garden is empty — tap to plant something 🌱
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Nature Sounds — audio files are not bundled yet; wire up real files
// under /public/sounds/*.mp3 and this UI will play them as-is.
// ---------------------------------------------------------------------------
const SOUNDS = [
  {id: 'rain', label: 'Rain', emoji: '🌧️', file: '/sounds/rain.mp3'},
  {id: 'ocean', label: 'Ocean Waves', emoji: '🌊', file: '/sounds/ocean.mp3'},
  {id: 'birds', label: 'Birdsong', emoji: '🐦', file: '/sounds/birds.mp3'},
  {id: 'fireplace', label: 'Fireplace', emoji: '🔥', file: '/sounds/fireplace.mp3'},
];

function NatureSounds() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  useEffect(() => () => audioEl?.pause(), [audioEl]);

  const toggle = (id: string, file: string) => {
    if (playingId === id) {
      audioEl?.pause();
      setPlayingId(null);
      return;
    }
    audioEl?.pause();
    const el = new Audio(file);
    el.loop = true;
    el.play().catch(() => {
      // Audio file not present yet — this is expected until sound files are added.
    });
    setAudioEl(el);
    setPlayingId(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {SOUNDS.map(s => {
        const isPlaying = playingId === s.id;
        return (
          <button
            key={s.id}
            onClick={() => toggle(s.id, s.file)}
            className="mg-tap rounded-[24px] p-6 flex items-center gap-4 text-left"
            style={{background: isPlaying ? 'var(--mg-blue)' : '#FFFFFF', color: isPlaying ? '#fff' : 'var(--mg-ink)'}}
          >
            <span className="text-4xl">{s.emoji}</span>
            <span className="text-xl font-medium flex-1">{s.label}</span>
            {isPlaying ? <Volume2 size={26} /> : <VolumeX size={26} />}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. Simple Matching — generous time, gentle feedback, no penalty for misses
// ---------------------------------------------------------------------------
const MATCH_EMOJI = ['🐶', '🐱', '🐰', '🦋', '🌼', '🍎'];

function shuffledDeck() {
  const pairs = [...MATCH_EMOJI, ...MATCH_EMOJI]
    .map((emoji, i) => ({id: `${emoji}-${i}`, emoji}))
    .sort(() => Math.random() - 0.5);
  return pairs;
}

function SimpleMatching() {
  const [deck, setDeck] = useState(shuffledDeck);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);

  const flip = (cardId: string, emoji: string) => {
    if (flipped.length === 2 || flipped.includes(cardId) || matched.includes(emoji)) return;
    const next = [...flipped, cardId];
    setFlipped(next);
    if (next.length === 2) {
      const [firstId, secondId] = next;
      const firstEmoji = deck.find(c => c.id === firstId)?.emoji;
      const secondEmoji = deck.find(c => c.id === secondId)?.emoji;
      if (firstEmoji === secondEmoji) {
        setTimeout(() => {
          setMatched(m => [...m, firstEmoji!]);
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const reset = () => {
    setDeck(shuffledDeck());
    setFlipped([]);
    setMatched([]);
  };

  const allMatched = matched.length === MATCH_EMOJI.length;

  return (
    <div>
      <p className="text-xl mb-4 text-center" style={{color: 'var(--mg-ink-soft)'}}>
        Tap two cards to find a match. Take your time.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
        {deck.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.emoji);
          return (
            <button
              key={card.id}
              onClick={() => flip(card.id, card.emoji)}
              className="mg-tap aspect-square rounded-3xl flex items-center justify-center text-4xl"
              style={{background: isFlipped ? '#FFFFFF' : 'var(--mg-sage)'}}
            >
              {isFlipped ? card.emoji : ''}
            </button>
          );
        })}
      </div>
      {allMatched && (
        <div className="text-center">
          <p className="text-2xl font-semibold mb-4" style={{color: 'var(--mg-ink)'}}>Lovely! You matched them all. 🎉</p>
          <button onClick={reset} className="mg-tap rounded-2xl px-6 py-3 text-lg font-medium" style={{background: 'var(--mg-gold)', color: 'var(--mg-ink)'}}>
            Play Again
          </button>
        </div>
      )}
      {!allMatched && (
        <div className="text-center">
          <button onClick={reset} className="mg-tap rounded-2xl px-6 py-3 text-lg font-medium" style={{background: '#FFFFFF', color: 'var(--mg-ink)'}}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. Coloring & Painting — tap-to-fill simple SVG regions
// ---------------------------------------------------------------------------
const PALETTE = ['#D9A44A', '#7C9885', '#7FA1B8', '#D48A6A', '#B98FC7', '#E7D9C0'];

function ColoringPage() {
  const [color, setColor] = useState(PALETTE[0]);
  const [fills, setFills] = useState<Record<string, string>>({petal1: '#FFFFFF', petal2: '#FFFFFF', petal3: '#FFFFFF', petal4: '#FFFFFF', center: '#FFFFFF', stem: '#FFFFFF'});

  const fill = (part: string) => setFills(f => ({...f, [part]: color}));

  return (
    <div>
      <p className="text-xl mb-4 text-center" style={{color: 'var(--mg-ink-soft)'}}>
        Pick a color, then tap a part of the flower to fill it in.
      </p>
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {PALETTE.map(c => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="mg-tap w-12 h-12 rounded-full"
            style={{background: c, border: color === c ? '4px solid var(--mg-ink)' : '4px solid transparent'}}
            aria-label={`Choose color ${c}`}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <svg viewBox="0 0 200 200" width="320" height="320">
          <rect x="0" y="0" width="200" height="200" rx="24" fill="#FBF8F2" />
          <rect onClick={() => fill('stem')} x="95" y="110" width="10" height="70" fill={fills.stem} stroke="#3A362F" strokeWidth="2" />
          <circle onClick={() => fill('petal1')} cx="100" cy="60" r="26" fill={fills.petal1} stroke="#3A362F" strokeWidth="2" />
          <circle onClick={() => fill('petal2')} cx="70" cy="90" r="26" fill={fills.petal2} stroke="#3A362F" strokeWidth="2" />
          <circle onClick={() => fill('petal3')} cx="130" cy="90" r="26" fill={fills.petal3} stroke="#3A362F" strokeWidth="2" />
          <circle onClick={() => fill('petal4')} cx="100" cy="105" r="26" fill={fills.petal4} stroke="#3A362F" strokeWidth="2" />
          <circle onClick={() => fill('center')} cx="100" cy="85" r="16" fill={fills.center} stroke="#3A362F" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
