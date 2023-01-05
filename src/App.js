import './App.css';
import { useState } from 'react';
import {Chessboard} from 'react-chessboard'
import {Chess} from 'chess.js'
              
function App() {
  const [game, setGame] = useState(new Chess());

//game state fuction
function safeGameMutation(modify){
  setGame((g)=>{
    const update = {...g}
    modify(update)
    return update;
  })
}

//AI (random movements)
function makeRandomMove(){

  const possibleMove = game.moves();

  //game over condition

  if(game.game_over() || game.in_draw() || possibleMove.length === 0) return;

  //perform a random movement
  const randomIndex = Math.floor(Math.random() * possibleMove.length);

 //play random move 
 safeGameMutation((game)=>{
  game.move(possibleMove[randomIndex]);
 })
}

//action after user turn
function onDrop(source,target){

  let move = null;

  safeGameMutation((game)=>{
    move = game.move({
      from:source,
      to: target,
      promotion:'q'
    })
})

 //check for illegal
 if(move== null) return false;

 //valid move 
 setTimeout(makeRandomMove, 200);

 return true;
}
  return (
    <div className="app">
      <Chessboard 
      position={game.fen()}
      onPieceDrop ={onDrop}
      />
    </div>
  );
}

export default App;