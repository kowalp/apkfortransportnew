const inputLockCommaAndPointerOnKeyDown = (event: KeyboardEvent): void => {
  const keyCode = event.code;
  if (keyCode === 'Comma' || keyCode === 'Period' || keyCode === 'NumpadDecimal') {
    event.preventDefault();
  }
};

const inputLockENumberOnKeyDown = (event: KeyboardEvent): void => {
  const keyCode = event.code;
  if (keyCode === 'KeyE') {
    event.preventDefault();
  }
};
const inputLockNegativeNumberOnKeyDown = (event: KeyboardEvent): void => {
  const keyCode = event.code;
  if (keyCode === 'NumpadSubtract' || keyCode === 'Minus') {
    event.preventDefault();
  }
};
export const formUtils = {
  inputLockCommaAndPointerOnKeyDown,
  inputLockENumberOnKeyDown,
  inputLockNegativeNumberOnKeyDown
};
