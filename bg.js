const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad(){
    console.log("finished loading");
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `${imgNumber + 1}.jpg`;
    image.classList.add("bgImage"); // 새로운 class Name을 가지게 됨, css파일에서 .bgImage{...}로 활용
    body.prepend(image);
    // image.addEventListener("loadend", handleImgLoad);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);

}

init();