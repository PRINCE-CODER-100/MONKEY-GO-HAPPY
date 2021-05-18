var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkeyImage;

var ground, invisibleGround;

var obstacles, obstaclesImage, obstaclesGroup;

var banana, bananaImage, bananaGroup;

var score;
var gameOver, gameOver_Image;

function preload(){
    monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png");

    obstaclesImage = loadImage("obstacle.png");
    bananaImage = loadImage("banana.png");
    monkeyImage = loadImage("sprite_8.png");
    gameOver_Image = loadImage("gameover.png");
}

function setup(){
    createCanvas(600, 300);
    monkey = createSprite(50, 250);
    monkey.addAnimation("running",monkey_running);
    monkey.addImage(monkeyImage);
    monkey.scale = 0.09;
    

    ground = createSprite(200,250,800,10);

    gameOver = createSprite(300, 150);
    gameOver.addImage(gameOver_Image);

    invisibleGround = createSprite(200, 250, 800, 10);

    obstaclesGroup = new Group();
    bananaGroup = new Group();

    score = 0;
}

function draw(){
    background(220, 220, 220);

    if(gameState === PLAY){
        text("Score: "+ score, 500, 50);

        gameOver.visible = false;

        if(keyDown("space")&& monkey.y >= 210 ){
            monkey.velocityY = -16;
        }


        if(bananaGroup.isTouching(monkey)){
            bananaGroup[0].destroy();
            score = score+1;
        }

    monkey.velocityY = monkey.velocityY +0.8;
        obstacle();
        bananas();

        if(obstaclesGroup.isTouching(monkey)){
            gameState = END;
        }
    }

    if(gameState === END){
        monkey.visible = false;
        gameOver.visible = true;

        text("Press 'R' To Restart ", 250, 200);

        obstaclesGroup.destroyEach();
        bananaGroup.destroyEach();

        obstaclesGroup.setVelocityEach(0);
        bananaGroup.setVelocityEach(0);

        obstaclesGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);

        if(keyDown("r")){
            reset();
        }
    }
    monkey.collide(invisibleGround);

    drawSprites();
}

function obstacle(){
    if(frameCount% 60 === 0){
        obstacles = createSprite(550, 228);
        obstacles.addImage(obstaclesImage);
        obstacles.scale = 0.09;
        obstacles.velocityX = -5;
        obstacles.lifetime = 110;
        obstaclesGroup.add(obstacles);
    }
}

function bananas(){
    if(frameCount% 80 === 0){
        banana = createSprite(550, 180);
        banana.addImage(bananaImage);
        banana.scale = 0.1;
        banana.velocityX = -8;
        banana.lifetime = 65;
        banana.y = Math.round(random(150, 170));
        bananaGroup.add(banana);
    }
}

function reset(){
    gameState = PLAY;
    monkey.visible = true;

    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();

    score = 0;
}