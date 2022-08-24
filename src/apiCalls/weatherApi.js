const myWeather = () => {
    const api_key = '14eec2852bc740a5ac911631221703';
    let formatedResponse = {};

    async function show_api(location) {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=10`, {mode:'cors'});
        const responseJson = await response.json();
        console.log(responseJson);
        formatResponse(responseJson);
        return formatedResponse;
    }

    function formatResponse(response) {
        let forecast = response.forecast.forecastday[0];
        let hourlyTime = forecast.hour;
        let currentHour = response.location.localtime.split(' ')[1].split(':')[0];
        let currentExtended = response.forecast.forecastday[0].hour[currentHour];
        currentExtended = formatExtended(currentExtended);

        formatedResponse.current = {...response.current, ...forecast, ...response.location};
        formatedResponse.hour = hourlyTime;
        formatedResponse.currentExtended  = {...currentExtended};
    }

    function formatExtended(response){
        return {
            'humidity':response.humidity,
            'wind speed':response.wind_kph,
            'wind direction':response.wind_dir,
            'uv factor':response.uv,
            'rain':response.chance_of_rain + '%',
            'feels like':response.feelslike_c,
            'pressure':response.pressure_mb,
            'snow':response.chance_of_snow,
        };
    }

    return {show_api, formatedResponse}
}
export const climaInstancia = myWeather();



