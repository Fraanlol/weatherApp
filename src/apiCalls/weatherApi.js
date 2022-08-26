const myWeather = () => {
    const api_key = '14eec2852bc740a5ac911631221703';
    let formatedResponse = {};
    let isCelsius = true;
    let location = 'Buenos aires';

    const setLocation = name =>{
        location = name;
    }

    const getLocation = () => location;

    const setCelsius = () => isCelsius = !(isCelsius);


    const getCelsius = () => isCelsius;

    async function show_api(location) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=10`, {mode:'cors'});
            const responseJson = await response.json();
            formatResponse(responseJson);
            return formatedResponse;
        }catch (e) {

        }
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
                'humidity':[response.humidity,'%'],
                'wind speed':[response.celsius.wind,'kph'],
                'wind direction':[response.wind_dir,''],
                'uv factor':[response.uv,''],
                'rain':[response.chance_of_rain,'%'],
                'feels like':[response.celsius.feelslike,'°c'],
                'pressure':[response.celsius.pressure,'hpa'],
                'snow':[response.chance_of_snow,'%'],
            },
            'faren':{
                'humidity':[response.humidity,'%'],
                'wind speed':[response.faren.wind,'mph'],
                'wind direction':[response.wind_dir,''],
                'uv factor':[response.uv,''],
                'rain':[response.chance_of_rain,'%'],
                'feels like':[response.faren.feelslike,'°f'],
                'pressure':[response.faren.pressure,'in'],
                'snow':[response.chance_of_snow,'%'],
            },

        };
    }

    function separateUnits(response, isHour){
        response.celsius = {
            'feelslike':response.feelslike_c,
            'pressure':response.pressure_mb,
            'temp':`${Math.round(response.temp_c)}°C`,
            'wind':response.wind_kph,
        }

        response.faren = {
            'feelslike':response.feelslike_f,
            'pressure':response.pressure_in,
            'temp':`${Math.round(response.temp_f)}°F`,
            'wind':response.wind_mph,
        }
        if(!isHour){
            response.celsius = {...response.celsius,
                'maxtemp':`${Math.round(response.day.maxtemp_c)}°C`,
                'mintemp':`${Math.round(response.day.mintemp_c)}°C`,
            }

            response.faren = {...response.faren,
                'maxtemp':`${Math.round(response.day.maxtemp_f)}°F`,
                'mintemp':`${Math.round(response.day.mintemp_f)}°F`,
            }
        }
    }

    return {show_api, formatedResponse, getCelsius, setCelsius, getLocation, setLocation}
}
export const climaInstancia = myWeather();



