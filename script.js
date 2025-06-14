// Element references
const display = document.querySelector(".screen_input");
const buttons = document.querySelectorAll(".calc_btn");
const clearBtn = document.querySelector(".btn-clear");
const equalBtn = document.querySelector(".btn_equal");

// Constants
const maxDigits = 10;
const operators = ["+", "-", "*", "/", "%", "**"];

// Append value to display
function appendValue(val) {
  if (isDigit(val) && lastNumber().length >= maxDigits) {
    alert("حداکثر تعداد ارقام مجاز ۱۰ عدد است!");
    return;
  }

  if (val === ".") {
    if (!lastNumber().includes(".")) {
      display.value += val;
    } else {
      alert("فقط یک نقطه اعشار در هر عدد مجاز است!");
    }
    return;
  }

  if (val === "p") {
    if (display.value && !isNaN(display.value.slice(-1))) {
      display.value += "*";
    }
    display.value += Math.PI.toFixed(6);
    return;
  }

  if (isOperator(val)) {
    const lastChar = display.value.slice(-1);
    if (display.value !== "" && !isNaN(lastChar)) {
      display.value += val;
    } else {
      alert("لطفاً ابتدا یک عدد وارد کنید!");
    }
    return;
  }

  if (val === "=") {
    try {
      const exp = display.value.replace(/%/g, "/100");
      display.value = eval(exp);
    } catch {
      alert("عبارت نامعتبر است!");
    }
    return;
  }

  if (val !== "Clear") {
    display.value += val;
  }
}

// Check if character is digit
function isDigit(char) {
  return /^\d$/.test(char);
}

// Check if character is operator
function isOperator(char) {
  return ["+", "-", "*", "/", "%", "**"].includes(char);
}

// Get the current number before operator
function lastNumber() {
  const parts = display.value.split(/[\+\-\*\/\%\^]/);
  return parts[parts.length - 1];
}

// Handle all button clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.value;
    if (val === "Clear") {
      display.value = "";
    } else {
      appendValue(val);
    }
  });
});
