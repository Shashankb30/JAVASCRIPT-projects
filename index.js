//PROGRAM TO CREATE ROLLING STACK GAME
const prompt = require("prompt-sync")();

const ROWS= 3;
const COLS= 3;

const SYMBOLS_COUNT ={
    A:3,
    B:4,
    C:6,
    D:8
}

const SYMBOLS_VALUES ={
    A:6,
    B:4,
    C:3,
    D:2
}


// Step1 enter the deposit amount
const deposit = () => {
    while(true){
    const depositAmount=prompt("Enter deposit amount:  ");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount)  || numberDepositAmount<=0){
        console.log("Invalid deposit amount,try again.");
    } else {
        return numberDepositAmount;
    }
  }
};

//step 2 asking on number of lines to bet
const getNumberOfLines = () =>{
    while(true){
        const lines=prompt("Enter the Number of Lines to bet on(1-3):  ");
        const numberOfLines = parseFloat(lines);
    
        if(isNaN(numberOfLines)  || numberOfLines<=0  || numberOfLines> 3 ){
            console.log("Invalid number of lines,try again.");
        } else {
            return numberOfLines;
        }
      }
};
//step 3 collect the bet amount

const getBet = (balance,lines) => {
    while(true){
        const bet=prompt("Enter the total bet per lines:  ");
        const numberBet = parseFloat(bet);
    
        if(isNaN(numberBet)  || numberBet<=0 || numberBet> balance/lines){
            console.log("Invalid bet,try again.");
        } else {
            return numberBet;
        }
      }
};

//step 4- spinnig the wheel 

const spin = () => {
    const symbols =[];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
          for (let i =0;i < count ;i++){
            symbols.push(symbol);
          }
    }
    const reels =[];
    for(let i=0;i<COLS;i++ ){
        reels.push([]);
       const reelSymbols =[...symbols];
        for(let j=0;j<ROWS;j++){
         const randomIndex = Math.floor(Math.random() * reelSymbols.length);
         const selectedSymbol =reelSymbols[randomIndex];
         reels[i].push(selectedSymbol);
         reelSymbols.splice(randomIndex,1);
        }

    }
    return reels;
};


//transpose data and print the format
const transpose = (reels) =>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
    for(let j=0;j<COLS;j++){
       rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) =>{
    for(const row of rows){
        let rowString="";
        for(const[i,symbol] of row.entries()){
            rowString += symbol;
            if(i!=row.length -1){
                rowString +=" | ";
            }
        }
        console.log(rowString)
    }
};

//step 5 -give user thier winnig
const getWinnigs = (rows,bet,lines) => {
        let winnigs = 0;

        for(let row=0; row < lines;row++){
            const symbols =rows[row];
            let allSame =true;

            for(const symbol of symbols){
                if(symbol != symbols[0]){
                    allSame=false;
                    break;
                }
            }
        
        if(allSame){
            winnigs += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnigs;
};

// step 6- play again and describe the game

const game = () =>{
    let balance = deposit();
    while(true){
        console.log("You have a balance of $"+ balance);
const numberOfLines= getNumberOfLines();
const bet= getBet(balance,numberOfLines);
balance -= bet* numberOfLines;
const reels =spin();
const rows = transpose(reels);
printRows(rows);
   const winnigs= getWinnigs(rows,bet,numberOfLines);
   balance+= winnigs
   console.log("YOU Recieved $"+ winnigs.toString());
   if(balance<=0){
    console.log("You ran out of Money !");
    break;
   }
   const playAgain = prompt("Do you want to play again (y/n)? ");

   if (playAgain!= "y"){break};
       }
};
game();