import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
    container: {
        marginLeft: '20px',
        textAlign: 'left',
        marginTop: '20px'
    },
    textField: {
        width: 350,
        padding: theme.spacing(3, 2),
        marginLeft: theme.spacing(2),
        marginRight: '10px',
        boxShadow: '0 0 0 0',
        border: '1px solid rgb(109,109,109,0.25)',
        height: 100,
        // display:'flex'

    },
    dense: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: 19,
        width: 200
    },
    menu: {
        width: 200,
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    text1: {
        width:50,
        left: 250,
        top: -60
    },
    hr: {
        borderTop: '1px solid rgb(0,0,0,0.25)',
        width: '70%',
        marginTop: 30,
        marginBottom: 30
    },

}));


export default (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('free');

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <div className={classes.container}>
            <div className={classes.hr} />
            <TextField
                id="name"
                // select
                label="Nazwa"
                // error={errors.name}
                className={classes.dense}
                value={props.group.name}
                // onChange={handleChange('name')}
                margin='dense'
                InputLabelProps={{
                    shrink: true,
                }}

                variant="outlined"
            />
            <TextField
                id="base"
                label="Podstwa"
                // error={errors.name}
                type="number"
                className={classes.dense}
                value={props.group.base}
                // onChange={handleChange('name')}
                margin='dense'
                InputLabelProps={{
                    shrink: true,
                }}

                variant="outlined"
            />
            <TextField
                id="min"
                label="Min"
                // error={errors.name}
                type="number"
                className={classes.dense}
                value={props.group.min}
                // value={values.name}
                // onChange={handleChange('name')}
                margin='dense'
                InputLabelProps={{
                    shrink: true,
                }}

                variant="outlined"
            />
            <TextField
                id="max"
                label="Max"
                // error={errors.name}
                type="number"
                className={classes.dense}
                value={props.group.max}
                // value={values.name}
                // onChange={handleChange('name')}
                margin='dense'
                InputLabelProps={{
                    shrink: true,
                }}

                variant="outlined"
            />
            <TextField
                id="treshold"
                label="Próg LO"
                // error={errors.name}
                type="number"
                className={classes.dense}
                value={props.group.treshold}
                // value={values.name}
                // onChange={handleChange('name')}
                margin='dense'
                InputLabelProps={{
                    shrink: true,
                }}

                variant="outlined"
            />
            <div className={classes.hr} />
            {/* <Paper
                className={classes.textField}
            >
                <div style={{ position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '-47px',
                        color: 'rgb(109,109,109, 0.9)',
                        fontSize: 'small',
                        backgroundColor: '#fff'
                    }}>
                        <p style={{ padding: '0 3px' }}>Rozmiar próby losowej</p>
                    </div>
                </div>
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    className={classes.group}
                    row
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="free" control={<Radio color="primary" />} label="Wolne" />
                    <FormControlLabel value="steady" control={<Radio color="primary" />} label="Stały" />

                </RadioGroup>
                <TextField
                    id="base"
                    // label="Podstwa"
                    // value={values.base}
                    // error={errors.base}
                    type="number"
                    
                    className={classes.text1}
                    InputLabelProps={{
                        shrink: false,
                    }}
                    // onChange={handleChange('base')}
                    InputProps={{
                        // startAdornment: <InputAdornment position="start">g</InputAdornment>,
                    }}
                    margin="normal"
                    // variant="outlined"
                />
            </Paper> */}
        </div>


    )
}