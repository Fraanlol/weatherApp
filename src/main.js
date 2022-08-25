//First, import the stylesheets
import "./styles/normalize.css"
import "./styles/mainStyle.css"

import {climaInstancia} from './apiCalls/weatherApi'
import * as utils from './utils'
import {builder} from "./domBuild/buildSkeleton";

const buildCurr = () =>{
    climaInstancia.show_api('Buenos Aires').then( p => {

        console.log(p);

        const container = document.querySelector('.weatherContainer--Current');
        container.innerHTML = '';
        container.append(builder.weatherSimpleTile(p.current,1));

        let currentForecast = document.querySelector('.current--forecast__container');
        p.hour.forEach((k) => {
            if(k.time.split(' ')[1].split(':')[0] >= p.current.localtime.split(' ')[1].split(':')[0]){
                if(k.time.split(' ')[1].split(':')[0] === p.current.localtime.split(' ')[1].split(':')[0]){
                    k.time = 'Current';
                    currentForecast.append(builder.weatherSimpleTile(k, 0))
                }else {
                    k.time = k.time.split(' ')[1];
                    currentForecast.append(builder.weatherSimpleTile(k, 0))
                }
            }
        })

        let extendedContainer = document.querySelector('.weatherContainer--Current__Extend');
        Object.entries(p.currentExtended).forEach(key =>{
            extendedContainer.append(builder.weatherExtendedInfo(key));
        })
    });
}

buildCurr();


// Button Behaviour

const tempButton = document.querySelector('.trigger--temp__button');

tempButton.addEventListener('click', (e) => {
    buildCurr();
})



