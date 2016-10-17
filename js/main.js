jQuery(function() {

    // Even handler for hitting the enter key and getting the value of the text input
    $("#submitForm").on("submit", function() {
            event.preventDefault();
            var city = $("#searchBox").val();
            getWeather(city);

        })
        // Even handler for clicking the button and getting the value of the text input
    $("#button").on("click", function() {
            var city = $("#searchBox").val();
            getWeather(city);

        })
        // Function for getting clearing the HTML, pulling data from the weather API and appending the returned data to the page
    function getWeather(query) {
        // Get weather data from OPen Weather Map API
        $("#putWeatherHere").html("");
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${query}&cnt=7&APPID=f5e364968f16eed20ecfaf7efa2d6303&units=imperial`,
            method: 'GET',
            success: function successHandler(weatherData) {
                console.log(weatherData);
                $("#cityGoesHere").text(weatherData.city.name);
                // Loop through weather data array for each day and append data to the putWeatherHere id on the page
                weatherData.list.forEach(function(weatherData) {
                    $("#putWeatherHere").append(`
                <tr>
                        <td class="day_name">${moment.unix(weatherData.dt).format('dddd')}</td>

                        <td class="weather_icon"><img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png"></td>
                        <td class="day_high">High: ${weatherData.temp.max.toFixed()} &#x2109</td>
                        <td class="day_low">Low: ${weatherData.temp.min.toFixed()} &#x2109</td>
                </tr>
                
                                            `);

                })
            },
        });
    }

});

// Was trying to append the follwing data so it was a complete table but could not get it working:
// <table class="table">
//                 <thead>
//                 <tr>
//                         <th>Day</th>
//                         <th>Conditions</th>
//                         <th>Conditions</th>
//                         <th>High Temp</th>
//                         <th>Low Temp</th>
//                 </tr>
//                 </thead>
// </table>
