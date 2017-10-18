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
    ],
channel: '',
}


  function getAllStreams(data) {
    $('#onlineHeader').empty();
    $('#offlineHeader').empty();
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
    $('#onlineHeader').empty();
    $('#offlineHeader').empty();
    $('#online').empty();
    $('#offline').empty();
    $('#onlineHeader').append('<h2>Online Streams</h2>');
    GetterObj.arr.forEach(function(el, i) {
      $.ajax({
        method: 'GET',
        url: `https://wind-bow.gomix.me/twitch-api/streams/${GetterObj.arr[i]}?callback=?`,
        dataType: 'jsonp'
      })
      .done(function(data){
        if (data.stream != null) {
          console.log(data);
          $('#online').append(`<ul class=list${i}></ul>`);
          $(`.list${i}`).append(`<img src='${data.stream.channel.logo}'</img>`);
          $(`.list${i}`).append('<p>' + data.stream.channel.game + '</p>');
          $(`.list${i}`).append(`<a href='${data.stream.channel.url}'>${el}</a>`);;
        }
      })
      .fail(function(){
        console.log("Error!");
      })
    })
  }
  function getOfflineStreams(data) {
    $('#onlineHeader').empty();
    $('#offlineHeader').empty();
    $('#online').empty();
    $('#offline').empty();
    $('#offlineHeader').append('<h2>Offline Streams</h2>');
    GetterObj.arr.forEach(function(el, i) {
      $.ajax({
        method: 'GET',
        url: `https://wind-bow.gomix.me/twitch-api/streams/${GetterObj.arr[i]}?callback=?`,
        dataType: 'jsonp'
      })
      .done(function(data){
        if (data.stream == null) {
          console.log(data);
          $('#offline').append(`<ul class=list${i}></ul>`);
          $(`.list${i}`).append(`<a href='https://www.twitch.tv/${el}'>${el}</a>`);
        }
      })
      .fail(function(){
        console.log("Error!");
      })
    })
  }

  function checkChannelArray(el) {
    return el == GetterObj.channel;
  }

  function getChannelData() {
    $('#online').empty();
    $('#offline').empty();
    $('#onlineHeader').empty();
    $('#offlineHeader').empty();
    $('#onlineHeader').append('<h2>Online Streams</h2>');
    $('#offlineHeader').append('<h2>Offline Streams</h2>');
    GetterObj.arr.forEach(function(el, i) {
      $.ajax({
        method: 'GET',
        url: `https://wind-bow.gomix.me/twitch-api/streams/${GetterObj.arr[i]}?callback=?`,
        dataType: 'jsonp'
      })
      .done(function(data){
        if (data.stream != null) {
          console.log(data);
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
  function getUserChannels(data) {
    var arr = GetterObj.arr;
    if (arr.every(checkChannelArray)) {
      getChannelData();
    } else {
      arr.push(GetterObj.channel);
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
    GetterObj.channel = $('#getUserChannel').val();
    if (GetterObj.channel != '') {
      e.preventDefault();
      GetterObj.channel = $('#getUserChannel').val();
      getUserChannels();
      $('#getUserChannel').val('');
      GetterObj.channel = '';
    } else {
      e.preventDefault();
    }
  })
  $('#getUserChannel').on('keyup', function(e){
    GetterObj.channel = $('#getUserChannel').val();
    if (GetterObj.channel != '' && e.which == 13) {
      e.preventDefault();
      channel = $('#getUserChannel').val();
      getUserChannels();
      $('#getUserChannel').val('');
      GetterObj.channel = '';
    } else {
      e.preventDefault();
    }
  })
})
