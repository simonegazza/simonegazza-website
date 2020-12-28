import React from 'react'
import "./Background.css"

class BackgroundCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.aliveCellColor = "dimgray"
    this.deadCellColor = "black"
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current
    
    const ctx = canvas.getContext("2d", {antialias: false, alpha: false})
  
    this.props.state.universe.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        ctx.fillStyle = (cell === 1 ? this.aliveCellColor : this.deadCellColor)
        ctx.fillRect(
          columnIndex * this.props.state.cellSize,
          rowIndex * this.props.state.cellSize,
          this.props.state.cellSize, 
          this.props.state.cellSize)
        })
      })
    ctx.stroke()
  }
  
  render() {
    return <canvas className="background" width={window.innerWidth + "px"} height={window.innerHeight + "px"} ref={this.canvasRef} />
  }
}

class BackgroundAnimation extends React.Component {
  constructor(props) {
    super(props)
    
    const cellSize = 5
    this.state = {
      width: Math.floor(window.innerWidth / cellSize),
      height: Math.floor(window.innerHeight / cellSize),
      currTime: new Date(),
      timeout: false,
      timeoutDelta: 500,
      cellSize
    }
    this.state.universe = this.newUniverse()
    
    this.updateAnimationState = this.updateAnimationState.bind(this)

    this.updateDimensions = this.updateDimensions.bind(this)
    this.resizeEnded = this.resizeEnded.bind(this)

  }

  newUniverse() {
    return Array
      .from({length: this.state.height})
      .map(() => Array
        .from({length: this.state.width})
        .map(() => Math.random() > 0.3333 ? 1 : 0))
  }
  
  livingNeighborCount(row, column) {
    const north = (row === 0 ? this.state.height - 1 : row - 1)
    const south = (row === this.state.height - 1 ? 0 : row + 1)
    const west = (column === 0 ? this.state.width - 1 : column - 1)
    const east = (column === this.state.width - 1 ? 0 : column + 1)
  
    return [
      this.state.universe[north][west], 
      this.state.universe[north][column],
      this.state.universe[north][east],
      this.state.universe[row][west],
      this.state.universe[row][east],
      this.state.universe[south][west],
      this.state.universe[south][column],
      this.state.universe[south][east]
    ].reduce((acc, curr) => acc + curr, 0)
  }
      
  tick() {
    return this.state.universe.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        const neighbor = this.livingNeighborCount(rowIndex, columnIndex)
        switch (cell) {
          case 0:
            if (neighbor === 3) cell = 1
          break
          case 1:
            if (neighbor < 2 || neighbor > 3) cell = 0
            else cell = 1
          break
          default:
            break
        }
        return cell
      })
    })
  }

  updateDimensions() {
    this.setState({ currTime: new Date() })
    if (this.state.timeout === false) {
      this.setState(prevstate => ({ timeout: true }))
      setTimeout(this.resizeEnded, this.state.timeoutDelta)
    }
  }

  resizeEnded() {
    console.log(this.state.currTime)
    if (new Date() - this.state.currTime < this.state.timeoutDelta) {
        setTimeout(this.resizeEnded, this.state.timeoutDelta);
    } else {
      this.setState(prevstate => ({ 
        timeout: false,
        width: window.innerWidth,
        height: window.innerHeight
      }))
      this.setState(prevstate => ({
        universe: this.newUniverse()
      })

    )}               
}

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions)
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF)
  }
  
  updateAnimationState() {
    this.setState(prevState => ({
      cellSize: this.state.cellSize,
      width: this.state.width,
      height: this.state.height,
      universe: this.tick()
    }))
    setTimeout(() => {
      this.rAF = requestAnimationFrame(this.updateAnimationState)
    }, 200)
  }
  
  render() {
    return <BackgroundCanvas state={this.state} />
  }
}

export default BackgroundAnimation