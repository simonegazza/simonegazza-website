const cellColor = "#121212"

class GameOfLife {
    constructor(rows, cols, sparsity) {
        this.rows = rows
        this.cols = cols

        this.matrix = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () =>
                Math.random() > sparsity ? 1 : 0
        ))
    }

    countNeighbours(rowIndex, columnIndex) {
        let counter = 0

        let precedingCellRow = rowIndex - 1;
        let nextCellRow = rowIndex + 1;
        let precedingCellCol = columnIndex - 1;
        let nextCellCol = columnIndex + 1;

        if (rowIndex - 1 < 0) precedingCellRow = this.rows - 1
        if (rowIndex + 1 >= this.rows) nextCellRow = 0

        if (columnIndex - 1 < 0) precedingCellCol = this.cols
        if (columnIndex + 1 >= this.cols) nextCellCol = 0

        counter += this.matrix[precedingCellRow][columnIndex]
        counter += this.matrix[precedingCellRow][precedingCellCol]
        counter += this.matrix[precedingCellRow][nextCellCol]
        counter += this.matrix[rowIndex][nextCellCol]
        counter += this.matrix[rowIndex][precedingCellCol]
        counter += this.matrix[nextCellRow][columnIndex]
        counter += this.matrix[nextCellRow][precedingCellCol]
        counter += this.matrix[nextCellRow][nextCellCol]

        return counter
    }

    update() {
        this.matrix = this.matrix.map((row, rowIndex) => {
            return row.map((elem, elemIndex) => {
                const neighbours = this.countNeighbours(rowIndex, elemIndex)

                if (elem == 0 && neighbours == 3)
                    return 1;
                else if (elem == 1 && (neighbours < 2 || neighbours > 3))
                    return 0
                else
                    return elem
            })
        })
    }
}

class GameOfLifePlotter {
    constructor(gameOfLife, canvas, cellSize) {
        this.cellSize = cellSize
        this.gameOfLife = gameOfLife

        this.canvas = canvas
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        const context = this.canvas.getContext("2d")
        context.fillStyle = cellColor
    }

    plot() {
        const context = this.canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath()
        this.gameOfLife.matrix.forEach((row, rowIndex) => {
            row.forEach((elem, elemIndex) => {
                if (elem == 1) {
                    const upperBound = rowIndex * this.cellSize
                    const leftBound = elemIndex * this.cellSize

                    context.fillRect(leftBound, upperBound, this.cellSize, this.cellSize)
                }
            })
        })
        context.stroke()
    }
}

const prepareAnimation = () => {
    const cellSize = document.getElementById("size").value
    const sparsity = document.getElementById("sparsity").value / 100

    const rows = Math.floor(window.innerHeight / cellSize)
    const cols = Math.floor(window.innerWidth / cellSize)
    const gameOfLife = new GameOfLife(rows, cols, sparsity)
    const plotter = new GameOfLifePlotter(gameOfLife, document.getElementById("canvas"), cellSize)

    window.gameOfLife = gameOfLife
    window.plotter = plotter

    plotter.plot()
}

const generateNextFrame = () =>  {
    window.gameOfLife.update()
    window.plotter.plot()
    window.frameId = requestAnimationFrame(generateNextFrame)
}

window.addEventListener("resize", () => {
    window.cancelAnimationFrame(window.frameId)
    prepareAnimation()
    window.frameId = requestAnimationFrame(generateNextFrame)
})

window.addEventListener("load", () => {
    prepareAnimation()
    window.frameId = requestAnimationFrame(generateNextFrame)

    document.getElementById("size").addEventListener("input", () => {
        window.cancelAnimationFrame(window.frameId)
        prepareAnimation()
        window.frameId = requestAnimationFrame(generateNextFrame)
    })

    document.getElementById("sparsity").addEventListener("input", () => {
        window.cancelAnimationFrame(window.frameId)
        prepareAnimation()
        window.frameId = requestAnimationFrame(generateNextFrame)
    })

})
