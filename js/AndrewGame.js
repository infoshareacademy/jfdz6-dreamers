$(function() {


    var $board = $('#board');
    var $table = $('<table>');
    var $tr = $('<tr>');
    var $td;

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

    var snakeCells = $('td').slice(0, 1).toArray();
    $(snakeCells).addClass('snake');


    function drawParty(x, y) {
        for (var i = x; i < x + 3; i++) {
            for (var j = y; j < y + 3; j++) {
                $('table tr:nth-child(' + i + ') td:nth-child(' + j + ')').addClass('party')
            }
        }
    }

    $partyOne = drawParty(5, 5);
    $partyTwo = drawParty(5, 14);
    $partyThree = drawParty(14, 5);
    $partyFour = drawParty(14, 14);

});