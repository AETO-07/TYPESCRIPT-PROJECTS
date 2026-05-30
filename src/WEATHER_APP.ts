const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement
const result = document.getElementById("weatherResult") as HTMLDivElement;

searchBtn.addEventListener("click", () =>{
    getWeather();
});

async function getWeather() {
    const city: string = cityInput.value.trim();

    if (!city) {
        result.textContent = "Please enter a city";

        return;
    }

    result.textContent = "Loading..."
        console.log(city);
    
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoResponse.json();
    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    //const country = geoData.results[0].country;

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`);
    const weatherData = await weatherResponse.json();
    const temp = weatherData.current.temperature_2m;
    const wind = weatherData.current.wind_speed_10m;
    const time = weatherData.current.time;
    result.innerHTML = 
        `<h2>${city}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Wind Speed: ${wind} km/h</p>
        <p>Time: ${time}</p>`;
        
    console.log(weatherData);

}