import './App.css';
import { useState,useEffect, useMemo } from "react";
import { InputComponent } from './components/inputComponent';
import { GuessComponent } from './components/guessComponent'
import {guessContext} from './components/guessContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PostGameDialog } from './components/postgameDialog';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {fetchAnimes,getGameState} from './api/api';

function App() {
  const [guess, setGuess] = useState('');
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState('');
  // const [gameState, setGameState] = useState({guesses:[],answer: {},end:false, win:false, tries:0});
  const [gameState, setGameState] = useState(()=>getGameState());
  const providerValue = useMemo(()=>({guess,setGuess,animes,search, setSearch ,gameState,setGameState}),[guess,setGuess,animes,search, setSearch,gameState,setGameState]);

useEffect(()=>{
  
  const fetch = async () =>{
    const [animestmp, anime] =  await fetchAnimes();
     setAnimes(animestmp);
    if(JSON.stringify(gameState.answer) === '{}') setGameState(gameState => ({...gameState, answer:anime}));
  }

 fetch();

},[]);


useEffect(()=>{

if(guess){
    setGameState(gameState => ({...gameState,guesses: [...gameState.guesses, guess], tries: gameState.tries+1, lastPlayed: new Date()}));
    setGuess('');  
}
localStorage.setItem("gameState", JSON.stringify(gameState));


},[guess,gameState])



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
           {gameState.guesses.slice().reverse().map((gs,index)=><GuessComponent key={index} guess={gs}  />)}  
          </Grid>
          </guessContext.Provider>
        </Grid>
    </Box> } 
    {(gameState.end || gameState.tries === 12) && <PostGameDialog state={gameState}></PostGameDialog>}
      </>
  );
}

export default App;

