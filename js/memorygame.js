var computerChoice = [];
var randomCounter = 1;
var $div1 = $('#div1');
var $div2 = $('#div2');
var $div3 = $('#div3');
var $div4 = $('#div4');
var playerCoice = [];
var choiceEnabled = false;
var correct = false;
var $play = $('.play');
var $replay = $('.repaly');
var activePlay = true;
var $gameStart = $('#lemonGame');
var $nextRound = $('.nextRound');
var $endGame = $('#endGame');
var $text = $('#text');
var $level = $('#level')
var $time = $('#time')
var time = [0, 0, 0]

setInterval(function () {
    $level.text('Poziom: ' + randomCounter)
}, 100);
setInterval(function () {
    $time.text('Twój czas: ' + time[0] + ':' + time[1] + ':' + time[2])
}, 10);

function textDisplay(text) {
    $text.text(text)
}

$gameStart.click(function () {
    $("#gameContainer").removeClass("hidden");
    textDisplay('Rozpoczni grę i powtarzaj ruchy')
});

$play.click(function () {
    startRound();
    $(this).addClass('hidden');
    $nextRound.removeClass('hidden')
});

$nextRound.click(function () {
        randomCounter++
        startRound();
    }
);

$replay.click(function () {
    clearGame()
});

$endGame.click(function () {
    $("#gameContainer").addClass("hidden");
    clearGame();
});

function startRound() {
    if (activePlay) {
        computerChoice.length = 0;
        playerCoice.length = 0;
        getRandomArray();
    }
    activePlay = false;
}

function clearGame() {
    computerChoice = [];
    randomCounter = 1;
    playerCoice = [];
    correct = false;
    activePlay = true;
    choiceEnabled = false;
    $play.removeClass('hidden');
    $nextRound.addClass('hidden');
    textDisplay('Rozpoczni grę i powtarzaj ruchy')
    time = [0, 0, 0]
}

function getRandomArray() {
    for (j = 0; j < randomCounter; j++) {
        computerChoice.push(Math.floor((Math.random() * 4)) + 1)
    }
    console.log(computerChoice);
    showComputerChice();
}

function delayShow(i, delay) {
    setTimeout(function () {
        showButton(computerChoice[i]);
    }, delay);
}

function showButton(num) {
    $('#div' + num).animate({opacity: 1});
    setTimeout(function () {
        $('#div' + num).animate({opacity: 0.2});
    }, 400);
}

function playerButton(num) {
    $('#div' + num).animate({opacity: 1});
    setTimeout(function () {
        $('#div' + num).animate({opacity: 0.2});
    }, 400);

    // $('#div' + num)
    //     .mousedown(function () {
    //         $('#div' + num).animate({opacity: 1});
    //     })
    //     .mouseup(function () {
    //         $('#div' + num).animate({opacity: 0.2})
    //     })
}

function showComputerChice() {
    textDisplay('Ruch komputera');
    for (var i = 0; i < computerChoice.length; i++) {
        delayShow(i, (1000 + (i * 1000)));
        if (i === computerChoice.length - 1) {
            setTimeout(function () {
                choiceEnabled = true;
                textDisplay('Twój ruch')
                timeCounter();
            }, 1000 + (computerChoice.length * 1000))
        }
    }
}

function playerTurn(button) {
    if (choiceEnabled === true) {
        textDisplay('Twój ruch');
        playerCoice.push(button);
        if (computerChoice.length === playerCoice.length) {
            choiceEnabled = false;
            timeCounter();
            var computerSequence = computerChoice.toString();
            var playerSequence = playerCoice.toString();
            if (computerSequence === playerSequence) {
                correct = true;
                activePlay = true;
                textDisplay('Dobrze, przejdź do następnej rundy')
                timeCounter()
            } else {
                correct = false;
                activePlay = false;
                textDisplay('Niestety źle, zacznij od nowa jeśli chcesz')
                $nextRound.addClass('hidden');
            }
        }
    }
}

$div1.click(function () {
    if (choiceEnabled) {
        playerButton(1);
        playerTurn(1);
    }
});

$div2.click(function () {
    if (choiceEnabled) {
        playerButton(2);
        playerTurn(2);
    }
});

$div3.click(function () {
    if (choiceEnabled) {
        playerButton(3);
        playerTurn(3);
    }
});

$div4.click(function () {
    if (choiceEnabled) {
        playerButton(4);
        playerTurn(4);
    }
});

$(window).on('keydown', function (event) {
    var code = event.keyCode;
    console.log(code);
    if (code === 90 && choiceEnabled) {
        playerButton(1);
        playerTurn(1);
    } else if (code === 88 && choiceEnabled) {
        playerButton(2);
        playerTurn(2);
    } else if (code === 78 && choiceEnabled) {
        playerButton(3);
        playerTurn(3);
    } else if (code === 77 && choiceEnabled) {
        playerButton(4);
        playerTurn(4);
    } else if (code === 16) {
        startRound();
    } else if (code === 27) {
        clearGame();
    }
});

var timeInterval = setInterval(function () {
    timeCounter()
}, 10)

function timeCounter() {
    if (choiceEnabled) {
        time[2]++;
        timeFormat()
    }
};

function timeFormat() {
    if (time[2] === 100) {
        time[1]++;
        time[2] = 0;
    }
    if (time[1] === 60) {
        time[0]++;
        time[1] = 0;
    }
}

var bestScores = {}