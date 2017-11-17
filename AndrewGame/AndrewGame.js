var gameRulesDisplay = localStorage.getItem('BestPartySnakeRules') || true;
if (gameRulesDisplay === true) {
    $('button#closeGameRules').click(function() {
        $('div#gameRules').toggle(700);
        $('div#board').toggle();
        gameRulesDisplay = false;
        localStorage.setItem('BestPartySnakeRules', JSON.stringify(gameRulesDisplay));
        playGame();
    })
}
else {
    $('div#gameRules').toggle();
    $('div#board').toggle();
    playGame();
}



function playGame() {

    var $board = $('#board');
    var $table = $('<table>');
    var $tr = $('<tr>');
    var $td;

    createTable(30, 20); // drawing board ---------
    $('td', $table).addClass('cell');
    $board.append($table);
    $('.showGameTime').toggle();

    var $scores = $('#scores');
    var bestScores = JSON.parse(localStorage.getItem('BestPartySnake')) || [];
    $scores.empty();
    refreshScores();


    var aliens = 0; // snake character ---------
    var friends = 0;
    var snakeLength = 1 + friends + aliens;

    var snakeCells = $('td').slice(0, snakeLength).toArray(); //snake length
    $(snakeCells).addClass('snake');
    $(snakeCells[snakeCells.length - 1]).addClass('head');

    drawSnake(); // drawing snake ---------

    $partyOne = drawParty(5, 5, 1); // drawing party places  ---------
    $partyTwo = drawParty(5, 24, 2);
    $partyThree = drawParty(14, 5, 3);
    $partyFour = drawParty(14, 24, 4);

    $partyBest = drawBestParty(8, 13);

    var partyFriends = addPartyFriends(4);
    var totalFriends = partyFriends.reduce((total, i) => total + i, 0);
    var freePlaces = addFreePlaces(4);

    $('tr td:nth-child(1)', $table).addClass('enter'); //definition area to enter new free Aliens
    $('tr td:nth-child(30)', $table).addClass('enter');
    $('tr:nth-child(1) td', $table).addClass('enter');
    $('tr:nth-child(20) td', $table).addClass('enter');
    var $enter = $('.enter');
    var freeAliens = [];
    var nextStepFreeAliens = [];
    var gameOver = false;

    var moves = {
        38: function up($node) {
            return $node.parent().prev().find('.cell').eq($node.index());
        },
        40: function down($node) {
            return $node.parent().next().find('.cell').eq($node.index());
        },
        37: function left($node) {
            return $node.prev();
        },
        39: function right($node) {
            return $node.next();
        }
    };

    moves[38].invalid = 40;
    moves[40].invalid = 38;
    moves[37].invalid = 39;
    moves[39].invalid = 37;

    var direction = moves[40];

    $(window).on('keydown', function (event) {  // change direction

        var code = event.keyCode;

        if (code === direction.invalid) {
            return
        }

        direction = moves[event.keyCode] || direction
    });


    var scores = [];

    var seconds = 0;

    if (gameOver !== true) {
        countTime();
    }


    var interval2 = setInterval(function () {  //generate enter free Aliens

        if (gameOver) {
            return clearInterval(interval2);
        } else {
            freeAliens.push($enter.eq(Math.floor(Math.random() * $enter.length)).addClass('freeAlien'));

            for (var i = 37; i < 41; i++) { //generate first direction of Free Alien
                if (moves[i](freeAliens[freeAliens.length - 1]).length === 0) {
                    if (i < 39) {
                        nextStepFreeAliens.push(i + 2);
                    } else {
                        nextStepFreeAliens.push(i - 2);
                    }
                }
            }

            $enter = $('.enter').not('.freeAlien').not('.snake');
        }

    }, 500);

    var interval = setInterval(function () {
        var tail = snakeCells[0];
        var head = snakeCells[snakeCells.length - 1];
        var $nextHead = direction($(head));


        if ($nextHead.hasClass('snake') || $nextHead.length === 0) { //GAME OVER
            gameOver = true;
            stopGame();
            gameOverStatement();
            return;
        }

        if ($('.snake.bestparty').length === friends + 1 && partyFriends[0] === 0 && partyFriends[1] === 0 && partyFriends[2] === 0 && partyFriends[3] === 0 && aliens === 0)  {
            gameOver = true;
            stopGame();
            youWinStatement();
            addWinnerNameToScores();
            return;
        }


        if (iCanTakeFriendFromAnyParty()) {
            for (var i = 1; i < 5; i++) {
                if (iCanTakeFriendFromParty(i)) {
                    $('.party' + i).slice(partyFriends[i-1]-1).removeClass('friendsInParty');
                    partyFriends[i - 1] -= 1;
                    friends += 1;
                    $(snakeCells).removeClass('head friends aliens');
                    snakeCells = snakeCells.concat($nextHead.get(0));
                    $nextHead.addClass('head snake');
                }
            }
        } else if (iCanLeaveAnAlienInAnyParty()) {
            for (var j = 1; j < 5; j++) {
                if (iCanLeaveAnAlienInParty(j)) {
                    freePlaces[j - 1] -= 1;
                    $('.party' + j).slice(8).text(freePlaces[j - 1]);
                    aliens -= 1;
                    $(snakeCells).removeClass('friends aliens');
                    $(tail).removeClass('snake');
                    snakeCells = snakeCells.slice(1);
                    j = 5; // here fix yellow snake's bug when it is in two parties:)
                }
            }
        } else if (meetFreeAlien()) {
            aliens += 1;
            $(snakeCells).removeClass('head friends aliens');
            snakeCells = snakeCells.concat($nextHead.get(0));
            $nextHead.addClass('head snake');

        } else {
            $(snakeCells).removeClass('head friends aliens');
            $(tail).removeClass('snake');
            snakeCells = snakeCells.slice(1);
            snakeCells = snakeCells.concat($nextHead.get(0));
            $nextHead.addClass('head snake');
        }

        drawSnake();

        removeFreeAliensAttachedToSnake();

        for (var i = 0; i < freeAliens.length - 1; i++) {  //moving Free Aliens
            var nextStep = moves[nextStepFreeAliens[i]](freeAliens[i]);
            freeAliens[i].removeClass('freeAlien');
            nextStep.addClass('freeAlien');
            freeAliens[i] = nextStep;
        }

        $('.showGameTime').text(`Time: ${seconds} seconds`)

    }, 220);


    //definitions -------------------------

    function createTable(width, height) {
        for (var j = 0; j < height; j++) {
            $tr = $('<tr>');
            for (var i = 0; i < width; i++) {
                $td = $('<td>');
                $tr.append($td);
            }
            $table.append($tr);
        }
    }

    function drawSnake() {
        for (var i = 0; i < aliens; i++) {
            $(snakeCells[i]).addClass('aliens');
        }
        for (var j = aliens; j < aliens + friends; j++) {
            $(snakeCells[j]).addClass('friends');
        }
    }

    function drawParty(x, y, n) {
        for (var i = x; i < x + 3; i++) {
            for (var j = y; j < y + 3; j++) {
                $('table tr:nth-child(' + i + ') td:nth-child(' + j + ')').addClass('party party' + n);
            }
        }
        return $('.party' + n);
    }

    function drawBestParty(x, y) {
        for (var i = x; i < x + 6; i++) {
            for (var j = y; j < y + 6; j++) {
                $('table tr:nth-child(' + i + ') td:nth-child(' + j + ')').addClass('bestparty');
            }
        }
        return $('.bestParty');
    }

    function addPartyFriends(n) { // generating number of Friends in party places and info about them
        var addFriends = [];
        for (var i = 0; i < 4; i++) {
            addFriends.push(Math.round(Math.random(0, 1) * 1 + 1));
//            $('.party' + (i + 1)).slice(0, 1).text(addFriends[i]);
            $('.party' + (i + 1)).slice(0, addFriends[i]).addClass('friendsInParty');
        }
        return addFriends;
    }

    function addFreePlaces(n) { // generating number of free places in party and info about them
        var addPlaces = [];
        for (var i = 0; i < 4; i++) {
            addPlaces.push(Math.round(Math.random(0, 1) * 4 + 4));
            $('.party' + (i + 1)).slice(8).text(addPlaces[i]);
        }
        return addPlaces;
    }

    function iCanTakeFriendFromAnyParty() {
        return iCanTakeFriendFromParty(1) || iCanTakeFriendFromParty(2) || iCanTakeFriendFromParty(3) || iCanTakeFriendFromParty(4);
    }

    function iCanTakeFriendFromParty(n) {  //detect exit head snake from Party
        return (!!$('.snake.party' + n).length && $('.snake.head.party' + n).length !== 0 && partyFriends[n - 1] > 0);
    }

    function iCanLeaveAnAlienInAnyParty() {
        return iCanLeaveAnAlienInParty(1) || iCanLeaveAnAlienInParty(2) || iCanLeaveAnAlienInParty(3) || iCanLeaveAnAlienInParty(4);
    }

    function iCanLeaveAnAlienInParty(n) {  //detect exit friends and head snake from Party
        return !!$('.snake.party' + n).length && !$('.snake.friends.party' + n).length && !$('.snake.head.party' + n).length && freePlaces[n - 1] > 0;
    }

    function meetFreeAlien() {  //detect meeting with FreeAlien
        return $('.snake.freeAlien').length > 0 || $('.nextHead.freeAlien').length > 0;
    }

    function removeFreeAliensAttachedToSnake() {
        var tempFreeAliens = [];
        var tempNextStepFreeAliens = [];

        for (var i = 0; i < freeAliens.length; i++) {
            if (!freeAliens[i].hasClass('snake')) {
                tempFreeAliens.push(freeAliens[i]);
                tempNextStepFreeAliens.push(nextStepFreeAliens[i]);
            } else {
                freeAliens[i].removeClass('freeAlien');
            }
        }

        freeAliens.length = 0;
        nextStepFreeAliens.length = 0;
        freeAliens = tempFreeAliens;
        nextStepFreeAliens = tempNextStepFreeAliens;

        return
    }

    function countTime() {
        var three = setInterval(
            function () {
                if (gameOver) {
                    stopGame();
                    clearInterval(three);
                } else {
                    seconds++;
                }
            }, 1000);
    }


    function addWinnerNameToScores() {
        $('#saveScoreForm').toggle();
        $('div#saveScoreForm form').on('submit', function (event) {
            event.preventDefault();
            var value = $('input').val();
            if (value === '') {
                value ='Player :)';
            }

            var positionToInsert = 0;

            function setPosition() {
                for (var i = 0; i < bestScores.length; i++) {
                    if (seconds > bestScores[i].playtime) {
                        positionToInsert += 1;
                    }
                }
                return positionToInsert;
            }

            setPosition();


            if (bestScores.length === 0 || positionToInsert > 3) {
                bestScores.push({
                    name: value,
                    playtime: seconds
                });
            } else {
                bestScores.splice(positionToInsert, 0,
                    {
                        name: value,
                        playtime: seconds
                    }
                );
            }
            bestScores.splice(5);

            localStorage.setItem('BestPartySnake', JSON.stringify(bestScores));
            $('#saveScoreForm').toggle();
            $('#board').toggle();
            $scores.empty();
            bestScores = JSON.parse(localStorage.getItem('BestPartySnake')) || [];
            refreshScores();
            $('.showGameTime').toggle();
            $('#scoresTopFive').toggle();
            $('#playAgainAfterScores').click(function() {
                window.location.reload();
                $('#scoresTopFive').toggle();
                $('#board').toggle();


                playGame();

            });




        });
    }

    function refreshScores() {

        $scores.append(
            $('<table>').append(
                bestScores.map(
                    function (item) {
                        return $('<tr>')
                            .append(
                                $('<td>').text(item.name)
                            )
                            .append(
                                $('<td>').text(`${item.playtime} seconds`)
                            )
                    }
                )
            )
        );
    }

    function stopGame() {
        return clearInterval(interval);
    };


    function gameOverStatement() {
        $('.gameOver').toggle();
        $('#playAgainAfterGameOver').click(function() {
            $('.gameOver').toggle();
            $board.empty();
            $('.showGameTime').toggle();
            window.location.reload();
        });
    };

    function youWinStatement() {
        $('.youWin').toggle();
        $('#playAgainAfterYouWin').click(function() {
            $('.youWin').toggle();
            $board.empty();
            $('.showGameTime').toggle();
            window.location.reload();
        });
    };

}