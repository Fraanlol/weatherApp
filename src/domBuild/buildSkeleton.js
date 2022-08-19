import * as utils from "../utils"

const buildSkeleton = () =>{

    const weatherSimpleTile = (data, isMain) =>{
        /*
         Build's "Current Weather" Tiles.
         isMain Bool is to defer between live weather and hour-time weather.
        */

        let container = utils.newElement('div', 'container--weather__sim');
        let iconContainer = utils.newElement('div', 'container--weather__icon');
        let currentDegree = utils.newElement('p', 'weather--current_degree', data.temp_c);
        container.append(iconContainer,currentDegree);
        if(isMain){
            let maxMinContainer = utils.newElement('div', 'weather--current_range');
            let maxDegree = utils.newElement('p', 'weather--current_max', data.maxtemp_c);
            let minDegree = utils.newElement('p', 'weather--current_min', data.mintemp_c);
            maxMinContainer.append(maxDegree,minDegree);
            container.append(maxMinContainer);
        }else{
            let hourTime = utils.newElement('p', 'weather--current_hourtime', data.time.split(' ')[1]);
            container.insertBefore(iconContainer, hourTime);
        }

        return container;
    }

    const weatherExtendedInfo = (data) =>{
        /*
         Build's "Current Weather" Footer info.
        */
        let container = utils.newElement('div', 'container--weather__ext');
        let title = utils.newElement('p', 'weather--ext_title', data.ext.title);
        let value = utils.newElement('p', 'weather--ext_data', data.ext.value);

        container.append(title,value);

        return container;
    }

    return {weatherSimpleTile, weatherExtendedInfo}
}

export const builder = buildSkeleton();