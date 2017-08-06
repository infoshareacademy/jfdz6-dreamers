/**
 * Created by damianwisniewski on 23.07.17.
 */
function showResult() {


    var div = "";


    var urltest = 'http://planer.info.pl/api/rest/events.json?limit=24';


    var proxy = 'proxy.php';
    var url = proxy + '?url=' + urltest;


    //GET JSON

    var jqxhr = $.get(url, function (data) {


        var response = JSON.parse(data);
        var i;
        //LOOP OVER DATA
        for (i = 0; i < response.length; i++) {
            div += '<div class="col-sm-3">';
            div += '<div class="thumbnail">';
            div += '<img src="http://lorempixel.com/400/300/nightlife/" width="400" height="300">';
            div += '<p class="textThumbnail"><strong>' + response[i]['name'] + '</strong></p>';
            div += '<p class="textThumbnail">' + response[i]['place']['name'] + '</p>';
            //format dates

            var startDate = response[i]['startDate'].substring(0, response[i]['startDate'].length - 5);
            startDate = startDate.replace('T', '</p><p class="textThumbnail">Godzina: ');
            var endDate = response[i]['endDate'].substring(0, response[i]['endDate'].length - 5);
            endDate = endDate.replace('T', '</p><p class="textThumbnail">Godzina: ');
            div += '<p class="textThumbnail">Start: ' + startDate + '</p>';
            div += '<p class="textThumbnail">Koniec: ' + endDate + '</p>';
            div += '<button  type="button" class="btn btn-default buttonThumbnail" onclick=" window.open(\'' + response[i]['urls']['www'] + '\',\'_blank\')">Strona wydarzenia</button>';
            div += '</div>';
            div += '</div>';
            div += '</div>';


        }


        document.getElementById("demo").innerHTML = div;

    });

}


showResult();
