


const weatherform = document.querySelector(".Weatherform")

const cityInput = document.querySelector(".cityInput");

const card = document.querySelector(".card");

const apikey = "2a6a285d91b6be7f4115a7bed902c808";


weatherform.addEventListener("submit", async event => {

    event.preventDefault();

    const city  = cityInput.value;
    
    if(city){
        try{
            const  weatherData = await getweatherData(city);

            displayWeatherInfo(weatherData)


        }
        catch(error){
            console.error(error);
            displayError(error);

        }
    }
    else{
        displayError("please enter a city");
    }


});

async function getweatherData(city){
    const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }
    
    return await response.json();
    
}


function displayWeatherInfo(data){
    console.log(data);

    const { name: city , 
            main: {temp , humidity}, 
            weather:[{description , id}]} = data;
        
        card.textContent ="";
        card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDispaly = document.createElement("p");
    const humidtyDisplay = document.createElement("p");
    const deseDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");        

    cityDisplay.textContent = city ;
    tempDispaly.textContent = `${(temp -273.15).toFixed(1)}°C`;
    humidtyDisplay.textContent =`Humidity: ${humidity}%` ;
    deseDisplay.textContent = description  ;
    weatherEmoji.textContent = getweatheremoji(id) ;

    cityDisplay.classList.add("cityDisplay");
    tempDispaly.classList.add("tempDispaly");
    humidtyDisplay.classList.add("humidtyDisplay");
    deseDisplay.classList.add("deseDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDispaly);
    card.appendChild(humidtyDisplay);
    card.appendChild(deseDisplay);
    card.appendChild(weatherEmoji);



}

function getweatheremoji(weatherid){
    switch(true){
        case(weatherid >= 200 && weatherid < 300):
            return "⛈️"
        case(weatherid >= 300 && weatherid < 400):
            return "🌧️"
        case(weatherid >= 500 && weatherid < 600):
            return "🌦️"
        case(weatherid >= 600 && weatherid < 700):
            return "☃️"
        case(weatherid >= 700 && weatherid < 800):
            return "🍃"
        case(weatherid === 800):
            return "☀️"
        case(weatherid >= 801 && weatherid < 810):
            return "⛅"
        default:
            return "🛸"
    }
}

function displayError(massage){
    const errordisplay = document.createElement("p");
    errordisplay.textContent = massage;
    errordisplay.classList.add("eorroDisplay");



    card.textContent ="";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}