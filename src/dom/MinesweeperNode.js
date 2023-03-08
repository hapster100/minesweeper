import { CounterNode } from './CounterNode'
import { CellNode } from './CellNode'
import { Minesweeper } from '../game/Minesweeper'

export class MinesweeperNode {
  constructor(config = {}, w, h) {
    const {width, height, mines} = config
    const cellSize = Math.floor(Math.min(w/width, h/height))

    this.game = new Minesweeper(width, height, mines)
    this.node = document.createElement('div')
    this.node.classList.add('minesweeper__wrapper')
    this.cellNodes = []
    this.counterNode = new CounterNode(mines)

    const minesweeperNode = document.createElement('div')
    minesweeperNode.classList.add('minesweeper')

    const fieldNode = document.createElement('div')
    fieldNode.classList.add('minesweeper__field')
    fieldNode.classList.add('field')

    const fieldRowNodes = new Array(height)
      .fill(0).map(() => {
        const row = document.createElement('div')
        row.classList.add('field__row')
        return row
      })
    
    for(let i = 0; i < width; i++) {
      for(let j = 0; j < height; j++) {
        const cell = this.game.field.getCell(i, j)
        const count = this.game.field.getCellCounter(i, j) 
        const cellNode = new CellNode(
          cell, count, cellSize,
          _ => {
            if(cell.isMine && !cell.isMarked()) {
              this.game.gameover()
            } else {
              this.game.field.open(i, j)
            }
            this.render()
          },
          _ => {
            this.game.field.mark(i, j)
            this.counterNode.set(this.game.field.markCounter)
            this.render()
          }
        )
        
        fieldRowNodes[j].appendChild(cellNode.getNode())

        this.cellNodes.push(cellNode)
      }
    }

    fieldRowNodes.forEach(row => fieldNode.appendChild(row))
    
    minesweeperNode.appendChild(this.counterNode.getNode())
    minesweeperNode.appendChild(fieldNode)

    this.node.appendChild(minesweeperNode)

  }

  getNode() {
    return this.node
  }

  render() {
    this.cellNodes.forEach(node => node.render())
  }

  destroy() {
    this.cellNodes.forEach(node => node.destroy())
    this.node.innerHTML = ''
    this.node.outerHTML = ''
  }
}
