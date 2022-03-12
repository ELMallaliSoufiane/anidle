import { useContext, useState } from "react";
import { guessContext } from "./guessContext";

export const GuessComponent = (props)=>{
    const {guess, setGuess} = useContext(guessContext);
    
    return (
        <>
        <div>
            {guess}
        </div>
        </>
    );
}