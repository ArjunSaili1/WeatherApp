import './styles.css';
import { convertToCel, convertToFar } from "./conversionHelpers";

const apiLogic = (()=>{

    function getFromAPI(query){
        return(searchAPI(query).then())
    }
    async function searchAPI (query){
        try{
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=61bb2b80801cd04a22d0fb4a48c2acd4`);
            const responseJson = await response.json();
            return formatJson(responseJson);   
        }
        catch{
            console.log("error");
        }
    }
    
    function formatJson(jsonWeather){
        const weather = {
            status: jsonWeather.weather[0].main,
            description: jsonWeather.weather[0].description,
            name: jsonWeather.name,
            country: jsonWeather.sys.country,
            celsius: {},
            fahrenheit: {}
        };
        for(const key in jsonWeather.main){
            if(key !== "pressure" && key !== "humidity"){
                weather.celsius[key] = convertToCel(jsonWeather.main[key]);
                weather.fahrenheit[key] = convertToFar(jsonWeather.main[key]);
            }
            else{
                weather.celsius[key] = jsonWeather.main[key];
                weather.fahrenheit[key] = jsonWeather.main[key];
            }
        }
        return(weather);
    }
    return{ getFromAPI }    
})();

apiLogic.getFromAPI("Hamilton").then(function(response){console.log(response)});