//your JS code here. If required.
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const gameSection = document.getElementById('game-section');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X'; // Start with player X
let player1 = '';
let player2 = '';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // To store moves

// When submit button is clicked
submitButton.addEventListener('click', () => {
  player1 = player1Input.value || 'Player 1';
  player2 = player2Input.value || 'Player 2';
  if (player1 && player2) {
    document.getElementById('player-name-section').style.display = 'none';
    gameSection.style.display = 'block';
    messageDiv.innerText = `${player1}, you're up!`;
  } else {
    alert('Please enter names for both players!');
  }
});

// When a cell is clicked
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.id - 1;
    if (!gameBoard[index]) {
      gameBoard[index] = currentPlayer;
      cell.innerText = currentPlayer;
      if (checkWin()) {
        messageDiv.innerText = `${currentPlayer === 'X' ? player1 : player2} congratulations you won!`;
      } else if (gameBoard.every(cell => cell)) {
        messageDiv.innerText = 'It\'s a tie!';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageDiv.innerText = currentPlayer === 'X' ? `${player1}, you're up!` : `${player2}, you're up!`;
      }
    }
  });
});

// Function to check if any player has won
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}
