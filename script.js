'use strict';

// Selecting elements

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const score0Cu = document.querySelector('current--0');
const score1Cu = document.querySelector('current--1');



score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;


// Hleper functions

const switchPlayer = function (){

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
    diceEl.classList.add('hidden');
}

// Rolling dice functionality

btnRoll.addEventListener('click', function(){
    if (playing){
        // 1 .Generating a random numbers
        let dice = Math.trunc(Math.random() * 6) + 1;
        // 2 .Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // Check for rolled 1
        if (dice !== 1){
            // Add dice ti the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }else {
            // switch to the next player
          switchPlayer();
        }   
    }
});

btnHold.addEventListener('click', function(){
    if (playing){
        // 1 .Add current score to the player's active score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2.Check if the player's score is >= 100
        if (scores[activePlayer] >= 100){
            playing = false;
            document.querySelector(`#name--${activePlayer}`).textContent = `The winner is player ${activePlayer + 1}`;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            // finish game
        }else{
            // switch to the next player#
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function(){

    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    playing = true;
    diceEl.classList.add('hidden');
});