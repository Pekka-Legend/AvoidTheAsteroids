var going = false
var mousex = 100
var mousey = 100
var score = 0
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const window_x = window.pageOffsetX || document.documentElement.scrollLeft
const window_y = window.pageOffsetY || document.documentElement.scrollTop

var startSpeed = 6

class Background {
    draw() {
        c.fillStyle = 'DarkGrey'
        c.fillRect(0, 0, canvas.width, canvas.height)
    }   
}
class Player {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.width = 35
        this.height = 35
    }
    draw() {
        c.fillStyle = 'royalblue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Asteroid {
    constructor({x, size, speed, deaths}){
        this.position = {
            x: x,
            y: 0
        }
        this.deaths = deaths
        this.speed = startSpeed + Math.random() * 3
        this.size = size
        this.width = this.size
        this.height = this.size
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    } 
}
class Start {
    constructor() {
        this.text = 'Click anywhere to play'
    }
    draw(){
        c.font = "30px Serif"
        c.fillStyle = 'black'
        c.fillText(this.text, (canvas.width / 2) - 150,  canvas.height - 150)
    }
}
class Title {
    constructor() {
        this.text = 'Avoid The Asteroids'
        this.x = canvas.width / 2 - 135
    }
    draw(){
        c.font = "90 Serif"
        c.fillStyle = 'black'
        c.fillText(this.text, this.x, 150)
    }
}
class Score{
    draw(){
        const ctx = canvas.getContext('2d');
        ctx.font = '128px serif';
        ctx.fillStyle = ('black')
        ctx.fillText(score, 10, 130);
    }
}
const player = new Player(canvas.width / 2 - 35, canvas.height - 100)
const background = new Background()
const start = new Start()
const title = new Title()
const theScore = new Score()
const asteroids = [new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: startSpeed, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0}), new Asteroid({x :Math.floor(Math.random() * (canvas.width - 40)), size: Math.floor(Math.random() * 20 + 20), speed: (Math.random() * 3) + 1, deaths: 0})]


te = 0
ft = 16
ct = Date.now()

function animate() {
    requestAnimationFrame(animate)
    st = ct

    ct = Date.now()
    te += ct - st


    if (te >= ft)
    {
        c.clearRect(0, 0, canvas.width, canvas.height)
        background.draw()
        start.draw()
        title.draw()
        if (title.text == "Return your cursor to the game window" && going == false || going == true){
            asteroids.forEach(asteroid => {
                asteroid.draw()
            })
            player.draw()
            title.draw()
        }
        if (going == true){
            for (a in asteroids) {
                if (player.position.x + player.width > asteroids[a].position.x && player.position.x < asteroids[a].position.x + asteroids[a].width && player.position.y + player.height > asteroids[a].position.y && player.position.y < asteroids[a].position.y + asteroids[a].height){
                    going = false
                    var reload = setInterval(function(){
                        window.location.reload();
                    }, 1000)
                }
            }
            asteroids.forEach(asteroid => {
                asteroid.position.y += asteroid.speed
                if (asteroid.position.y + asteroid.size + asteroid.speed > canvas.height){
                    asteroid.deaths += 1
                    asteroid.position.x = Math.floor(Math.random() * (canvas.width - 40))
                    asteroid.position.y = 0
                    asteroid.size = Math.floor(Math.random() * 20 + 20)
                    asteroid.speed = startSpeed + (Math.random() * 3) + 1
                    if (asteroid.deaths > 0){
                        asteroid.speed += asteroid.deaths / 10
                        if (asteroid.speed > 30){
                            asteroid.speed = 29 + Math.random()
                        }
                    }
                }
            })
        }
        if (score > 0){
            theScore.draw()
        }
        te = 0
    }
    
    
}

animate()

function findMousePos(event){
    player.position.x = event.pageX
    player.position.y = canvas.height - 100
    if (player.position.x > canvas.width - 50){
        player.position.x = canvas.width - 51
    }
}
function removeCursor(){
    canvas.classList.add("newClass")
}
function mouseEnter(event){
    if (title.text == "Return your cursor to the game window"){
        title.text = ""
        going = true
    }
}
function mouseLeave(event){
    if (going){
        going = false
        title.x = canvas.width / 2 - 230
        title.text = "Return your cursor to the game window"
    }
}
removeCursor()
canvas.addEventListener('mousemove', findMousePos, false)
canvas.addEventListener("mouseenter", mouseEnter, false);
canvas.addEventListener("mouseleave", mouseLeave, false);
addEventListener('mousedown', () => {
    going = true
    start.text = ""
    title.text = ""
})
var addScore = setInterval(function(){
    if (going){      
        score++
    }
    theScore.draw()
}, 100)

document.ontouchmove = function touchHandler(e)
{
    if (e.touches) //if the player is touching the screen
    {
        player.position.x = e.touches[0].pageX
        e.preventDefault()
    }
    
}
