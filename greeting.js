const form = document.querySelector(".js-form"),  // 첫번째 것만 가져온다 cf. ~All은 array를 반환
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", // USER_LocalStorage
      SHOWING_CN = "showing";  // SHOWING_ClassName

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
  event.preventDefault();         // 
  const curValue = input.value;
  paintGreeting(curValue);
  saveName(curValue);
}

function askForName(){
  form.classList.add(SHOWING_CN);        // WHY this code?
  form.addEventListener("submit", handleSubmit);  // addEventListener?
}

function paintGreeting(text){
  form.classList.remove(SHOWING_CN);     // To paint the text, the form is needed to be hide
  greeting.classList.add(SHOWING_CN);    // WHY this code?
  greeting.innerText = `Hello ${text}`;
}

function loadName(){
  const curUser = localStorage.getItem(USER_LS);
  if(curUser === null){
    askForName();
  }
  else{
    paintGreeting(curUser);
  }
}

function init(){
  loadName();
}

init();
