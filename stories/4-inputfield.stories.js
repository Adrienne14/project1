import React from 'react'
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, FormLabel, makeStyles, FormControlLabel, FormControl, RadioGroup, Radio } from "@material-ui/core";
//import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from "prop-types";
import clsx from 'clsx'
import { red } from '@material-ui/core/colors';

export default {
    title: 'Fields'
}

const useStyle = makeStyles(theme => ({
  InputField: {
    margin: theme.spacing(1),
    flex: 6
  },
  tiny: {
    flex: 2
  },
  short: {
    flex: 2,
  },
  medium: {
    flex: 3
  }
}));



const FIELDS = [
  ["Patient's Name", "Gender"],
  ["Birthday","Age","Height", "Weight"],
  ["House No.", "Street", "City"],
  ["Mother's Name", "Mother's Occupation"],
  ["Father's Name", "Father's Occupation"]
];

function Reducer(state, action){
    switch(action.type){
        case 'INPUT':
            return action.data !== ''? (state = {...state, [action.label]:false}):(
            state = {...state, [action.label]:true})
        default:
            return state
    
        }
}

const InputField = props => {
  const classes = useStyle();
  const [state, DISPATCH] = React.useReducer(Reducer, [])
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };
  React.useEffect(() => console.log(state), [state])

  return (
    <div>
      {props.fields.map(group => (
        <div key={group} style={{ display: "flex" }}>
          {group.map(name => name !== 'Gender'?(
            <TextField
              key={name}
              name={name}
              className={clsx(classes.InputField, {[classes.tiny]: name === 'Age' || 
              name==='House No.',  
              [classes.medium]: name === 'Height' || 
              name === 'Weight',
              [classes.small]: name === 'Birthday'
            })}
              autoFocus
              margin="dense"
              label={name}
              InputLabelProps={{
                shrink: true
              }}
              type={name === "Birthday" ? "date" : (name === "Age" || name === "Height" || name === 'Weight' ? "number":"text")}
              fullWidth
              variant="outlined"
              error={state[`${name}`]}
              onChange={event => DISPATCH({data: event.target.value, label: event.target.name, type: 'INPUT'})}
              helperText={state[`${name}`] && 'This field is required *'}
            />
          ): (
          <React.Fragment>
            <RadioGroup>
            <FormLabel style={{fontSize: '13px', marginLeft: '21px'}}>{name}</FormLabel>
              <div className={classes.short} style={{display: 'flex', marginLeft: '8px'}}>
              <FormControlLabel value="female" control={<Radio color="primary"  />} label="Female" />
              <FormControlLabel value="male" control={<Radio color="primary"  />} label="Male" />
              <FormControlLabel value="others" control={<Radio color="primary" />} label="Others" />
              </div>
            </RadioGroup>
          </React.Fragment>
          )
          )}
        </div>
      ))}
    </div>
  );
};
InputField.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export const SampleFields = () => {
    return <InputField fields={FIELDS} />
}