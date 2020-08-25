import {getRandomArrayIndex} from '../utils'
import {FieldCell} from './FieldCell'

export class Field {
  constructor(width, height, mineCount) {
    this.width = width
    this.height = height

    this.markCounter = mineCount
    this.openCounter = 0

    this.cells = new Array(width * height).fill(0)
      .map(_ => new FieldCell())
    
    let emptyIndexes = new Array(width * height).fill(0).map((_, i) => i)
    for(let i = 0; i < mineCount; i++) {
      const newMineIndex = getRandomArrayIndex(emptyIndexes)
      this.cells[emptyIndexes[newMineIndex]].isMine = true
      
      emptyIndexes.splice(newMineIndex, 1)
    }
  }

  isOnField(x, y) {
    return x > -1 && y > -1 &&
    x < this.width && y < this.height
  }

  getNeighbors(i, j, cross = false) {
    const neighbors = []

    for(let di = -1; di < 2; di++) {
      for(let dj = -1; dj < 2; dj++) {
        if(cross && 
            !(di === 0 || dj === 0) 
          ) continue
        const x = i + di, y = j + dj
        if(this.isOnField(x, y)) {
            neighbors.push(this.getCell(x, y))
          }
      }
    }

    return neighbors
  }

  getCell(i, j) { return this.cells[i + this.width * j] }
  
  getCellCounter(i, j) {
    return this.getNeighbors(i, j).filter(cell => cell.isMine).length
  }

  open(i, j) {
    const cell = this.getCell(i, j)
    
    if(!cell.isClosed() || cell.isMarked()) return
    cell.open()
    if(cell.isMine) return
    
    this.openCounter++
    
    const neighborsCoords = [-1, 0, 1]
    .map(di => [-1, 0, 1].map(dj => ({
      x: i + di, y: j + dj
    }))).reduce((acc, next) => [...acc, ...next], [])
    
    const isEmpty = this.getCellCounter(i, j) === 0

    neighborsCoords
      .filter(({x, y}) => this.isOnField(x, y))
      .map(coords => ({coords, cell: this.getCell(coords.x, coords.y)}))
      .filter(({cell}) => !cell.isMine)
      .forEach(({ coords }) => {
        if(isEmpty || this.getCellCounter(coords.x, coords.y) === 0)
          this.open(coords.x, coords.y)
      })

  }

  mark(i, j) {

    
    const cell = this.getCell(i, j)
    
    if(!cell.isClosed() && !cell.isMarked()) return
    
    if(cell.isMarked()) this.markCounter++
    else this.markCounter--
    
      cell.toggleMark()
  }
}
