/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min =1,
    max =5,
    score=0,
    winningNum =getRandomNum(min,max),
    guessesLeft = 3;


// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'),
      playerscore=document.querySelector('#player-score'),
      playerguess=document.querySelector('#player-guess');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;
playerscore.disabled=true;
playerguess.disabled=true;
playerguess.value=guessesLeft;


// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});
      
// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum){
    // Game over - won
    score+=10;
   playerscore.value=score;
   if(score==100)
   {
     alert("LEGEND OF THE GAME...")
   }
   
   if(score>20)
   {
    gameOver(true, `${winningNum} is correct, YOU WIN! +1 guess LEVEL UP!!`);

    min=getRandomNum(1,score-10);
    max=getRandomNum(min+1,score);

    minNum.textContent = min;
    maxNum.textContent = max;
    winningNum =getRandomNum(min,max);
    alert(winningNum);

   }
   else
   {
    gameOver(true, `${winningNum} is correct, YOU WIN! +1 guess`);
   }

  } else {
    // Wrong number
    guessesLeft -= 1;
    

    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';

      // Tell user its the wrong number
      playerguess.value=guessesLeft;
      setMessage(`${guess} is not correct`, 'red');

    }
  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
 
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  guessesLeft+=1;
  playerguess.value=guessesLeft;

  // PLay Again?
  if(won==false)
  {
    guessInput.disabled = true;
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
    playerguess.value=guessesLeft;
  }
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
