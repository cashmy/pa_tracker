import React from 'react'
import clsx from 'clsx';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Control from '../controls/Controls';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
  root: {
        flexGrow: 1,
    },
    container: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(4),
        justifyContent: 'center',
        display: 'flex',
        overflow: 'auto'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    crossfoottable: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5)
    }
}));


export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, classes.crossfoottable);

    return (
        <>
            {/* *** Status Cards *** */}
            <Grid container className={classes.root} spacing={3}>
                <Grid container className={classes.container} spacing={10}>
                    {/* Card 1 */}
                    <Grid item xs={3}>
                        <Control.StatusCard
                            title="Expired"
                            count="26"
                            size="large"
                            backgroundColor="red"
                            textColor="white"
                            buttonColor="default"
                            // onClick={handleOnClickRouting}
                            children={<EditIcon />}
                        />
                     </Grid>
                    <Grid item xs={3} >
                        <Control.StatusCard
                            title="Working"
                            count="14"
                            size="large"
                            backgroundColor="yellow"
                            textColor="black"
                            buttonColor="default"
                            // onClick={handleOnClickRouting}
                            children={<EditIcon />}
                            />
                    </Grid>
                    <Grid item xs={3} >
                        <Control.StatusCard
                            title="Approved"
                            count="25"
                            size="large"
                            backgroundColor="Green"
                            textColor="White"
                            buttonColor="default"
                            // onClick={handleOnClickRouting}
                            children={<EditIcon />}
                            />
                </Grid>
                </Grid>
                <Grid container className={classes.container} spacing={10}>
                    <Grid item xs={3} >
                        <Control.StatusCard
                            title="Pending"
                            count="10"
                            size="large"
                            backgroundColor="Purple"
                            textColor="White"
                            buttonColor="default"
                            // onClick={handleOnClickRouting}
                            children={<EditIcon />}
                            />
                    </Grid>
                    <Grid item xs={3} >
                        <Control.StatusCard
                            title="Waiting on Docs"
                            count="10"
                            size="large"
                            backgroundColor="Blue"
                            textColor="White"
                            buttonColor="default"
                            // onClick={handleOnClickRouting}
                            children={<EditIcon />}
                            />
                    </Grid>
                </Grid>
            </Grid>

            {/* *** Provider Summary Table *** */}
            <Grid container className={classes.container} spacing={3}>
                <Grid item xs={6}>
                    <Paper className={fixedHeightPaper}>
                        Provider Table goes here
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={fixedHeightPaper}>
                        Carrier Table goes here
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}