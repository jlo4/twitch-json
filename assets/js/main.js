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

var channel = '';
var userDefinedChannels = {
  arr: ["ESL_SC2"]
}

  function getAllStreams(data) {
    $('#onlineHeader').append('<h2>Online Streams</h2>');
    $('#offlineHeader').append('<h2>Offline Streams</h2>');
    $('#online').empty();
    $('#offline').empty();
    GetterObj.arr.forEach(function(el, i) {
      $.ajax({
        method: 'GET',
        url: `https://wind-bow.gomix.me/twitch-api/streams/${GetterObj.arr[i]}?callback=?`,
        dataType: 'jsonp'
      })
      .done(function(data){
        if (data.stream != null) {
          $('#online').append(`<ul class=list${i}></ul>`);
          $(`.list${i}`).append(`<img src='${data.stream.channel.logo}'</img>`);
          $(`.list${i}`).append('<p>' + data.stream.channel.game + '</p>');
          $(`.list${i}`).append(`<a href='${data.stream.channel.url}'>${el}</a>`);
        } else {
          $('#offline').append(`<ul class=list${i}></ul>`);
          $(`.list${i}`).append(`<a href='https://www.twitch.tv/${el}'>${el}</a>`);
        }
      })
      .fail(function(){
        console.log("Error!");
      })
    })
  }
  function getOnlineStreams(data) {
    $('#streamChoice').empty();
    GetterObj.arr.forEach(function(el, i) {
      $.ajax({
        method: 'GET',
        url: `https://wind-bow.gomix.me/twitch-api/streams/${GetterObj.arr[i]}?callback=?`,
        dataType: 'jsonp'
      })
      .done(function(data){
        if (data.stream != null) {
          console.log(data);
          $('#streamChoice').append(`<img src='${data.stream.channel.logo}'</img>`);
          $('#streamChoice').append('<p>' + data.stream.channel.game + '</p>');
          $('#streamChoice').append(`<a href='${data.stream.channel.url}'>${el}</a>`);
        }
      })
      .fail(function(){
        console.log("Error!");
      })
    })
  }
  function getOfflineStreams(data) {
    $('#streamChoice').empty();
    GetterObj.arr.forEach(function(el, i) {
      $.ajax({
        method: 'GET',
        url: `https://wind-bow.gomix.me/twitch-api/streams/${GetterObj.arr[i]}?callback=?`,
        dataType: 'jsonp'
      })
      .done(function(data){
        if (data.stream == null) {
          console.log(data);
          // $('#offlineStreams').append(`<img src='${data.stream.channel.logo}'</img>`);
          // $('#offlineStreams').append('<p>' + data.stream.channel.game + '</p>');
          $('#streamChoice').append(`<a href='https://www.twitch.tv/${el}'>${el}</a>`);
        }
      })
      .fail(function(){
        console.log("Error!");
      })
    })
  }

  function checkChannelArray(el) {
    return el == channel;
  }

  function getChannelData() {
    $('#userStreams').empty();
    userDefinedChannels.arr.forEach(function(el, i) {
      $.ajax({
        method: 'GET',
        url: `https://wind-bow.gomix.me/twitch-api/streams/${userDefinedChannels.arr[i]}?callback=?`,
        dataType: 'jsonp'
      })
      .done(function(data){
        if (data.stream != null) {
          console.log(data);
          $('#userStreams').append(`<img src='${data.stream.channel.logo}'</img>`);
          $('#userStreams').append('<p>' + data.stream.channel.game + '</p>');
          $('#userStreams').append(`<a href='${data.stream.channel.url}'>${el}</a>`);
        } else {
          $('#userStreams').append(`<ul class=list${i}></ul>`);
          $(`.list${i}`).append(`<a href='https://www.twitch.tv/${el}'>${el}</a>`);
        }
      })
      .fail(function(){
        console.log("Error!");
      })
    })
  }
  function getUserChannels(data) {
    var arr = userDefinedChannels.arr;
    if (arr.every(checkChannelArray)) {
      getChannelData();
    } else {
      arr.push(channel);
      getChannelData();
    }
  }


$(document).ready(function(){

  $('#getAll').on('click', function(){
    getAllStreams();
  })
  $('#getOnline').on('click', function(){
    getOnlineStreams();
  })
  $('#getOffline').on('click', function(){
    getOfflineStreams();
  })
  $('#userChannel').on('click', function(e){
    channel = $('#getUserChannel').val();
    if (channel != '') {
      e.preventDefault();
      channel = $('#getUserChannel').val();
      getUserChannels();
      $('#getUserChannel').val('');
      channel = '';
    } else {
      e.preventDefault();
    }
  })
  $('#getUserChannel').on('keyup', function(e){
    channel = $('#getUserChannel').val();
    if (channel != '' && e.which == 13) {
      e.preventDefault();
      channel = $('#getUserChannel').val();
      getUserChannels();
      $('#getUserChannel').val('');
      channel = '';
    } else {
      e.preventDefault();
    }
  })
})
