import {FILED_CELL_STATES} from '../game/FieldCell'

export class CellNode {
  constructor(cell, count, size, onOpen, onMark) {
    this.cell = cell
    this.count = count

    this.onOpen = onOpen
    this.onMark = onMark

    this.node = document.createElement('div')
    this.node.classList.add('field__cell')
    this.node.style.height = size + 'px'
    this.node.style.width = size + 'px'
    this.node.addEventListener('click', this.onOpen)
    this.node.addEventListener('contextmenu', this.onMark)
  }

  setInner() {
    switch (this.cell.state) {
      case FILED_CELL_STATES.MARKED:
        this.node.innerHTML = '?'
        break
      case FILED_CELL_STATES.CLOSED:
        this.node.innerHTML = ''
        break
      default:
        if(this.cell.isMine) this.node.innerHTML = 'M'
        else this.node.innerHTML = this.count > 0 ? this.count : ''
        break
    }
  }

  setClasses() {
    if(this.cell.isClosed() || this.cell.isMarked()) {
      this.node.classList.add('field__cell--closed')
      if (this.count) {
        this.node.classList.remove('field__cell--' + this.count)
      }
    } else {
      this.node.classList.remove('field__cell--closed')
      if (this.count) {
        this.node.classList.add('field__cell--' + this.count)
      }
    }
  }

  getNode() {
    return this.node
  }

  render() {
    this.setInner()
    this.setClasses()
  }

  destroy() {
    this.node.innerHTML = ''
    this.node.removeEventListener('click', this.onOpen)
    this.node.removeEventListener('contextmenu', this.onMark)
  }
}
