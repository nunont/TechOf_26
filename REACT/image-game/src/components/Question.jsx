
import './Question.css';
export default function Question({ currentQuestion, answer, setAnswer, handleAnswer, gameOver }) {


  return (<div className="q-main">
    <div className="q-image">
      <h1>{currentQuestion.image}</h1>
    </div>
    <div className="q-input">
      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={gameOver} />
      <button onClick={handleAnswer} disabled={gameOver}>Submit</button>
    </div>
  </div>);

}