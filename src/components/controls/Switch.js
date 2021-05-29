import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Switch as MuiSwitch}  from '@material-ui/core/Switch';
import { SwitchStyle } from './Switch.style';

const Switch = (props) => {
  const { name, label, value, error=null, onChange, other } = props
  const [toggled, setToggled] = React.useState(false);
  const switchStyles = SwitchStyle();
  return (
    <FormControlLabel
        control={
            <MuiSwitch
                name={name}
                color="primary"
                classes={switchStyles}
                checked={toggled}
                value={value}
                onChange={e => setToggled(e.target.checked)}
                {...other}
            />
        }
        label={label}
    />
  );
};

export default Switch;
