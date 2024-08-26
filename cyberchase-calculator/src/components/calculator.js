import React, { useState } from 'react';

export const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleDigitClick = (digit) => {
    if(waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  }

 const handleClear = () => {
    setDisplayValue('0');
    setWaitingForSecondOperand(false);
    setFirstOperand(null);
  }

  const performOperation = () => {
    const secondOperand = parseFloat(displayValue);

    if (operator && firstOperand !== null) {
      const result = {
        '+': firstOperand + secondOperand,
        '-': firstOperand - secondOperand,
        '*': firstOperand * secondOperand,
        '/': firstOperand / secondOperand,
      }[operator];

      setDisplayValue(result.toString());
      setFirstOperand(result);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  const handleOperatorClick = (op) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(displayValue));
    } else if (operator) {
      performOperation();
    }
    setOperator(op);
    setWaitingForSecondOperand(true);
  };

  const handleEquals = () => {
    performOperation();
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <button onClick={() => handleDigitClick('7')}>7</button>
        <button onClick={() => handleDigitClick('8')}>8</button>
        <button onClick={() => handleDigitClick('9')}>9</button>

        <button onClick={() => handleOperatorClick('/')}>/</button> 

        <button onClick={() => handleDigitClick('4')}>4</button>
        <button onClick={() => handleDigitClick('5')}>5</button>
        <button onClick={() => handleDigitClick('6')}>6</button>

        <button onClick={() => handleOperatorClick('*')}>*</button> 

        <button onClick={() => handleDigitClick('1')}>1</button>
        <button onClick={() => handleDigitClick('2')}>2</button>
        <button onClick={() => handleDigitClick('3')}>3</button>

        <button onClick={() => handleOperatorClick('-')}>-</button> 

        <button onClick={() => handleDigitClick('0')}>0</button>

        <button onClick={() => handleOperatorClick('+')}>+</button> 
        <button onClick={handleEquals}>=</button>

        <button onClick={handleClear}>C</button> 
      </div>
    </div>
  );
};