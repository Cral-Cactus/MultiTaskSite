const gameGrid = document.querySelector('.game-grid');
const resetButton = document.querySelector('.reset-button');
const messageBox = document.querySelector('.message-box');

let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let isBoardLocked = false;
let matches = 0;
let revealTimeoutId = null;

const cards = [    '🍎',    '🍊',    '🍇',    '🍉',    '🍌',    '🍒',    '🍓',    '🍍'];

const duplicateCards = cards.concat(cards);

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function createCard(card) {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
    gameCard.dataset.card = card;
  
    const front = document.createElement('div');
    front.classList.add('front');
  
    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = '❔';
  
    gameCard.appendChild(front);
    gameCard.appendChild(back);
  
    gameCard.addEventListener('click', flipCard);
  
    gameGrid.appendChild(gameCard);
}

function flipCard() {
    if (isBoardLocked) return;
    if (this === firstCard) return;

    revealCard(this);

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;

        revealCard(secondCard);

        checkForMatch();
    }
}

function revealCard(card) {
    if (revealTimeoutId) {
        clearTimeout(revealTimeoutId);
        revealTimeoutId = null;
        hideCard(firstCard);
        hideCard(secondCard);
    }

    card.querySelector('.back').textContent = card.dataset.card;

    if (firstCard && secondCard) {
        if (firstCard.dataset.card === secondCard.dataset.card) {
            disableCards();
            matches++;

            if (matches === cards.length) {
                endGame();
            }
        } else {
            isBoardLocked = true;

            revealTimeoutId = setTimeout(() => {
                hideCard(firstCard);
                hideCard(secondCard);
                resetBoard();
            }, 1000);
        }
    }
}

function hideCard(card) {
    card.querySelector('.back').textContent = '❔';
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        matches++;

        if (matches === cards.length) {
            endGame();
        }
    } else {
        isBoardLocked = true;

        revealTimeoutId = setTimeout(() => {
            hideCard(firstCard);
            hideCard(secondCard);
            resetBoard();
        }, 1000);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    isBoardLocked = true;

    setTimeout(() => {
        hideCard(firstCard);
        hideCard(secondCard);

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, isBoardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    location.reload();
}

function endGame() {
    isBoardLocked = true;
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = 'Congratulations! You won!';
    document.querySelector('.game-container').appendChild(message);
    setTimeout(() => {
      message.style.opacity = 1;
    }, 500);
  }
  

resetButton.addEventListener('click', resetGame);

shuffle(duplicateCards).forEach(card => createCard(card));
