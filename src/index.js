import './styles.css';

async function getFromAPI (query){
    try{
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=61bb2b80801cd04a22d0fb4a48c2acd4`);
        const responseJson = await response.json();
        formatJson(responseJson);   
    }
    catch{
        console.log("error");
    }
}

function formatJson(jsonWeather){
    console.log(jsonWeather);
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

    console.log(weather);
}

function convertToCel(temp){
    return(Math.round((temp - 273.15) * 10) / 10);
}

function convertToFar(temp){
    return(Math.round(((temp - 273.15) * (9/5) + 32)*10)/10)
}


getFromAPI("Hamilton");