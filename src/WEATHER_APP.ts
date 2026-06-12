const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement
const result = document.getElementById("weatherResult") as HTMLDivElement;
const historyList = document.getElementById("historyList") as HTMLUListElement;

let searchHistory: string[] = JSON.parse(
    localStorage.getItem("weatherHistory") || "[]"
);

searchBtn.addEventListener("click", () =>{
    getWeather();
});

function getWeatherEmoji(code: number){
    if(code == 0){
        return "☀️ Clear sky";
    }
    else if (code >=1 && code <= 3){
        return "☁️ Cloudy";
    }
    else if(code >= 51 && code <= 67){
        return "🌧️ Rainy";
    }
    else if(code >= 71 && code <= 77){
        return "❄️ Snowy";
    }
    else{
        return "🌍 Unknown";
    }
}


async function getWeather() {
    const city: string = cityInput.value.trim();

    if (!city) {
        result.textContent = "Please enter a city name🙂";

        return;
    }

    result.innerHTML = "<p>Fetching weather...</p>";
        console.log(city);
    
    try{
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoResponse.json();
    if(!geoData.results){
        result.textContent = "City not found.";

        return;
    }
    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    const country = geoData.results[0].country;

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&country=${country}&current=temperature_2m,wind_speed_10m,weather_code`);
    const weatherData = await weatherResponse.json();
    const temp = weatherData.current.temperature_2m;
    const wind = weatherData.current.wind_speed_10m;
    const weatherCode = weatherData.current.weather_code;
    const time = weatherData.current.time;
    const weatherEmoji = getWeatherEmoji(weatherCode);

    result.innerHTML = 
        `<h2>${city}</h2>
        <p>Weather: ${weatherEmoji}</p>
        <p>Temperature: ${temp}°C</p>
        <p> Country: ${country}</p>
        <p>Wind Speed: ${wind} km/h</p>
        <p>Time: ${time}</p>`;
    console.log(weatherData);

    if (!searchHistory.some(c => c.toLowerCase() === city.toLowerCase())) {
        searchHistory.push(city);
        localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
        renderHistory();
    }
    
} 
    catch(error: any){
        result.textContent = "Something went wrong 😥";
        console.log(error);

    }
}

function renderHistory(){
    historyList.innerHTML = "";
    searchHistory.forEach((city) => {
        historyList.innerHTML += 
        `<li>
        <span class="history-item"> ${city}</span>
        <button class="delete-btn"> ❌</button>
        </li>`;
    });
    const historyItems = document.querySelectorAll(".history-item")
    historyItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            (item as HTMLElement).style.cursor = "pointer";
        });
        item.addEventListener("click", () =>{
        cityInput.value = item.textContent || "";
        getWeather();
    });
});
const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            searchHistory.splice(index, 1);
            localStorage.setItem("weatherHIstory", JSON.stringify(searchHistory)
        );
        renderHistory();
        });
    });
}
renderHistory();