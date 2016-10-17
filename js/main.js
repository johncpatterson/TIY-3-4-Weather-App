jQuery(function() {

    $("#submitForm").on("submit", function() {
        event.preventDefault();
        var text = $("#searchBox").val();
        getWeather(text);

    })

    $("#button").on("click", function() {
        var text = $("#searchBox").val();
        getWeather(text);

    })

    function getWeather(query) {
        $("#putWeatherHere").html("");
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${query},US&cnt=7&APPID=f5e364968f16eed20ecfaf7efa2d6303&units=imperial`,
            method: 'GET',
            success: function successHandler(weatherData) {
                console.log(weatherData);

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
