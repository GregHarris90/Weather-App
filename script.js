// TODOS:
// Build fetch method to retrieve (City name/Weather) data
// Append list of searched cities on sidebar
// Display data to Main section ( City Name, Temperature, Humidity, Wind Speed, UV Index)
// Append list of 5 day forecast at bottom of screen
// Create condition for UV Index box color

// ==========================================================================

// Makes sure document is loaded, then runs main functions
$(document).ready(function () {

// document variables
var forecast = document.querySelector("ul");
var searchForm = document.querySelector("#search-form")

// event listener on search button
searchForm.addEventListener("submit", getApi);

// function to input city name and fetch data
function getApi(event) {
    event.preventDefault();

    var cityInput = document.querySelector("#search-input").value;
    console.log (cityInput);

    // URL and API key variables
    var API_key = "0b351b99223ceb38cc5d35d442babfe4"
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + API_key + "";
    
    $.ajax({
        url: requestURL,
        method: "GET",
    }).then(function (response) {
        $(".cityName").text(response.name);
        $(".temp").text(response.main.temp);
        $(".humidity").text(response.main.humidity);
        $(".windspeed").text(response.wind.speed);
        $(".UVindex").text();

        console.log("Ajax Response");
        console.log(response);
    })

  
}
})