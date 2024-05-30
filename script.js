const apiUrl =
  ' https://api.open-meteo.com/v1/forecast?latitude=41.6938&longitude=44.8015&current=temperature_2m,wind_speed_10m,is_day,wind_speed_10m';

const weatherContentDiv = document.querySelector('.weather__Content');

async function weatherApi() {
  weatherContentDiv.innerHTML = '';
  const response = await fetch(apiUrl);
  const data = await response.json();

  const dayOrNight = data.current.is_day === 1 ? `sun.png` : `moon.png`;

  let weatherImg;

  if (data.current.temperature_2m <= 0) {
    weatherImg = `snow.png`;
  } else if (
    data.current.temperature_2m >= 0 &&
    data.current.temperature_2m <= 15
  ) {
    weatherImg = `rainy-cloud.png`;
  } else {
    weatherImg = `sun-cloud.png`;
  }

  const html = `      

  <div class="weather__loc">
    <div>
      <img src="./image/location.svg" alt="" />
      <div>
        <p>Latitude : ${data.latitude}</p>
        <p>Longitude: ${data.longitude}</p>
      </div>
    </div>
    <img src="./image/${dayOrNight}" alt="" />
   </div>
  <div class="temp__detail">
    <img src="./image/${weatherImg}" alt="" />
    <div>
      <p>${data.current.temperature_2m}</p>
    </div>
  </div>
  <div class="farh__wind__sp">
    <div>
      <span> °F ${Math.trunc(
        (data.current.temperature_2m * 9) / 5 + 32
      )}  </span>
    </div>
    <div>
    <img src="./image/wind.svg" alt="wind icon" />
      <span>${data.current.wind_speed_10m} km/h</span>
    </div>
  </div>
`;
  console.log(data.current.is_day);
  weatherContentDiv.insertAdjacentHTML('afterbegin', html);
}

weatherApi();
