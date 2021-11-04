
export function convertToCel(temp){
    return(Math.round((temp - 273.15) * 10) / 10);
}

export function convertToFar(temp){
    return(Math.round(((temp - 273.15) * (9/5) + 32)*10)/10)
}