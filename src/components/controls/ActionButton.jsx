import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    primary: {
        '& .MuiButton-label':{
            color: theme.palette.primary.main
        }
    },
    secondary: {
        '& .MuiButton-label':{
            color: theme.palette.secondary.main
        }
    },
    // Console errros will be logged if the following colors are used. 
    // The program will compile and run successfully though.
    // Material-ui standards define the use of primary, secondary, and default only.
    error: {
        '& .MuiButton-label':{
            color: theme.palette.error.main
        }
    },
    warning: {
        '& .MuiButton-label':{
            color: theme.palette.warning.main
        }
    },
    info: {
        '& .MuiButton-label':{
            color: theme.palette.info.main
        }
    },
    success: {
        '& .MuiButton-label':{
            color: theme.palette.success.main
        }
    }
}))

export default function ActionButton(props) {

    const{ color, children, onClick, ...other }=props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
            color={color}
            {...other}
        >
            {children}
        </Button>
    )
}