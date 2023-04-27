const EN_LOWERCASE = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
  ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "EN"]
];

const EN_UPPERCASE = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Del"],
  ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "EN"]
];

let keyboardContainer = null;
let isShiftPressed = false;
let isCapsLockOn = false;

// Generate ONE row in the keyboard
function generateRow(row) {
  const generatedRow = document.createElement("div");
  generatedRow.classList.add("row");

  for (let i = 0; i < row.length; i++) {
    const key = document.createElement("div");
    key.classList.add("keys");

    // Add a custom class to certain keys to make them wider
    switch (row[i]) {
      case "Enter":
        key.classList.add("special");
        break;
      case "Shift":
        key.classList.add("special");
        break;
      case "Backspace":
        key.classList.add("backspace");
        break;
      case "Tab":
        key.classList.add("tab");
        break;
      case "Caps Lock":
        key.classList.add("caps-lock");
        break;
      case " ":
        key.classList.add("space");
        break;
      default:
        key.classList.add("letter");
    }

    key.textContent = row[i];
    generatedRow.appendChild(key);
  }

  return generatedRow;
}

function generateKeyboard(rows) {
  console.log(isCapsLockOn)
  if (!keyboardContainer) {
    keyboardContainer = document.createElement('div');
    keyboardContainer.classList.add('keyboard-container');
    document.body.appendChild(keyboardContainer);
  }
  // Remove any existing rows from the keyboard container
  while (keyboardContainer.firstChild) {
    keyboardContainer.removeChild(keyboardContainer.firstChild);
  }

  // Create rows and append them to the keyboard container
  for (let i = 0; i < rows.length; i++) {
    const row = generateRow(rows[i]);
    keyboardContainer.appendChild(row);
  }
}

generateKeyboard(isCapsLockOn ? EN_UPPERCASE : EN_LOWERCASE);

document.addEventListener("keydown", (event) => {
  if (event.key === "Shift") {
    isShiftPressed = true;
    generateKeyboard(EN_UPPERCASE);
  } else if (event.key === "CapsLock") {
    isCapsLockOn = !isCapsLockOn;
    generateKeyboard(isCapsLockOn ? EN_UPPERCASE : EN_LOWERCASE);
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Shift") {
    isShiftPressed = false;
    generateKeyboard(EN_LOWERCASE);
  }
});