/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');

const deck = document.querySelector('.deck');

let cardArray = [...cards];

let minutes = 0;

let seconds = 0;

let faceUp = [];

const pairedCards = [];

const unmatchedPairs = [];

let moves = 0;

let movesCounter = document.querySelector('.moves');

const minutesDiv = document.querySelector('.minutes');

const secondsDiv = document.querySelector('.seconds');

const resetButton = document.querySelector('.restart').addEventListener('click', function() {
  makeGrid();
  moves = 0;
  minutesDiv.innerText = '';
  secondsDiv.innerText = '';
  stopClock();
  unFlipCards();
    for(let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('match');
  };
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


function newGame() {
  makeGrid();
  // addClasses();
}

function makeGrid() {
  shuffle(cardArray);
  moves = 0;
  cardArray.forEach(function(card) {
    deck.appendChild(card);
  });
}
//adds click listener and pushes to new array
for (let i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener('click', function () {
    this.classList.add('open', 'show');
    faceUp.push(this);
    matchCheck();
    });
  };


//general function to remove flipped cards classes
function unFlipCards() {
  for(let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('open');
  };
}

//function to check whether cards match
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

function notMatched() {
    setTimeout(function () {
    unFlipCards();
    },
    500
    )
    faceUp = [];
  }
}

let clock;
//timer function that counds up
function startClock () {
  clock = setInterval(function() {
  seconds++;
  if(seconds == 60) {
  minutes++;
  seconds = 0;
}
  if(minutes < 10) {
    minutesDiv.innerText = '0' + minutes + ' Minutes';
  }
  else {
    minutesDiv.innerText = minutes + 'Minutes';
  }
  if(seconds < 10) {
    secondsDiv.innerText = '0' + seconds + ' Seconds';
  }
  else {
    secondsDiv.innerText = seconds + ' Seconds';
  }
  },
  1000
  )
};

function stopClock() {
  seconds = 0;
  clearInterval(clock);
}

function counter () {
  moves++;
  movesCounter.innerText = Math.floor(moves / 2);
  if (moves == 1) {
    startClock();
  }
}

//function when two cards match
function match() {
  pairedCards.push(faceUp);
  faceUp.forEach(function (card) {
    unFlipCards();
    card.classList.add('match');
  });
  faceUp = [];
  }

window.onload = newGame();
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
