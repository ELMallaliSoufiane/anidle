import { useContext } from "react";
import { guessContext } from "./guessContext";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';




function RenderRow(props) {
    const { data,index, style } = props;
    const {setGuess, animes,setAnimes} = useContext(guessContext);

    const handleClick = (e,data)=>{
        //console.log(data);
        setGuess(data);
        setAnimes(animes=>animes.filter(anime => anime !== data));
    }

    
 return (
    <ListItem style={style} key={index} onClick={(e)=>handleClick(e,data[index])} component="div" disablePadding>
      <ListItemButton >
        <ListItemText primary={`${data[index]}`} />
      </ListItemButton>
    </ListItem>
  );
}

export const SuggestionDropdown = ({suggestion, elements})=>{
    let filtered=[];
    if(!suggestion){
         filtered = [...elements];
    }
    else{
         filtered = elements.filter(element => (element.toLowerCase()).includes(suggestion.toLowerCase()));
    } 
    return (
        <Box
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
        </Box>
      );

}