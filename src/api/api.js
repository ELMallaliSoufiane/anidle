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
    console.log(answer);
    return [animestmp,answer];
  }
  