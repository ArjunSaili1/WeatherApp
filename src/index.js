import './styles.css';
import { apiLogic } from "./apiLogic.js";

const displayControl = (()=>{
    const locationForm = document.querySelector(".location-form");
    const inputField = document.querySelector(".location-field");
    function initApp(){
        locationForm.addEventListener("submit", submitLocation);
    }

    async function submitLocation(e){
        e.preventDefault();
        if (inputField.value){
            const weatherObj = await apiLogic.searchAPI(inputField.value);
            if(weatherObj){
                createDisplay(weatherObj);
            }
        }
    }

    function createDisplay(weatherObj){
        console.log(weatherObj);
        locationForm.style.display = 'none';
        const weatherContainer = document.querySelector(".weather-container");
        weatherContainer.style.display = 'unset';
        const locationText = document.querySelector(".location-text");
        locationText.textContent = weatherObj.name + ", " + weatherObj.country;
        const weatherStatus = document.querySelector(".weather-text");
        weatherStatus.textContent = weatherObj.status + "|" + weatherObj.celsius.temp;
        const tempSymbol = document.createElement("sup");
        tempSymbol.classList.add("temp-unit");
        tempSymbol.textContent = "°C";
        weatherStatus.appendChild(tempSymbol);
        const feelsLike = document.querySelector(".feels-like");
        feelsLike.textContent = weatherObj.celsius.feels_like;
        feelsLike.appendChild(tempSymbol.cloneNode(true));
        const pressure = document.querySelector(".pressure");
        pressure.textContent = weatherObj.celsius.pressure + " hPa";
        const maxTemp = document.querySelector(".max-temp");
        maxTemp.textContent = weatherObj.celsius.temp_max;
        maxTemp.appendChild(tempSymbol.cloneNode(true));
        const minTemp = document.querySelector(".min-temp");
        minTemp.textContent = weatherObj.celsius.temp_min;
        minTemp.appendChild(tempSymbol.cloneNode(true));
    }
    return{ initApp }    
})();

displayControl.initApp();