var forecast = document.querySelector("ul");
var searchForm = document.querySelector("#search-form")

searchForm.addEventListener("submit", getApi);

var requestURL = "api.openweathermap.org/data/2.5/weather?q={cityInput}&appid={API_key}";
var API_key = "0b351b99223ceb38cc5d35d442babfe4"

function getApi(event) {
    event.preventDefault();

    var cityInput = document.querySelector("#search-input").value;

    console.log (cityInput);

    
}