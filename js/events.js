/**
 * Created by damianwisniewski on 23.07.17.
 */
function showResult() {


    var div = "";


    var urltest = 'http://planer.info.pl/api/rest/events.json?limit=24"';

    var proxy = '../../ba-simple-proxy.php',
        url = proxy + '?' + urltest.serialize();

    //GET JSON
    var jqxhr = $.getJSON(url, function () {
        var response = JSON.parse(jqxhr.responseText);
        var i;
        console.log('response', response);
        //LOOP OVER DATA
        for (i = 0; i < response.length; i++) {
            div += '<div class="col-sm-3">';
               div += '<div class="thumbnail">';
                  div += '<img src="http://lorempixel.com/400/300/nightlife/" width="400" height="300">';
                   div += '<p class="textThumbnail"><strong>'+response[i]['name']+'</strong></p>';
                   div += '<p class="textThumbnail">'+response[i]['place']['name']+'</p>';
                   div += '<p class="textThumbnail">Start: '+response[i]['startDate']+'</p>';
                   div += '<p class="textThumbnail">Koniec: '+response[i]['endDate']+'</p>';
                    div += '<form action="'+response[i]['urls']['www']+'">\
                     <input class="textThumbnail buttonThumbnail" type="submit" value="Strona wydarzenia" />\
                     </form>';
                div += '</div>';
            div += '</div>';
            div += '</div>';


        }


        document.getElementById("demo").innerHTML =  div ;

    });

}


showResult();