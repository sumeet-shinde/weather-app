var lat = JSON.parse(localStorage.getItem("lat"));
var lon = JSON.parse(localStorage.getItem("lon"));

var subDiv = document.querySelector("#subDiv");

getDaily();

function getDaily() {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=<appid>&units=metric`;
  let response = getD(url);

  response.then((res) => {
    console.log("res:", res);

    appendDailyData(res);
  });

  response.catch((err) => {
    console.log("err:", err);
  });
}

async function getD(url) {
  try {
    let res = await fetch(url);

    let data = await res.json();

    return data;
  } catch (error) {
    console.log("err:", error);
  }
}

function appendDailyData(res) {
  // subDiv.innerHTML = "";

  let arr = res.daily;

  let tz = res.timezone;

  arr.map(function (ele) {
    let wdiv = document.createElement("div");
    wdiv.setAttribute("id", "wdiv");

    wdiv.addEventListener("click", function () {
      appendWeather(ele, tz);
    });

    let t = ele.sunrise;

    let current = new Date(t * 1000).toLocaleString("en-US", { timeZone: tz });

    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const d = new Date(current);

    let day = weekday[d.getDay()];

    let week = document.createElement("p");
    week.setAttribute("class", "week");
    week.innerHTML = day;

    let w = ele.weather[0].icon;

    let u = `http://openweathermap.org/img/wn/${w}@2x.png`;

    let wimg = document.createElement("img");
    wimg.setAttribute("class", "wimg");
    wimg.src = u;

    let wmain = document.createElement("p");
    wmain.setAttribute("class", "wmain");

    wmain.innerHTML = ele.weather[0].main;

    let wdes = document.createElement("p");
    wdes.setAttribute("class", "wdes");

    wdes.innerHTML = ele.weather[0].description;

    let wtemp = document.createElement("p");
    wtemp.setAttribute("class", "wtemp");

    let g = Math.floor(ele.temp.day);

    wtemp.innerHTML = g + "°";

    wdiv.append(week, wimg, wdes, wtemp);
    subDiv.append(wdiv);
  });
}

let detailDiv = document.querySelector("#detailDiv");

function appendWeather(dl, tz) {
  detailDiv.innerHTML = "";
  let dataDiv = document.createElement("div");
  dataDiv.setAttribute("id", "dataDiv");

  let maxtemp = document.createElement("p");
  maxtemp.innerHTML = "Max Temp: " + dl.temp.max + "°";

  let mintemp = document.createElement("p");
  mintemp.innerHTML = "Min Temp: " + dl.temp.min + "°";

  let s = dl.sunrise;

  let current = new Date(s * 1000).toLocaleString("en-US", { timeZone: tz });

  const d = new Date(current);

  let riset = d.toLocaleTimeString();

  let sunr = document.createElement("p");
  sunr.innerHTML = "Sunrise: " + riset;

  let q = dl.sunset;

  let curr = new Date(q * 1000).toLocaleString("en-US", { timeZone: tz });

  const a = new Date(curr);

  let sett = a.toLocaleTimeString();

  let suns = document.createElement("p");
  suns.innerHTML = "Sunset: " + sett;

  dataDiv.append(maxtemp, mintemp, sunr, suns);
  detailDiv.append(dataDiv);
}
