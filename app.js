const EN_LOWERCASE = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
  ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "EN"]
];

const EN_UPPERCASE = [ 
  ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Del"],
  ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "EN"]
];

const RU_LOWERCASE = [ 
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del"],
  ["Caps Lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
  ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "RU"]
];

const RU_UPPERCASE = [ 
  ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace"],
  ["Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Del"],
  ["Caps Lock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
  ["Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "RU"]
];

let keyboardContainer = null;
let isShiftPressed = false;
let isCapsLockOn = false;

// START MAIN PART

switchLanguages(); // 1. Switch languages
generateTextarea(); // 2. Generate text area
generateKeyboard(isEnglish ? EN_LOWERCASE : RU_LOWERCASE); // 3. Generate the whole keyboard
switchCase(); // 4. Switch lowercase and upper case

// END MAIN PART

// 1. Switch languages
function switchLanguages() {
  // Check if isEnglish is already stored in localStorage
  if (localStorage.getItem('isEnglish') !== null) {
    isEnglish = JSON.parse(localStorage.getItem('isEnglish'));
  } else {
    isEnglish = true;
  }

  // Switch languages
  document.addEventListener("keydown", (event) => {
    if (event.shiftKey && event.altKey) {
      isEnglish = !isEnglish;
      localStorage.setItem('isEnglish', isEnglish); // Store value in localStorage
      generateKeyboard(isEnglish ? EN_LOWERCASE : RU_LOWERCASE);
    }
  });
}

// 2. Generate text area
function generateTextarea() {
  const areaContainer = document.createElement("textarea");
  areaContainer.classList.add('area-container');
  areaContainer.setAttribute('autofocus', '');
  document.body.appendChild(areaContainer);
}

// 3. Generate the whole keyboard
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

// 4. Switch lowercase and upper case
function switchCase() {
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
}

// Generate ONE row in the keyboard || !!! MAIN FUNCTIONALITY !!!
function generateRow(row) {
  const generatedRow = document.createElement("div");
  generatedRow.classList.add("row");

  for (let i = 0; i < row.length; i++) {
    const textArea = document.querySelector('.area-container');
    const key = document.createElement("div");
    key.classList.add("keys");
    key.textContent = row[i];

    // Add a custom class to certain keys to make them wider
    switch (row[i]) {
      case "Enter":
        key.classList.add("enter");
        key.onclick = () => { textArea.value += '\n' };
        break;
      case "Shift":
        key.classList.add("shift");
        key.addEventListener('mousedown', () => {
          isShiftPressed = true;
          generateKeyboard(isEnglish ? EN_UPPERCASE : RU_UPPERCASE);
        });
        key.addEventListener('mouseup', () => {
          isShiftPressed = false;
          generateKeyboard(isEnglish ? EN_LOWERCASE : RU_LOWERCASE);
        });
        break;
      case "Backspace":
        key.classList.add("backspace");

        key.addEventListener('click', () => {
          const cursorPosition = textArea.selectionStart;
          textArea.focus();
          if (cursorPosition === textArea.value.length) {
            textArea.value = textArea.value.substring(0, textArea.value.length - 1);
          } else {
            textArea.value = textArea.value.slice(0, cursorPosition - 1) + textArea.value.slice(cursorPosition);
            textArea.selectionStart = cursorPosition - 1;
            textArea.selectionEnd = cursorPosition - 1;
          };
        });

        break;
      case "Tab":
        key.classList.add("tab");
        key.onclick = () => { textArea.value += '\t' };
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
        key.classList.add("symbol");
        key.onclick = () => { textArea.value += key.textContent; };
    }

    generatedRow.appendChild(key);
  }

  return generatedRow;
};