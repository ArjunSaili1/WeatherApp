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
            console.log(await apiLogic.searchAPI(inputField.value));
        }
    }
    return{ initApp }    
})();

displayControl.initApp();