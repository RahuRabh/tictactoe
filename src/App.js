import Home from "./components/Home";
import Quote from "./components/Quote"
import GameArea from "./components/GameArea";
import React, { useState } from "react";
function App() {

  const [player, setplayer] = useState()
  const [gameplay, setgameplay] = useState(false)
  
  return (
    <div className="App flex items-center justify-center mt-20">
      <Quote /> 
      {gameplay ? <GameArea player={player} /> : <Home setplayer={setplayer} setgameplay={setgameplay} />}
      
    </div>
  );
}

export default App;