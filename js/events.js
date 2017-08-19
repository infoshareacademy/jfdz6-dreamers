/**
 * Created by damianwisniewski on 23.07.17.
 */
function showResult() {


    var div = "";


    var today = new Date().toJSON().slice(0,10);

    var urltest = 'http://planer.info.pl/api/rest/events.json?&​start_date='+today+'&limit=8';


    var proxy = 'proxy.php';
    var url = proxy + '?url=' + urltest;


    //GET JSON

    var jqxhr = $.get(url, function (data) {


        var response = JSON.parse(data);
        var i;
        //LOOP OVER DATA
        for (i = 0; i < response.length; i++) {
            if(response[i]['urls']['www']!==undefined){
                div += '<a href="'+response[i]['urls']['www']+'" title="Otworz wydarzenie">';
            }
            div += '<div class="col-sm-5 col-md-4 col-lg-3">';
            if(response[i]['attachments']['0']!==undefined){

                var link="http://planer.info.pl/image/event/"+response[i]['id']+"/"+response[i]['attachments']['fileName'];
                div += '<div class="thumbnail" style="background-image: url('+link+'); height: 250px; width: 250px;">';
            }
            else{
                div += '<div class="thumbnail" style="background-image: url(\'http://lorempixel.com/300/300/nightlife\'); height: 250px; width: 250px;">';
            }
                http://planer.info.pl/image/event/34529/events/eventthumb_598ac50041fcb.png






                div += '<div class="eventMain">';

           // div += '<img class="thumbImages" src="http://lorempixel.com/400/300/nightlife/" width="400" height="300">';
            div += '<p class="textThumbnail eventName "><strong>' + response[i]['name'] + '</strong></p><br>';
            div += '<p class="textThumbnail eventPlace ">Miejsce: ' + response[i]['place']['name'] + '</p>';
            div += '</div>';

            //format dates
            div += '<div class="eventDetails">';

            var startDate = response[i]['startDate'].substring(0, response[i]['startDate'].length - 5);
            startDate = startDate.replace('T', '</p><p class="textThumbnail eventDetailsText details">Godzina: ');
            var endDate = response[i]['endDate'].substring(0, response[i]['endDate'].length - 5);
            endDate = endDate.replace('T', '</p><p class="textThumbnail eventDetailsText details">Godzina: ');
            div += '<p class="textThumbnail eventDetailsText details">Start: ' + startDate + '</p>';
            div += '<br><p class="textThumbnail eventDetailsText details">Koniec: ' + endDate + '</p>';
            // div += '<button  type="button" class="btn btn-default buttonThumbnail" onclick=" window.open(\'' + response[i]['urls']['www'] + '\',\'_blank\')">Strona wydarzenia</button>';
            div += '</div>';
            div += '</div>';



            if(response[i]['urls']['www']!==undefined){
                div += '</a>';
            }
            div += '</div>';
            div += '</div>';


        }


        document.getElementById("demo").innerHTML = div;

    });

}


showResult();

function filterEvents() {



}
