//First, import the stylesheets
import "./styles/normalize.css"
import "./styles/mainStyle.css"

import {climaInstancia} from './apiCalls/weatherApi'
import {builder} from "./domBuild/buildSkeleton";

const buildCurr = () =>{
    climaInstancia.show_api(climaInstancia.getLocation()).then( p => {
        if(p === undefined){
            document.getElementById('searchbar').placeholder = 'No country found with that search';
            document.getElementById('searchbar').value = '';
            return
        }
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
                    currentForecast.append(builder.weatherSimpleTile(k, 0,climaInstancia.getCelsius()))
                }else {
                    k.time = k.time.split(' ')[1];
                    currentForecast.append(builder.weatherSimpleTile(k, 0, climaInstancia.getCelsius()))
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


// Buttons Behaviour

const tempButton = document.querySelector('.trigger--temp__button');

tempButton.addEventListener('click', (e) => {
    let buttontrigger = document.querySelector('.active');
    if(buttontrigger.style.animationName === 'animationRight'){
        buttontrigger.style.animation = 'animationLeft 1s 1 forwards'
    }else{
        buttontrigger.style.animation = 'animationRight 1s 1 forwards'
    }
    climaInstancia.setCelsius();
    buildCurr();
})

const searchButton = document.getElementById('submitSearch');

searchButton.addEventListener('click', () =>{
    let location = document.getElementById('searchbar').value;
    climaInstancia.setLocation(location);
    buildCurr();
})

// Theme changer behaviour

const themeChangerButton = document.querySelector('.themeChanger-button');
themeChangerButton.addEventListener('click', changeTheme);


function changeTheme(){

    const rootElement = document.querySelector(':root');

    const day = [
        ['--details-color' ,  '#F33535'],
        ['--background-color' ,  '#29252C'],
        ['--text-color' ,  '#E7F6F2'],
        ['--mainText-color' ,  '#E7F6F2'],
        ['--extended-text' ,  'rgba(243, 53, 53, 0.69)'],
        ['--border-color' ,  'black'],
        ['--general-backg' ,  '#2C3333'],
        ['--opt-border' , '#2C3333']
    ]

    const night = [
        ['--details-color' ,  '#395B64'],
        ['--background-color' ,  '#29252C'],
        ['--text-color' ,  '#E7F6F2'],
        ['--mainText-color' ,  '#E7F6F2'],
        ['--extended-text' ,  '#7dd6d7'],
        ['--border-color' ,  'black'],
        ['--general-backg' ,  '#2C3333'],
        ['--opt-border' , '#2C3333']
    ]

}

