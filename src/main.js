//First, import the stylesheets
import "./styles/normalize.css"
import "./styles/mainStyle.css"

import * as apiCalls from './apiCalls/weatherApi'
import * as utils from './utils'

let llamadoActual = apiCalls.climaInstancia.show_api('Buenos Aires').then((p) => console.log(p));



