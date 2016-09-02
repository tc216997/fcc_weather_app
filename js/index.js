var lon, lat;
var today = new Date();
var time = moment(today).format('h:mm:ss a');
var apiKey = '&appid=20e8cf6cd59264f115f72d57f09f9dd1';
var url = 'http://api.openweathermap.org/data/2.5/weather?lat=';
var thunderstorm = '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';
var cloudy = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
var flurries = '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';
var sunny = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
var rainy = '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';

var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function getWeather() {
    url += lat + '&lon=' + lon +'&units=imperial'  + apiKey;
    $.getJSON(url, function(data){
      var id, celsius, farenheit, weather;
      id = data.weather[0].id;
      celsius = ((data.main.temp - 32) * 5/9).toFixed() + String.fromCharCode(176) + ' C';
      farenheit = data.main.temp.toFixed() + String.fromCharCode(176) + ' F';
      weather = data.weather[0].description;
      displayTime();
      $('.loader').remove();
      $('#location').text(data.name);
      $('#weather').text(weather[0].toUpperCase() + weather.substring(1, weather.length));
      $('#temperature').text(farenheit).addClass('farenheit');
      $('#button').text(String.fromCharCode(176) + 'C');
      $('#button').fadeIn(1000);
      $('p').fadeIn(2000);
      
      if ((id === 800) || (id >= 951 && id <= 953)) {
        $('.weatherDiv').append(sunny);
      } else if ((id >= 801 && id <= 804) || (id >= 954 && id <= 956)) {
        $('.weatherDiv').append(cloudy);
      } else if (id >= 200 && id <= 232) {
        $('.weatherDiv').append(thunderstorm);
      } else if (id >= 600 && id <= 622) {
        $('.weatherDiv').append(flurries);
      } else if ((id >= 500 && id <=531) || (id >= 300 && id <=321)) {
        $('.weatherDiv').append(rainy);
      }
      $('#button').on('click', function(){
        if($('#temperature').hasClass("farenheit")) {
          $('#temperature').addClass('celsius').removeClass('farenheit').text(celsius);
          $('#button').text(String.fromCharCode(176) + 'F');
        } else {
          $('#temperature').addClass('farenheit').removeClass('celsius').text(farenheit);
          $('#button').text(String.fromCharCode(176) + 'C');
        }
      });
    });
  };

function displayTime() {
    var time = moment().format('LTS');
    $('#time').text(time);
    setTimeout(displayTime, 1000);
}

function success(location) {
  lon = location.coords.longitude;
  lat = location.coords.latitude;
  getWeather();
};

function error(err) {
  var getIP = 'http://ip-api.com/json/';
  $.getJSON(getIP).done(function(location) {
    $('#location').text(location.city);
    lon = location.lon;
    lat = location.lat;
    getWeather();
  })
};
navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
navigator.geolocation.getCurrentPosition(success, error, options);