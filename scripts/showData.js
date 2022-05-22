let weatherDiv = document.querySelector(".weatherDiv");
let mapouter = document.querySelector(".mapouter");

let cityName = JSON.parse(localStorage.getItem("City")) || "";

let lat = "";

let lon = "";

if (cityName != "") {
  getToday();
} else {
  cityName = "Mumbai";
  getToday();
}

function getToday() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=<appid>&units=metric`;

  let response = getW(url);
  response.then((res) => {
    console.log("res:", res);

    lat = res.coord.lat;
    lon = res.coord.lon;

    localStorage.setItem("lat", JSON.stringify(lat));
    localStorage.setItem("lon", JSON.stringify(lon));

    appendData(res);
  });
}

function getWeather() {
  let ct = document.querySelector("#cityname").value;

  if (ct == "") {
    alert("Please enter cityname.");
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ct}&appid=<appid>&units=metric`;

    let response = getW(url);
    response.then((res) => {
      console.log("res:", res);

      cityName = res.name;

      lat = res.coord.lat;
      lon = res.coord.lon;

      localStorage.setItem("City", JSON.stringify(cityName));
      localStorage.setItem("lat", JSON.stringify(lat));
      localStorage.setItem("lon", JSON.stringify(lon));

      appendData(res);
    });

    response.catch((err) => {
      console.log("err:", err);
    });
  }
}

async function getW(url) {
  try {
    var res = await fetch(url);

    var data = await res.json();

    return data;
  } catch (error) {
    console.log("err:", error);
  }
}

function appendData(res) {
  weatherDiv.innerHTML = "";

  weatherDiv.style.borderRight = "1px solid white";

  let tempDiv = document.createElement("div");
  tempDiv.setAttribute("class", "tempDiv");

  let current = document.createElement("p");
  current.setAttribute("class", "current");
  current.innerHTML = "CURRENT WEATHER";

  let c = Math.round(res.main.temp);

  let temp = document.createElement("span");
  temp.setAttribute("class", "temp");
  temp.innerHTML = `${c}°`;

  let cel = document.createElement("span");
  cel.setAttribute("class", "cel");
  cel.innerHTML = "C";

  tempDiv.append(current, temp, cel);

  let detDiv = document.createElement("div");
  detDiv.setAttribute("class", "detDiv");

  let table = document.createElement("table");
  table.setAttribute("class", "table");

  let tr1 = document.createElement("tr");
  let tr2 = document.createElement("tr");
  let tr3 = document.createElement("tr");
  let tr4 = document.createElement("tr");
  let tr5 = document.createElement("tr");
  let tr6 = document.createElement("tr");
  let tr7 = document.createElement("tr");

  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");
  let td7 = document.createElement("td");
  let td8 = document.createElement("td");
  let td9 = document.createElement("td");
  let td10 = document.createElement("td");
  let td11 = document.createElement("td");
  let td12 = document.createElement("td");
  let td13 = document.createElement("td");
  let td14 = document.createElement("td");

  let city = document.createElement("p");
  city.innerHTML = "City:";
  td1.append(city);

  let cspan = document.createElement("p");
  cspan.setAttribute("class", "cspan");
  cspan.innerHTML = res.name;
  td2.append(cspan);

  tr1.append(td1, td2);

  let mintemp = document.createElement("p");
  mintemp.setAttribute("class", "mintemp");
  mintemp.innerHTML = `Min Temp:`;
  td3.append(mintemp);

  let minspan = document.createElement("p");
  minspan.setAttribute("class", "minspan");
  minspan.innerHTML = `${Math.round(res.main.temp_min)}°C`;
  td4.append(minspan);

  tr2.append(td3, td4);

  let maxtemp = document.createElement("p");
  maxtemp.setAttribute("class", "maxtemp");
  maxtemp.innerHTML = `Max Temp:`;
  td5.append(maxtemp);

  let maxspan = document.createElement("p");
  maxspan.setAttribute("class", "maxspan");
  maxspan.innerHTML = `${Math.round(res.main.temp_max)}°C`;
  td6.append(maxspan);

  tr3.append(td5, td6);

  let wind = document.createElement("p");
  wind.setAttribute("class", "wind");
  wind.innerHTML = `Wind:`;
  td7.append(wind);

  // let wd = document.createElement('span');

  let dir = res.wind.deg;
  let d = "";
  if (dir >= 349 || (dir > 0 && dir <= 78)) {
    d = "N";
  } else if (dir >= 79 && dir <= 168) {
    d = "E";
  } else if (dir >= 169 && dir <= 258) {
    d = "S";
  } else if (dir >= 259 && dir <= 348) {
    d = "W";
  }

  // wd.textContent = d;
  // wd.setAttribute('class','wd');

  let windspan = document.createElement("p");
  windspan.setAttribute("class", "windspan");
  windspan.innerHTML = `${d} ${Math.round(res.wind.speed)} km/hr`;
  td8.append(windspan);

  tr4.append(td7, td8);

  let windgust = document.createElement("p");
  windgust.setAttribute("class", "windgust");
  windgust.innerHTML = `Wind Gusts:`;
  td9.append(windgust);

  let windgustspan = document.createElement("p");
  windgustspan.setAttribute("class", "windgustspan");
  windgustspan.innerHTML = `${Math.round(res.wind.gust)} m/s`;
  td10.append(windgustspan);

  tr5.append(td9, td10);

  let clouds = document.createElement("p");
  clouds.setAttribute("class", "clouds");
  clouds.innerHTML = `Cloud Base:`;
  td11.append(clouds);

  let cloudspan = document.createElement("p");
  cloudspan.setAttribute("class", "cloudspan");
  cloudspan.innerHTML = `${Math.round(res.clouds.all)}%`;
  td12.append(cloudspan);

  tr6.append(td11, td12);

  let humidspan = document.createElement("p");
  humidspan.setAttribute("class", "humidspan");
  humidspan.innerHTML = `${Math.round(res.main.humidity)}%`;
  td13.append(humidspan);

  let humid = document.createElement("p");
  humid.setAttribute("class", "humid");
  humid.innerHTML = `Humidity:`;
  td14.append(humid);

  tr7.append(td14, td13);

  table.append(tr1, tr2, tr3, tr4, tr6, tr7);

  detDiv.append(table);

  weatherDiv.append(tempDiv, detDiv);

  var z = res.name;

  mapouter.style.display = "contents";
  let map = document.querySelector("#gmap_canvas");
  map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBdxdxHvx6qg6pVQLkFVrcbjptvciG1YHk&q=${z}`;
}
