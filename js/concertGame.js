function concertGame() {
  if (window.matchMedia("(min-width: 1200px)").matches) {
    document.getElementById("rules").classList.remove("hidden");
    document.getElementById("myCarousel").classList.add("hidden");
    document.getElementById("presentation").classList.add("hidden");
    startConcertGame();
  } else {
    alert("Masz za małą rozdzielczość ekranu by włączyć grę!")
  }
}

function startConcertGame() {
  var gameCountdown = false;
    var myRules = document.getElementById("rules");
    var highway = new sound("Sound/highway.mp3");
    var tracks = [
        new sound("Sound/thunder.mp3"),
        new sound("Sound/tnt.mp3"),
        new sound("Sound/Back in black.mp3")
    ]

    var currentTrack = tracks[Math.floor(Math.random() * tracks.length)];

    rules.onclick = startGame;
    var myVocalist;
    var myBackground;
    var myObstacles = [];
    var counter = 30;

    function drawCounter() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#f0f0f0";
        ctx.fillText("Czas: "+counter, 8, 80);
    }
    var score = 0;
    function drawScore() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#f0f0f0";
        ctx.fillText("Wynik: "+score, 1000, 80);
    }
    var highScore = localStorage.getItem("highScore") || 0;

    function verifyHighScore () {
        if (highScore !== 0) {
            if (score > highScore) {
                localStorage.setItem("highScore", score);
            }
        }
        else {
            localStorage.setItem("highScore", score);
        }
    }

    function drawHighScore() {
        ctx.font = "15px Arial";
        ctx.fillStyle = "#f0f0f0";
        ctx.fillText("Najlepszy Wynik: "+highScore, 1000, 50);
    }

    function startGame() {
      if( gameCountdown ){
        return false;
      }
        myGameArea.start();
        myVocalist = new Component(240, 330, "img/vocalist.png", 465, 540, "image");
        myBackground = new Component(1152, 868, "img/stage.png", 0, 0, "image");
        document.getElementById('rules-img').remove();
        gameCountdown = setInterval(function () {
            counter--;
            if (counter <= 10) {
                currentTrack.stop();
                highway.play();
            } else {
                highway.stop();
                currentTrack.play();
            };

            if (counter === 0 || counter < 0) {
                alert("Koniec Koncertowania!! Twój wynik: "+score);
                clearInterval(gameCountdown);
                document.location.reload();
            }
        }, 1000);

    }

    var myGameArea = {
        canvas: document.createElement("canvas"),
    start: function () {
            this.canvas.width = 1152;
            this.canvas.height = 868;
            this.context = this.canvas.getContext("2d");
            myRules.insertBefore(this.canvas, myRules.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
            this.frameNo = 0;
            window.addEventListener('keydown', function (e) {
                myGameArea.key = e.keyCode;
            });
            window.addEventListener('keyup', function (e) {
                myGameArea.key = false;
            });
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };

    function Component(width, height, color, x, y, type, category) {
        this.category = category;
        this.type = type;
        if (type === "image") {
            this.image = new Image();
            this.image.src = color;
        }
        this.gamearea = myGameArea;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.update = function (move) {
            move = move || 0;
            ctx = myGameArea.context;
            if (type === "image") {

                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            detectCollision();
        };
        this.newPos = function () {
            this.x = Math.max(0, Math.min(this.x + this.speedX, myBackground.width - this.width));
            this.y += this.speedY;
        }

    }
    var factories = [
        {
            create: function (pos) {
                return new Component(70, 70, "img/pomidor.png", pos, 0, "image", "pomidor")
            },
            frequency: 100
        },
        {
            create: function (pos) {
                return new Component(60, 100, "img/cup.png", pos, 0, "image", "kubek");
            },
            frequency: 133
        },
        {
            create: function (pos) {
                return new Component(130, 100, "img/flowers.png", pos, 0, "image", "kwiaty");
            },
            frequency: 80
        },
        {
            create: function (pos) {
                return new Component(130, 150, "img/teddy-bear.png", pos, 0, "image", "misiek")
            },
            frequency: 300
        },
        {
            create: function (pos) {
                return new Component(160, 130, "img/Bra.png", pos, 0, "image", "stanik")
            },
            frequency: 800
        },
        {
            create: function (pos) {
                return new Component(90, 70, "img/mens-pants.png", pos, 0, "image", "majtki")
            },
            frequency: 650
        }
    ];

    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        };
        this.stop = function(){
            this.sound.pause();
        }
    }


    function detectCollision () {
        myObstacles.forEach(function (obstacle) {
            if (obstacle.y + obstacle.height >= myVocalist.y && obstacle.y <= myVocalist.y + myVocalist.height/2) {
                var right = myVocalist.x + myVocalist.width;
                var left = myVocalist.x;
                if (obstacle.x <= right && obstacle.x >= left) {
                    myObstacles = myObstacles.filter(function (item) {
                        return item !== obstacle
                    });
                    switch (obstacle.category) {
                        case "pomidor":
                            counter -= 2;
                            score -= 2;
                            break;
                        case "kubek":
                            counter -= 1;
                            score -= 1;
                            break;
                        case "kwiaty":
                            counter += 1;
                            score += 1;
                            break;
                        case "misiek":
                            counter += 3;
                            score += 3;
                            break;
                        case "stanik":
                            counter += 10;
                            score += 10;
                            break;
                        case "majtki":
                            counter -= 7;
                            score -= 7;
                            break;
                    } return;
                }
                if (obstacle.x + obstacle.width <= right && obstacle.x + obstacle.width >= left) {
                    myObstacles = myObstacles.filter(function (item) {
                        return item !== obstacle
                    });
                    switch (obstacle.category) {
                        case "pomidor":
                            counter -= 2;
                            score -= 2;
                            break;
                        case "kubek":
                            counter -= 1;
                            score -= 1;
                            break;
                        case "kwiaty":
                            counter += 2;
                            score += 2;
                            break;
                        case "misiek":
                            counter += 3;
                            score += 3;
                            break;
                        case "stanik":
                            counter += 10;
                            score += 10;
                            break;
                        case "majtki":
                            counter -= 7;
                            score -= 7;
                            break;
                    } return;
                }
            }
        })
    }

    function updateGameArea() {
        myGameArea.clear();
        myGameArea.frameNo += 0.5;

        factories.forEach(function (factory) {
            if ((myGameArea.frameNo / factory.frequency) % 1 === 0) {
                var position = (Math.random() * myGameArea.canvas.width) - 10;
                myObstacles.push(factory.create(position))
            }
        });

        myBackground.newPos();
        myBackground.update();
        myVocalist.speedX = 0;
        myVocalist.speedY = 0;
        if (myGameArea.key && myGameArea.key === 37) {
            myVocalist.speedX = -10;
        }
        if (myGameArea.key && myGameArea.key === 39) {
            myVocalist.speedX = 10;
        }
        myVocalist.newPos();
        myVocalist.update();
        drawCounter();
        drawScore();
        drawHighScore();
        verifyHighScore();
        myObstacles.forEach(function (obstacle, index) {
            obstacle.y += 10;
            obstacle.update(index)
        });
    }
};