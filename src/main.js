//First, import the stylesheets
import "./styles/normalize.css"
import "./styles/mainStyle.css"

import {climaInstancia} from './apiCalls/weatherApi'
import * as utils from './utils'
import {builder} from "./domBuild/buildSkeleton";

const buildCurr = () =>{
    climaInstancia.show_api('Buenos Aires').then( p => {

        let extendedObj = p.currentExtended.celsius;
        if(!(climaInstancia.getCelsius())){
            extendedObj = p.currentExtended.faren;
        }

        const container = document.querySelector('.weatherContainer--Current');
        container.innerHTML = '';
        container.append(builder.weatherSimpleTile(p.current,1, climaInstancia.getCelsius()));

        let currentForecast = document.querySelector('.current--forecast__container');
        currentForecast.innerHTML = '';
        p.hour.forEach((k) => {
            if(new Date(`${k.time}`).getHours() >= new Date(`${p.current.localtime}`).getHours()){
                if(new Date(`${k.time}`).getHours() === new Date(`${p.current.localtime}`).getHours()){
                    k.time = 'Current';
                    currentForecast.append(builder.weatherSimpleTile(k, 0))
                }else {
                    k.time = k.time.split(' ')[1];
                    currentForecast.append(builder.weatherSimpleTile(k, 0))
                }
            }
        })

        let extendedContainer = document.querySelector('.weatherContainer--Current__Extend');
        extendedContainer.innerHTML = '';
        Object.entries(extendedObj).forEach(key =>{
            extendedContainer.append(builder.weatherExtendedInfo(key));
        })
    });
}

buildCurr();


// Button Behaviour

const tempButton = document.querySelector('.trigger--temp__button');

tempButton.addEventListener('click', (e) => {
    climaInstancia.setCelsius();
    buildCurr();
})



