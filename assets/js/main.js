function getter(data) {
  var GetterObj = {
  arr: [
        "ESL_SC2",
        "OgamingSC2",
        "cretetion",
        "freecodecamp",
        "storbeck",
        "habathcx",
        "RobotCaleb",
        "noobs2ninjas"
      ]
  }

}



$(document).ready(function(){
  $('#get').on('click', function(){
    arr.forEach
    $.ajax({
      method: 'GET',
      url: 'https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?',
      dataType: 'jsonp'
    })
    .done(function(data){
      console.log(data);
      $('#streams').append(`<img src='${data.stream.channel.logo}'</img>`);
      $('#streams').append('<p>' + data.stream.channel.game + '</p>');
      $('#streams').append(`<a href='${data.stream.channel.url}'>ESL</a>`);
    })
    .fail(function(){
      console.log("Error!");
    })
})
})
