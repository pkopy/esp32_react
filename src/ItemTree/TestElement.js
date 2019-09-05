import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    container: {
        marginLeft: '20px',
        textAlign: 'left',
        marginTop: '20px'
    },
    textField: {
        width:350,
        padding: theme.spacing(3, 2),
        marginLeft: '5px',
        marginRight: '10px',
        boxShadow: '0 0 0 0',
        border: '1px solid rgb(109,109,109,0.25)',
        height: 150
        
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
    hr: {
        borderTop: '1px solid rgb(0,0,0,0.25)',
        width: '70%',
        marginTop: 30,
        marginBottom: 30
    }
}));


export default (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <TextField
                id="testElement"
                select
                label="Typ elementu testowego"
                // error={errors.name}
                className={ classes.dense}
                // value={values.name}
                // onChange={handleChange('name')}
                margin='dense'
                InputLabelProps={{
                    shrink: true,
                }}
                
                variant="outlined"
            />
            <TextField
                id="name"
                label="Nazwa"
                // error={errors.name}
                className={ classes.dense}
                // value={values.name}
                // onChange={handleChange('name')}
                margin='dense'
                InputLabelProps={{
                    shrink: true,
                }}
                
                variant="outlined"
            />
            <div className={classes.hr}  />
                <Paper
                    className={classes.textField}
                >
                    <div style={{position:'relative'}}>
                        <div style={{position: 'absolute',
                                    top: '-47px',
                                    color: 'rgb(109,109,109, 0.9)',
                                    fontSize: 'small',
                                    backgroundColor: '#fff'}}>
                            <p style={{padding: '0 3px'}}>Rozmiar próby losowej</p>
                        </div>

                    </div>
                </Paper>
        </div>


    )
}