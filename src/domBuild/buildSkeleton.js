import * as utils from "../utils"

const buildSkeleton = () =>{

    const weatherSimpleTile = (data, isMain, isCelsius) =>{
        /*
         Build's "Current Weather" Tiles.
         isMain Bool is to defer between live weather and hour-time weather.
        */

        let info = data.celsius;

        if(!(isCelsius)){
            info = data.faren;
        }


        let container = utils.newElement('div', 'weatherContainer--Current__short');
        let iconContainer = utils.newElement('div', 'container--weather__icon');
            let icon = utils.createImage(data.condition.icon);
        if(isMain){
            let currentDayName = new Date(data.date).toLocaleDateString('en',{weekday:'long'});
            let currentDay = utils.newElement('h2', 'weather--current__dayname', currentDayName);
            let currentDayContainer = document.querySelector('.weatherContainer--Current__dayname');
            currentDayContainer.innerHTML='';
            currentDayContainer.append(currentDay);
            let currentDegree = utils.newElement('h1', 'weather--current_degree', info.temp);
            iconContainer.append(icon,currentDegree);
            container.append(iconContainer);
            let maxMinContainer = utils.newElement('div', 'weather--current_range');
                let maxDegree = utils.newElement('p', 'weather--current_max',`Max: ${info.maxtemp}`);
                let minDegree = utils.newElement('p', 'weather--current_min', `Min: ${info.mintemp}`);
                let status = utils.newElement('p', 'weather--status', data.condition.text);
            let currentCityContainer = utils.newElement('div', 'container--weather__city');
                let city = utils.newElement('h2', 'weather--city', `${data.name} - ${data.country}`);
            currentCityContainer.append(city,status);
            maxMinContainer.append(maxDegree,minDegree);
            container.append(maxMinContainer);
            container.insertBefore(currentCityContainer, iconContainer);
        }else{
            let currentDegree = utils.newElement('p', 'weather--current_degree', info.temp);
            iconContainer.append(icon,currentDegree);
            container.append(iconContainer);
            let hourTime = utils.newElement('p', 'weather--current_hourtime', data.time);
            container.insertBefore(hourTime, iconContainer);
        }

        return container;
    }

    const weatherExtendedInfo = (data) =>{
        /*
         Build's "Current Weather" Footer info.
        */
        let container = utils.newElement('div', 'container--weather__ext');
        let title = utils.newElement('h5', 'weather--ext_title', data[0].toUpperCase());
        let value = utils.newElement('h5', 'weather--ext_data', `${Math.round(data[1][0])} ${data[1][1].toUpperCase()}`);

        container.append(title,value);
        return container;
    }

    return {weatherSimpleTile, weatherExtendedInfo}
}

export const builder = buildSkeleton();