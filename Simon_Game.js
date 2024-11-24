let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){  //btn as argument aaya kyuki use hi hme flash karwana  h
    btn.classList.add("flash"); //isse flash class add ho jaegi and color white ho jaega
    setTimeout(function(){  //isse ham white color ko 1 sec tak flash karwaege
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){  //btn as argument aaya kyuki use hi hme flash karwana  h
    btn.classList.add("userflash"); //isse flash class add ho jaegi and color white ho jaega
    setTimeout(function(){  //isse ham white color ko 1 sec tak flash karwaege
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq = []; //jaise hi level up hoga userSEq ko wapis khali kar dege  
    level++;
    h2.innerText= `level ${level}`;

    let randIdx = Math.floor(Math.random()*4);  
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp ,1000);
        }
    }
    else{
        if (level-1 > highScore) { //level -1 isliye kiya kyuki current level me ham harr gye hai na to to ye thodi add karna hai
            highScore = level-1; // Update the highest score
        }

        h2.innerHTML =`Game Over! Your Score was <b>${level-1}</b> | High Score: <b>${highScore}</b> <hr> Press any key to start.`;
        console.log("Game Over!");

        document.querySelector("body").style.backgroundColor = "red";  //body flash karegi when game over hoga
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor ="white";
        }, 150);

        reset();
    }
}

function btnPress() {
    // console.log(this); //ye bataege user konsa button dabaya
    let btn = this;
    userFlash(btn); //user dabaega to green color flash karega
    
    userColor = btn.getAttribute("id"); //jo button press hui thi uski id nikalege
    userSeq.push(userColor);
    checkAns(userSeq.length-1);  //argument me last button jise press kiya h uska index dala
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq =[];
    level =0;
}
