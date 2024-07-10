import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import Log from'./Components/log.jsx';
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./GameOver.jsx";

const initialGameBoard=[
      [null,null,null],
      [null,null,null],
      [null,null,null]
  ]

function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
      if(gameTurns.length>0 && gameTurns[0].player==='X'){
        currentPlayer='0';
      }
      return currentPlayer;
}



function App() {


  const[players,setPlayers]=useState({
    'X':'Player1',
    'Y':'Player2'
  });

  const[gameTurns,setGameTurns]=useState([]);
  // const[activePlayer,setActivePlayer]=useState('X');
const activePlayer=deriveActivePlayer(gameTurns);

 let winner;
  let gameBoard=initialGameBoard.map((Array=>[...Array]));
    for (const turn of gameTurns){
        const{square,player}=turn;
        const{row,col}=square;

        gameBoard[row][col]=player;
    }

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=
      gameBoard[combination[0].row] [combination[0].column];
    const secondSquareSymbol=
      gameBoard[combination[1].row] [combination[1].column];
    const thirdSquareSymbol=
      gameBoard[combination[2].row] [combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol &&firstSquareSymbol===thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }
  }

  const hasDraw=gameTurns.length===9 && !winner;


  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((curActivePlayer)=>curActivePlayer==='X'?'0':'X');


    setGameTurns((prevTurns)=>{
      let currentPlayer=deriveActivePlayer(prevTurns);
      const updatedTurns=
      [{square:{ row:rowIndex , col:colIndex},player: currentPlayer},
      ...prevTurns,];
    return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return{...prevPlayers,
        [symbol]:newName}
    });
  }
function handleRestart(){
  setGameTurns([]);
}


return(
  <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="player1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
        <Player initialName="player2" symbol="0" isActive={activePlayer==='0'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner ||hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
  </main>
)
}

export default App;
