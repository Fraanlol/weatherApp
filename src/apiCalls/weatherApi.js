const myWeather = () => {
    const api_key = '14eec2852bc740a5ac911631221703';

    const show_api = async (location) => {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=10`, {mode:'cors'});
        const formatedResponse = await response.json()
        return{formatedResponse}
    }

    return {show_api}
}
export const climaInstancia = myWeather()



