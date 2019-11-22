class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }
    clear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete(){
        let string = this.currentOperand.toString()
this.currentOperand = string.slice(0, string.length -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
this.currentOperand =this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
if(this.currentOperand !==''){
    if (this.previousOperand !== ''){
        this.compute();
    }
this.operation = operation
this.previousOperand = this.currentOperand
this.currentOperand = ''}

    }

    compute(){
     let computation
     let previous = parseFloat(this.previousOperand)
     let current = parseFloat(this.currentOperand)
     if (this.operation =='√')
     {
      current=null
     } 
     if (isNaN(previous)|| isNaN(current)) return // stop the function 
     //if prev or cur is not a number

     switch (this.operation) {
      case '√': 
      computation= Math.sqrt(previous)
        break
         case '+': 
         computation= previous + current
           break
         case '-': 
         computation= previous - current
           break
         case '*': 
         computation= previous * current
           break
         case '/': 
         if (current == 0){
           computation = ''
           alert('you can not divide by 0')
         }else 
         computation= previous / current
           break
           case 'xⁿ': 
           computation = Math.pow(previous, current);
             break
           default: 
           return//cancel switch statement
     }
     this.currentOperand = computation
     this.operation = undefined
     this.previousOperand = ''
    }

    getDisplayNumber(number) {

        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        //part of string on left side of '.'
        const decimalDigits = stringNumber.split('.')[1]
        //part of string on right side of '.'
        let integerDisplay 
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay 
          = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    
      }
    updateDisplay(){
     this.currentOperandTextElement.innerText=
     this.getDisplayNumber(this.currentOperand)
     if (this.operation != null){
       if (this.operation == 'xⁿ' )
         {
          this.previousOperandTextElement.innerText = 
          `${this.getDisplayNumber(this.previousOperand)} ⁿ` 
       }
       else
       if (this.operation == '√' )
       {
        this.previousOperandTextElement.innerText = 
        ` √ ${this.getDisplayNumber(this.previousOperand)} `}
        else
        this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`  
     } else
     this.previousOperandTextElement.innerText = ''
    }
    negativeNumbers()
    {

    }
}

const negative = document.querySelector('[number-minus]');
const minus = "-"
const numberButtons = document.querySelectorAll('[number]');
const mathButtons = document.querySelectorAll('[math-button]');
const mathRoot = document.querySelector('[math-root]');
const mathPower = document.querySelector('[math-power]');
const equalsButton = document.querySelector('[equal]');
const deleteButton = document.querySelector('[delete]');
const allClearButton = document.querySelector('[clear]');
const previousOperandTextElement = document.querySelector

('[data-previous-operand]');
const currentOperandTextElement = document.querySelector
('[data-current-operand]');


const calculator = new Calculator (previousOperandTextElement,
    currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
    
})


mathButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
    
})
  
negative.addEventListener('click', () => {
  calculator.appendNumber(minus)
  calculator.updateDisplay()

})


  mathPower.addEventListener('click', () => {
      calculator.chooseOperation(mathPower.innerText)
      alert('Enter an exponent \'n\'')
      calculator.updateDisplay()
  })
  
  
  mathRoot.addEventListener('click', () => {
    calculator.chooseOperation(mathRoot.innerText)
    calculator.compute()
    calculator.updateDisplay()
})

  

allClearButton.addEventListener('click', button => {
calculator.clear()
calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


/*
modifications to do:


negative numbers */

