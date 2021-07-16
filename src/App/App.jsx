// React
import React, { useState, useEffect } from "react";

// Redux
// import { store } from "store";

// Styling
import clsx from "clsx";
import {
  AppBar,
  Badge,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SvgIcon,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

// Main Routing and Navigaion
import {
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  NavLink,
} from "react-router-dom";
import jwtDecode from "jwt-decode";

// import AppBar from '../components/AppBar/AppBar.js';
import BackgroundImage from "../assets/images/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg";
// Menu Control Icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
// Main Category Icons
import FileCopyIcon from "@material-ui/icons/FileCopy"; // MasterFiles
import BusinessIcon from "@material-ui/icons/Business"; // Company
import BarChartIcon from "@material-ui/icons/BarChart"; // Reports
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard"; // Dashboard
import LayersIcon from "@material-ui/icons/Layers"; // PA Views
// Company Icons
import { ReactComponent as PatientIcon } from "../assets/svg_icons/patient.svg"; // Patients
import { ReactComponent as ClinicIcon } from "../assets/svg_icons/clinic.svg"; // Clinics
import { ReactComponent as ProviderIcon } from "../assets/svg_icons/provider.svg"; // Providers
import PeopleIcon from "@material-ui/icons/People"; // Carriers (?)
// MasterFile Icons
import { ReactComponent as CPTIcon } from "../assets/svg_icons/cpt.svg"; // CPT Codes
import { ReactComponent as DiagIcon } from "../assets/svg_icons/diagnosis.svg"; // Diagnosis Codes
import { ReactComponent as NoteTypeIcon } from "../assets/svg_icons/note_types.svg"; // NoteType Codes
import { ReactComponent as POSIcon } from "../assets/svg_icons/placeOfService.svg"; // Place of Service Codes
import { ReactComponent as SpecialtyIcon } from "../assets/svg_icons/specialty.svg"; // Treatement-Therapy Codes
import { ReactComponent as StatusIcon } from "../assets/svg_icons/battery_status.svg"; // Status Codes
// Report Icon(s)
import AssignmentIcon from "@material-ui/icons/Assignment";

// Views for Routing
import Dashboard from "../components/Dashboard/Dashboard";
import CarrierTable from "../primaryComponents/Carriers/CarrierTable";
import ClinicTable from "../primaryComponents/Clinics/ClinicTable";
import PatientTable from "../primaryComponents/Patients/PatientTable";
import ProviderTable from "../primaryComponents/Providers/ProviderTable";

import CPTCodeTable from "../mfComponents/CPTCodes/CPTCodeTable";
import DiagCodeTable from "../mfComponents/DiagCodes/DiagCodeTable";
import PlaceOfServiceTable from "../mfComponents/PlaceOfService/PlaceOfServiceTable";
import NoteTypeTable from "../mfComponents/NoteTypes/NoteTypeTable";
import SpecialtyTable from "../mfComponents/Specialty/SpecialtyTable";
import StatusTable from "../mfComponents/Statuses/StatusTable";

// import Drawer from '../components/Drawer/Drawer';
import RegistrationSide from "../components/RegistrationSide/RegistrationSide";
import SignInSide from "../components/SignInSide/SignInSide.js";

import PAByStatus from "../priorAuthComponents/PriorAuths/PAByStatus";
import PAByCarrier from "../priorAuthComponents/PriorAuths/PAByCarrier";
import PAByProvider from "../priorAuthComponents/PriorAuths/PAByProvider";
import PATable from "../priorAuthComponents/PriorAuths/PATable";

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    type: "light",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paperContainer: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100vh",
  },
  fixedHeight: {
    height: 240,
  },
  menuIcon: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function App() {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [subMenuOpen1, setSubMenuOpen1] = useState(false);
  const [subMenuOpen2, setSubMenuOpen2] = useState(false);
  const [subMenuOpen3, setSubMenuOpen3] = useState(false);
  const [initialLogin, setInitialLogin] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClose = () => {
    localStorage.removeItem("token");
    window.location.href = "login";
  };

  const handleSubMenu1Click = () => {
    if (subMenuOpen2 === true) setSubMenuOpen2(false);
    if (subMenuOpen3 === true) setSubMenuOpen3(false);
    setSubMenuOpen1(!subMenuOpen1);
  };

  const handleSubMenu2Click = () => {
    if (subMenuOpen1 === true) setSubMenuOpen1(false);
    if (subMenuOpen3 === true) setSubMenuOpen3(false);
    setSubMenuOpen2(!subMenuOpen2);
  };

  const handleSubMenu3Click = () => {
    if (subMenuOpen1 === true) setSubMenuOpen1(false);
    if (subMenuOpen2 === true) setSubMenuOpen2(false);
    setSubMenuOpen3(!subMenuOpen3);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    try {
      setUser(jwtDecode(jwt));
      setInitialLogin(false);
      setOpen(true);
    } catch (e) {
      setInitialLogin(true);
      setOpen(false);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            {initialLogin === false && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Prior Authorization Tracker
            </Typography>

            {initialLogin === false && (
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

            {initialLogin === false && (
              <IconButton color="inherit" onClick={handleMenuClose}>
                <PowerSettingsNewIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {/* Drawer */}
        {initialLogin === false && (
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <List>
                <ListItem>
                  <ListItemText primary="Navigation" />
                </ListItem>
              </List>
              <IconButton
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open && <ChevronLeftIcon />}
                {!open && <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {/* Main List Items */}
              <div>
                <ListItem button component={RouterLink} to={"dashboard"}>
                  <ListItemIcon className={classes.menuIcon}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem button component={RouterLink} to={"priorAuth"}>
                  <ListItemIcon className={classes.menuIcon}>
                    <LayersIcon />
                  </ListItemIcon>
                  <ListItemText primary="Prior Authorizations" />
                </ListItem>

                <ListItem button component={RouterLink} to={"carrier"}>
                  <ListItemIcon className={classes.menuIcon}>
                    <SvgIcon>
                      <PeopleIcon />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText primary="Carriers" />
                </ListItem>

                <ListItem button onClick={handleSubMenu1Click}>
                  <ListItemIcon className={classes.menuIcon}>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Company" />
                  {subMenuOpen1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={subMenuOpen1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      className={classes.nested}
                      component={RouterLink}
                      to={"clinic"}
                    >
                      <ListItemIcon className={classes.menuIcon}>
                        <SvgIcon>
                          <ClinicIcon />
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText primary="Clinics" />
                    </ListItem>

                    <ListItem
                      button
                      className={classes.nested}
                      component={RouterLink}
                      to={"patient"}
                    >
                      <ListItemIcon className={classes.menuIcon}>
                        <SvgIcon>
                          <PatientIcon />
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText primary="Patients" />
                    </ListItem>

                    <ListItem
                      button
                      className={classes.nested}
                      component={RouterLink}
                      to={"provider"}
                    >
                      <ListItemIcon className={classes.menuIcon}>
                        <SvgIcon>
                          <ProviderIcon />
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText primary="Providers" />
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem button onClick={handleSubMenu2Click}>
                  <ListItemIcon className={classes.menuIcon}>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText primary="MasterFiles" />
                  {subMenuOpen2 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={subMenuOpen2} timeout="auto" unmountOnExit>
                  <ListItem
                    button
                    className={classes.nested}
                    component={RouterLink}
                    to={"cptCode"}
                  >
                    <ListItemIcon className={classes.menuIcon}>
                      <SvgIcon>
                        <CPTIcon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="CPT Codes" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={RouterLink}
                    to={"diagnosisCode"}
                  >
                    <ListItemIcon className={classes.menuIcon}>
                      <SvgIcon>
                        <DiagIcon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Diagnosis Codes" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={RouterLink}
                    to={"noteType"}
                  >
                    <ListItemIcon className={classes.menuIcon}>
                      <SvgIcon>
                        <NoteTypeIcon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Note Types" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={RouterLink}
                    to={"placeofservice"}
                  >
                    <ListItemIcon className={classes.menuIcon}>
                      <SvgIcon>
                        <POSIcon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Places Of Service" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={RouterLink}
                    to={"treatment"}
                  >
                    <ListItemIcon className={classes.menuIcon}>
                      <SvgIcon>
                        <SpecialtyIcon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Specialties" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={RouterLink}
                    to={"status"}
                  >
                    <ListItemIcon className={classes.menuIcon}>
                      <SvgIcon>
                        <StatusIcon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Statuses" />
                  </ListItem>
                </Collapse>

                <ListItem button onClick={handleSubMenu3Click}>
                  <ListItemIcon className={classes.menuIcon}>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reports" />
                  {subMenuOpen3 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={subMenuOpen3} timeout="auto" unmountOnExit>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon className={classes.menuIcon}>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="By Provider" />
                  </ListItem>

                  <ListItem button className={classes.nested}>
                    <ListItemIcon className={classes.menuIcon}>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="By Carrier" />
                  </ListItem>

                  <ListItem button className={classes.nested}>
                    <ListItemIcon className={classes.menuIcon}>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="By Status" />
                  </ListItem>
                </Collapse>
              </div>
            </List>
            <Divider />
          </Drawer>
        )}
        {/* Main Render */}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Paper className={classes.paperContainer}>
            <Switch>
              <Route
                path="/profile"
                render={(props) => {
                  if (!user) {
                    return <Redirect to="/login" />;
                  } else {
                    return;
                    // return <Profile {...props} user={user} />
                  }
                }}
              />
              <Route
                exact={true}
                path="/registration"
                component={RegistrationSide}
              />
              <Route path="/drawer" component={Drawer} />

              <Route path="/priorAuthStatus" component={PAByStatus} />
              <Route path="/priorAuthProvider" component={PAByProvider} />
              <Route path="/priorAuthCarrier" component={PAByCarrier} />
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
              <Route path="/dashboard" component={Dashboard} />

              <SignInSide />
            </Switch>

            {/* <Footer /> */}
          </Paper>
        </main>
      </div>
    </ThemeProvider>
  );
}

// *** Use the following to access Redux state
// const mapStateToProps = (State => {
//   return { users: state.users }
// })

// const mapDispatchToprops = {
//   updateUSer
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App)
