$(function() {


    var $board = $('#board');
    var $table = $('<table>');
    var $tr = $('<tr>');
    var $td;
    var clubs

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

    createTable(20, 20);
    $('td', $table).addClass('cell');
    $board.append($table);

    var snakeCells = $('td').slice(0, 2).toArray(); //snake length
    $(snakeCells).addClass('snake');


    function drawParty(x, y, n) {
        for (var i = x; i < x + 3; i++) {
            for (var j = y; j < y + 3; j++) {
                $('table tr:nth-child(' + i + ') td:nth-child(' + j + ')').addClass('party party' + n)
            }
        }
        return $('.party' + n);
    }

    $partyOne = drawParty(5, 5, 1);
    $partyTwo = drawParty(5, 14, 2);
    $partyThree = drawParty(14, 1, 3);
    $partyFour = drawParty(14, 14, 4);

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

    function checkInParty(n){
        return !!$( '.snake.head.party' + n).length;
    }
    var interval = setInterval(function () {

        var tail = snakeCells[0];
        var head = snakeCells[snakeCells.length - 1];

        $(head).removeClass('head');

        var $nextHead = direction($(head));

        $(tail).removeClass('snake');
        snakeCells = snakeCells.slice(1);


        snakeCells = snakeCells.concat($nextHead.get(0));
        $nextHead.addClass('head snake');

        if( checkInParty(1) || checkInParty(2) || checkInParty(3) || checkInParty(4)){
                clearInterval(interval);
            alert('Party');
        }

        // console.log('Czy jest w party 1: ', checkInParty(1) );
        // console.log('Czy jest w party 2: ', checkInParty(2) );
        // console.log('Czy jest w party 3: ', checkInParty(3) );
        // console.log('Czy jest w party 4: ', checkInParty(4) );

    }, 500)
});