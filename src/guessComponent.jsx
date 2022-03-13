import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { guessContext } from "./guessContext";
import { styled } from '@mui/material/styles';

export const GuessComponent = ({guess})=>{
    const {answer} = useContext(guessContext);
    return (
        <>
            <Box sx={{maxHeight:'300px'}}>
                
                <Paper elevation={3}>
                    { guess ? 
                   (<Grid container>
                        <Grid item xs={3} sx={{ my:"auto", p:1 }}>
                             <Typography align="center" sx={{color: guess.name === answer.name ? 'green' : 'red'}} >{guess.name}</Typography>
                             <Typography align="center" sx={{ fontSize: 12 }} color="text.secondary">name</Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ my:"auto", p:1 }}>
                           <Typography align="center" sx={{color: guess.source === answer.source ? 'green' : 'red'}}>{guess.source}</Typography> 
                           <Typography align="center" sx={{ fontSize: 12 }} color="text.secondary">source</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ my:"auto", p:1 }}>
                            <Typography sx={{color: guess.episodes === answer.episodes ? 'green' : 'red'}}>{guess.episodes}</Typography>
                            <Typography align="center" sx={{ fontSize: 12 }} color="text.secondary">episodes</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ my:"auto", p:1 }}>
                            <Box>
                            <Typography sx={{color: guess.year === answer.year ? 'green' : 'red'}}>{guess.year}</Typography>
                            <Typography align="center" sx={{ fontSize: 12 }} color="text.secondary">year</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={1} sx={{ my:"auto", p:1 }}>
                            <Typography sx={{color: guess.season === answer.season ? 'green' : 'red'}}>{guess.season}</Typography>
                            <Typography align="center" sx={{ fontSize: 12 }} color="text.secondary">season</Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ my:"auto", p:1 }}>
                            <Stack spacing={1}>
                                {guess.genres.map((genre,index)=> <Item key={index} sx={{color: answer.genres.includes(genre) ? 'green' : 'red'}}>{genre}</Item>)}
                                <Typography align="center" sx={{ fontSize: 12 }} color="text.secondary">genres</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={2} sx={{ my:"auto", p:1 }}>
                            <Stack spacing={1}>
                                {guess.studio.map((std,index)=> <Item key={index} sx={{color: answer.studio.includes(std) ? 'green' : 'red'}}>{std}</Item>)}
                                <Typography align="center" sx={{ fontSize: 12 }} color="text.secondary">studios</Typography>
                            </Stack>
                        </Grid>
                    </Grid>) : null } 
                </Paper>
            </Box>     
        </>
    );
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));