import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Switch as MuiSwitch}  from '@material-ui/core/Switch';
import { SwitchStyle } from './Switch.style';

const Switch = (props) => {
  const { name, label, value, error=null, onChange, other } = props
  
  // const [toggled, setToggled] = React.useState(false);
  
  const switchStyles = SwitchStyle();
  
  
  // Converts the "Checked" value to the Default Event parameter alleviating an error message
    const convertToDefEventParam = (name, value) => ({
      target: {
          name, value
      }
  })
  
  return (
    <FormControlLabel
        control={
            <MuiSwitch
                name={name}
                color="primary"
                classes={switchStyles}
                checked={toggled}
                value={value}
                // onChange={e => setToggled(e.target.checked)}
                onChange = {e => onChange(convertToDefEventParam(name, e.target.checked))}
                {...other}
            />
        }
        label={label}
    />
  );
};

export default Switch;
