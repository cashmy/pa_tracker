import React from 'react';
// import Collapse from '@material-ui/core/Collapse';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
// Main Category Icons
// import FileCopyIcon from '@material-ui/icons/FileCopy'; // MasterFiles
// import BusinessIcon from '@material-ui/icons/Business'; // Company
import BarChartIcon from '@material-ui/icons/BarChart'; // Reports
import DashboardIcon from '@material-ui/icons/Dashboard'; // Dashboard
import LayersIcon from '@material-ui/icons/Layers'; // PA Views

// Temporary Icons
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';

// Company Icons
import { ReactComponent as PatientIcon } from '../../assets/svg_icons/patient.svg'; // Patients
import { ReactComponent as ClinicIcon } from '../../assets/svg_icons/clinic.svg'; // Clinics
import { ReactComponent as ProviderIcon } from '../../assets/svg_icons/provider.svg'; // Providers
import PeopleIcon from '@material-ui/icons/People'; // Carriers (?)

// MasterFile Icons
import { ReactComponent as CPTIcon } from '../../assets/svg_icons/cpt.svg'; // CPT Codes
import { ReactComponent as DiagIcon } from '../../assets/svg_icons/diagnosis.svg'; // Diagnosis Codes
import { ReactComponent as NoteTypeIcon } from '../../assets/svg_icons/note_types.svg'; // NoteType Codes
import { ReactComponent as POSIcon } from '../../assets/svg_icons/placeOfService.svg'; // Place of Service Codes
import { ReactComponent as SpecialtyIcon } from '../../assets/svg_icons/specialty.svg'; // Treatement-Therapy Codes
import { ReactComponent as StatusIcon } from '../../assets/svg_icons/battery_status.svg'; // Status Codes

// Report Icon(s)
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

  <Link component={RouterLink} to={'priorAuth'}> 
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Prior Authorizations" />
    </ListItem>
  </Link>

    
    <Link component={RouterLink} to={'carrier'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <PeopleIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Carriers" />
      </ListItem>
    </Link>

    <ListSubheader inset>Company</ListSubheader>
    {/* <ListItem button>
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Company" />
    </ListItem> */}

      {/* <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse> */}

    <Link component={RouterLink} to={'clinic'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <ClinicIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Clinics" />
      </ListItem>
    </Link>

    <Link component={RouterLink} to={'patient/full'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <PatientIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Patients" />
      </ListItem>
    </Link>
    
    <Link component={RouterLink} to={'provider'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <ProviderIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Providers" />
      </ListItem>
    </Link>

    <ListSubheader inset>Master Files</ListSubheader>
      {/* <ListItem button>
        <ListItemIcon>
          <FileCopyIcon />
        </ListItemIcon>
        <ListItemText primary="Master Files" />
      </ListItem> */}
    
    <Link component={RouterLink} to={'cptCode'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <CPTIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="CPT Codes" />
      </ListItem>
    </Link>
    
    <Link component={RouterLink} to={'diagnosisCode'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <DiagIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Diagnosis Codes" />
      </ListItem>
    </Link>
    
    <Link component={RouterLink} to={'noteType'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <NoteTypeIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Note Types" />
      </ListItem>
    </Link>

    <Link component={RouterLink} to={'placeofservice'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <POSIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Places Of Service" />
      </ListItem>
    </Link>

    <Link component={RouterLink} to={'treatment'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <SpecialtyIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Specialties" />
      </ListItem>
    </Link>

    <Link component={RouterLink} to={'status'}>
      <ListItem button>
          <ListItemIcon>
            <SvgIcon>
              <StatusIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Statuses" />
      </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Common PA Reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="By Provider" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="By Carrier" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="By Status" />
    </ListItem>
  </div>
);