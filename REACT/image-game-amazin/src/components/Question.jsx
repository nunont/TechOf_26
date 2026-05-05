import { useRef, useEffect } from 'react';
import './Question.css';
import Timer from './Timer';

export default function Question({
  currentQuestion,
  answer,
  setAnswer,
  handleAnswer,
  feedbackState,
  timeLeft,
  maxTime,
  disabled,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled, currentQuestion]);

  function onKeyDown(e) {
    if (e.key === 'Enter' && answer.trim() && !disabled) handleAnswer();
  }

  const feedbackClass = feedbackState !== 'idle' ? `q-card--${feedbackState}` : '';

  return (
    <div className={`q-card ${feedbackClass}`} key={currentQuestion.id}>
      <Timer timeLeft={timeLeft} maxTime={maxTime} isActive={!disabled} />

      <div className="q-emoji" key={`emoji-${currentQuestion.id}`}>
        {currentQuestion.emoji}
      </div>

      <div className="q-input-area">
        <input
          ref={inputRef}
          className="q-input"
          type="text"
          value={answer}
          maxLength={1}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          placeholder="?"
          autoComplete="off"
          autoCapitalize="characters"
        />
        <button
          className="q-submit"
          onClick={handleAnswer}
          disabled={disabled || !answer.trim()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
