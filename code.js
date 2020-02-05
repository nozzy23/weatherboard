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
  var userCity= $(".cities").keyup(function() {
    var value = $(this).val();
    $("p").text(value);
    }).keyup();

  var locationURL= "https://api.openweathermap.org/data/2.5/weather?q=miami,florida&units=imperial&appid=849cc81e3938b0e67ca2c053350dac29"


$.ajax({
  url: locationURL,
  method: "GET"
}).then(function(response){
console.log(response);
$("#cityTitle").text("cities title:" + response.name);
$("#cityTemperature").text("Temperature:" + response.main.temp);
$("#cityHumidity").text("Humidity:" + response.main.humidity);
$("#cityWindspeed").text("Windspeed:" + response.wind.speed);
});


