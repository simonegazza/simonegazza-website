const cellColor = "#5A5A5A"
const gridColor = "#000000"

let height = window.innerHeight
let width = window.innerWidth

let rows
let cols

let cellSize
let sparsity

let matrix

let canvas
let context

let animationID

function getMatrix(rows, cols, sparsity) {
    return Array.from({ length: rows }, row =>
        Array.from({ length: cols }, elem =>
            Math.random() > sparsity ? 1 : 0
    ))
}

function makeGrid() {
    canvas.offScreenCanvas = document.createElement('canvas');
    canvas.offScreenCanvas.width = canvas.width;
    canvas.offScreenCanvas.height = canvas.height;

    const context = canvas.offScreenCanvas.getContext("2d")

    context.strokeStyle = gridColor
    context.beginPath()
    for (i = 0; i <= rows; i++) {
        context.moveTo(0, i * cellSize)
        context.lineTo(width, i * cellSize)
    }
    for (i = 0; i <= cols; i++) {
        context.moveTo(i * cellSize, 0)
        context.lineTo(i * cellSize, height)
    }
    context.stroke()
}

function drawCells() {
    context.fillStyle = cellColor
    context.beginPath()
    matrix.forEach((row, rowIndex) => {
        row.forEach((elem, elemIndex) => {
            if (elem == 1) {
                const upperBound = rowIndex * cellSize
                const leftBound = elemIndex * cellSize

                context.fillRect(leftBound, upperBound, cellSize, cellSize)
            }
        })
    })
    context.stroke()
}

function countNeighbours(rowIndex, columnIndex) {
    let counter = 0

    let precedingCellRow = rowIndex - 1;
    let nextCellRow = rowIndex + 1;
    let precedingCellCol = columnIndex - 1;
    let nextCellCol = columnIndex + 1;

    if (rowIndex - 1 < 0) precedingCellRow = rows - 1
    if (rowIndex + 1 >= rows) nextCellRow = 0

    if (columnIndex - 1 < 0) precedingCellCol = cols
    if (columnIndex + 1 >= cols) nextCellCol = 0

    counter += matrix[precedingCellRow][columnIndex]
    counter += matrix[precedingCellRow][precedingCellCol]
    counter += matrix[precedingCellRow][nextCellCol]
    counter += matrix[rowIndex][nextCellCol]
    counter += matrix[rowIndex][precedingCellCol]
    counter += matrix[nextCellRow][columnIndex]
    counter += matrix[nextCellRow][precedingCellCol]
    counter += matrix[nextCellRow][nextCellCol]

    return counter
}

function progressRule() {
    return matrix.map((row, rowIndex) => {
        return row.map((elem, elemIndex) => {
            const neighbours = countNeighbours(rowIndex, elemIndex)

            if (elem == 0 && neighbours == 3)
                return 1;
            else if (elem == 1 && (neighbours < 2 || neighbours > 3))
                return 0
            else
                return elem
        })
    })
}

function gameOfLife() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(canvas.offScreenCanvas, 0, 0);

    matrix = progressRule(matrix)
    drawCells()

    animationID = requestAnimationFrame(gameOfLife)
}


window.addEventListener("load", () => {
    window.addEventListener("resize", () => {
        height = window.innerHeight
        width = window.innerWidth

        rows = Math.floor(height / cellSize)
        cols = Math.floor(width / cellSize)

        matrix = getMatrix(rows, cols, sparsity)

        window.cancelAnimationFrame(animationID)

        makeGrid()
        gameOfLife()
    })

    window.addEventListener("click", (event) => {
        const y = Math.round(event.clientX / cellSize)
        const x = Math.round(event.clientY / cellSize)

        let precedingCellRow = x - 1;
        let nextCellRow = x + 1;
        let precedingCellCol = y - 1;
        let nextCellCol = y + 1;

        if (x - 1 < 0) precedingCellRow = rows - 1
        if (x + 1 >= rows) nextCellRow = 0

        if (y - 1 < 0) precedingCellCol = cols
        if (y + 1 >= cols) nextCellCol = 0

        const direction = Math.round(Math.random() * 4) + 1

        if (direction <= 1) {
            //Bottom Right
            matrix[precedingCellRow][y] = 1
            matrix[x][nextCellCol] = 1
            matrix[nextCellRow][nextCellCol] = 1
            matrix[nextCellRow][y] = 1
            matrix[nextCellRow][precedingCellCol] = 1
        } else if (direction > 1 && direction <= 2) {
            //Top Right
            matrix[precedingCellRow][nextCellCol] = 1
            matrix[precedingCellRow][y] = 1
            matrix[precedingCellRow][precedingCellCol] = 1
            matrix[x][nextCellCol] = 1
            matrix[nextCellRow][y] = 1
        } else if (direction > 2 && direction <= 3) {
            //Top Left
            matrix[precedingCellRow][nextCellCol] = 1
            matrix[precedingCellRow][y] = 1
            matrix[precedingCellRow][precedingCellCol] = 1
            matrix[x][precedingCellCol] = 1
            matrix[nextCellRow][y] = 1
        } else {
            //Bottom Reft
            matrix[precedingCellRow][y] = 1
            matrix[x][precedingCellCol] = 1
            matrix[nextCellRow][nextCellCol] = 1
            matrix[nextCellRow][y] = 1
            matrix[nextCellRow][precedingCellCol] = 1
        }


    })

    cellSizeSlider = document.getElementById("cellSize")
    cellSizeSlider.addEventListener("input", function () {
        cellSize = this.value

        rows = Math.floor(height / cellSize)
        cols = Math.floor(width / cellSize)

        window.cancelAnimationFrame(animationID)

        matrix = getMatrix(rows, cols, sparsity)

        makeGrid()
        gameOfLife()
    })
    sparsitySlider = document.getElementById("sparsity")
    sparsitySlider.addEventListener("input", function () {
        sparsity = this.value / 100

        window.cancelAnimationFrame(animationID)

        matrix = getMatrix(rows, cols, sparsity)

        gameOfLife()
    })

    cellSize = cellSizeSlider.value
    sparsity = sparsitySlider.value / 100

    rows = Math.floor(height / cellSize)
    cols = Math.floor(width / cellSize)

    matrix = getMatrix(rows, cols, sparsity)

    canvas = document.getElementById("canvas")
    canvas.height = height
    canvas.width = width

    context = canvas.getContext("2d")

    makeGrid()
    gameOfLife(matrix)
})

