
color = ["green","red","yellow","blue"];
gamePattern = [];
userPattern = [];

let randomNumber = function(){
    return Math.floor(Math.random()*4);
}

console.log(gamePattern)

let Animate = function(color){
    buttonClass = "."+color;
    let selectedButton = document.querySelector(buttonClass);
    let opacity = 1;
    let step = -1;
    let audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
    let fade = setInterval(() => {
        opacity += step;
        selectedButton.style.opacity = Math.max(opacity,0.5);
        if(opacity < 0.5){
            selectedButton.style.opacity = Math.max(opacity,0.5);
            step *= -1;
        } 
        if(opacity > 1){
            selectedButton.style.opacity = Math.max(opacity,1);
            clearInterval(fade)
        }
    }, 100);
}
function isCorrect(){
    for(let i=0;i<userPattern.length;i++){
        if(gamePattern[i] != userPattern[i]) return false;
    }
    return true;
}
let userSelect = function(){
    $(".box").on("click",function(){
        if(level != 0){
            let audio = new Audio(`./sounds/${this.classList[0]}.mp3`);
            audio.play();
            userPattern.push(this.classList[0]);
            console.log(userPattern);
            this.classList.toggle("pressed");
            let id = setTimeout(() => {
                this.classList.toggle("pressed");
                clearTimeout(id);
            }, 100);
            if(isCorrect()){
                console.log("Yes");
                if(userPattern.length === gamePattern.length){
                    userPattern = [];
                    level++;
                    document.querySelector("h1").textContent = ("Level "+level);
                    setTimeout(() => {
                        newSequence();
                    }, 1000);
                }
            }else{
                console.log("No");
                let audio = new Audio(`./sounds/mario.mp3`);
                audio.play();
                userPattern = [];
                setTimeout(() => {
                    level = 0;
                    document.querySelector("h1").textContent = "Press a key to Start";
                }, 3000);
            }
        }
    })
}

userSelect();

let newSequence = function(){
    let newColor = color[randomNumber()];
    gamePattern.push(newColor);
    console.log(gamePattern)
    Animate(newColor);
}

let level = 0;

window.addEventListener("keypress",function(event){
        if(level === 0){
            level++;
            document.querySelector("h1").textContent = ("Level "+level);
            newSequence();
        }
    })