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

 to get UV index.
 The built string needs to have my API key the lat and Lon of the city i put in.
 The lon and lat of the city is located in the object. So I need to get the input of the city get the lat and lon build that onto the new url string and display on screen.
 */


var apiKey= "849cc81e3938b0e67ca2c053350dac29";

//suppose to add to history
 
var userCity= $("#toDestination").on("click",function(e) {
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



// completed. gets value and display city.
$(".btn-city").on("click", function(event){
  event.preventDefault();
  var city=$(".form-control").val();
  var locationURL= "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=" + apiKey;
  $.ajax({
    url: locationURL,
    method: "GET"
  }).then(function(response){
  $("#cityTitle").text("City Title: " + response.name);
  $("#cityTemperature").text("Temperature: " + response.main.temp);
  $("#cityHumidity").text("Humidity: " + response.main.humidity);
  $("#cityWindspeed").text("Windspeed: " + response.wind.speed);
  $("#lon").text(response.coord.lon);
  $("#lat").text(response.coord.lat);
  });
});




//function to get The Lat and Lon
function getCoord(callback){
  var city=$(".form-control").val();
  var locationURL= "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=" + apiKey;
  $.ajax({
    url: locationURL,
    method: "GET"
  }).then(function(response){
   callback(response.coord.lat,response.coord.lon);

  })
};




//UV index completed
$(".btn-city").on("click", function(event){
  event.preventDefault();

  getCoord(function(lat,long) {
      var UvIndexURL= "http://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+ "&lat=" + lat + "&lon=" + long;

    $.ajax({
      url: UvIndexURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
      $("#UVindex").text("cities UV Index: " + response.value);
    })
  })
  
})




//five-day forecast
$(".btn-city").on("click", function(event){
  event.preventDefault();
  var city=$(".form-control").val();
  var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=" + apiKey;

  $.ajax({
    url: fiveDayUrl,
    method: "GET"
  }).then(function(response){
    var fiveDayIcon = (response.weatherdata.forecast)
    var iconSpot = $("<img>").attr("src", fiveDayIcon);
    $("#fiveDayCast").append(iconSpot);
  })

})

//Local storage 
function sayCity(){
  console.log($("#firstCity").val())
  localStorage.setItem("cityOne",$(".list-group-item").val());
}

function getCity(){
  $(".list-group-item").val(localStorage.getItem("cityOne"));
}