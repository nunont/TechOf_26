import { useState, useEffect, useRef } from 'react';
import './App.css';
import { QUESTIONS, shuffled } from './data/questions';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Score from './components/Score';
import ProgressBar from './components/ProgressBar';
import GameOver from './components/GameOver';

const DIFFICULTY_CONFIG = {
  easy:   { maxTime: 20, maxRounds: 5,  livesStart: 3, comboMultiplier: 1.0 },
  medium: { maxTime: 12, maxRounds: 8,  livesStart: 3, comboMultiplier: 1.5 },
  hard:   { maxTime: 7,  maxRounds: 10, livesStart: 2, comboMultiplier: 2.0 },
};

const BASE_CORRECT = 10;
const WRONG_PENALTY = 15;
const TIMEOUT_PENALTY = 10;

function App() {
  const [phase, setPhase]         = useState('start');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionQueue, setQuestionQueue] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [score, setScore]           = useState(0);
  const [highScore, setHighScore]   = useState(
    () => parseInt(localStorage.getItem('emojiQuizHighScore') || '0', 10)
  );
  const [lives, setLives]           = useState(3);
  const [combo, setCombo]           = useState(0);
  const [bestCombo, setBestCombo]   = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [answer, setAnswer]         = useState('');
  const [feedbackState, setFeedbackState] = useState('idle');
  const [timeLeft, setTimeLeft]     = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const processingRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('emojiQuizHighScore', String(highScore));
  }, [highScore]);

  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timerActive, timeLeft]);

  useEffect(() => {
    if (feedbackState === 'idle') return;
    const duration = feedbackState === 'correct' ? 400 : 600;
    const id = setTimeout(() => setFeedbackState('idle'), duration);
    return () => clearTimeout(id);
  }, [feedbackState]);

  const config = DIFFICULTY_CONFIG[difficulty];
  const currentQuestion = questionQueue[questionIndex] ?? null;

  function startGame(selectedDifficulty) {
    const cfg = DIFFICULTY_CONFIG[selectedDifficulty];
    setDifficulty(selectedDifficulty);
    setQuestionQueue(shuffled(QUESTIONS).slice(0, cfg.maxRounds));
    setQuestionIndex(0);
    setScore(0);
    setLives(cfg.livesStart);
    setCombo(0);
    setBestCombo(0);
    setCorrectCount(0);
    setAnswer('');
    setFeedbackState('idle');
    setTimeLeft(cfg.maxTime);
    setTimerActive(true);
    processingRef.current = false;
    setPhase('playing');
  }

  function endGame(finalScore, finalCombo, finalBestCombo) {
    setTimerActive(false);
    const resolvedBest = Math.max(finalBestCombo, finalCombo);
    setBestCombo(resolvedBest);
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }
    setPhase('gameover');
  }

  function advanceOrEnd(newScore, newLives, newCombo, newBestCombo, newCorrectCount) {
    const nextIndex = questionIndex + 1;
    if (newLives <= 0 || nextIndex >= config.maxRounds) {
      endGame(newScore, newCombo, newBestCombo);
    } else {
      setScore(newScore);
      setLives(newLives);
      setCombo(newCombo);
      setBestCombo(newBestCombo);
      setCorrectCount(newCorrectCount);
      setQuestionIndex(nextIndex);
      setAnswer('');
      setTimeLeft(config.maxTime);
      setTimerActive(true);
      processingRef.current = false;
    }
  }

  function handleAnswer() {
    if (processingRef.current || feedbackState !== 'idle' || !answer.trim()) return;
    processingRef.current = true;
    setTimerActive(false);

    const isCorrect = answer.toUpperCase() === currentQuestion.answer;
    let newScore = score;
    let newLives = lives;
    let newCombo = combo;
    let newCorrectCount = correctCount;

    if (isCorrect) {
      newScore += BASE_CORRECT + Math.floor(newCombo * config.comboMultiplier) * 5;
      newCombo += 1;
      newCorrectCount += 1;
      setFeedbackState('correct');
    } else {
      newScore = Math.max(0, newScore - WRONG_PENALTY);
      newCombo = 0;
      newLives -= 1;
      setFeedbackState('wrong');
    }

    const newBestCombo = Math.max(bestCombo, newCombo);

    setTimeout(() => {
      advanceOrEnd(newScore, newLives, newCombo, newBestCombo, newCorrectCount);
    }, isCorrect ? 500 : 700);
  }

  function handleTimeout() {
    if (processingRef.current) return;
    processingRef.current = true;
    setTimerActive(false);

    const newScore = Math.max(0, score - TIMEOUT_PENALTY);
    const newLives = lives - 1;
    const newCombo = 0;
    const newBestCombo = Math.max(bestCombo, combo);
    setFeedbackState('timeout');

    setTimeout(() => {
      advanceOrEnd(newScore, newLives, newCombo, newBestCombo, correctCount);
    }, 800);
  }

  function handlePlayAgain() {
    startGame(difficulty);
  }

  function handleReturnToMenu() {
    setPhase('start');
  }

  if (phase === 'start') {
    return (
      <div className="app-shell">
        <span className="bg-orb bg-orb--1" />
        <span className="bg-orb bg-orb--2" />
        <span className="bg-orb bg-orb--3" />
        <StartScreen highScore={highScore} onStart={startGame} />
      </div>
    );
  }

  if (phase === 'gameover') {
    return (
      <div className="app-shell">
        <span className="bg-orb bg-orb--1" />
        <span className="bg-orb bg-orb--2" />
        <span className="bg-orb bg-orb--3" />
        <GameOver
          score={score}
          highScore={highScore}
          bestCombo={bestCombo}
          correctCount={correctCount}
          totalQuestions={config.maxRounds}
          difficulty={difficulty}
          onPlayAgain={handlePlayAgain}
          onMenu={handleReturnToMenu}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <span className="bg-orb bg-orb--1" />
      <span className="bg-orb bg-orb--2" />
      <span className="bg-orb bg-orb--3" />
      <div className="game-container">
        <div className="game-header">
          <h1>Which letter does it start with?</h1>
          <h2>Question {questionIndex + 1} of {config.maxRounds}</h2>
        </div>
        <ProgressBar current={questionIndex} total={config.maxRounds} />
        <Score
          score={score}
          highScore={highScore}
          lives={lives}
          combo={combo}
          maxLives={config.livesStart}
        />
        {currentQuestion && (
          <Question
            currentQuestion={currentQuestion}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswer={handleAnswer}
            feedbackState={feedbackState}
            timeLeft={timeLeft}
            maxTime={config.maxTime}
            disabled={feedbackState !== 'idle'}
          />
        )}
      </div>
    </div>
  );
}

export default App;
