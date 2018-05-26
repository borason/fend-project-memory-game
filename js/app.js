// Variables for individual cards and card deck
let cards = document.getElementsByClassName('card');

const deck = document.querySelector('.deck');

let cardArray = [...cards];

// Variables for game clock
let minutes = 0;

let seconds = 0;

let clock;

const clockDiv = document.querySelector('.clock');

let winTime = document.querySelector('#time');

let winMoves = document.querySelector('#moves');

const minutesDiv = document.querySelector('.minutes');

const secondsDiv = document.querySelector('.seconds');

// Variables to initialize arrays
const unmatchedPairs = [];

let faceUp = [];

let pairedCards = [];

// Variables for move counter
let moves = 0;

let movesCounter = document.querySelector('.moves');

const replay = document.querySelector('#replay');

// Variables for star rating
let stars = 3;

const star = document.querySelector('.stars');

const starList = star.children;

// Modal related variables
const starModal = document.querySelector('#star-rating');

const winMessage = document.querySelector('#win-message');

// Event listeners for restart button and modal restart button
const resetButton = document.querySelector('.restart').addEventListener('click', function() {
  restart();
});

const winReset = document.querySelector('#replay').addEventListener('click', function() {
  $('#winModal').modal('toggle');
  restart();
});

// Restarts the game
function restart() {
  minutes = 0;
  seconds = 0;
  // Initializes game over message
  winMessage.innerText = '';
  // Initializes star rating
  starList[0].style.opacity = 1.0;
  starList[1].style.opacity = 1.0;
  starList[2].style.opacity = 1.0;
  stars = 3;
  // Initializes move counter
  moves = 0;
  movesCounter.innerText = 0;
  // Stops clock and initializes game clock display
  stopClock();
  minutesDiv.innerText = '';
  secondsDiv.innerText = '';
  // Empties all matched cards
  pairedCards = [];
  cardArray.forEach(function(card) {
  card.classList.remove('match');
  });
  // Flips all cards back over
  unFlipCards();
  // Shuffles deck
  makeGrid();
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffles cards and adds to deck
function makeGrid() {
  shuffle(cardArray);
  moves = 0;
  cardArray.forEach(function(card) {
    deck.appendChild(card);
  });
}

// Adds click listener to each card
let click = cardArray.forEach(function(card) {
  card.addEventListener('click', function () {
    // Flips card, shows icon and disables user from clicking same card again
    this.classList.add('open', 'show', 'lock');
    faceUp.push(this);
    matchCheck();
    starRating();
    win();
  });
});


// Removes classes from cards that are flipped back over
function unFlipCards() {
  cardArray.forEach(function(card) {
    card.classList.remove('open', 'lock', 'incorrect', 'show');
  });
}

// Checks whether two clicked cards match
function matchCheck() {
  counter();
  if (faceUp.length === 2) {
    if(faceUp[0].querySelector('i').classList.value === faceUp[1].querySelector('i').classList.value) {
      match();
    }
    else {
      notMatched();
  }
}

// Runs when cards do not match
function notMatched() {
    faceUp.forEach(function (card) {
    // Adds incorrect class that runs css animation
    card.classList.add('incorrect');
  });
    // Adds slight delay to allow css animation to run before flipping cards back over
    setTimeout(function () {
    unFlipCards();
    },
    200
    )
    // Empties match evaluation array
    faceUp = [];
  }
}

// Timer function that counts up
function startClock () {
  clock = setInterval(function() {
  seconds++;
  if(seconds == 60) {
  minutes++;
  seconds = 0;
  }
  // Adds text to clock display
  minutesDiv.innerText = `${minutes}`;
  if(seconds < 10) {
    secondsDiv.innerText = ` 0${seconds}`;
  }
  else {
    secondsDiv.innerText = `${seconds}`;
  }
  },
  1000
  )
};

// Stops clock and initializes clock display
function stopClock() {
  seconds = 0;
  minutes = 0;
  clearInterval(clock);
}

// Increments move counter and starts clock after first card click
function counter() {
  moves++;
  movesCounter.innerText = moves;
  if (moves == 1) {
    startClock();
  }
}

// Evaluates whether to lower star rating based on number of moves
// Assigns value to stars variable in order to determine game over message
function starRating() {
  if (moves <= 30) {
    stars = 3;
  }
  if (moves > 30) {
    stars = 2;
    starList[2].style.opacity = "0.2";
  }
  if (moves > 50) {
    stars = 1;
    starList[1].style.opacity = "0.2";
  }
  if (moves > 70) {
    stars = 0;
    starList[0].style.opacity = "0.2";
  }
}

// Runs when two cards match
function match() {
  faceUp.forEach(function (card) {
    // Pushes both cards to matched cards array
    pairedCards.push(faceUp);
    // Removes previous styling
    unFlipCards();
    // Adds class that runns css animation
    card.classList.add('match');
  });
  // Initializes match evaluation array
  faceUp = [];
  }

// Runs to determine if game is over
function win () {
  if(pairedCards.length == 16) {
    // Assigns content to modal
    winMoves.innerText = `It took you ${moves} moves.`;
    winTime.innerText = `You finished in ${minutes} minutes and ${seconds} seconds!`;
    // Stops clock
    stopClock();
    // Takes star rating and appends it to the modal
    let starCopy = star.cloneNode(true);
    let newStar = starModal.appendChild(starCopy);
    let modalStarRating = starModal.children;
    // Returns game over message
    endMessage();
    // pairedCards = [];
    $('#winModal').modal('show');
    starModal.firstChild.remove();
  }
};

// Evaluates final star rating to determine game over message
function endMessage () {
  if (stars == 3) {
    winMessage.innerText = 'Amazing! You got highest rating.';
  }
  if (stars == 2) {
    winMessage.innerText = 'Pretty good, but you can do better.';
  }
  if (stars == 1) {
    winMessage.innerText = 'Not bad. You should try to focus a little more.';
  }
  if (stars == 0) {
    winMessage.innerText = 'What happened? Are you randomly clicking on the game board?';
  }
}

window.onload = restart();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
