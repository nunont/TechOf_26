import './StartScreen.css';

const DIFFICULTIES = [
  {
    id: 'easy',
    label: 'Easy',
    emoji: '🌱',
    desc: '20s timer · 5 rounds · 3 lives',
    color: 'var(--color-neon-correct)',
  },
  {
    id: 'medium',
    label: 'Medium',
    emoji: '⚡',
    desc: '12s timer · 8 rounds · 3 lives',
    color: 'var(--color-neon-primary)',
  },
  {
    id: 'hard',
    label: 'Hard',
    emoji: '💀',
    desc: '7s timer · 10 rounds · 2 lives',
    color: 'var(--color-neon-wrong)',
  },
];

export default function StartScreen({ highScore, onStart }) {
  return (
    <div className="start-screen">
      <div className="start-title-block">
        <div className="start-logo">🐾</div>
        <h1 className="start-title">Emoji Quiz</h1>
        <p className="start-subtitle">Name the animal — type the first letter</p>
      </div>

      {highScore > 0 && (
        <div className="start-highscore">
          <span className="start-highscore__label">Best Score</span>
          <span className="start-highscore__value">{highScore}</span>
        </div>
      )}

      <p className="start-pick-label">Choose difficulty</p>

      <div className="start-difficulty-grid">
        {DIFFICULTIES.map(d => (
          <button
            key={d.id}
            className="difficulty-card"
            style={{ '--card-color': d.color }}
            onClick={() => onStart(d.id)}
          >
            <span className="difficulty-card__emoji">{d.emoji}</span>
            <span className="difficulty-card__label">{d.label}</span>
            <span className="difficulty-card__desc">{d.desc}</span>
          </button>
        ))}
      </div>

      <p className="start-hint">Press <kbd>Enter</kbd> to submit answers</p>
    </div>
  );
}
