import React, { Component } from 'react';
// import { useSelector } from 'react-redux'; // for function components
// import { connect } from 'react-redux'; // for class based components

import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode  from "jwt-decode";
import { CssBaseline, Paper } from '@material-ui/core';
// import AppBar from '../components/AppBar/AppBar.js';
import BackgroundImage  from '../assets/images/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg';

// Views for Routing
import CarrierTable from '../primaryComponents/Carriers/CarrierTable';
import ClinicTable from '../primaryComponents/Clinics/ClinicTable';
import PatientTable from '../primaryComponents/Patients/PatientTable'
import ProviderTable from '../primaryComponents/Providers/ProviderTable';

import CPTCodeTable from '../mfComponents/CPTCodes/CPTCodeTable'; 
import DiagCodeTable from '../mfComponents/DiagCodes/DiagCodeTable'; 
import PlaceOfServiceTable from '../mfComponents/PlaceOfService/PlaceOfServiceTable';
import NoteTypeTable from '../mfComponents/NoteTypes/NoteTypeTable'; 
import SpecialtyTable from '../mfComponents/Specialty/SpecialtyTable';
import StatusTable from '../mfComponents/Statuses/StatusTable'; 

import Drawer from '../components/Drawer/Drawer';
import RegistrationSide from "../components/RegistrationSide/RegistrationSide";
import SignInSide from '../components/SignInSide/SignInSide.js';

import PAByStatus from '../priorAuthComponents/PriorAuths/PAByStatus'
import PATable from '../priorAuthComponents/PriorAuths/PATable'

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

          <Route path="/priorAuth/status:1" component={PAByStatus} />
          <Route path="/priorAuth/" component={PATable} />
          <Route path="/carrier" component={CarrierTable} />
          <Route path="/clinic" component={ClinicTable} />
          <Route path="/patient" component={PatientTable} />
          <Route path="/provider" component={ProviderTable} />

          <Route path="/cptCode" component={CPTCodeTable} />
          <Route path="/diagnosisCode" component={DiagCodeTable} />
          <Route path="/noteType" component={NoteTypeTable} />
          <Route path="/placeofservice" component={PlaceOfServiceTable} />
          <Route path="/status" component={StatusTable} />
          <Route path="/treatment" component={SpecialtyTable} />
          
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
