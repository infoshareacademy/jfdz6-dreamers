/**
 * Created by damianwisniewski on 23.07.17.
 */
function showResult() {
    var head = '<div class="row text-center">';
    var div = "";
    div += '<div class="col-sm-2">';
    div += '<div class="thumbnail">';
    div += '<img src="img/paris.jpg" alt="Paris" width="400" height="300">';
    div += '<p><strong>Paris</strong></p>';
    div += '<p>Friday 27 November 2015</p>';
    div += '<button class="btn" data-toggle="modal" data-target="#myModal">Buy Tickets</button>';
    div += '</div>';

    div += '</div>';

    console.log(head);
    console.log(div);

    document.getElementById("demo").innerHTML = head + div;


}


showResult();