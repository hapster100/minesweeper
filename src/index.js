import {MinesweeperNode} from './dom/MinesweeperNode'
import {SettingsNode} from './dom/SettingsNode'
import {Button} from './dom/Button'

import './style.css'

class Game {
  static defaultConfig = () => ({
    height: 20,
    width: 20,
    mines: 20,
    maxHeight: Math.floor((document.body.clientHeight - 170) / 25),
    maxWidth: Math.floor((document.body.clientWidth - 20) / 25)
  })

  constructor(root) {
    this.root = root
    this.minesweeper = null
    this.startButton = new Button('sync', () => this.start())
    this.settings = new SettingsNode(Game.defaultConfig())

    this.preventer = e => { e.preventDefault() }
    document.body.addEventListener('contextmenu', this.preventer)

    this.start()

  }

  start() {
    if(this.minesweeper) {
      this.minesweeper.destroy()
    }
    this.minesweeper = new MinesweeperNode(
      this.settings.getConfig(),
      this.root.clientWidth,
      this.root.clientHeight - 200,
    )
    this.root.innerHTML = ''

    const ctrlNode = document.createElement('div')
    ctrlNode.classList.add('ctrl')
    ctrlNode.appendChild(this.settings.getNode())
    ctrlNode.appendChild(this.startButton.getNode())

    this.root.appendChild(this.minesweeper.getNode())
    this.root.appendChild(ctrlNode)
    this.minesweeper.render()
  }

  destroy() {
    document.body.removeEventListener('contextmenu', this.preventer)
  }
}

const root = document.getElementById('root')
let game = new Game(root)
document.body.onresize = function() {
  game.destroy()
  game = new Game(root)
}
