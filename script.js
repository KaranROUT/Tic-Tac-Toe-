// Select all the cells, status display, and reset button
const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X'; // Player X starts
let isGameActive = true; // Game state
let gameState = ['', '', '', '', '', '', '', '', '']; // Track cell states (empty at start)

// Winning combinations (rows, columns, diagonals)
const winningConditions = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

// Function to update the status message
function updateStatus(message) {
  statusDisplay.textContent = message;
}

// Function to handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  // Prevent cell interaction if the game is over or cell is already filled
  if (gameState[cellIndex] !== '' || !isGameActive) {
    return;
  }

  // Fill the clicked cell with the current player's symbol
  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check if the game has been won, tied, or should continue
  checkGameResult();
}

// Function to check the game result (win or tie)
function checkGameResult() {
  let roundWon = false;

  // Check for winning condition
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    updateStatus(`Player ${currentPlayer} Wins!`);
    isGameActive = false;
    return;
  }

  // Check for a tie
  const roundTie = !gameState.includes('');
  if (roundTie) {
    updateStatus("It's a Tie!");
    isGameActive = false;
    return;
  }

  // Continue the game by switching players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s Turn`);
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  isGameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  updateStatus("Player X's Turn");
}

// Add event listeners to the cells and the reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
