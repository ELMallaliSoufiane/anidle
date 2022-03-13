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
  const [win, setWin] = useState(false);
  const [answer, setAnswer] = useState(
  {name: "JoJo no Kimyou na Bouken Part 3: Stardust Crusaders",alternative: "JoJo's Bizarre Adventure: Stardust Crusaders", source:"Manga",
  episodes:"24", year:"2014", season:"spring",
  genres:["Action", "Adventure", "Drama", "Supernatural"],
  studio:["David Production"]})
  const providerValue = useMemo(()=>({guess,setGuess,animes,setAnimes,search, setSearch, setWin, answer}),[answer,guess,setGuess,animes,setAnimes,search, setSearch, setWin]);
  const getGuess = (guess)=>{
    setGuess(guess);
    
}


useEffect(()=>{

  if(guess && !guesses.includes(guess)) setGuesses(guesses => [...guesses,guess]);
  
 
    const fetchAnimes = async () =>{
      const data = await fetch('answers.txt');
      const lines = await data.text();
      let animestmp = [];
      (lines.split('\n')).forEach(line=>{
        const animeline =  line.split(';');
        const anime = { name : animeline[0], alternative : animeline[1], source: animeline[2], episodes: animeline[3],
               year: animeline[4], season: animeline[5], genres: JSON.parse(animeline[6]),studio: JSON.parse(animeline[7]) };
               animestmp.push(anime);
      });
      setAnimes(animestmp);
    }
if(animes.length===0) fetchAnimes();
  
},[guess,guesses])




  return (
      <Box sx={{height:'100vh'}}>
        <Grid container sx={{height:'100%'}}>
        <guessContext.Provider value={providerValue}>
          <Grid item sm={6} xs={12}>
              <InputComponent getGuess={getGuess} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my:"auto", p:1 }}>
           {guesses.slice().reverse().map((gs,index)=><GuessComponent key={index} guess={gs} sx={{m:1}} />)}  
          </Grid>
          </guessContext.Provider>
        </Grid>
      </Box>
  );
}

export default App;
