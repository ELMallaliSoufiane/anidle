import './App.css';
import { useState,useEffect, useMemo } from "react";
import { InputComponent } from './inputComponent';
import { GuessComponent } from './guessComponent'
import {guessContext} from './guessContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function App() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState('');
  const providerValue = useMemo(()=>({guess,setGuess,animes,setAnimes,search, setSearch}),[guess,setGuess,animes,setAnimes,search, setSearch]);
  const getGuess = (guess)=>{
    setGuess(guess);
    
}


useEffect(()=>{

  if(guess && !guesses.includes(guess)) setGuesses(guesses => [...guesses,guess]);
  if(animes.length === 0){
    fetch('answers.txt').then((response)=>response.text()).then(text =>
      {
        var lines = text.split('\n');
        lines.forEach((line)=>{
         const animeline =  line.split(';');
         const anime = { name : animeline[0], alternative : animeline[1], source: animeline[2], episodes: animeline[3],
           year: animeline[4], season: animeline[5], genres: JSON.parse(animeline[6]),studio: JSON.parse(animeline[7]) };
         setAnimes(animes => [...animes,anime]);         
        });
        
      });
  }

},[guess,guesses])




  return (
      <Box>
        <Grid container >
        <guessContext.Provider value={providerValue}>
          <Grid item sm={6} xs={12}>
              <InputComponent getGuess={getGuess} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my:"auto", p:1 }}>
           <GuessComponent guess={guess} />
          </Grid>
          </guessContext.Provider>
        </Grid>
      </Box>
  );
}

export default App;
