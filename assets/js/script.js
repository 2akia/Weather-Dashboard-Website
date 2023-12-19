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















