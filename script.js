let symbolUrl="url('assets/icon-x.svg')";
let currentSymbolElement=document.getElementById("symbol");
//correct answer array
const correctArr=[[1,2,3],[4,5,6,],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

let player1=[];
let player2=[];

// 
const elementCreator=()=>{
    for(let i=0;i<9;i++){
        let div=document.createElement("div");
        div.id=`element${i}`;
        div.className="element"
        div.setAttribute("power",i+1);
        document.getElementById("mainContainer").appendChild(div);
        div.addEventListener('click', clickHandler);
    }
}
const clickHandler=(event)=>{
    let div=event.currentTarget;
    div.style.backgroundImage=symbolUrl;
    div.style.backgroundPosition="center";
    div.style.backgroundRepeat="no-repeat";
    let power=div.getAttribute("power");
    if(symbolUrl==="url('assets/icon-x.svg')"){
        symbolUrl="url('assets/icon-o.svg')"
        player1.push(Number(power));
        currentSymbolElement.style.backgroundImage=symbolUrl;
    }else{
        symbolUrl="url('assets/icon-x.svg')";
        player2.push(Number(power));
        currentSymbolElement.style.backgroundImage=symbolUrl;
    }
    console.log(player1);
    console.log(player2);
    checker(player1);
    checker(player2);
    div.removeEventListener('click',clickHandler)
};

//This fucntion checking if any player win
const checker=(player)=>{
    if(player.length==3){
        player.sort((a, b) => a - b);
        correctArr.map((correctArrElement)=>{
            if(JSON.stringify(player) === JSON.stringify(correctArrElement)){
                console.log("Win first player");
                allEventSwitches();
                winnersAnnouncer();
            }
        })
    }else if(player.length==4){
        player.sort((a, b) => a - b);
        correctArr.map((correctArrElement)=>{
            for(let i=0;i<player.length;i++){
                const newArray = player.slice(0, i).concat(player.slice(i+1));
                if(JSON.stringify(newArray) === JSON.stringify(correctArrElement)){
                    console.log("Win first player");
                    allEventSwitches();
                    winnersAnnouncer();
                }
            }
        })
    }else if(player.length==5){
        for (let i = 0; i < player.length - 2; i++) {
            for (let j = i + 1; j < player.length - 1; j++) {
              for (let k = j + 1; k < player.length; k++) {
                const triple = [player[i], player[j], player[k]];
                correctArr.map((correctArrElement)=>{
                    if(JSON.stringify(triple) === JSON.stringify(correctArrElement)){
                        allEventSwitches();
                        winnersAnnouncer();
                    }
                })
              }
            }
          }
    }
}

//This function cancels all buttons
const allEventSwitches = () =>{
    const elements=Array.from(document.getElementsByClassName("element"));
    elements.push(document.getElementById("restart"));
    elements.map(element => {
        element.removeEventListener('click', clickHandler);
    });
}


//This function announce the winner
const winnersAnnouncer=()=>{
    document.body.style.backgroundColor="#000000"
    document.getElementById("winnerAnouncer").style.display="flex";
    let winneSymbol=document.getElementById("winneSymbol");
    let winnerColor=document.getElementById("winnerColor");

    if(symbolUrl==="url('assets/icon-x.svg')"){
        symbolUrl="url('assets/icon-o.svg')"
        winneSymbol.style.backgroundImage=symbolUrl;
        winneSymbol.style.position="center";
        winneSymbol.style.backgroundRepeat="no-repeat"
        winnerColor.style.color="#F2B137";
    }else{
        symbolUrl="url('assets/icon-x.svg')";
        winneSymbol.style.backgroundImage=symbolUrl;
        winneSymbol.style.position="center";
        winneSymbol.style.backgroundRepeat="no-repeat"
    }

}

const nextRound =() =>{
    player1.length=0;
    player2.length=0;   

    document.getElementById("mainContainer").innerHTML="";
    elementCreator();

    symbolUrl="url('assets/icon-x.svg')";

    document.body.style.backgroundColor="#1A2A33"

    document.getElementById("winnerAnouncer").style.display="none";
}