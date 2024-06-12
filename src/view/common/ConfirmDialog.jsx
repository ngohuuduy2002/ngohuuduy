import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react'

function ConfirmDialog(props) {
    let {
        open,
        handleClose,
        handleYesClick
    } = props;
    return (

        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            minWidth="xs"
            width="xs"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">Confirm information</DialogTitle>
            <DialogContent>
                Do you want to confirm deletion?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ textTransform: "none" }} size='small' color="primary" variant='contained'>
                    Cancel
                </Button>
                <Button onClick={handleYesClick} style={{ textTransform: "none" }} size='small' color="secondary" variant='contained'>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
