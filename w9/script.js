function getWeather() {
	const city = document.getElementById("cityInput").value.trim();
	const result = document.getElementById("result");
      
	fetch("weather.json")
	  .then(response => response.json())
	  .then(data => {
	    const weather = data[city];
      
	    if (weather) {
	      result.innerHTML = `
		<p><strong>City:</strong> ${city}</p>
		<p><strong>Temperature:</strong> ${weather.temperature}</p>
		<p><strong>Humidity:</strong> ${weather.humidity}</p>
		<p><strong>Condition:</strong> ${weather.condition}</p>
	      `;
	    } else {
	      result.innerHTML = `<p style="color:red;">No weather data found for "${city}".</p>`;
	    }
	  })
	  .catch(error => {
	    console.error("Error fetching weather:", error);
	    result.innerHTML = `<p style="color:red;">Error loading data.</p>`;
	  });
      }
      