let input = document.getElementById("input");

function appendValue(value) {
  if (value) {
    input.value += value;
  }
}

function clearInput() {
  input.value = "";
}

function calculate() {
  if (input.value) {
    try {
      input.value = eval(input.value);
    } catch (error) {
      input.value = "Error";
    }
  }
}

document.addEventListener('keydown', function (event) {
  if (!isNaN(event.key) || event.key === '.') {
    appendValue(event.key);
  } else if (event.key === 'Enter') {
    calculate();
  } else if (event.key.match(/[/*\-+.]/)) {
    appendValue(event.key);
  } else if (event.key === 'Escape') {
    clearInput();
  }
});

let divideButton = document.getElementById('divide-button');
if (divideButton !== null) {
  divideButton.addEventListener('click', function (event) {
    appendValue('/');
  });
}

let clearButton = document.getElementById('clear-button');
if (clearButton !== null) {
  clearButton.addEventListener('click', function (event) {
    clearInput();
  });
}