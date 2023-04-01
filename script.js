const colors = ['green', 'red', 'yellow', 'blue']
let level = 0
let sequence = []
let userSequence = []
let userCounter = 0
let animationInterval = 150

$(document).keydown(()=>{
    startGame()
})

$('.start-btn').click(()=>{
    startGame()
})


function addListeners() {
    $('.btn').click((e)=>{
        let inputClass = e.target.classList[1]
        console.log(inputClass)
        animatePress(inputClass)
        userInput(inputClass)
    })
    
}

function startGame() {
    $('.start-btn').text('End the game to start again')
    $(document).off('keydown')
    $('.start-btn').off('click')
    addLevel()
    addListeners()
}

function addLevel() {
    level++
    userCounter = 0
    userSequence = []
    $('#level-title').text('Level '+level)
    $('.level').text(level)
    $('.num').text('0')
    sequence.push(colors[(Math.floor(Math.random()*colors.length))])
    animateLevel()
}

function animateLevel() {
    $('.'+sequence.at(-1)).addClass('pressed')
    setTimeout(()=>{$('.'+sequence.at(-1)).removeClass('pressed')}, animationInterval)
}

function userInput(color) {
    console.log(sequence,userCounter, userSequence)
    if (sequence[userCounter]==color) {
        userSequence.push(color)
        userCounter++
        $('.num').text(userCounter)
        if (level==userCounter) {
            setTimeout(()=>{addLevel()}, 800)
        }
    } else {
        endGame()
    }
}

function animatePress(color) {
    $('.'+color).addClass('pressed')
    setTimeout(()=>{$('.'+color).removeClass('pressed')}, animationInterval)
}

function endGame() {
    $('.btn').off('click')
    sequence = []
    $('#level-title').text('Game ended at level '+level)
    $('.start-btn').text('Press me to start again')
    level = 0
    $('.start-btn').click(()=>startGame())
}