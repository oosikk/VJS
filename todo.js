const toDoForm = document.querySelector(".js-toDoForm"), 
toDoInput = toDoForm.querySelector("input"), 
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

// const toDos = [];   // 할 일 저장 array
let toDos = [];   // 할 일 저장 array, deleteToDo에서, toDos에 대입연산하기 위해

// Todo 삭제를 위해 해야하는 작업 순서
// 1. localStorage에서 삭제, 저장
// 2. HTML에서도 삭제

function deleteToDo(event){
    // 삭제할 버튼의 Parent를 찾아야. (li)
    // console.dir(event.target)
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    // functional Programming Language
    
    const cleanToDos = toDos.filter(function(toDo) {    // filter 모든 요소 대상으로 filtering 
    //   return toDo.id !== li.id;  number !== string
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();

}

function saveToDos(){
    // Local Storage에도 toDo를 저장
    // local Storage에는 js data 저장 불가. String만 저장 가능
    // JSON.stringify : js object를 string으로 바꿔줌
    // 데이터 전달 시, js가 다룰 수 있게 object로 바꿔주는 기능. 반대로 string으로도 변환가능
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    // Local Storage에도 toDo를 저장해야하므로 아래와 같은 과정 진행
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; // li 지우기 위해서, id를 지정해줄 필요가 있음
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    li.style.textAlign = 'center';
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);    // 넣고 호출
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const curVal = toDoInput.value;
    paintToDo(curVal);
    toDoInput.value = "";
}
/* 
function something(toDo){ // 59번째 줄 내용 수행
    console.log(toDo.text);
}
 */
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        // JSON : JavaScript Object Notation
        // JSON.parse(~) 데이터 전달할 때, JS가 다룰 수 있게 object로 바꿔주는 기능
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){     
            // array를 위한 function ~.forEach(..) : 각 요소 접근
            // function 바로 생성
            paintToDo(toDo.text);
        });
    }
}



function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

