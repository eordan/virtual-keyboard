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
    if (localStorage.getItem('isEnglish') !== null) {
      isEnglish = JSON.parse(localStorage.getItem('isEnglish'));
    } else {
      isEnglish = true;
    }
    this.isEnglish = isEnglish;
    this.isShiftPressed = false;
    this.isCapsLockOn = false;
    this.keyboardContainer = null;
    this.EN_LOWERCASE = [
      ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
      ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
      ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
      ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
      ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "EN"]
    ];
    this.EN_UPPERCASE = [ 
      ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace"],
      ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Del"],
      ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Enter"],
      ["Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "↑", "Shift"],
      ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "EN"]
    ];
    this.RU_LOWERCASE = [ 
      ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
      ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del"],
      ["Caps Lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
      ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "↑", "Shift"],
      ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "RU"]
    ];
    this.RU_UPPERCASE = [ 
      ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace"],
      ["Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Del"],
      ["Caps Lock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
      ["Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "↑", "Shift"],
      ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", "RU"]
    ];
  }
  switchLanguages() {
    document.addEventListener("keydown", (event) => {
      if (event.shiftKey && event.altKey) {
        this.isEnglish = !this.isEnglish;
        localStorage.setItem('isEnglish', this.isEnglish);
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
  };
  generateRow(row) {
    const generatedRow = document.createElement("div");
    generatedRow.classList.add("row");

    for (let i = 0; i < row.length; i++) {
      const textArea = document.querySelector('.area-container');
      const key = document.createElement("div");
      key.classList.add("keys");
      key.textContent = row[i];

      switch (row[i]) {
        case "Enter":
          key.classList.add("enter");
          key.onclick = () => { textArea.value = textArea.value.slice(0, textArea.selectionStart) + '\n' + textArea.value.slice(textArea.selectionEnd) };
          break;
        case "Shift":
          key.classList.add("shift");
          key.addEventListener('mousedown', () => {
            this.isShiftPressed = true;
            this.generateKeyboard(this.isEnglish ? this.EN_UPPERCASE : this.RU_UPPERCASE);
          });
          key.addEventListener('mouseup', () => {
            this.isShiftPressed = false;
            this.generateKeyboard(this.isEnglish ? this.EN_LOWERCASE : this.RU_LOWERCASE);
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
  }
  highlightKey() {
    document.addEventListener("keydown", (event) => {
      const shiftKeys = document.querySelectorAll(".shift");
      if (event.key === "Shift") {
        shiftKeys.forEach((key) => {
          key.classList.add("highlight");
        });
      }
    });
    document.addEventListener("keydown", (event) => {
      const shiftKeys = document.querySelectorAll(".symbol");
      if (event.key === "g") {
        shiftKeys.forEach((key) => {
          key.classList.add("highlight");
        });
      }
    });
  }
  generateFunctionalKeyboard() {
    this.switchLanguages();
    this.generateKeyboard(this.isEnglish ? this.EN_LOWERCASE : this.RU_LOWERCASE);
    this.switchCase();
    this.highlightKey();
  }
}

// Instantiate and invoke classes
new Textarea().generateTextarea();
new Keyboard().generateFunctionalKeyboard();