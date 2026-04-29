import { useState } from 'react'
import './App.css'
import { add, subtract, divide } from './utils/calculator'

const multiply = (a, b) => a * b;

function App() {
  const [currentOperand, setCurrentOperand] = useState('0')
  const [previousOperand, setPreviousOperand] = useState(null)
  const [operation, setOperation] = useState(null)
  const [error, setError] = useState(null)
  const [overwrite, setOverwrite] = useState(false)

  const clear = () => {
    setCurrentOperand('0')
    setPreviousOperand(null)
    setOperation(null)
    setError(null)
    setOverwrite(false)
  }

  const deleteDigit = () => {
    if (overwrite) {
      setCurrentOperand('0')
      setOverwrite(false)
      return
    }
    if (currentOperand === '0') return
    if (currentOperand.length === 1) {
      setCurrentOperand('0')
      return
    }
    setCurrentOperand(currentOperand.slice(0, -1))
  }

  const appendDigit = (digit) => {
    if (overwrite) {
      setCurrentOperand(digit)
      setOverwrite(false)
      return
    }
    if (digit === '.' && currentOperand.includes('.')) return
    if (currentOperand === '0' && digit !== '.') {
      setCurrentOperand(digit)
      return
    }
    setCurrentOperand(currentOperand + digit)
  }

  const chooseOperation = (op) => {
    if (currentOperand === '0' && previousOperand === null) {
        if(op === '-') {
            setCurrentOperand('-')
        }
        return
    }
    if(currentOperand === '-') return;

    if (previousOperand == null) {
      setOperation(op)
      setPreviousOperand(currentOperand)
      setCurrentOperand('0')
      return
    }
    if (currentOperand === '0' || currentOperand === '-') {
      setOperation(op)
      return
    }
    calculate()
    setOperation(op)
  }

  const calculate = () => {
    if (operation == null || previousOperand == null) return
    
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    
    if (isNaN(prev) || isNaN(current)) return
    
    let computation = ''
    try {
      switch (operation) {
        case '+':
          computation = add(prev, current)
          break
        case '-':
          computation = subtract(prev, current)
          break
        case '×':
          computation = multiply(prev, current)
          break
        case '÷':
          computation = divide(prev, current)
          break
        default:
          return
      }
      
      setCurrentOperand(computation.toString())
      setOperation(null)
      setPreviousOperand(null)
      setError(null)
      setOverwrite(true)
    } catch (err) {
      setError(err.message)
      setCurrentOperand('0')
      setOperation(null)
      setPreviousOperand(null)
    }
  }

  return (
    <div className="app-container">
      <h1 className="title">CALCULATOR</h1>
      <div className="calculator">
        <div className="display">
          <div className="previous-operand">
            {previousOperand} {operation}
          </div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <div className="error-message">{error}</div>
        <div className="keypad">
          <button className="btn span-two" onClick={clear}>AC</button>
          <button className="btn" onClick={deleteDigit}>DEL</button>
          <button className="btn operator" onClick={() => chooseOperation('÷')}>÷</button>
          
          <button className="btn" onClick={() => appendDigit('7')}>7</button>
          <button className="btn" onClick={() => appendDigit('8')}>8</button>
          <button className="btn" onClick={() => appendDigit('9')}>9</button>
          <button className="btn operator" onClick={() => chooseOperation('×')}>×</button>
          
          <button className="btn" onClick={() => appendDigit('4')}>4</button>
          <button className="btn" onClick={() => appendDigit('5')}>5</button>
          <button className="btn" onClick={() => appendDigit('6')}>6</button>
          <button className="btn operator" onClick={() => chooseOperation('-')}>-</button>
          
          <button className="btn" onClick={() => appendDigit('1')}>1</button>
          <button className="btn" onClick={() => appendDigit('2')}>2</button>
          <button className="btn" onClick={() => appendDigit('3')}>3</button>
          <button className="btn operator" onClick={() => chooseOperation('+')}>+</button>
          
          <button className="btn span-two" onClick={() => appendDigit('0')}>0</button>
          <button className="btn" onClick={() => appendDigit('.')}>.</button>
          <button className="btn equal" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
