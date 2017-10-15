$(function() {


    var $app = $('#app');
    var $partyPlace = $('#app');

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

    function createPlaceParty () {
        for (var j = 0; j < 3; j++) {
            $tr = $('<tr>');
            for (var i = 0; i < 3; i++) {
                $td = $('<td>');
                $tr.append($td);
            }
            $table.append($tr);
        }
    }

    createTable(20, 20);

$('td', $table).addClass('cell');

    $app.append($table);


    function partyPlaces(x) {
        var $xCell = $('table').find('td').first()+1;
        $xCell.addClass('placeParty');
        // setInterval(function () {
        //     $firstCell.toggleClass('green red')
        // }, 1000);
        //
        // for (var j = 0; j < 3; j++) {
        //     $tr = $('<tr>');
        //     for (var i = 0; i < 3; i++) {
        //         $td = $('<td>');
        //         $tr.append($td);
        //     }
        //     $table.append($tr);
        // }
    }
    partyPlaces(1)
});