/**
 * Created by damianwisniewski on 23.07.17.
 */
function showResult() {
    var div = "";
    var today = new Date().toJSON().slice(0,10);
    var urltest = 'http://planer.info.pl/api/rest/events.json?start_date='+today+'&limit=9';
    var proxy = 'proxy.php';
    var url = proxy + '?url=' + encodeURIComponent(urltest);

    //GET JSON
    var jqxhr = $.get(url, function (data) {
        var response = JSON.parse(data);
        var i;
        //LOOP OVER DATA
        for (i = 0; i < response.length; i++) {
            //check if link exist
            div+=checkIfUrlExist(response[i]);
            // create thumbnail
            div += '<div class="col-md-4 col-sm-6 col-xs-12">';
            div +=checkIfAttachmentExist(response[i]);
            div += '<div class="eventMain">';
            // show basic event info
            div += '<p class="textThumbnail eventName "><strong>' + response[i]['name'] + '</strong></p><br>';
            div += '<p class="textThumbnail eventPlace ">Miejsce: ' + response[i]['place']['name'] + '</p>';
            div += '</div>';
            //format dates
            div += '<div class="eventDetails">';
            div += '<p class="textThumbnail eventDetailsText details">Start: ' + getStartDateNode(response[i])+ '</p>';
            div += '<p class="textThumbnail eventDetailsText details"></br>  </p>';
            div += '<p class="textThumbnail eventDetailsText details">Koniec: ' + getEndtDateNode(response[i])+ '</p>';
            div += '</div>';
            div += '</div>';
            div += '</a>';
            div += '</div>';
            div += '</div>';

        }




        document.getElementById("demo").innerHTML = div;

    });

}
function  checkIfAttachmentExist(event) {
    var div="";
    if(event['attachments']['0']!==undefined){

        var link="http://planer.info.pl/image/event/"+event['id']+"/"+event['attachments']['fileName'];
        div += '<div class="thumbnail img-responsive" style="background-image: url('+link+'); height: 250px;">';
    }
    else{
        div += '<div class="thumbnail img-responsive" style="background-image: url(\'http://lorempixel.com/300/300/nightlife\'); height: 250px;background-size:cover";>';
    }
    return div;
}
function checkIfUrlExist(event){
    var div="";
    if(event['urls']['www']!==undefined){
        div += '<a href="'+event['urls']['www']+'" title="Otworz wydarzenie">';
    }
    else{
        div += '<a href="'+event['urls']['www']+'" title="Brak odnośnika do wydarzenia">';
    }
    return div;
}
function getStartDateNode(event) {
    return event['startDate'].substring(0, event['startDate'].length - 5).replace('T', '</p><p class="textThumbnail eventDetailsText details">Godzina: ');
}
function getEndtDateNode(event) {
    return event['startDate'].substring(0, event['startDate'].length - 5).replace('T', '</p><p class="textThumbnail eventDetailsText details">Godzina: ');
}
var ticketTypes = {
    UNKNOWN: 'unknown',
    FREE: 'free',
    PAID: 'paid'
};

showResult();
var checkbox1 = $( "input[type=checkbox][name=checkbox1]" );
var checkbox2 = $( "input[type=checkbox][name=checkbox2]" );
var checkbox3 = $( "input[type=checkbox][name=checkbox3]" );

checkbox1
    .add(checkbox2)
    .add(checkbox3)
    .on('click', filterEvents);

function filterEvents() {
    var date1 = $( "#datepicker1" ).val();
    console.log(date1);
    var date2 = $( "#datepicker2" ).val();
    console.log(date2);



    console.log(checkbox1.prop('checked') , ' this val 1');
    console.log(checkbox2.prop('checked') , ' this val 2');
    console.log(checkbox3.prop('checked') , ' this val 3');


// Get the value from a checked checkbox
    var categories= getFilterValues();
//    x.join(',');
    console.log('categories',categories);



}



function isUnknown(value) {
    return value === ticketTypes.UNKNOWN;
}


function getFilterValues() {
    //collection = collection.filter(isUnknown);

    var $filters = $(".option-list").find($("input[type=checkbox]"));

    return $filters.map(function(idx, filter) {
        return +filter.value;
    });
}
