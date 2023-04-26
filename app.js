const rows = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
  ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→"]
];

// Create ONE row in the keyboard
function generateRow(rows) {
  const row = document.createElement("div");
  row.classList.add("row");

  for (let i = 0; i < rows.length; i++) {
    const key = document.createElement("div");
    key.classList.add("keys");

    // Add a custom class to certain keys to make them wider
    if (rows[i] === "Enter" || rows[i] === "Shift") {
      key.classList.add("special");
    } else if (rows[i] === "Backspace") {
      key.classList.add("backspace");
    } else if (rows[i] === "Tab") {
      key.classList.add("tab");
    } else if (rows[i] === "Caps Lock") {
      key.classList.add("caps-lock");
    } else if (rows[i] === " ") {
      key.classList.add("space");
    }

    key.textContent = rows[i];
    row.appendChild(key);
  }

  return row;
}

function generateKeyboard(rows) {
  // Create the keyboard container
  const keyboardContainer = document.createElement('div');
  keyboardContainer.classList.add('keyboard-container');

  // Append the keyboard container to the body element
  document.body.appendChild(keyboardContainer);

  // Create rows and append them to the keyboard container
  for (let i = 0; i < rows.length; i++) {
    const row = generateRow(rows[i]);
    keyboardContainer.appendChild(row);
  }
}

generateKeyboard(rows)