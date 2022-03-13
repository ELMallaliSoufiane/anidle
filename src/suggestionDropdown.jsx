import { useContext } from "react";
import { guessContext } from "./guessContext";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';




function RenderRow(props) {
    const { data,index, style } = props;
    const {setGuess,setAnimes,animes, setSearch, setWin,answer} = useContext(guessContext);

    const handleClick = (e,data)=>{
        //console.log(data);
        const guess = animes.find(anime =>  anime.name === data.name);
        setGuess(guess);
        if(JSON.stringify(guess) === JSON.stringify(answer)) {
          console.log("win");
          setWin(true);
        }
        setAnimes(animes=>animes.filter(anime => anime.name !== data.name));
        setSearch('');
    }

    
 return (
    <ListItem style={style} key={index} onMouseDown={(e)=>handleClick(e,data[index])} component="div" disablePadding>
      <ListItemButton >
        <ListItemText primary={`${data[index].name}`} />
      </ListItemButton>
    </ListItem>
  );
}

export const SuggestionDropdown = ({suggestion, elements, show})=>{
    let filtered=[];
    if(!suggestion){
         filtered = [...elements];
    }
    else{
         filtered = elements.filter(element => (element.name.toLowerCase()).includes(suggestion.toLowerCase()) || (element.alternative.toLowerCase()).includes(suggestion.toLowerCase()));
    } 
    //console.log(filtered);
    return (
      <>
      {show ? <Box
        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
      >
        <FixedSizeList
          itemData={filtered}
          height={400}
          width={360}
          itemSize={46}
          itemCount={filtered.length}
          overscanCount={5}
        >
          {RenderRow}
        </FixedSizeList>
      </Box> : null }
      </>
      );

}