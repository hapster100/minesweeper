import {Field} from './Field'

export class Minesweeper {
  constructor(width, height, minesCount) {
    this.width = width
    this.height = height
    this.mineCount = minesCount
    this.field = new Field(width, height, minesCount)
    this.handlerRemovers = []
  }

  gameover() {
    for(let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.height; j++) {
        const cell = this.field.getCell(i, j)
        if(cell.isClosed() || cell.isMarked()) cell.open()
      }
    }
  }

  destroy() {
    root.innerHTML = ''
    this.handlerRemovers.forEach(remove => { remove() })
  }

}
