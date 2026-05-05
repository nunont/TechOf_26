import './GameOver.css';

export default function GameOver({ handlePlayAgain }) {

  return (<div className="game-over-dialog">
    <h1>Game Over!</h1>
    <button onClick={handlePlayAgain}>Play Again</button>
  </div>);
}