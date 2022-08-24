import * as utils from "../utils"

const buildSkeleton = () =>{

    const weatherSimpleTile = (data, isMain) =>{
        /*
         Build's "Current Weather" Tiles.
         isMain Bool is to defer between live weather and hour-time weather.
        */

        let container = utils.newElement('div', 'weatherContainer--Current__short');
        let iconContainer = utils.newElement('div', 'container--weather__icon');
            let icon = utils.createImage(data.condition.icon);
        if(isMain){
            let currentDegree = utils.newElement('h1', 'weather--current_degree', data.temp_c);
            iconContainer.append(icon,currentDegree);
            container.append(iconContainer);
            let maxMinContainer = utils.newElement('div', 'weather--current_range');
                let maxDegree = utils.newElement('p', 'weather--current_max',`Max: ${data.day.maxtemp_c}`);
                let minDegree = utils.newElement('p', 'weather--current_min', `Min: ${data.day.mintemp_c}`);
                let status = utils.newElement('p', 'weather--status', data.condition.text);
            let currentCityContainer = utils.newElement('div', 'container--weather__city');
                let city = utils.newElement('h2', 'weather--city', data.name);
            currentCityContainer.append(city,status);
            maxMinContainer.append(maxDegree,minDegree);
            container.append(maxMinContainer);
            container.insertBefore(currentCityContainer, iconContainer);
        }else{
            let currentDegree = utils.newElement('p', 'weather--current_degree', data.temp_c);
            iconContainer.append(icon,currentDegree);
            container.append(iconContainer);
            let hourTime = utils.newElement('p', 'weather--current_hourtime', data.time.split(' ')[1]);
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
        let value = utils.newElement('h5', 'weather--ext_data', data[1]);

        container.append(title,value);

        return container;
    }

    return {weatherSimpleTile, weatherExtendedInfo}
}

export const builder = buildSkeleton();