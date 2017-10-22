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

});