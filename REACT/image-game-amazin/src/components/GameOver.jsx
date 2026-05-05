import './GameOver.css';

function getRating(correctCount, totalQuestions, bestCombo) {
  const pct = totalQuestions > 0 ? correctCount / totalQuestions : 0;
  if (pct === 1 && bestCombo === totalQuestions) return { grade: 'S+', color: '#ffd700' };
  if (pct === 1)   return { grade: 'S',  color: '#ffd700' };
  if (pct >= 0.9)  return { grade: 'A',  color: '#39ff14' };
  if (pct >= 0.7)  return { grade: 'B',  color: '#00f5ff' };
  if (pct >= 0.5)  return { grade: 'C',  color: '#bf00ff' };
  if (pct >= 0.3)  return { grade: 'D',  color: '#ffaa00' };
  return                  { grade: 'F',  color: '#ff3131' };
}

export default function GameOver({
  score,
  highScore,
  bestCombo,
  correctCount,
  totalQuestions,
  difficulty,
  onPlayAgain,
  onMenu,
}) {
  const isNew = score >= highScore && score > 0;
  const rating = getRating(correctCount, totalQuestions, bestCombo);

  return (
    <div className="gameover-overlay">
      <div className="gameover-card">
        <div className="gameover-rating" style={{ '--rating-color': rating.color }}>
          {rating.grade}
        </div>

        {isNew && (
          <p className="gameover-new-hs">✦ New High Score! ✦</p>
        )}

        <h1 className="gameover-title">Game Over</h1>

        <div className="gameover-stats">
          <div className="stat-cell">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-cell">
            <span className="stat-label">Best</span>
            <span className="stat-value stat-value--dim">{highScore}</span>
          </div>
          <div className="stat-cell">
            <span className="stat-label">Correct</span>
            <span className="stat-value">{correctCount}/{totalQuestions}</span>
          </div>
          <div className="stat-cell">
            <span className="stat-label">Best Combo</span>
            <span className="stat-value">{bestCombo > 0 ? `×${bestCombo}` : '—'}</span>
          </div>
          <div className="stat-cell">
            <span className="stat-label">Difficulty</span>
            <span className="stat-value stat-value--cap">{difficulty}</span>
          </div>
        </div>

        <div className="gameover-actions">
          <button className="gameover-btn gameover-btn--primary" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="gameover-btn gameover-btn--secondary" onClick={onMenu}>
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
