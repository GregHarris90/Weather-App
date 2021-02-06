// TODOS:
// Display data to Main section UV Index)
// Append list of 5 day forecast at bottom of screen
// Create condition for UV Index box color

// ==========================================================================

// Makes sure document is loaded, then runs main functions
$(document).ready(function () {

// document variables
var searchForm = document.querySelector("#search-form")
var currentDay = moment().format("MMMM Do YYYY");
// event listener on search button
searchForm.addEventListener("submit", getApi);

console.log("Current Day:",currentDay);

// function to input city name and fetch data
function getApi(event) {
    event.preventDefault();

    // 
    var cityInput = document.querySelector("#search-input").value;
    console.log (cityInput);

    // city search history
    var searchHistory = $("#past-Search");
    var pastSearch = document.createElement("li");
    pastSearch.textContent = cityInput;
    
    searchHistory.append(pastSearch)


    console.log(searchHistory);


    // Main URL and API key variables
    var API_key = "0b351b99223ceb38cc5d35d442babfe4"
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + API_key + "";

    // Main ajax call for Main URL
    $.ajax({
        url: requestURL,
        method: "GET",
    // Run city response function
    }).then(function (response) {
        // API URL variable for weather icon
        var iconURL = " https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        // Using response data to display to webpage
        // Add city name + current day (from moment.js)
        $(".cityName").text(response.name) + $(".currentDay").text(currentDay);
        // Add temperature
        $(".temp").text(response.main.temp);
        // Add humidity
        $(".humidity").text(response.main.humidity);
        // Add wind speed
        $(".windspeed").text(response.wind.speed);
        // Add icon to image src
        $(".icon").attr("src", iconURL);

        // API URL variable for UV Index (lat+lon)
        var UVindex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + API_key + "";

        // Second ajax call for UV Index
        $.ajax({
            url: UVindex,
            method: "GET",
        // Run UVIndex response function
        }).then(function (UVresponse) {
            // Add UVIndex value display to webpage
            $(".UVindex").text(UVresponse.value);
        
        // console logs for checking information
        console.log("UV Index Response:")
        console.log(UVindex);
        console.log("Icon Response:")
        console.log(iconURL);
        console.log("Ajax Response:");
        console.log(response);

        })
    })


    // var forecast = document.querySelector("ul");
    // var requestForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + API_key + "";

    // $.ajax({
    //     url: requestForecast,
    //     method: "GET",
    // }).then(function (response) {
    //     $(".forecast").

    //     console.log("Forecast Response");
    //     console.log(response);
    // })

  
}
})