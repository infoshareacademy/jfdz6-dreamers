var randomArray = [];
var randomCounter = 3;
var $div1 = $('#div1');
var $div2 = $('#div2');
var $div3 = $('#div3');
var $div4 = $('#div4');
var player = [];
var choiceEnabled = false;
var correct = false;
var $play = $('.play');
var $replay = $('.repaly');
var activePlay = true;

$play.click(function () {
    if (activePlay) {
        randomArray.length = 0;
        player.length = 0;
        randomCounter++;
        getRandomArray()
    }
    activePlay = false;
    clearInterval()
});

$replay.click(function () {
    $play.click

});

function getRandomArray() {
    for (j = 0; j < randomCounter; j++) {
        randomArray.push(Math.floor((Math.random() * 4))+1)
    }
    console.log(randomArray);
    showWhatToRepeat();
}



function delayShow(i, delay){
    setTimeout(function(){
        showButton(randomArray[i]);
    }, delay);
}

function showButton(num) {
    $('#div' + num).animate({opacity: 1});
    setTimeout(function() {
        $('#div' + num).animate({opacity: 0.2});
    }, 800);
}

function playerButton(num) {
    $('#div' + num).animate({opacity: 1});
    setTimeout(function() {
        $('#div' + num).animate({opacity: 0.2});
    }, 400);
}


function showWhatToRepeat() {
    for (var i = 0; i < randomArray.length; i++) {
        delayShow(i, (1000 + (i*1000)));
        if (i === randomArray.length - 1){
            setTimeout(function(){
                choiceEnabled = true;
            }, 1000 + (i*1000))
        }
    }
}

function playerTurn(button) {
    if (choiceEnabled === true) {
        player.push(button);
        if (randomArray.length === player.length) {
            choiceEnabled = false;
            for (k = 0; k < randomArray.length; k++) {
                if (randomArray[k] === player [k]) {
                    correct = true;
                    activePlay = true;
                    console.log('Brawo')
                } else {
                    correct = false;
                    activePlay = false
                }
            }
        }
    }
}

$div1.click(function() {
    if(choiceEnabled){
        playerButton(1);
        playerTurn(1);
    }
});

$div2.click(function() {
    if(choiceEnabled){
        playerButton(2);
        playerTurn(2);
    }
});

$div3.click(function() {
    if(choiceEnabled){
        playerButton(3);
        playerTurn(3);
    }
});

$div4.click(function() {
    if(choiceEnabled){
        playerButton(4);
        playerTurn(4);
    }
});