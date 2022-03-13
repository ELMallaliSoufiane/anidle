import { useContext, useState } from "react";
import { guessContext } from "./guessContext";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SuggestionDropdown } from "./suggestionDropdown";
 


export const InputComponent = (props) =>{
    const {animes,search, setSearch} = useContext(guessContext);
    //const [value, setValue] = useState("");
    const [show, setShow] = useState(false);
    const handleChange = (event)=>{
        event.preventDefault();
        setSearch(event.target.value);
        console.log(event.target.value)
        if(!event.target.value){
            setShow(false);
        }
    }
 return (
        <>
            <Container maxWidth="sm">
                <Box
                      sx={{ m: 2,
                            width: '100%', maxWidth: 360
                         }
                      }
                      style={{
                          display: 'flex',
                          flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center"
                      }}
                      noValidate
                       >
                    <TextField value={search} onChange={(e)=>handleChange(e)} onKeyDown={(e)=>setShow(true)} onBlur={(e)=>setShow(false)} id="outlined-basic" label="Anidle" variant="outlined" name="guess" fullWidth />
                    <SuggestionDropdown suggestion={search} elements={animes} show={show} />
                </Box>
            </Container>
        </>
        );
}