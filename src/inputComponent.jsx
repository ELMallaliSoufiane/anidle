import { useContext, useState } from "react";
import { guessContext } from "./guessContext";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SuggestionDropdown } from "./suggestionDropdown";
 


export const InputComponent = (props) =>{
    const {animes} = useContext(guessContext);
    const [value, setValue] = useState("");
    const handleChange = (event)=>{
        event.preventDefault();
        setValue(event.target.value);
    }
    const {getGuess} = props;

 return (
        <>
            <Container maxWidth="sm">
                <Box
                      sx={{
                        '& > :not(style)': { m: 2,
                            width: '100%', maxWidth: 360,
                         },
                      }}
                      style={{
                          display: 'flex',
                          flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center"
                      }}
                      noValidate
                       >
                    <TextField value={value} onChange={(e)=>handleChange(e)} id="outlined-basic" label="Anidle" variant="outlined" name="guess" fullWidth />
                    <SuggestionDropdown suggestion={value} elements={animes} getGuess={getGuess}/>
                </Box>
            </Container>
        </>
        );
}