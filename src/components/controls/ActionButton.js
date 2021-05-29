import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    primary: {
        backgroundColor: theme.pallete.primary.light,
        '& .MuiButton-label':{
            color: theme.pallete.primary.main
        }
    },
    secondary: {
        backgroundColor: theme.pallete.secondary.light,
        '& .MuiButton-label':{
            color: theme.pallete.secondary.main
        }
    },
    error: {
        backgroundColor: theme.pallete.error.light,
        '& .MuiButton-label':{
            color: theme.pallete.error.main
        }
    },
    warning: {
        backgroundColor: theme.pallete.warning.light,
        '& .MuiButton-label':{
            color: theme.pallete.warning.main
        }
    },
    info: {
        backgroundColor: theme.pallete.info.light,
        '& .MuiButton-label':{
            color: theme.pallete.info.main
        }
    },
    success: {
        backgroundColor: theme.pallete.success.light,
        '& .MuiButton-label':{
            color: theme.pallete.success.main
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
        >
            {children}
        </Button>
    )
}