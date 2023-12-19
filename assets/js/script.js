$(document).ready(function () {
    let APIKey = "9fe88667db3f40d1fe5520b40a30b766";
    let form = $("#search-form");
    let historyList = $("#history");

    form.on("submit", function (event) {
        event.preventDefault();
        let cityName = $("#search-input").val().trim();

        console.log("City Name:", cityName);

        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;

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

                updateToday(data);

                let updatedHistory = storeHistory(cityName);

                console.log("Updated History:", updatedHistory);
            })

    });

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


function storeHistory(cityName) {
    var history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    history.push(cityName);
    localStorage.setItem("weatherHistory", JSON.stringify(history));

    return history;
}

function updateToday(data) {
    let currentDate = dayjs().format("DD/MM/YYYY");

    $("#today").text(currentDate);
    $("#city").text(data.name);
    $("#temp").text("Temp: " + data.main.temp + "°C");
    $("#wind-speed").text("Wind: " + data.wind.speed + "KPH");
    $("#humidity").text("Humidity: " + data.main.humidity + "%");

    $("#icon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");

};

function updateForecast(selectedData) {
    console.log(selectedData);

    for (let i = 0; i < selectedData.length; i++) {

        let fiveDayforecast = $("<div class='m-2'>").text("5-Day Forecast:")

        let forecastDay = $("<p class='forecastDay'>").text(dayjs(selectedData[i].dt_txt).format('D/M/YYYY'));

        let foreCastTemp = $("<p class='forecastTemp'>").text("Temp: " + selectedData[i].main.temp + "°C");

        let foreCastWind = $("<p class='forecastWind'>").text("Wind: " + selectedData[i].wind.speed + "KPH");

        let foreCastHumidity = $("<p class='forecastHumidity'>").text("Humidity: " + selectedData[i].main.humidity + "%");

        let foreCastIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + selectedData[0].weather[0].icon + "@2x.png");

        fiveDayforecast.append(forecastDay);
        fiveDayforecast.append(foreCastIcon);
        fiveDayforecast.append(foreCastTemp);
        fiveDayforecast.append(foreCastWind);
        fiveDayforecast.append(foreCastHumidity);
        $("#five-day").append(fiveDayforecast);

    };

    console.log(selectedData);
};












