import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SvgIcon from "@material-ui/core/SvgIcon";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    pageHeader: {
        padding: theme.spacing(1),
        display: 'flex',
        marginBottom: theme.spacing(1),
      },
      pageIcon: {
        display: 'inline-block',
        padding: theme.spacing(2),
        color: theme.palette.primary.main,
      },
      pageTitle: {
          paddingLeft: theme.spacing(4),
          '& .MuiTypography-subtitle2': {
              opacity: '0.6'
          }
    }
}));

export default function PageHeaderBgClr(props) {
    
    const {title, subtitle, icon, fontSize, isSvg=false, color, backgroundColor} = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3} style={{ backgroundColor, color }}>
                <Grid container className={classes.pageHeader} >
                        {/* <Grid item className={classes.pageIcon}>
                            {icon}
                        </Grid> */}
                        <Grid item className={classes.pageIcon}>
                        {isSvg 
                            ? <SvgIcon fontSize={fontSize || "large"} >
                                {icon}
                              </SvgIcon>

                            : {icon}

                        }
                        </Grid>
                        <Grid item className={classes.pageTitle}>
                            <Typography variant="h6" >
                                {title}
                            </Typography>
                            <Typography variant="subtitle2" >
                                {subtitle}
                            </Typography>
                        </Grid>
                </Grid>
            </Paper>
        </div>
    )
}