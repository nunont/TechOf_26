var arr = ["images/hat.png", "images/boat.png", "images/short.png"];
var arrWord = ["hat", "boat" ,"short"];
var counter = 0;
var i = selectRandomImage();
var score = 0;
var highScore = 0;
document.body.classList.add('backGroundBody');
let btnPlayAgain = document.querySelector('.playAgain');

let playButton = document.querySelector('.play');
playButton.addEventListener('click', play);

const showbtnPlayAgain = function(){
  btnPlayAgain.classList.remove('hidden');
}

const hiddenbtnPlayAgain = function(){
  btnPlayAgain.classList.add('hidden');
}

function selectRandomImage() {
  document.querySelector('.countQuestion').textContent = 'Question number ' + counter;
  let index = getRandomInt(3);

  let imgPath = arr[index];
  document.getElementById('imgToGuess').src = imgPath;

  return index;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function play(){
  counter++;
  if (counter <= 3){
    let word = arrWord[i];
    let input = document.getElementById('input');
    let letter = input.value;

    let messageEl = document.querySelector('.message');
    if (!letter){
      messageEl.textContent = 'No Letter 🥲';
    }
    else if (letter == word[0]){
      messageEl.textContent = 'Correct Answer ✅';
      score += 5;
    }
    else {
      messageEl.textContent = 'Incorrect Answer ❌';
      score -= 3;
    }
    input.value = '';
    document.querySelector('.score').textContent = 'Score: ' + score;
    if (counter < 3){
      i = selectRandomImage();
    }
  }
  if (counter > 2){
    gameOver()
  }
}

function gameOver(){
  if (score > highScore){
    highScore = score;
    document.querySelector('.highscore').textContent = '⭐ High Score: ' + score;
  }
  document.body.classList.remove('backGroundBody');
  showbtnPlayAgain();
}

document.querySelector('.playAgain').addEventListener('click', reset);

function reset(){
  document.body.classList.add('backGroundBody');
  counter = 0;
  i = selectRandomImage();
  score = 0;
  document.querySelector('.score').textContent = 'Score: ' + score;

  document.getElementById('input').value = '';
  hiddenbtnPlayAgain();
}