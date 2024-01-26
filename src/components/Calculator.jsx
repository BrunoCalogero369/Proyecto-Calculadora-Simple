import { useState, useEffect, useCallback } from 'react';
import '../styles/styles.css';

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState('');

  const calculate = useCallback(() => {
    try {
      const result = eval(currentInput);
      setCurrentInput(result.toString());
    } catch (error) {
      setCurrentInput('Error');
    }
  }, [currentInput]);

const addToInput = (value) => {
    setCurrentInput((prevInput) => prevInput + value);
  };

const clearInput = () => {
    setCurrentInput('');
  };

const deleteLastChar = useCallback(() => {
    setCurrentInput((prevInput) => prevInput.slice(0, -1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if ((key >= '0' && key <= '9') || key === '.') {
        addToInput(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        addToInput(key);
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Escape') {
        clearInput();
      } else if (key === 'Backspace') {
        deleteLastChar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentInput, calculate, deleteLastChar]);
  
return (
<div className="calculator">
<div className="display">
<input type="text" value={currentInput} readOnly />
</div>
<div className="buttons">
<button className="operation-button" onClick={() => addToInput('+')}>+</button>
<button className="operation-button" onClick={() => addToInput('-')}>-</button>
<button className="operation-button" onClick={() => addToInput('*')}>*</button>
<button className="operation-button" onClick={() => addToInput('/')}>/</button>
<button className="operation-button" onClick={clearInput}>AC</button>
<button className="operation-button" onClick={deleteLastChar}>{String.fromCharCode(8592)}</button>
<button onClick={() => addToInput('9')}>9</button>
<button onClick={() => addToInput('8')}>8</button>
<button onClick={() => addToInput('7')}>7</button>
<button onClick={() => addToInput('6')}>6</button>
<button onClick={() => addToInput('5')}>5</button>
<button onClick={() => addToInput('4')}>4</button>
<button onClick={() => addToInput('3')}>3</button>
<button onClick={() => addToInput('2')}>2</button>
<button onClick={() => addToInput('1')}>1</button>
<button onClick={() => addToInput('0')}>0</button>
<button onClick={() => addToInput('.')}>.</button>
<button className="operation-button" onClick={calculate}>=</button>
</div>
</div>
);
};
export default Calculator;