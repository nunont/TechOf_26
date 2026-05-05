import './Score.css';

export default function Score({ score, highScore, lives, maxLives, combo }) {
  return (
    <div className="score-bar">
      <div className="score-item">
        <span className="score-label">Score</span>
        <span className="score-value">{score}</span>
      </div>

      <div className="score-lives">
        {Array.from({ length: maxLives }).map((_, i) => (
          <span key={i} className={`score-heart ${i < lives ? 'score-heart--on' : 'score-heart--off'}`}>
            ♥
          </span>
        ))}
        {combo >= 2 && (
          <span key={combo} className={`combo-badge ${combo >= 5 ? 'combo-badge--hot' : ''}`}>
            ×{combo}
          </span>
        )}
      </div>

      <div className="score-item score-item--right">
        <span className="score-label">Best</span>
        <span className="score-value score-value--dim">{highScore}</span>
      </div>
    </div>
  );
}
