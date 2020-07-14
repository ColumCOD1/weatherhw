// DEPENDENCIES ========
$(document).ready(() => {
    console.log("ready!");
  });
  // DOM ELEMNTS
  // INITAL DATA
  // A user types in a city
  $("#city-info-button").on("click", function () {
    event.preventDefault();
    // Date Display
    var date = moment();
    var dateDisplay = date.format("dddd MMMM Do YYYY");
    $("#date").text(dateDisplay);
    console.log(dateDisplay);
    // a user submits their search
    var citySearch = $("#citySearch").val();
    var APIKey = "c7629276d88b73d9dee17485c554906b";
    console.log(citySearch);
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      citySearch +
      "&appid=c7629276d88b73d9dee17485c554906b" +
      "&units=imperial";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var iconCode = response.weather[0].icon;
      var iconImage = "http://openweathermap.org/img/w/" + iconCode + ".png";
      console.log(iconCode);
      $("#icon-image").attr("src", iconImage);
      $("#temperature").text(response.main.temp);
      $("#humidity").text(response.main.humidity);
      $("#wind-speed").text(response.wind.speed);
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      var uvURL =
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;
      console.log("uvURL:", uvURL);
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (response) {
        console.log(response.value);
        var uvIndex = response.value;
        $("#uv-index").text(uvIndex);
        if (uvIndex < 2) {
          $(".index").attr("class", "low");
          console.log("You're safe!");
        }
        if (uvIndex >= 2 && uvIndex <= 5) {
          $(".index").attr("class", "moderate");
          console.log("Getting risky");
        }
        if (uvIndex > 5 && uvIndex <= 7) {
          $(".index").attr("class", "high");
          console.log("Uh oh!");
        }
        if (uvIndex > 7 && uvIndex <= 10) {
          $(".index").attr("class", "very-high");
          console.log("You better stay inside!");
        }
        if (uvIndex > 10) {
          $(".index").attr("class", "extreme");
          console.log("You will ignite on fire");
        }
      });
    });
  });