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

const RU_LOWERCASE = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "й", "ц", "у", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
  ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "RU"]
];

const RU_UPPERCASE = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "Й", "Ц", "У", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Del"],
  ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "RU"]
];

let keyboardContainer = null;
let isShiftPressed = false;
let isCapsLockOn = false;

// Check if isEnglish is already stored in localStorage
if (localStorage.getItem('isEnglish') !== null) {
  isEnglish = JSON.parse(localStorage.getItem('isEnglish'));
} else {
  isEnglish = true;
}

generateKeybpardArea();
generateKeyboard(isEnglish ? EN_LOWERCASE : RU_LOWERCASE);




// Switch lowercase and upper case
document.addEventListener("keydown", (event) => {
  if (event.key === "Shift") {
    isShiftPressed = true;
    generateKeyboard(isEnglish ? EN_UPPERCASE : RU_UPPERCASE);
  } else if (event.key === "CapsLock") {
    isCapsLockOn = !isCapsLockOn;
      if (isEnglish) {
        generateKeyboard(isCapsLockOn ? EN_UPPERCASE : EN_LOWERCASE);
      } else {
        generateKeyboard(isCapsLockOn ? RU_UPPERCASE : RU_LOWERCASE);
      }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Shift") {
    isShiftPressed = false;
    generateKeyboard(isEnglish ? EN_LOWERCASE : RU_LOWERCASE);
  }
});

// Switch languages
document.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.altKey) {
    isEnglish = !isEnglish;
    localStorage.setItem('isEnglish', isEnglish); // Store value in localStorage
    generateKeyboard(isEnglish ? EN_LOWERCASE : RU_LOWERCASE);
  }
});

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
        key.classList.add("enter");
        break;
      case "Shift":
        key.classList.add("shift");
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
      case "Ctrl":
        key.classList.add("ctrl");
        break;
      case "EN":
      case "RU":
        key.classList.add("lang-key");
        break;
      default:
        key.classList.add("letter");
    }

    key.textContent = row[i];
    generatedRow.appendChild(key);
  }

  return generatedRow;
};

function generateKeyboard(rows) {
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
};

function generateKeybpardArea() {
  const areaContainer = document.createElement("textarea");
  areaContainer.classList.add('area-container');
  areaContainer.setAttribute('autofocus', '');
  document.body.appendChild(areaContainer);
}

function addKeyListeners() {
  const keys = document.querySelectorAll('.key');

  keys.forEach(key => {
    key.addEventListener('mousedown', () => {
      key.classList.add('active');
    });

    key.addEventListener('mouseup', () => {
      key.classList.remove('active');
    });

    key.addEventListener('mouseleave', () => {
      key.classList.remove('active');
    });
  });
}