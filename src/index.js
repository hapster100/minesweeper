import {MinesweeperNode} from './dom/MinesweeperNode'
import {SettingsNode} from './dom/SettingsNode'
import {Button} from './dom/Button'

import './style.css'

class Game {
  static defaultConfig = () => ({
    height: 10,
    width: 10,
    mines: 10
  })

  constructor(root) {
    this.root = root
    this.minesweeper = null
    this.startButton = new Button('sync', () => this.start())
    this.settings = new SettingsNode(Game.defaultConfig())

    this.preventer = e => { e.preventDefault() }
    document.body.addEventListener('contextmenu', this.preventer)

    this.root.appendChild(this.settings.getNode())
    this.root.appendChild(this.startButton.getNode())

    this.start()
  }

  start() {
    if(this.minesweeper) {
      this.minesweeper.destroy()
    }
    this.minesweeper = new MinesweeperNode(this.settings.getConfig())
    this.root.appendChild(this.minesweeper.getNode())
    this.minesweeper.render()
  }

  destroy() {
    document.body.removeEventListener('contextmenu', this.preventer)
  }
}

const root = document.getElementById('root')
const game = new Game(root)
