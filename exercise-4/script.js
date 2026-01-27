let chartInstance = null;

const getWeather = async () => {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const data = await fetchWeather(city);
    displayWeather(data);
    plotGraph(data);
  } catch (error) {
    document.getElementById("result").innerText = "Error: " + error;
  }
};

const fetchWeather = (city) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        reject("City not found or API error");
        return;
      }

      const data = await response.json();
      resolve(data);

    } catch (err) {
      reject("Network error");
    }
  });
};

const displayWeather = (data) => {
  const cityName = data.city.name;
  const temp = data.list[0].main.temp;
  const humidity = data.list[0].main.humidity;
  const desc = data.list[0].weather[0].description;

  document.getElementById("result").innerHTML = `
    <strong>City:</strong> ${cityName} <br>
    <strong>Temperature:</strong> ${temp} °C <br>
    <strong>Humidity:</strong> ${humidity}% <br>
    <strong>Condition:</strong> ${desc}
  `;
};

const plotGraph = (data) => {

  const labels = data.list.slice(0, 8).map(item => item.dt_txt);
  const temps = data.list.slice(0, 8).map(item => item.main.temp);

  const ctx = document.getElementById("weatherChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Temperature (°C)",
        data: temps,
        borderWidth: 2,
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 6
          }
        }
      }
    }
  });
};
