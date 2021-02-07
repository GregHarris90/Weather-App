// TODOS:
// Append list of 5 day forecast at bottom of screen
// Fix search button issues 

// ==========================================================================

// Makes sure document is loaded
$(document).ready(function () {

    // document variables
    var searchForm = document.querySelector("#search-form")
    var currentDay = moment().format("MMMM Do YYYY");

    // event listener on search button
    searchForm.addEventListener("submit", getApi);
    console.log("Current Day:", currentDay);

    // function to input city name and fetch data
    function getApi(event) {
        event.preventDefault();

        // variable for searched city
        var cityInput = document.querySelector("#search-input").value;
        // add searched city to local storage
        localStorage.setItem("cityInput", JSON.stringify(cityInput));
        // empties search bar after button push
        $("#search-input").val("");

        // get city name from local storage
        var lastCity = JSON.parse(localStorage.getItem("cityInput"));
        // create button, add class, and add text of city name
        var cityList = $("<button class='city-btn'>").attr("id", lastCity).text(lastCity);
        // create div for search buttons 
        var searchDiv = $("<div>");
        // append city button to div
        searchDiv.append(cityList);
        // prepend city button/div to past searches
        if ($("#" + lastCity).length === 0) {
            $("#past-Search").prepend(searchDiv);
        } else {
            $("#past-Search").empty();
            // cityInput.empty();
        }

        console.log("last city:", lastCity);
        console.log("city input:", cityInput);

        // (PARTIALLY BROKEN)
        // press past-search button search again
        $("#past-Search div button").click(function (event) {
            event.preventDefault();
            $("#search-input").val(cityInput);
            getApi(event);
            return;
        })


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
                // Remove previous color class on UVIndex
                $(".UVindex").removeClass("high moderate low")

                // store value of UVIndex into variable
                var UVvalue = UVresponse.value

                // conditional to set color class on UVIndex (high, moderate, low)
                if (UVvalue >= 6) {
                    $(".UVindex").addClass("high");
                } else if (UVvalue >= 3 && 4 && 5 && 6) {
                    $(".UVindex").addClass("moderate");
                } else (UVvalue <= 2)
                $(".UVindex").addClass("low");
            }) // END of then function for UVIndex data

            // API URL variable for Forecast
            // (NOT FINISHED)

            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + API_key + "";

            $.ajax({
                url: forecastURL,
                method: "GET",
            }).then(function (response) {

                // var iconFore = " https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

                console.log(response);

                // for (var i = 0; i < response.length; i++) {
                //     $("#fc-Date").text(response.list.dt_txt);
                //     $("#fc-icon").attr("src", iconFore);
                //     $("#fc-Temp").text(response.main.temp)
                //     $("#fc-Humid").text(response.main.humidity);

                // }



            }) // END of Forecast function
        }) // END of then function for Main weather data
    } // END of getAPI function
}) // END of document.ready function