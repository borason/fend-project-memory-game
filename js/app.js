/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');

const deck = document.querySelector('.deck');

let cardArray = [...cards];

let minutes = 0;

let seconds = 0;

const faceUp = [];

const pairedCards = [];

const unmatchedPairs = [];

let gameClock = setInterval(function() {
  timer();
},
  1000);

const moves = document.getElementsByClassName('.moves');

const minutesDiv = document.querySelector('.minutes');

const secondsDiv = document.querySelector('.seconds');

const resetButton = document.querySelector('.restart').addEventListener('click', function() {
  makeGrid();
  setTimeout(function() {
    seconds = 0;
  },
  100
  );
  removeClasses();
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
  addClasses();
}

function makeGrid() {
  shuffle(cardArray);
  // for (let i = 0; i < cardArray.length; i++) {
  // let newCardClass = cardArray[i];
  // deck.appendChild(newCardClass);
  // }
  cardArray.forEach(function(card) {
    deck.appendChild(card);
  });
}

  // for(let i = 0; i < cards.length; i++) {
  //   card = cards[i];
  //   card.addEventListener('click', function() {
  //     this.classList.add('open', 'show');
  //     faceUpCards.push(this);
  //   });
  // }

for (let i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener('click', function () {
    this.classList.add('open', 'show');
    faceUp.push(this);
    matchCheck();
    });
  };


function removeClasses() {
  for(let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('open', 'show');
  };
}

function matchCheck() {
  if (faceUp.length === 2) {
  console.log('matchcheck');
  }
}

function timer() {
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
}

function movesCounter () {
  moves++;
  movesCounter.innerText = moves;
  if (moves == 1) {
    gameClock;
  }
}

// function pairCheck () {
//   if
// }

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
