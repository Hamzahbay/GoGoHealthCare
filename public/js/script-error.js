let score = 0
let time = 10
let game = false
const rgb = (x, y) => {
    if ( x > 255 || y > 255 ) {
        x -=255
        y -=255
    }
    document.querySelector('.arena .shot .dot').style.backgroundColor = `rgb(${x}, ${y}, ${Math.floor(Math.random() * 255)})`
}

const coordinate = (x, y) => {
    x = Math.round(Math.random() * 540)
    y = Math.round(Math.random() * 480)
    document.querySelector('.arena .shot .dot').style.transform = `translate(${x}px, ${y}px)`
    
    rgb(x, y)
}

const endGame = word => {
    time = 0
    game = false

    document.querySelector('.arena .shot .dot').remove()
    document.querySelector('.arena .area').remove()
    document.querySelector('.arena .shot').innerHTML = `<div class="word"><div class="end">${word}</div></div>`
}

const tickingTime = () => {
    if ( time > 0 ) time -= 1
    else {
        endGame('Game Over')
        return
    }

    duration.textContent = time
    setTimeout('tickingTime()', 1000)
}

const startGame = function(game) {
    if ( game == true ) {
        document.querySelector('.arena .shot .dot').style.transform = `translate(${Math.floor(Math.random() * 500)}px, ${Math.floor(Math.random() * 450)}px)`
        document.querySelector('.arena .shot .dot').style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    
        document.querySelector('.arena').addEventListener('click', e => {
            const clientX = e.clientX
            const clientY = e.clientY
            const scrX = e.screenX
            const scrY = e.screenY
            const layerX = e.layerX
            const layerY = e.layerY
        
            coordinate(layerX, layerY)
        })
        
        document.querySelector('.arena .shot .dot').addEventListener('click', e => {
            score += 1
            scoreR.textContent = score
    
            if ( score % 4 == 0 ) time += 2
            if ( score % 9 == 0 ) time += 5
        })
    
        document.querySelector('.arena .area').addEventListener('click', e => {
            document.querySelector('.arena').style.backgroundColor = 'red'
            setTimeout( function() {
                document.querySelector('.arena').style.backgroundColor = 'lightgray'
            }, 100)
            time -= 3
        })
        tickingTime()
    }
    else {
        document.querySelector('.arena .shot .dot').style.display = 'none'
    }
}

startButton.addEventListener('click', e => {
    game = true
    startGame(game)
})