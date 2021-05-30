import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label':{
            color: theme.palette.primary.main
        }
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label':{
            color: theme.palette.secondary.main
        }
    },
    error: {
        backgroundColor: theme.palette.error.light,
        '& .MuiButton-label':{
            color: theme.palette.error.main
        }
    },
    warning: {
        backgroundColor: theme.palette.warning.light,
        '& .MuiButton-label':{
            color: theme.palette.warning.main
        }
    },
    info: {
        backgroundColor: theme.palette.info.light,
        '& .MuiButton-label':{
            color: theme.palette.info.main
        }
    },
    success: {
        backgroundColor: theme.palette.success.light,
        '& .MuiButton-label':{
            color: theme.palette.success.main
        }
    }
}))

export default function ActionButton(props) {

    const{ color, children, onClick }=props;
    const classes = useStyles();

    return (
        <Button
            classes={`${classes.root} ${classes[color]}`}
            onClick={onClick}
            color={color}
        >
            {children}
        </Button>
    )
}