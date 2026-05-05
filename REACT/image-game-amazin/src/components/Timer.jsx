import './Timer.css';

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Timer({ timeLeft, maxTime, isActive }) {
  const pct = maxTime > 0 ? timeLeft / maxTime : 0;
  const offset = CIRCUMFERENCE * (1 - pct);

  const urgency = pct > 0.5 ? 'safe' : pct > 0.25 ? 'warn' : 'danger';

  return (
    <div className={`timer timer--${urgency} ${urgency === 'danger' && isActive ? 'timer--pulse' : ''}`}>
      <svg viewBox="0 0 100 100" className="timer__ring">
        <circle
          cx="50" cy="50" r={RADIUS}
          className="timer__track"
        />
        <circle
          cx="50" cy="50" r={RADIUS}
          className="timer__progress"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="timer__number">{timeLeft}</span>
    </div>
  );
}
