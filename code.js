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

$("#fiveDayCast").hide();

var apiKey= "849cc81e3938b0e67ca2c053350dac29";

//suppose to add to history
 
var userCity= $(".btn-city").on("click",function(e) {
  if( e.key == "Enter" ) {
    e.preventDefault();
    var value = $(".form-control").val();
    $(".searchHistory").text(value);
    }
    var addList= $("<li>");
    addList.addClass("list-group-item");
    addList.text(value);
    $(".searchHistory").append(addList);
  });



// completed. gets value and display city.
$(".btn-city").on("click", function(event){
  event.preventDefault();
  $("#fiveDayCast").show();
  var city=$(".form-control").val();
  var locationURL= "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=" + apiKey;
  $.ajax({
    url: locationURL,
    method: "GET"
  }).then(function(response){
  $("#cityTitle").text(response.name);
  $("#cityTemperature").text("Temperature: " + response.main.temp);
  $("#cityHumidity").text("Humidity: " + response.main.humidity);
  $("#cityWindspeed").text("Windspeed: " + response.wind.speed);
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
      $("#UVindex").text("cities UV Index: " + response.value);
    })
  })
  
})




//five-day forecast
$(".btn-city").on("click", function(event){
  event.preventDefault();
  var city=$(".form-control").val();
  var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+ city+ "&appid=" + apiKey;

  $.ajax({
    url: fiveDayUrl,
    method: "GET"
  }).then(function(response){
    console.log("5days", response.list[0].weather[0]);
    var icons= response.list[0].weather[0].id;
    var IconsLocatation= $("<img>").attr("src", icons)
    $(".tempIconOne").append(IconsLocatation);
    $(".card-titleOne").text(response.list[0].dt_txt);
    $(".card-temp").text("Temp " + response.list[0].main.temp);
    $(".card-humidity").text("Humid: " +response.list[0].main.humidity);
    $(".tempIconTwo").append(IconsLocatation);
    $(".card-titleTwo").text(response.list[1].dt_txt);
    $(".card-tempTwo").text("Temp " + response.list[1].main.temp);
    $(".card-humidityTwo").text("Humid: " +response.list[1].main.humidity);
    $(".tempIconThree").append(IconsLocatation);
    $(".card-titleThree").text(response.list[2].dt_txt);
    $(".card-tempThree").text("Temp " + response.list[2].main.temp);
    $(".card-humidityThree").text("Humid: " +response.list[2].main.humidity);
    $(".tempIconFour").append(IconsLocatation);
    $(".card-titleFour").text(response.list[3].dt_txt);
    $(".card-tempFour").text("Temp " + response.list[3].main.temp);
    $(".card-humidityFour").text("Humid: " + response.list[3].main.humidity);
    $(".tempIconFive").append(IconsLocatation);
    $(".card-titleFive").text(response.list[4].dt_txt);
    $(".card-tempFive").text("Temp " + response.list[4].main.temp);
    $(".card-humidityFive").text("Humid: " +response.list[4].main.humidity);
  })

})
//Time
var dateTime = null,
    date = null;

var newTime= function() {
  date= moment(new Date())
  dateTime.html(date.format('MMMM Do YYYY,'));
};
$(document).ready(function(){
  dateTime= $("#searchTime")
  update();
  setInterval(update, 1000);
});

var update = function() {
    date = moment(new Date())
    dateTime.html(date.format('dddd, MMMM Do YYYY,'));
};
$(document).ready(function(){
    dateTime= $(".lead")
    update();
    setInterval(update, 1000);
});

//Local storage  
function sayCity(){
  localStorage.setItem("cityOne",$(".form-control").val());
}

function getCity(){
  $(".list-group-item").val(localStorage.getItem("cityOne"));
}