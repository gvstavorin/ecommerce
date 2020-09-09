import React from 'react';
import {Dialog,DialogTitle,DialogContent, DialogActions, Typography, Button} from '@material-ui/core'

export default function ConfirmDialog(props){
    
    const {titulo, subtitulo, color,  confirmDialog, setConfirmDialog} = props
    return (

    <Dialog open={confirmDialog.isOpen}>
        <DialogTitle>

        </DialogTitle>
        <DialogContent>
              <Typography variant="h6">
                {titulo}
              </Typography>
              <Typography variant="subtitle2">
                {subtitulo}

             </Typography>
        </DialogContent>

        <DialogActions>
          <Button > Si</Button>
          <Button > No</Button>
        </DialogActions>
        

    </Dialog>
    )
} 