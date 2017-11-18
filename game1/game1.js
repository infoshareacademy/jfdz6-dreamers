var playerScore =[0];
var aiScore = 0;
//
// Game variables
var playerChoice;
var aiChoice;
'use strict';

var gameHistory =[];
function game1() {
    $("#game1").removeClass("hidden");
    $("#myCarousel").addClass("hidden");
    $("#presentation").addClass("hidden");
}

function gameStart() {
    $("#starter").addClass("hidden");
    $("#game").removeClass("hidden");
    $("#howto").removeClass("hidden");
    showScore();

}

$( "#howto" ).click(function() {
    $( "#game" ).toggleClass( "hidden" );
});

function play(playerChoice) {
    $( "#buttons" ).fadeOut( "slow", function() {
        $imageP = "<img src='game1/"+playerChoice+".png' class='buttons'>";
        $("#pChoice").append($imageP);
        aiChoice=parseInt(aiMove());
        $imageA = "<img src='game1/"+aiChoice+".png' class='buttons'>";
        $("#pChoice").append($imageA);
        game.checkPlayerWinning(parseInt(playerChoice),aiChoice);
        $("#next").removeClass("hidden");
        if(playerScore[playerScore.length] > gameHistory.length){
            $('body').append("<h1>Cheater</h1>");
            playerScore = 0;
        }
        else
            showScore();

    });

    gameHistory.push(playerChoice);
    console.log(gameHistory);

}
function next() {
    $("#pChoice").empty();

    $( "#buttons" ).fadeIn( "slow", function() {
        $("#next").addClass("hidden");

    });
}
function checkIfEnd() {
    if(playerScore[playerScore.length-1] === 3) {
        $('#nextBtn').addClass("hidden");
        $("#result").text( $("#result").text()+" Game over. You win the whole game!");
    }
    else if(aiScore === 3) {
        $('#nextBtn').addClass("hidden");
        $("#result").text( $("#result").text()+" Game Over. Computer wins the whole game!");

    }
}
//              0         1         2           3        4
var names = [ 'Stone', 'Paper', 'Scissors', 'Lizard', 'Spock'];

var variables = [
    [ 2, 3 ], // Stone vs Scissors & Lizard
    [ 0, 4 ], // Paper vs Stone & Spock
    [ 1, 3 ], // Scissors vs Paper & Lizard     winnings
    [ 1, 4 ], // Lizard vs Paper & Spock
    [ 0, 2]   // Spock vs Stone & Scissors
];


var variables2 = [
    [ 1, 4 ], // Stone vs Paper & Spock
    [ 2, 3 ], // Paper vs Scissors & Lizard
    [ 0, 4 ], // Scissors vs Stone & Spock     losses
    [ 0, 2 ], // Lizard vs Stone & Scissors
    [ 1, 3]   // Spock vs Stone & Scissors
];

var game = (function(){
    function checkPlayerWinning(playerM,aiM) {
        if (playerM===aiM) {
            showDraw("It's a draw!",playerM,aiM);
            $("#nextTbn").removeClass("hidden");
            checkIfEnd();
        }
        else {
            if(checkIfWins(playerM,aiM)){
                showResult('Player',playerM,aiM,'AI');
                var nr = playerScore[playerScore.length-1]+1;
                console.log('nr',nr);
                playerScore.push(nr);
                $("#nextBtn").removeClass("hidden");
                console.log('actuall score',playerScore);
                if(playerScore[playerScore.length-1]> playerScore.length) {
                    $('body').append("<h1>Cheater</h1>");
                    playerScore[playerScore.length-1] = 0;
                }
                checkIfEnd();

            }
            else if(checkIfWins(aiM,playerM)) {
                showResult('AI',aiM,playerM,'player');
                aiScore++;
                $("#nextBtn").removeClass("hidden");
                checkIfEnd();

            }
            else{
                console.log('No action');
            }

        }
    }


    return {
        checkPlayerWinning : function(a,b){ checkPlayerWinning(a,b); }
    }
}());

// function checkPlayerWinning(playerM,aiM) {
//     if (playerM===aiM) {
//         showDraw("It's a draw!",playerM,aiM);
//     }
//     else {
//         if(checkIfWins(playerM,aiM)){
//             showResult('Player',playerM,aiM,'AI');
//             var nr = playerScore[playerScore.length-1]+1;
//             console.log('nr',nr);
//             playerScore.push(nr);
//             console.log('actuall score',playerScore);
//             if(playerScore[playerScore.length-1]> playerScore.length) {
//                 $('body').append("<h1>Cheater</h1>");
//                 playerScore[playerScore.length-1] = 0;
//             }
//
//         }
//         else if(checkIfWins(aiM,playerM)) {
//             showResult('AI',aiM,playerM,'player');
//             aiScore++;
//         }
//         else{
//             console.log('No action');
//         }
//
//     }
// }

function checkIfWins(player1,player2) {
    var pWin = false;
    for( var j = 0; j < variables[player1].length; j++){
        if(player2===variables[player1][j]){
            pWin = true;
            break;
        }
    }
    return pWin;
}


function aiMove() {
    var move;
    gameHistory.length < 2 ?  move = Math.floor( (Math.random() * 5) ) : move = thinking();
    return move;
}

function thinking() {
    var rand = (Math.random()*2)+1;
    if(rand ===1)
        if(gameHistory[gameHistory.length-1] === gameHistory[gameHistory.length-2])
            return variables2[gameHistory.pop()];

    return Math.floor( (Math.random() * 5) );
}

function showScore() {
    $("#scores").text("Player score: " + playerScore[playerScore.length-1] + " AI score: " + aiScore);
}
function showDraw(txt,move1,move2) {
    $("#result").text( txt + ' No win between ' + names[move1] + ' & ' + names[move2]);
}
function showResult(txt,move1,move2,txt2) {
    $("#result").text( txt + ' with ' + names[move1] + ' wins against '+ txt2 + ' with ' + names[move2]);
}

