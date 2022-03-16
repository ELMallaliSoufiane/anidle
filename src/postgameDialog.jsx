import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


export const PostGameDialog = ({state})=>{
    console.log(state.answer);
    return (
        <Dialog sx={{p:2, minWidth:500, minHeight:400}} open={true}>
            <DialogTitle sx={{textAlign:'center'}} > {state.win ? 'WIN!' : 'Oops, you lost!'} </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{textAlign:'center'}}>
                    { state.win ? `Congratulations! you've won! \n see you Tomorrow? Baka! :p` : `Ooops, Try Again Tomorrow, weeb! \n the answer is : ${state.answer.name}` }
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}