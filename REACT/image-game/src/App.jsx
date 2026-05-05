import { useState, useMemo } from 'react';
import './App.css'
import Score from './components/Score'
import Question from './components/Question';
import GameOver from './components/GameOver';

function App() {

  const MAX_ROUNDS = 3;
  const QUESTIONS = [
    {
      id: 1,
      image: '🐶',
      answer: 'D'
    },
    {
      id: 2,
      image: '🐱',
      answer: 'C'
    },
    {
      id: 3,
      image: '🐭',
      answer: 'M'
    },
    {
      id: 4,
      image: '🐹',
      answer: 'H',
    }
  ]

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  
  const currentQuestion = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    return QUESTIONS[randomIndex];
  }, [round]);

  const [answer, setAnswer] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = () => {
    var tempScore = score;
    if (answer.toUpperCase() === currentQuestion.answer) {
      tempScore += 10;
    }
    else {
      tempScore -= 15;
    }

    if (round < MAX_ROUNDS) {
      setRound(prevRound => prevRound + 1);
    }
    else {
      if (tempScore > highScore) {
        setHighScore(tempScore);
      }
      setGameOver(true);
    }
    setScore(tempScore);
    setAnswer('');
  }

  const [highScore, setHighScore] = useState(0);

  const handlePlayAgain = () => {
    setRound(1);
    setScore(0);
    setGameOver(false);
  }

  return (
    < >
      <div className='main'>
        <div className='header'>
            <h1>With wich letter does it start?</h1>
            <h2>Question number {round}</h2>
        </div>
        <div>
          <Question currentQuestion={currentQuestion} answer={answer} setAnswer={setAnswer} handleAnswer={handleAnswer} gameOver={gameOver} />
          <Score score={score} highScore={highScore} />
        </div>
        
        {gameOver && <GameOver handlePlayAgain={handlePlayAgain} />}
      </div>
    </>
  )
}

export default App
