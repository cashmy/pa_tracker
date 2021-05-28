import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/images/wallpapersden.com_star-wars-skywalker-saga_3840x2400.jpg';
import serviceLayer from '../../Services/serviceLayer';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    isSupplier: false,
    currencyCode: "USD"
  });

  async function handleSubmit(event){
    event.preventDefault();
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      email: user.email,
      phoneNumber: user.phoneNumber,
      currencyCode: user.currencyCode,
      isSupplier: user.isSupplier,
    }
    try{
      const response = await serviceLayer.registerUser(data);
      console.log(response);
      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber,
        currencyCode: data.currencyCode,
        isSupplier: data.isSupplier,
      });

      if(response.data.token !== null){
        window.location.href='/login';
      }
    } catch(ex){
      console.log('Error in API call', ex.response.data);
    }

    

  }

  const onChangePhoneNumber = (e) => {
    setUser({
      ...user, phoneNumber: e.target.value
    })
  }

  const onChangeFirstName = (e) => {
    setUser({
      ...user, firstName: e.target.value
    })
  }

  const onChangeLastName = (e) => {
    setUser({
      ...user, lastName: e.target.value
    })
  }

  const onChangeEmail = (e) => {
    setUser({
      ...user, email: e.target.value
    })
  }

  const onChangeUsername = (e) => {
    setUser({
      ...user, username: e.target.value
    })
  }

  const onChangePassword = (e) => {
    setUser({
      ...user, password: e.target.value
    })
  }
  
  const onChangeCurrencyCode = (e) => {
    setUser({
      ...user, currencyCode: e.target.value
    })
  }

  const onChangeIsSupplier = (e) => {
    setUser({
      ...user, isSupplier: e.target.checked
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container  spacing={2} className={classes.grid}>
              <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    value={user.firstName}
                    onChange={onChangeFirstName}
                    autoComplete="fname"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    value={user.lastName}
                    onChange={onChangeLastName}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="UserName"
                    name="userName"
                    value={user.userName}
                    onChange={onChangeUsername}
                    autoComplete="userName"
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={onChangePassword}
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={onChangeEmail}
                    autoComplete="email"
                  />
                  </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    id="phoneNumber"
                    value={user.phoneNumber}
                    onChange={onChangePhoneNumber}
                    autoComplete="phoneNumber"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="currencyCode"
                    label="Currency"
                    id="currencyCode"
                    value={user.currencyCode}
                    onChange={onChangeCurrencyCode}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    value="top"
                    control ={
                      <Checkbox
                        style={{marginTop: '16'}}
                        name="isSupplier"
                        id="isSupplier"
                        checked={user.isSupplier}
                        onChange={onChangeIsSupplier}
                      />
                    } 
                    label="Supplier"
                    labelPlacement="top"
                  />
                </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={''} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}