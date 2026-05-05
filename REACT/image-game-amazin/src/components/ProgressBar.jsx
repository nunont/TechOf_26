import './ProgressBar.css';

export default function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`progress-segment ${i < current ? 'progress-segment--filled' : ''}`}
        />
      ))}
    </div>
  );
}
