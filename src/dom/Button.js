export class Button {
  constructor(icon, onClick) {
    this.node = document.createElement('div')
    this.node.classList.add('button')
    this.node.innerHTML = `<i class="material-icons">${icon}</i>`
    this.listener = _ => onClick()
    this.node.addEventListener('click', this.listener)
  }
  getNode() {
    return this.node
  }
}