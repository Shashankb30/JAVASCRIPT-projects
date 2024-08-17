let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgcontain=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let dmsg=document.querySelector("#dmsg");
let draw=document.querySelector(".draw");
let drawBtn=document.querySelector("#drw-btn");

let count=0;
let turnO= false;//player X has first turn

const winPatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [6,7,8],
    [3,4,5]
];
const resetGame=()=>{
    count=0;
    turnO=false;
    enableBtn();
    msgcontain.classList.add("hide");

}
const resetDrawGame=()=>{
    turnO=false;
    enableBtn();
    draw.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box is clicked");
        count++;

        if(turnO==true){
            //player O trun
            box.innerText = "O";
            turnO=false;
        }else{
            //player X turn
            box.innerText="X";
            turnO=true;
        }
        box.disabled= true;
        let winner=checkWinner();
        if(count===9 && winner== null ){
            drewGame();
            count =0;
            
        }
    });
});
const disableBtn=() =>{
    for(let box of boxes){
        box.disabled =true;
    }
}


const enableBtn=() =>{
    for(let box of boxes){
        box.disabled =false;
        box.innerText="";
    }
}

const drewGame= ()=>{
    dmsg.innerText="OOPS the Game Drew--Play Again";
    draw.classList.remove("hide");
}

const showWinner =(winner) =>{

    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgcontain.classList.remove("hide");
} 
const checkWinner=()=>{
     for(pattern of winPatterns){
        console.log(boxes[pattern[0]].innerText,
            boxes[pattern[1]].innerText,
            boxes[pattern[2]].innerText
        );
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;
        
        if(pos1Val!="" && pos2Val!=""&& pos3Val!=""){
            if(pos1Val===pos2Val&&pos2Val===pos3Val){
                disableBtn();
                showWinner(pos1Val);
                count=0;
            }
        }
     }
}
newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
drawBtn.addEventListener("click",resetDrawGame);