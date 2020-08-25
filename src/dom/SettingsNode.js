import {NumberField} from './NumberField'

export class SettingsNode {
  constructor(config = {}) {
    this.node = document.createElement('div')
    this.node.classList.add('settings')

    this.heightNode = new NumberField('Height', config.height)
    this.widthNode = new NumberField('Width', config.width)
    this.minesNode = new NumberField('Mines', config.mines)

    this.node.appendChild(this.heightNode.getNode())
    this.node.appendChild(this.widthNode.getNode())
    this.node.appendChild(this.minesNode.getNode())
  }

  setFields(config) {
    this.heightNode.setValue(config.height)
    this.widthNode.setValue(config.width)
    this.minesNode.setValue(config.mines)
  }

  getConfig() {
    const config = {
      height: this.heightNode.getValue(),
      width: this.widthNode.getValue(),
      mines: this.minesNode.getValue()
    }

    if(config.mines >= config.height * config.width) config.mines = config.height * config.width - 1
    if(config.height <= 0) config.height = 1
    if(config.width <= 0) config.width = 1
    
    this.setFields(config)
    
    return config
  }

  getNode() {
    return this.node
  }
}