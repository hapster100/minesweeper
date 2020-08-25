export const FILED_CELL_STATES = {
  MARKED: 'MARKED',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
}

export class FieldCell {
  constructor() {
    this.state = FILED_CELL_STATES.CLOSED
    this.isMine = false
  }

  isClosed() {
    return this.state === FILED_CELL_STATES.CLOSED
  }

  isMarked() {
    return this.state === FILED_CELL_STATES.MARKED
  }

  toggleMark() {
    switch (this.state) {
      case FILED_CELL_STATES.MARKED:
        this.state = FILED_CELL_STATES.CLOSED
        break
      case FILED_CELL_STATES.CLOSED:
        this.state = FILED_CELL_STATES.MARKED
        break
        case FILED_CELL_STATES.OPEN:
        throw new Error('Can\'t mark open cell')
        break
    }
  }

  open() {
    this.state = FILED_CELL_STATES.OPEN
  }

}
