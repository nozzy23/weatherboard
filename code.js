//Weather Key 849cc81e3938b0e67ca2c053350dac29
/*
 Steps in building this application.
 accessing the Weather API and accessing the correct information.
 get the AJAX method to retieve information.
 HTML
 set the top to weather dashboard
 search for city follow by text input
 when the user makes a search save it to recent on the left hand side
 create a area to dump the city infomation.
 and broadcast the next 5 day forcast.
 */
//suppose to add to history
  /*var userCity= $(".cities").keydown(function(e) {
    if( e.key == "Enter" ) {
      e.preventDefault();
      var value = $(this).val();
      console.log(value)
      $(".searchHistory").text(value);
    }
    var addList= $("<li><li>");
    addList.addClass("list-group-item");
    addList.text(value);
    $(".searchHistory").append(addList);
    

  });

  // gets information of city. 
  var locationURL= "https://api.openweathermap.org/data/2.5/weather?q="+userCity+"&units=imperial&appid=849cc81e3938b0e67ca2c053350dac29"



$.ajax({
  url: locationURL,
  method: "GET"
}).then(function(response){
  var userCity= 
$("#cityTitle").text("cities title:" + response.name);
$("#cityTemperature").text("Temperature:" + response.main.temp);
$("#cityHumidity").text("Humidity:" + response.main.humidity);
$("#cityWindspeed").text("Windspeed:" + response.wind.speed);
});

var UvIndexURL= "http://api.openweathermap.org/data/2.5/uvi?appid=849cc81e3938b0e67ca2c053350dac29&lat=37.75&lon=122.37&cnt={1}"

$.ajax({
  url: UvIndexURL,
  method: "GET"
}).then(function(response){
$("#UVindex").text("UV?: " + response.value);
});

var fiveDayURL= "http://api.openweathermap.org//data/2.5/forecast?q=miami,florida&mode=xml&appid=849cc81e3938b0e67ca2c053350dac29units=imperial"

$.ajax({
  url: fiveDayURL,
  method: "GET"
}).then(function(response){
console.log(response);
var fiveday=$("<img>");

$("#fiveDayCast").text(response.forecast);
});*/

$(".btn-city").on("click", function(event){
  event.preventDefault();

  var city=$(".form-control").val();

  var locationURL= "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=849cc81e3938b0e67ca2c053350dac29"

  $.ajax({
    url: locationURL,
    method: "GET"
  }).then(function(response){
  $("#cityTitle").text("cities title:" + response.name);
  $("#cityTemperature").text("Temperature:" + response.main.temp);
  $("#cityHumidity").text("Humidity:" + response.main.humidity);
  $("#cityWindspeed").text("Windspeed:" + response.wind.speed);
  });
})