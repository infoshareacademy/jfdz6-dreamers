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



    partyPlaces(1,1)
});

function partyPlaces(x, y) {
    // var $xCell = $('table td');//.tabindex(1);
    // $xCell.addClass('placeParty');
    // $('table td').eq(x).css('background', 'red')
    $('table tr:nth-child(' + x + ') td:nth-child(' + y + ')').css('background', 'red')
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