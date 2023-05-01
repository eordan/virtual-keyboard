class Background {
  constructor() {
    this.matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    this.backgroundContainer = document.createElement("canvas");
    this.backgroundContainer.setAttribute("id","matrix");
    document.body.appendChild(this.backgroundContainer);
    this.canvas = document.getElementById("matrix");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = window.innerHeight; // Making the canvas full screen
    this.canvas.width = window.innerWidth; // Making the canvas full screen
    // Converting the string into an array of single characters
    this.matrix = this.matrix.split("");
    this.drops = []; // An array of drops - one per column
    // x below is the x coordinate
    // 1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < this.canvas.width/10; x++) this.drops[x] = 1; 
    // Set up draw function to be called repeatedly
    setInterval(this.generateBackground.bind(this), 35);
  }

  generateBackground() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.04)"; // Black BG for the canvas
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Translucent BG to show trail
    this.ctx.fillStyle = "green"; // Green text
    this.ctx.font = 10 + "px arial";
    // Looping over drops
    for(var i = 0; i < this.drops.length; i++) {
        var text = this.matrix[Math.floor(Math.random()*this.matrix.length)]; // A random chinese character to print
        this.ctx.fillText(text, i*10, this.drops[i]*10); // x = i*font_size, y = value of drops[i]*font_size
        // Sending the drop back to the top randomly after it has crossed the screen
        // Aadding a randomness to the reset to make the drops scattered on the Y axis
        if(this.drops[i]*10 > this.canvas.height && Math.random() > 0.975) this.drops[i] = 0;
        this.drops[i]++; // Incrementing Y coordinate
    }
  }
}

class Textarea {
  generateTextarea() {
    const areaContainer = document.createElement("textarea");
    areaContainer.classList.add('area-container');
    areaContainer.setAttribute('autofocus', '');
    document.body.appendChild(areaContainer);
  }
}

class Keyboard {
  constructor(isEnglish) {
    // this.information = new Information();
    if (localStorage.getItem('isEnglish') !== null) {
      isEnglish = JSON.parse(localStorage.getItem('isEnglish'));
    } else {
      isEnglish = true;
    }
    this.isEnglish = isEnglish;
    this.isShiftPressed = false;
    this.isCapsLockOn = false;
    this.keyboardContainer = null;
    this.information = null;
    this.EN_LOWERCASE = [
      {"Backquote": "`", "Digit1": "1", "Digit2": "2", "Digit3": "3", "Digit4": "4", "Digit5": "5", "Digit6": "6", "Digit7": "7", "Digit8": "8", "Digit9": "9", "Digit0": "0", "Minus": "-", "Equal": "=", "Backspace": "Backspace"},
      {"Tab": "Tab", "KeyQ": "q", "KeyW": "w", "KeyE": "e", "KeyR": "r", "KeyT": "t", "KeyY": "y", "KeyU": "u", "KeyI": "i", "KeyO": "o", "KeyP": "p", "BracketLeft": "[", "BracketRight": "]", "Backslash": "\\", "Delete": "Del"},
      {"CapsLock": "Caps Lock", "KeyA": "a", "KeyS": "s", "KeyD": "d", "KeyF": "f", "KeyG": "g", "KeyH": "h", "KeyJ": "j", "KeyK": "k", "KeyL": "l", "Semicolon": ";", "Quote": "'", "Enter": "Enter"},
      {"ShiftLeft": "Shift", "KeyZ": "z", "KeyX": "x", "KeyC": "c", "KeyV": "v", "KeyB": "b", "KeyN": "n", "KeyM": "m", "Comma": ",", "Period": ".", "Slash": "/", "ArrowUp": "↑", "ShiftRight": "Shift"},
      {"ControlLeft": "Ctrl", "AltLeft": "Alt", "Space": " ", "AltRight": "Alt", "ControlRight": "Ctrl", "ArrowLeft": "←", "ArrowDown": "↓", "ArrowRight": "→", "Lang": "EN"}
    ];
    this.EN_UPPERCASE = [
      {"Backquote": "~", "Digit1": "!", "Digit2": "@", "Digit3": "#", "Digit4": "$", "Digit5": "%", "Digit6": "^", "Digit7": "&", "Digit8": "*", "Digit9": "(", "Digit0": ")", "Minus": "_", "Equal": "+", "Backspace": "Backspace"},
      {"Tab": "Tab", "KeyQ": "Q", "KeyW": "W", "KeyE": "E", "KeyR": "R", "KeyT": "T", "KeyY": "Y", "KeyU": "U", "KeyI": "I", "KeyO": "O", "KeyP": "P", "BracketLeft": "{", "BracketRight": "}", "Backslash": "|", "Delete": "Del"},
      {"CapsLock": "Caps Lock", "KeyA": "A", "KeyS": "S", "KeyD": "D", "KeyF": "F", "KeyG": "G", "KeyH": "H", "KeyJ": "J", "KeyK": "K", "KeyL": "L", "Semicolon": ":", "Quote": "\"", "Enter": "Enter"},
      {"ShiftLeft": "Shift", "KeyZ": "Z", "KeyX": "X", "KeyC": "C", "KeyV": "V", "KeyB": "B", "KeyN": "N", "KeyM": "M", "Comma": "<", "Period": ">", "Slash": "?", "ArrowUp": "↑", "ShiftRight": "Shift"},
      {"ControlLeft": "Ctrl", "AltLeft": "Alt", "Space": " ", "AltRight": "Alt", "ControlRight": "Ctrl", "ArrowLeft": "←", "ArrowDown": "↓", "ArrowRight": "→", "Lang": "EN"}
    ];
    this.RU_LOWERCASE = [
      {"Backquote": "ё", "Digit1": "1", "Digit2": "2", "Digit3": "3", "Digit4": "4", "Digit5": "5", "Digit6": "6", "Digit7": "7", "Digit8": "8", "Digit9": "9", "Digit0": "0", "Minus": "-", "Equal": "=", "Backspace": "Backspace"},
      {"Tab": "Tab", "KeyQ": "й", "KeyW": "ц", "KeyE": "у", "KeyR": "к", "KeyT": "е", "KeyY": "н", "KeyU": "г", "KeyI": "ш", "KeyO": "щ", "KeyP": "з", "BracketLeft": "х", "BracketRight": "ъ", "Backslash": "\\", "Delete": "Del"},
      {"CapsLock": "Caps Lock", "KeyA": "ф", "KeyS": "ы", "KeyD": "в", "KeyF": "а", "KeyG": "п", "KeyH": "р", "KeyJ": "о", "KeyK": "л", "KeyL": "д", "Semicolon": "ж", "Quote": "э", "Enter": "Enter"},
      {"ShiftLeft": "Shift", "KeyZ": "я", "KeyX": "ч", "KeyC": "с", "KeyV": "м", "KeyB": "и", "KeyN": "т", "KeyM": "ь", "Comma": "б", "Period": "ю", "Slash": ".", "ArrowUp": "↑", "ShiftRight": "Shift"},
      {"ControlLeft": "Ctrl", "AltLeft": "Alt", "Space": " ", "AltRight": "Alt", "ControlRight": "Ctrl", "ArrowLeft": "←", "ArrowDown": "↓", "ArrowRight": "→", "Lang": "RU"}
    ];
    this.RU_UPPERCASE = [
      {"Backquote": "Ё", "Digit1": "!", "Digit2": "\"", "Digit3": "№", "Digit4": ";", "Digit5": "%", "Digit6": ":", "Digit7": "?", "Digit8": "*", "Digit9": "(", "Digit0": ")", "Minus": "_", "Equal": "+", "Backspace": "Backspace"},
      {"Tab": "Tab", "KeyQ": "Й", "KeyW": "Ц", "KeyE": "У", "KeyR": "К", "KeyT": "Е", "KeyY": "Н", "KeyU": "Г", "KeyI": "Ш", "KeyO": "Щ", "KeyP": "З", "BracketLeft": "Х", "BracketRight": "Ъ", "Backslash": "\\", "Delete": "Del"},
      {"CapsLock": "Caps Lock", "KeyA": "Ф", "KeyS": "Ы", "KeyD": "В", "KeyF": "А", "KeyG": "П", "KeyH": "Р", "KeyJ": "О", "KeyK": "Л", "KeyL": "Д", "Semicolon": "Ж", "Quote": "Э", "Enter": "Enter"},
      {"ShiftLeft": "Shift", "KeyZ": "Я", "KeyX": "Ч", "KeyC": "С", "KeyV": "М", "KeyB": "И", "KeyN": "Т", "KeyM": "Ь", "Comma": "Б", "Period": "Ю", "Slash": ".", "ArrowUp": "↑", "ShiftRight": "Shift"},
      {"ControlLeft": "Ctrl", "AltLeft": "Alt", "Space": " ", "AltRight": "Alt", "ControlRight": "Ctrl", "ArrowLeft": "←", "ArrowDown": "↓", "ArrowRight": "→", "Lang": "RU"}
    ];
  }
  generateInformation() {
    if (!this.information) {
      this.information = document.createElement("div");
      this.information.classList.add('information');
      document.body.appendChild(this.information);
    }
    while (this.information.firstChild) {
      this.information.removeChild(this.information.firstChild);
    }

    const content = document.createElement("p");
    if (this.isEnglish) {
      content.innerText = "- The keyboard was created on Ubuntu 22.04.2 LTS;\n- You can switch the language layout by pressing `Shift` + `Alt`.";
    } else {
      content.innerText = "- Клавиатура создана в Ubuntu 22.04.2 LTS;\n- Раскладку можно изменить нажатием `Shift` + `Alt`.";
    }
    this.information.appendChild(content);
  }
  switchLanguages() {
    document.addEventListener("keydown", (event) => {
      if (event.shiftKey && event.altKey) {
        this.isEnglish = !this.isEnglish;
        localStorage.setItem('isEnglish', this.isEnglish);
        this.generateInformation();
        this.generateKeyboard(this.isEnglish ? this.EN_LOWERCASE : this.RU_LOWERCASE);
      }
    });
  }
  switchCase() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Shift") {
        this.isShiftPressed = true;
        this.generateKeyboard(this.isEnglish ? this.EN_UPPERCASE : this.RU_UPPERCASE);
      } else if (event.key === "CapsLock") {
        this.isCapsLockOn = !this.isCapsLockOn;
          if (this.isEnglish) {
            this.generateKeyboard(this.isCapsLockOn ? this.EN_UPPERCASE : this.EN_LOWERCASE);
          } else {
            this.generateKeyboard(this.isCapsLockOn ? this.RU_UPPERCASE : this.RU_LOWERCASE);
          }
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key === "Shift") {
        this.isShiftPressed = false;
        this.generateKeyboard(this.isEnglish ? this.EN_LOWERCASE : this.RU_LOWERCASE);
      }
    });
  }
  generateKeyboard(rows) {
    if (!this.keyboardContainer) {
      this.keyboardContainer = document.createElement('div');
      this.keyboardContainer.classList.add('keyboard-container');
      document.body.appendChild(this.keyboardContainer);
    }
    while (this.keyboardContainer.firstChild) {
      this.keyboardContainer.removeChild(this.keyboardContainer.firstChild);
    }
    for (let i = 0; i < rows.length; i++) {
      const row = this.generateRow(rows[i]);
      this.keyboardContainer.appendChild(row);
    }
  }
  generateRow(row) {
    const generatedRow = document.createElement("div");
    generatedRow.classList.add("row");

    for (const key in row) {
      const textArea = document.querySelector('.area-container');
      const inKey = document.createElement("div");
      inKey.classList.add("keys");
      inKey.classList.add(key);
      inKey.textContent = row[key];
      document.addEventListener("keydown", (event) => { if (event.code === key) inKey.classList.add("highlight") });
      document.addEventListener("keyup", (event) => { if (event.code === key) inKey.classList.remove("highlight") });

      switch (key) {
        case "Enter":
          inKey.onclick = () => {
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            textArea.value = textArea.value.slice(0, start) + '\n' + textArea.value.slice(end);
            textArea.selectionStart = textArea.selectionEnd = start + 1;
            textArea.focus();
          };
          break;
        case "Backspace":
          inKey.onclick = () => {
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            if (start === end && start > 0) {
              textArea.value = textArea.value.slice(0, start - 1) + textArea.value.slice(end);
              textArea.selectionStart = textArea.selectionEnd = start - 1;
            } else {
              textArea.value = textArea.value.slice(0, start) + textArea.value.slice(end);
              textArea.selectionStart = textArea.selectionEnd = start;
            }
            textArea.focus();
          };
          break;
        case "Delete":
          inKey.onclick = () => {
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            if (start === end && end < textArea.value.length) {
              textArea.value = textArea.value.slice(0, start) + textArea.value.slice(end + 1);
            } else {
              textArea.value = textArea.value.slice(0, start) + textArea.value.slice(end);
            }
            textArea.selectionStart = textArea.selectionEnd = start;
            textArea.focus();
          };
        break;
        case "ArrowLeft":
          inKey.onclick = () => {
            const start = textArea.selectionStart;
            if (start > 0) {
              textArea.selectionStart = start - 1;
              textArea.selectionEnd = start - 1;
            }
            textArea.focus();
          };
          break;
        case "ArrowRight":
          inKey.onclick = () => {
            const end = textArea.selectionEnd;
            if (end < textArea.value.length) {
              textArea.selectionStart = end + 1;
              textArea.selectionEnd = end + 1;
            }
            textArea.focus();
          };
          break;
        case "ArrowUp":
          inKey.onclick = () => {
            const start = textArea.selectionStart;
            if (start > 0) {
              const lines = textArea.value.split("\n");
              const currentLine = textArea.value.substr(0, start).split("\n").length;
              const currentLineText = lines[currentLine - 1];
              const prevLineText = lines[currentLine - 2];
              const offset = start - textArea.value.lastIndexOf(currentLineText, start);
              // Move cursor to previous line at the same offset
              if (currentLine !== 1) {
                const prevLineOffset = Math.min(offset, prevLineText.length);
                const prevLineStart = textArea.value.lastIndexOf(prevLineText) + prevLineOffset;
                textArea.setSelectionRange(prevLineStart, prevLineStart);
              }
            }
            textArea.focus();
          };
          break;
          case "ArrowDown":
            inKey.onclick = () => {
              const end = textArea.selectionEnd;
              if (end < textArea.value.length) {           
                const lines = textArea.value.split("\n");
                const currentLine = textArea.value.substr(0, end).split("\n").length;
                const currentLineText = lines[currentLine - 1];
                const nextLineText = lines[currentLine];
                const offset = end - textArea.value.lastIndexOf(currentLineText, end);
                // Move cursor to next line at the same offset
                if (currentLine !== lines.length) {
                  const nextLineOffset = Math.min(offset, nextLineText.length);
                  const nextLineStart = textArea.value.indexOf(nextLineText) + nextLineOffset;
                  textArea.setSelectionRange(nextLineStart, nextLineStart);
                }
              }
              textArea.focus();
            };
            break;
        case "Tab":
          document.addEventListener("keydown", (event) => {
            if (event.code === key) {
              event.preventDefault();
              const start = textArea.selectionStart;
              const end = textArea.selectionEnd;
              textArea.value = textArea.value.slice(0, start) + "\t" + textArea.value.slice(end);
              textArea.selectionStart = textArea.selectionEnd = start + 1;
              textArea.focus();
            }
          });
          inKey.onclick = () => {
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            textArea.value = textArea.value.slice(0, start) + "\t" + textArea.value.slice(end);
            textArea.selectionStart = textArea.selectionEnd = start + 1;
            textArea.focus();
          };
          break;
        case "ShiftLeft":
        case "ShiftRight":
          inKey.addEventListener('mousedown', () => {
            this.isShiftPressed = true;
            this.generateKeyboard(this.isEnglish ? this.EN_UPPERCASE : this.RU_UPPERCASE);
          });
          inKey.addEventListener('mouseup', () => {
            this.isShiftPressed = false;
            this.generateKeyboard(this.isEnglish ? this.EN_LOWERCASE : this.RU_LOWERCASE);
          });
          break;
        case "CapsLock":
          break;
        case "Space":
          inKey.onclick = () => {
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            textArea.value = textArea.value.slice(0, start) + " " + textArea.value.slice(end);
            textArea.selectionStart = textArea.selectionEnd = start + 1;
            textArea.focus();
          };
          break;
        case "Lang":
          break;
        default:
          inKey.onclick = () => {
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            textArea.value = textArea.value.slice(0, start) + inKey.textContent + textArea.value.slice(end);
            textArea.selectionStart = textArea.selectionEnd = start + 1;
            textArea.focus();
          };
      }
      generatedRow.appendChild(inKey);
    }
    return generatedRow;
  }
  costyl() {
    document.addEventListener("keydown", (event) => {
      const ShiftRight = document.querySelector(".ShiftRight");
      const ShiftLeft = document.querySelector(".ShiftLeft");
      if (event.code === "ShiftRight") {
        ShiftRight.classList.add("highlight");
      } else if (event.code === "ShiftLeft") {
        ShiftLeft.classList.add("highlight");
      }
    });
    document.addEventListener("keydown", (event) => {
      const CapsLock = document.querySelector(".CapsLock");
      if (event.code === "CapsLock") {
        CapsLock.classList.add("highlight");
      }
    });
  }
  generateFunctionalKeyboard() {
    this.switchLanguages();
    this.generateInformation();
    this.generateKeyboard(this.isEnglish ? this.EN_LOWERCASE : this.RU_LOWERCASE);
    this.switchCase();
    this.costyl();
  }
}

// Instantiate and invoke classes
new Background().generateBackground();
new Textarea().generateTextarea();
new Keyboard().generateFunctionalKeyboard();