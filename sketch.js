var Ball
var Player1, Player2
var player1 = 0
var player2 = 0
var w

var ballImg
var Player1Img, Player2Img
var BackgroundImg
var pingpongsound
var gamestate = "serve"

function preload(){
  ballImg = loadImage("ball.png")
  Player1Img = loadImage("player1.png")
  Player2Img = loadImage("player2.png")
  BackgroundImg = loadImage("background.jpeg")
  pingpongsound = loadSound("Ping Pong Sound.wav")
}

function setup(){
createCanvas(800,800)

 Ball = createSprite(400,400,50,50)
 Ball.addImage(ballImg)
 Ball.scale = 0.2
 Ball.setCollider("circle", 0, 0, 140)
 Player1 = createSprite(50,400,40,100)
 Player1.addImage(Player1Img)
 Player1.scale = 0.5
 Player1.setCollider("rectangle", 0, 0, 350, 500)
 Player2 = createSprite(750,400,40,100)
 Player2.addImage(Player2Img)
 Player2.scale = 0.5
 Player2.setCollider("rectangle", 0, 0, 300, 400)
 Ball.debug = false
 Player1.debug = false
 Player2.debug = false
 
 }

function draw(){
 background(BackgroundImg) 
 drawSprites()
 
 var edges = createEdgeSprites() 
 if (keyDown(UP_ARROW)) {
   Player2.velocityY = -5
 }

 if (keyDown(DOWN_ARROW)) {
  Player2.velocityY = +5
 }
 Player2.bounceOff(edges[2])
 Player2.bounceOff(edges[3])   

 if(keyDown("W")) {
  Player1.velocityY = -5
 }

 if(keyDown("S")){
  Player1.velocityY = +5
 }
 Player1.bounceOff(edges[2])
 Player1.bounceOff(edges[3])   

 textSize(30)
 fill ("white")
 text ("Player 1: "+player1, 50, 100 )

 text ("Player 2: "+player2, 600, 100 )
 textSize(50)
 fill("white")

 if(gamestate === "serve"){
  text ("Click to Start", 300, 300)
  Ball.x = 400
  Ball.y = 400
  Ball.velocityX = 0
  Ball.velocityY = 0
  
 }

 if(mousePressedOver(Ball)){
  Ball.velocityX = 5
  Ball.velocityY = 5
  gamestate = "play"
 }
 Ball.bounceOff(edges[2])
 Ball.bounceOff(edges[3])
 Ball.bounceOff(Player1)
 Ball.bounceOff(Player2)

 if(Ball.x > 800){
   player1 = player1+1 
   gamestate = "serve"
 }
 if(Ball.x < 0){
   player2 = player2+1
   gamestate = "serve"
 }

 if(player1 >= 5 || player2 >= 5){
   Ball.x = 300
   Ball.y = 300
   Ball.visible = false
   gamestate = "over"
   if(player1 === 5){
    w = 1 
   }
   else if(player2 === 5){
     w = 2
   }
 }
 if(gamestate === "over"){
  text("Winner: Player" + w, 300, 300)
  text("Press R to Restart", 300, 200)
 }
 if(keyDown("R")){
   gamestate = "serve"
   Ball.visible = true
   player1 = 0
   player2 = 0
 }

}
