import React from 'react'
import {
    Card,
    CardContent,
    CardActions,
    CardActionArea,
    Typography,
    makeStyles,
    withStyles
} from '@material-ui/core'
import ActionButton from './ActionButton'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}))

const SpecialActionButton = withStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(ActionButton);

const StatusCard = (props) => {
    const { title, count, size, buttonColor, textColor, backgroundColor, children, raised, onClick} = props
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{ backgroundColor, color: textColor, height: 150 }}
            raised={raised || "true"}
        >
            <CardActionArea>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="h1">
                        {count}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <SpecialActionButton 
                    size={size || "small"}
                    color={buttonColor || 'white'}
                    onClick={onClick}
                >
                    {children}
                </SpecialActionButton>
            </CardActions>
        </Card>
    )
}

export default StatusCard