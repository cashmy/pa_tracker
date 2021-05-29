import React from 'react';
import { Dialog, 
         DialogTitle, 
         DialogContent, 
         Typography, 
         makeStyles } from '@material-ui/core'
import Controls from './controls/Controls'

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: absolute,
        top: theme.spacing(4),
    },
    dialogTitle: {
        paddingRight: '0px',
    }
}))

export default function Popup(props) {
    const { title, children, openPop} = props
    const classes = useStyles();

    return (
        <Dialog open={openPop} maxWidth="md" classes={{paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div styles={{display: "flex"}} > 
                    <Typography variant="h6" component="div" styles={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    <Controls.Button>
                        color="secondary"
                        text="X"
                    </Controls.Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>

    )
}
