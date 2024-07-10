// const initialGameBoard=[
//     [null,null,null],
//     [null,null,null],
//     [null,null,null]
// ]

export default function GameBoard({onSelectSquare,board}){

    // let gameBoard=initialGameBoard;
    // for (const turn of turns){
    //     const{square,player}=turn;
    //     const{row,col}=square;

    //     gameBoard[row][col]=player;
    // }

//     const [gameBoard,setGameboard]=useState(initialGameBoard)
// function handleSelectSquare(rowIndex,colIndex){
//     setGameboard((prevGameBoard)=>{
//         const updatedBoard=[...prevGameBoard.map(innerArray=>[...innerArray])];
//         updatedBoard[rowIndex][colIndex]=activePlayerSymbol;
//         return updatedBoard;
       
//     });
//     onSelectSquare();

    return(
        <ol id="game-board">
            {board.map((row,rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerIndex,colIndex) => <li key={colIndex}>
                        <button onClick={()=>onSelectSquare(rowIndex,colIndex)}  disabled={playerIndex!==null}>{playerIndex}</button>
                    </li>)}
                </ol>
                </li>)}
        </ol>
    );
}