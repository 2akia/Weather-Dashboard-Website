$(document).ready(function () {
    let APIKey = "9fe88667db3f40d1fe5520b40a30b766";
    let form = $("#search-form");
    let historyList = $("#history");
 // Event handler for submitting the search form to get current weather
    form.on("submit", function (event) {
        event.preventDefault();

         // Get the trimmed input value from the search input field
        let cityName = $("#search-input").val().trim();

        console.log("City Name:", cityName);

// Construct the API URL for current weather

        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;

// Fetch data from the API

        fetch(queryURL)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Weather data not available. Please check the city name and try again.");
                }
                return response.json();
            })
            // Log the query URL and data to the console
            .then(function (data) {
                console.log(queryURL);
                console.log(data);

                updateToday(data);
// Store the search history and get the updated history
                let updatedHistory = storeHistory(cityName);

                console.log("Updated History:", updatedHistory);
            })

    });

     // Event handler for submitting the search form to get 5-day forecast

    form.on("submit", function (event) {
        event.preventDefault();
        let cityName = $("#search-input").val().trim();

        console.log("City Name:", cityName);

        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + APIKey;

        fetch(queryURL)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Weather data not available. Please check the city name and try again.");
                }
                return response.json();
            })
            .then(function (data) {
                console.log(queryURL);
                console.log(data);

                let selectedData = [
                    data.list[2],
                    data.list[10],
                    data.list[18],
                    data.list[26],
                    data.list[34],

                ];

                updateForecast(selectedData);

            })

    });

});

// Function to store the search history in local storage

function storeHistory(cityName) {
    var history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    history.push(cityName);
    localStorage.setItem("weatherHistory", JSON.stringify(history));

    return history;
}

// Function to update the current weather section in the HTML

function updateToday(data) {
    let currentDate = dayjs().format("DD/MM/YYYY");

    $("#today").text(currentDate);
    $("#city").text(data.name);
    $("#temp").text("Temp: " + data.main.temp + "°C");
    $("#wind-speed").text("Wind: " + data.wind.speed + "KPH");
    $("#humidity").text("Humidity: " + data.main.humidity + "%");

    $("#icon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");

};
// Function to update the 5-day forecast section in the HTML
function updateForecast(selectedData) {
    console.log(selectedData);

    for (let i = 0; i < selectedData.length; i++) {

         // Create HTML elements for forecast information

        let fiveDayforecast = $("<div class='m-2'>").text("5-Day Forecast:")

        let forecastDay = $("<p class='forecastDay'>").text(dayjs(selectedData[i].dt_txt).format('D/M/YYYY'));

        let foreCastTemp = $("<p class='forecastTemp'>").text("Temp: " + selectedData[i].main.temp + "°C");

        let foreCastWind = $("<p class='forecastWind'>").text("Wind: " + selectedData[i].wind.speed + "KPH");

        let foreCastHumidity = $("<p class='forecastHumidity'>").text("Humidity: " + selectedData[i].main.humidity + "%");

        let foreCastIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + selectedData[0].weather[0].icon + "@2x.png");

 // Append forecast information to the forecast div
 
        fiveDayforecast.append(forecastDay);
        fiveDayforecast.append(foreCastIcon);
        fiveDayforecast.append(foreCastTemp);
        fiveDayforecast.append(foreCastWind);
        fiveDayforecast.append(foreCastHumidity);
        $("#five-day").append(fiveDayforecast);

    };

    console.log(selectedData);
};












