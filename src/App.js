import './App.css';
import { useState,useEffect, useMemo } from "react";
import { InputComponent } from './inputComponent';
import { GuessComponent } from './guessComponent'
import {guessContext} from './guessContext';
function App() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [animes, setAnimes] = useState(["shingeki no kyojin", "Aldonoah zero", "black butler", "Slam dunk"])
  const providerValue = useMemo(()=>({guess,setGuess,animes,setAnimes}),[guess,setGuess,animes,setAnimes]);

  const getGuess = (guess)=>{
    setGuess(guess);
    
}
const addGuess = (guess)=>{
  console.log(guess);
  if(!guesses.includes(guess)) setGuesses(guesses => [...guesses,guess]);
}

useEffect(()=>{
  if(!guesses.includes(guess)) setGuesses(guesses => [...guesses,guess]);
},[guess,guesses])


  return (
    <div className="App">
      <div style={
        {
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center"
        }
      }>
       <div>{guesses.map(e=><h1>{e}</h1>)}</div> 
        <guessContext.Provider value={providerValue}>
          <GuessComponent guess={guess} />
          <InputComponent getGuess={getGuess} />
        </guessContext.Provider>
      </div>
    </div>
  );
}

export default App;
