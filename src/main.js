//First, import the stylesheets
import "./styles/normalize.css"
import "./styles/mainStyle.css"

import {climaInstancia} from './apiCalls/weatherApi'
import * as utils from './utils'
import {builder} from "./domBuild/buildSkeleton";

climaInstancia.show_api('Buenos Aires').then((p) => {
    console.log(p);
    const container = document.querySelector('.weatherContainer--Current__short');
   container.append(builder.weatherSimpleTile(p,1));
});



