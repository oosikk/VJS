const clockContainer = document.querySelector(".js-clock"),
 clockTitle = clockContainer.querySelector("h1"); // js-clock 하위 요소 선택

// #3.1-2 Making JS Clock
function getTime(){
  const date = new Date();  // 호출 시점의 시간 정보
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  // innerText. 객체 안에 데이터를 넣음

  // ternary operator
  clockTitle.innerText =`${
    hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
  // `${hours}:${minutes}:${seconds}`
}

function init(){
  getTime();
  setInterval(getTime, 1000); // 매초 시간을 변경시킴
}

init();
