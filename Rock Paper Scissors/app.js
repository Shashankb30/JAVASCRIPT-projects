let userScore=0;
let compScore=0;

const choices = document.querySelectorAll(".choice");
const msg= document.querySelector("#msg");

const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");

const genCompChoice=() =>{
    const options =["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}
const showWinner=(userWin,userChoice,compChoice)=> {
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        msg.innerText=`You win!! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor ="green";
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText=`You Lose -- ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor="red";
    }
}
const drawGame=(userChoice)=>{
    msg.innerText=`Game Drew,both played ${userChoice}. Play Again`;
    console.log("game drew--");
    msg.style.backgroundColor="gray";
}
const playGame = (userChoice) =>{
     console.log("user choice is=",userChoice);
     //generate computer choice -> modular
     const compChoice=genCompChoice();
     console.log("comp choice=",compChoice);
     
     if(userChoice==compChoice){
         drawGame(compChoice);
     }else{

        let userWin = true;
        if(userChoice=="rock"){
            userWin= compChoice === "paper"? false : true;
        }else if(userChoice==="paper"){
            userWin=compChoice==="scissors"? false:true;

        }else{
            userWin= compChoice==="rock"? false:true;
        }
        showWinner(userWin,userChoice,compChoice);
     }
}

choices.forEach((choice) => {
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})