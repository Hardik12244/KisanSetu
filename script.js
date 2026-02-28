async function getAdvice() {

    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const landSize = document.getElementById("landSize").value;

    if (state === "" || landSize === "") {
        alert("Please select state and land size");
        return;
    }

    const response = await fetch("https://kisansetu-s7nd.onrender.com/get-advice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            state: state,
            city,
            landSize: Number(landSize)
        })
    });

    const data = await response.json();
    getWeather(data.coords,city);
    document.getElementById("result").innerHTML = `
            <h1>Category: ${data.category}</h1>
            <p><b>Scheme:</b> ${data.governmentScheme}</p>
            <button class="go-button" onclick="window.open('${data.link}', '_blank')">Go</button>
            <a><b>Link:</b> ${data.link}</a>
            <p><b>Recommended Crop:</b> ${data.recommendedCrop}</p>
            <p><b>Soil:</b> ${data.soil}</p>
            <p><b>Tip:</b> ${data.expertTip}</p>
        `;
}

document.getElementById("state").addEventListener("change", function () {

    const state = this.value;

    fetch("https://kisansetu-s7nd.onrender.com/get-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const cityDropdown = document.getElementById("city");
            cityDropdown.innerHTML = '<option value="">Select City</option>';

            if (data.cities) {
                data.cities.forEach(city => {
                    const option = document.createElement("option");
                    option.value = city;
                    option.textContent = city;
                    cityDropdown.appendChild(option);
                });
            }

        });

});

async function getWeather(coords,city) {

    if (!coords) {
        document.getElementById("weatherBox").innerHTML = "Weather unavailable";
        return;
    }

    const { lat, lon } = coords;

    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const data = await response.json();

    document.getElementById("weatherBox").innerHTML = `
        <div class="weather-card">
            <h3>${city}</h3>
            <p>Temp: ${data.current_weather.temperature}°C</p>
            <p>Wind: ${data.current_weather.windspeed} km/h</p>
            <p>Direction: ${data.current_weather.winddirection}°</p>
        </div>
    `;
}