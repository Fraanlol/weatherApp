const myWeather = () => {
    const api_key = '14eec2852bc740a5ac911631221703';
    let formatedResponse = {};

    async function show_api(location) {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=10`, {mode:'cors'});
        response.json().then((r) => {console.log(r);formatResponse(r)});
        return formatedResponse;
    }

    function formatResponse(response) {
        let currentData = response.current;
        let forecast = response.forecast.forecastday[0];
        let hourlyTime = forecast.hour;

        formatedResponse.current = {...currentData, ...forecast};
        formatedResponse.hour = hourlyTime;
    }

    return {show_api, formatedResponse}
}
export const climaInstancia = myWeather();



