import React, { Component } from 'react';
// import { useSelector } from 'react-redux'; // for function components
// import { connect } from 'react-redux'; // for class based components

import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode  from "jwt-decode";
import { CssBaseline, Paper } from '@material-ui/core';
// import AppBar from '../components/AppBar/AppBar.js';
import BackgroundImage  from '../assets/images/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg';

// Views for Routing
import ClinicTable from '../primaryComponents/Clinics/ClinicTable';
import PatientFormFull from '../primaryComponents/Patients/PatientFormFull'
import ProviderTable from '../primaryComponents/Providers/ProviderTable'; 
import StatusTable from '../mfComponents/Statuses/StatusTable'; 
import CPTCodeTable from '../mfComponents/CPTCodes/CPTCodeTable'; 
import PlaceOfServiceTable from '../mfComponents/PlaceOfService/PlaceOfServiceTable';

import Drawer from '../components/Drawer/Drawer';
import RegistrationSide from "../components/RegistrationSide/RegistrationSide";
import SignInSide from '../components/SignInSide/SignInSide.js';

const styles = {
  paperContainer: {
    backgroundImage: `url(${BackgroundImage})`, 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100vh"
  }
};

class App extends Component {
  state = {}

  componentDidMount() {
    const jwt = localStorage.getItem('token')
    try{
      const user = jwtDecode(jwt);
      this.setState({user: user})
    } catch {}
  }

  render() {
    const user = this.state.user;

    return (
      <Paper style={styles.paperContainer} >
        <CssBaseline />
        {/* <AppBar user={user} /> */}
        <Switch>
          <Route path="/profile" render = { props => {
              if (!user){
                return <Redirect to="/login" />
              } else {
                return
                // return <Profile {...props} user={user} />
              }
            }}
          />
          <Route exact={true} path="/registration" component={RegistrationSide}/> 
          <Route path="/drawer" component={Drawer} />
          <Route path="/clinic" component={ClinicTable} />
          <Route path="/patient/full" component={PatientFormFull} />
          <Route path="/provider" component={ProviderTable} />
          <Route path="/status" component={StatusTable} />
          <Route path="/cptCode" component={CPTCodeTable} />
          <Route path="/placeofservice" component={PlaceOfServiceTable} />
          
          <SignInSide />
        </Switch>
        {/* <Footer /> */}
      </Paper>
    );
  }
}

// *** Use the following to access Redux state
// const mapStateToProps = (State => {
//   return { users: state.users }
// })

// const mapDispatchToprops = {
//   updateUSer
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
