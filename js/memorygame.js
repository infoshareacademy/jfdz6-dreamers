var randomArray = [];
var randomCounter = 3;
var $div1 = $('#div1');
var $div2 = $('#div2');
var $div3 = $('#div3');
var $div4 = $('#div4');
var player = [];
var choiceEnabled = false;
var correct = false;

function getRandomArray() {
    for (i = 0; i < randomCounter; i++) {
        randomArray.push(Math.floor((Math.random() * 4))+1)
    }
    showWhatToRepeat();
}

getRandomArray();
console.log(randomArray);

function delayShow(i, delay){
    setTimeout(function(){
        showButton(randomArray[i]);
    }, delay);
}

function showButton(num) {
    $('#div' + num).addClass('lightUp');
    setTimeout(function() {
        $('#div' + num).removeClass('lightUp');
    }, 800);
}


function showWhatToRepeat() {
    choiceEnabled = false;
    for (var i = 0; i < randomArray.length; i++) {
        delayShow(i, (1000 + (i*1000)));
        if (i === randomArray.length - 1){
            setTimeout(function(){
                choiceEnabled = true;
            }, 1000 + (i*1000))
        }
    }
    player = [];
    choiceEnabled = true;
}

function playerTurn(button) {
    if (choiceEnabled) {
        player.push(button);
        if (randomArray.length === player.length) {
            choiceEnabled = false;
            for (k = 0; k < randomArray.length; k++) {
                if (randomArray[k] === player [k]) {
                    correct = true;
                    correction()
                }
            }
        }
    }
}

function correction() {
    if (correct) {
        setInterval(console.log('Brawo'), 1000);
        randomArray = [];
        randomCounter++;
        getRandomArray()
    }
}

$div1.click(function() {
    if(choiceEnabled){
        showButton(1);
        playerTurn(1);
    }
});

$div2.click(function() {
    if(choiceEnabled){
        showButton(2);
        playerTurn(2);
    }
});

$div3.click(function() {
    if(choiceEnabled){
        showButton(3);
        playerTurn(3);
    }
});

$div4.click(function() {
    if(choiceEnabled){
        showButton(4);
        playerTurn(4);
    }
});