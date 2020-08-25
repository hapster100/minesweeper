export class CounterNode {
  constructor(counter) {
    this.counter = counter
    this.node = document.createElement('div')
    this.node.classList.add('minesweeper__counter')
    this.node.innerHTML = counter
  }

  getNode() {
    return this.node
  }

  set(value) {
    this.counter = value
    this.render()
  }

  render() {
    this.node.innerHTML = this.counter
  }
}
