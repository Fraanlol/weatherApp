const myWeather = () => {
    const api_key = '14eec2852bc740a5ac911631221703';
    let formatedResponse = {};
    let isCelsius = true;

    const setCelsius = () =>{
        isCelsius = !(isCelsius);
    }

    const getCelsius = () => isCelsius;

    async function show_api(location) {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=10`, {mode:'cors'});
        const responseJson = await response.json();
        formatResponse(responseJson);
        return formatedResponse;
    }

    function formatResponse(response) {
        let forecast = response.forecast.forecastday[0];
        let hourlyTime = forecast.hour;
        let currentHour = response.location.localtime.split(' ')[1].split(':')[0];


        formatedResponse.current = {...response.current, ...forecast, ...response.location};
        formatedResponse.hour = hourlyTime;

        //Format units
        separateUnits(formatedResponse.current,0);

        formatedResponse.current.hour.forEach((k) =>{
            separateUnits(k,1);
        })
        let currentExtended = formatedResponse.current.hour[currentHour];
        currentExtended = formatExtended(currentExtended);
        formatedResponse.currentExtended  = {...currentExtended};

    }

    function formatExtended(response){
        return {
            'celsius':{
                'humidity':response.humidity + '%',
                'wind speed':response.celsius.wind,
                'wind direction':response.wind_dir,
                'uv factor':response.uv,
                'rain':response.chance_of_rain + '%',
                'feels like':response.celsius.feelslike,
                'pressure':response.celsius.pressure,
                'snow':response.chance_of_snow + '%',
            },
            'faren':{
                'humidity':response.humidity + '%',
                'wind speed':response.faren.wind,
                'wind direction':response.wind_dir,
                'uv factor':response.uv,
                'rain':response.chance_of_rain + '%',
                'feels like':response.faren.feelslike,
                'pressure':response.faren.pressure,
                'snow':response.chance_of_snow + '%',
            },

        };
    }

    function separateUnits(response, isHour){
        response.celsius = {
            'feelslike':response.feelslike_c,
            'pressure':response.pressure_mb,
            'temp':response.temp_c,
            'wind':response.wind_kph,
        }

        response.faren = {
            'feelslike':response.feelslike_f,
            'pressure':response.pressure_in,
            'temp':response.temp_f,
            'wind':response.wind_mph,
        }
        if(!isHour){
            response.celsius = {...response.celsius,
                'maxtemp':response.day.maxtemp_c,
                'mintemp':response.day.mintemp_c,
            }

            response.faren = {...response.faren,
                'maxtemp':response.day.maxtemp_f,
                'mintemp':response.day.mintemp_f,
            }
        }
    }

    return {show_api, formatedResponse, getCelsius, setCelsius}
}
export const climaInstancia = myWeather();



