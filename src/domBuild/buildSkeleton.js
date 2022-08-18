import * as utils from "../utils"

export const buildSkeleton = (response) =>{

    const weatherSimpleTile = (data, isMain) =>{
        /*
         Build's "Current Weather" Left tile.
         isMain Bool is to defer between live weather and hour-time weather.
        */

        let container = utils.newElement('div', 'container--weather__sim');
        let iconContainer = utils.newElement('div', 'container--weather__icon');
        let currentDegree = utils.newElement('p', 'weather--current_degree', data.temp_c);

        container.append(iconContainer,currentDegree);
        if(isMain){
            let maxDegree = utils.newElement('p', 'weather--current_max', data.maxtemp_c);
            let minDegree = utils.newElement('p', 'weather--current_min', data.mintemp_c);
            container.append(maxDegree, minDegree);
        }else{
            let hourTime = utils.newElement('p', 'weather--current_hourtime', data.time.split(' ')[1]);
            container.insertBefore(iconContainer, hourTime);
        }

        return container;
    }

    const weatherExtendedInfo = (data) =>{
        /*
         Build's "Current Weather" Right tile.
        */
        let container = utils.newElement('div', 'container--weather__ext');
        let title = utils.newElement('p', 'weather--ext_title', data.ext.title);
        let value = utils.newElement('p', 'weather--ext_data', data.ext.value);

        container.append(title,value);

        return container;
    }
}
