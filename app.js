/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dicePrev, winningScore;
init();

function dice() {
  return Math.floor(Math.random() * 6) + 1;
}

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random number
      var dice1 = dice();
      var dice2 = dice();
    

    // 2. Display the result
    var diceDOM1 = document.querySelector('.dice1');
    var diceDOM2 = document.querySelector('.dice2');

    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';

    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM1.src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1

    if(dice1 === 6 && dice2 === 6) {
      alert('6 + 6');
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    } else if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore = roundScore + dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      alert('1 + 1');
      nextPlayer();
    }}
  });

document.querySelector('input').addEventListener('change', function() {
  var input = document.getElementById('max-score').value;
  if(isNaN(input) || input <= 0 || input == '') {
    alert('Input a number');
    document.querySelector('input').value = 'or play forever';

  } else if(input) {
    winningScore = input;
  } else {
    winningScore = 100;
  }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
  // Add current score to the global score
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];



    // Check if player won the game

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.btn-hold').style.display = 'none';
      document.querySelector('.btn-roll').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = roundScore;
  document.getElementById('current-1').textContent = roundScore;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-roll').style.display = 'block';
}

//document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>Blah</em>';

//var x = document.querySelector('#score-0').textContent;