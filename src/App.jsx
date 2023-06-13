import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Confetti from 'react-confetti'
const gameIcons = [
  "😊",
  "❤️",
  "👌",
  "🦆",
  "🦴",
  "👀",
  "🦾",
  "🎁",
  "🔥",
];

function App() {
  const [pieces, setPieces] = useState([])
  const isGameCompleted = useMemo(()=>{
    if(pieces.length>0 && pieces.every((piece)=>piece.solved)){
      return true
    }
    return false
  },[pieces])
  // console.log(gameIcons);


  const startGame = ()=>{
    const duplicateGameIcons = [...gameIcons, ...gameIcons]
    const newGameIcons = [];

    while(newGameIcons.length < gameIcons.length*2){
      const randomIndex =  Math.floor(Math.random()*duplicateGameIcons.length)
      newGameIcons.push({
        emoji:duplicateGameIcons[randomIndex],
        flipped: false,
        solved: false,
        position: newGameIcons.length,
      })
      duplicateGameIcons.splice(randomIndex,1)
    }

    setPieces(newGameIcons)
  };
  useEffect(()=>{ 
    startGame()
  },[])

  const handleActive = (data)=>{
    const flippedData = pieces.filter((data)=> data.flipped && !data.solved);
    if(flippedData.length === 2) return
    const newPieces = pieces.map((piece)=>{
      if(piece.position === data.position){
        piece.flipped = !piece.flipped;
      }
      return piece;
    })
    setPieces(newPieces)
  }

  const gameLogicForFlipped = ()=>{
    const flippedData = pieces.filter((data)=> data.flipped && !data.solved)
    if(flippedData.length === 2){
      setTimeout(()=>{
        if(flippedData[0].emoji === flippedData[1].emoji){
          setPieces(
            pieces.map((piece)=>{
              if(piece.position === flippedData[0].position ||
                piece.position === flippedData[1].position
                ){
                  piece.solved = true
                }
                return piece
            })
          )
        }else{
          setPieces(
            pieces.map((piece)=>{
              if(piece.position === flippedData[0].position ||
                piece.position === flippedData[1].position
                ){
                  piece.flipped = false;
                }
                return piece
            })
          )
        }
      },800)
    }
  }



  useEffect(()=>{
    gameLogicForFlipped()
  },[pieces])

  return (
    <main>
      <h1>Memory Game in React</h1>
      <div className="container">
        {pieces.map((data,index)=>(
           <div className={`flip-card ${data.flipped || data.solved ? 'active':''}`} key={index} onClick={()=>handleActive(data)}>
           <div className="flip-card-inner">
             <div className="flip-card-front">
             </div>
             <div className="flip-card-back">{data.emoji}  
             </div>
           </div>
         </div>
        ))}       
      </div>
      {isGameCompleted && <div className="game-completed">
        <h1>YOU WINN !!!</h1>
        <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />
      </div>}
    </main>
  );
}

export default App;
