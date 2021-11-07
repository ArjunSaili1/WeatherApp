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
        const error = document.querySelector(".error");
        if (inputField.value){
            const weatherObj = await apiLogic.searchAPI(inputField.value);
            console.log(weatherObj)
            if(weatherObj){
                createDisplay(weatherObj, "fahrenheit");
            }
            else{
                error.textContent = "Location Not Found. Please Try Again";
            }
        }
        else{
            error.textContent = "Please enter a location.";
        }
    }

    function createDisplay(weatherObj, unit){
        console.log(weatherObj);
        locationForm.style.display = 'none';
        const weatherContainer = document.querySelector(".weather-container");
        weatherContainer.style.display = 'unset';
        const locationText = document.querySelector(".location-text");
        locationText.textContent = weatherObj.name;
        if(weatherObj.country){
            locationText.textContent += ", " + weatherObj.country;
        }
        const weatherStatus = document.querySelector(".weather-text");
        weatherStatus.textContent = weatherObj.status + "|" + weatherObj[unit].temp;
        setBackground(weatherObj.status);
        const tempSymbol = document.createElement("sup");
        tempSymbol.classList.add("temp-unit");
        if(unit == "celsius"){
            tempSymbol.textContent = "°C";
        }
        else{
            tempSymbol.textContent = "°F"
        }
        weatherStatus.appendChild(tempSymbol);
        const feelsLike = document.querySelector(".feels-like");
        feelsLike.textContent = weatherObj[unit].feels_like;
        feelsLike.appendChild(tempSymbol.cloneNode(true));
        const pressure = document.querySelector(".pressure");
        pressure.textContent = weatherObj[unit].pressure + " hPa";
        const maxTemp = document.querySelector(".max-temp");
        maxTemp.textContent = weatherObj[unit].temp_max;
        maxTemp.appendChild(tempSymbol.cloneNode(true));
        const minTemp = document.querySelector(".min-temp");
        minTemp.textContent = weatherObj[unit].temp_min;
        minTemp.appendChild(tempSymbol.cloneNode(true));
    }


    function setBackground(status){
        const background = document.querySelector("#background");
        background.classList = status.toLowerCase();
    }
    return{ initApp }    
})();

displayControl.initApp();