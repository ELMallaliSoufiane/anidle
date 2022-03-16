import './App.css';
import { useState,useEffect, useMemo } from "react";
import { InputComponent } from './inputComponent';
import { GuessComponent } from './guessComponent'
import {guessContext} from './guessContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PostGameDialog } from './postgameDialog';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {fetchAnimes} from './api';

function App() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState('');
  const [gameState, setGameState] = useState({answer: {},end:false, win:false, tries:0});
  const providerValue = useMemo(()=>({guess,setGuess,animes,setAnimes,search, setSearch ,gameState,setGameState}),[guess,setGuess,animes,setAnimes,search, setSearch,gameState,setGameState]);

useEffect(()=>{
  const fetch = async () =>{
    const [animestmp, anime] =  await fetchAnimes();
    setAnimes(animestmp);
    setGameState(gameState => ({...gameState, answer:anime}));
  }

  
  // setAnimes(animestmp);
  // setAnswer(anime);

 fetch();
},[]);


useEffect(()=>{

if(guess && !guesses.includes(guess)){
    setGuesses(guesses => [...guesses,guess]);
    setGameState(gameState => ({...gameState, tries: gameState.tries+1}))
}

  
},[guess,guesses])



console.log(gameState);
  return (
    <>
    <Box sx={{ height:'10%' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Anidle
              </Typography>
            </Toolbar>
          </AppBar>
    </Box>

  {gameState.answer && <Box sx={{height:'90%'}}>
        <Grid container sx={{height:1}} >
        <guessContext.Provider value={providerValue}>
          <Grid item sm={6} xs={12} sx={{ p:1 }}>
              <InputComponent />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p:1 }}>
           {guesses.slice().reverse().map((gs,index)=><GuessComponent key={index} guess={gs}  />)}  
          </Grid>
          </guessContext.Provider>
        </Grid>
    </Box> } 
    {(gameState.end || gameState.tries === 12) && <PostGameDialog state={gameState}></PostGameDialog>}
      </>
  );
}

export default App;

