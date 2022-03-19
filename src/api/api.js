export const fetchAnimes = async () =>{
    const data = await fetch('answers.txt');
    const lines = await data.text();
    let animestmp = [];
    let answer = null;
    const linearr = lines.split('\n');
    const lucky = Math.floor(Math.random()*(linearr.length+1));
    linearr.forEach((line,index)=>{
      const animeline =  line.split(';');
      const anime = { name : animeline[0], alternative : animeline[1], source: animeline[2], episodes: animeline[3],
             year: animeline[4], season: animeline[5], genres: JSON.parse(animeline[6]),studio: JSON.parse(animeline[7]) };
             animestmp.push(anime);
             if(index === lucky) answer = anime;
    });
    return [animestmp,answer];
  }
 
  export const getGameState = ()=>{
    const today = new Date();
    today.setHours(0,0,0);
    console.log(today);
    const tomorrow = new Date (today);
    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrow.setHours(0,0,0);
    const gameState = JSON.parse(localStorage.getItem("gameState"));
    console.log(Date.parse(gameState.lastPlayed));

    if(gameState && gameState.lastPlayed && Date.parse(gameState.lastPlayed) < tomorrow.getTime() && Date.parse(gameState.lastPlayed) > today.getTime()){
             return gameState;
    }
    return {guesses:[],answer: {},end:false, win:false, tries:0};
  }