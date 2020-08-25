export class NumberField {
  constructor(label, value) {
    this.label = label
    this.value = value
    this.node = document.createElement('div')
    this.node.classList.add('number-field')
    this.node.innerHTML = this.getTemplate()

    this.listener = e => {
      if(e.target.innerHTML === '<br>') e.target.innerHTML = ''
      const newValue = Number(e.target.innerHTML)
      this.value = newValue ? newValue : 1
    }

    this.keydownListener = e =>{ if(e.key === 'Enter') e.preventDefault() }

    this.node.addEventListener('keydown', this.keydownListener)
    this.node.addEventListener('input', this.listener)
  }

  getTemplate() {
    return `
      <span class="number-field__label">${this.label}:</span> 
      <div class="number-field__input" contenteditable data-type="field">${this.value}</div>
    `
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.node.querySelector('[data-type="field"]').innerHTML = value
  }

  getNode() {
    return this.node
  }

  destroy() {
    this.node.removeEventListener('input', this.listener)
    this.node.removeEventListener('keydown', this.keydownListener)
  }
}