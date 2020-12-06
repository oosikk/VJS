const weather = document.querySelector(".js-weather");
const API_KEY = "79dada951d552775062c5789c59d1427";  // OpenWeatherMap, 
const COORDS = 'coords';

/*  
API - Application Programming Interface
특정 웹사이트로부터 데이터를 얻어오거나, Machine끼리 통신하기 위해서 고안됨

JS는 웹사이트로부터 Request 보내고 응답을 통해서 데이터 얻을 수 있는데
새로고침 Refresh없이 실시간으로 확인 가능.
 */

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        // console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${place}, ${temperature}℃`
        weather.style.fontSize = '30px';
    });

    // 유튜브 풀코스 - 실제 JS 어떻게 동작하는지, JS의 network가 어떻게 동작하는지 알 수 있음

    /* 
    network 패널 확인
    request한 내용을 보여준다.
    */
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // latitude: latitude,
        // longitude: longitude
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latuitude, longitude);
}

function handleGeoError(){ 
    console.log('Cant access geo location');
}

function askForCoords(){ 
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords == null){
        // 위치정보를 가져온다
        askForCoords();
    }
    else{
        // getWeather
        const parseCoords = JSON.parse(loadedCoords);
        // console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();