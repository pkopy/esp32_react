import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
    container: {
        // display: 'flex',
        // width: '900px',
        // flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto',
        // marginTop: '100px',
        // marginBottom: '100px'
    },
    textField: {
        marginLeft: theme.spacing(2),
        // marginRight: theme.spacing(2),
        width: 200,
    },
    dense: {
        marginTop: 19,
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
        // borderColor: 'rgb(0,0,255,0.25)',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70%',
        marginTop: 30,
        marginBottom: 30 
    }
}));

const operators = [
    {
        value: 'JK1',
        label: 'Jan Kowalski',
    },
    {
        value: 'JN',
        label: 'Jan Nowak',
    },
    {
        value: 'ZH',
        label: 'Zbigniew Habadzibadło',
    },
    {
        value: 'OK',
        label: 'Okiro Kurosawa',
    },
];

const scales = [
    {
        value: 'ESP1',
        label: 'ESP1',
    },
    {
        value: 'ESP2',
        label: 'ESP2',
    }
    
];

export default function TextFields() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        base: '',
        min:'',
        max:'',
        operator: '',
        treshold: '',
        quantity: '',
        scale:''
    });
    const [errors, setError] = React.useState({
        name: false,
        base: false,
        min: false,
        max: false,
        operator: false,
        treshold: false,
        quantity: false,
        scale: false,
        errors: false
    })
    const [open, setOpen] = React.useState(false);
    const [keys, setKeys] = React.useState()
    const handleChange = name => event => {
        // console.log(event.target)
        setValues({ ...values, [name]: event.target.value });
    };

    const  send = () => {
        const valuesKeys = Object.keys(values)
        setKeys(valuesKeys)
        const err = {}
        setError(err)
        
        for (let value of valuesKeys) {
            if (values[value] === '' || values[value] <= 0) {
                err[value] = true
                err.errors = true
            } else {
                err[value] = false 
            }
        }
        if ( err.errors ) {
            setError(err)
            setOpen(true)
        } else {
            setOpen(true)
            
        }
        
        // err.errors = false
        // console.log(values)
    } 

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <div>


            <h1>Podaj szczegóły zlecenia</h1>
            <div className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="name"
                    label="Twoja nazwa"
                    error={errors.name}
                    className={classes.textField}

                    onChange={handleChange('name')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                
                <TextField
                    id="operator"
                    select
                    error={errors.operator}
                    label="Operator"
                    className={classes.textField}
                    value={values.operator}
                    onChange={handleChange('operator')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    // helperText="Wybierz operatora"
                    margin="normal"
                    variant="outlined"
                >
                    {operators.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}

                </TextField>
                <TextField
                    id="scale"
                    select
                    error={errors.scale}
                    label="Waga"
                    className={classes.textField}
                    value={values.scale}
                    onChange={handleChange('scale')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    // helperText="Wybierz operatora"
                    margin="normal"
                    variant="outlined"
                >
                    {scales.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}

                </TextField>
                <div className={classes.hr} style={{width:'50%'}}/>
            </div>
            <div className={classes.container} noValidate autoComplete="off">
                

                    
                
                <TextField
                    id="base"
                    label="Podstwa"
                    // onChange={handleChange('age')}
                    error={errors.base}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange('base')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">g</InputAdornment>,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="max"
                    label="Max"
                    error={errors.max}
                    onChange={handleChange('max')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">g</InputAdornment>,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="min"
                    label="Min"
                    error={errors.min}
                    onChange={handleChange('min')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">g</InputAdornment>,
                    }}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="treshold"
                    label="Próg LO"
                    error={errors.treshold}
                    onChange={handleChange('treshold')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">g</InputAdornment>,
                    }}
                    margin="normal"
                    variant="outlined"
                />


                <TextField
                    id="quantity"
                    label="Ilość ważeń"
                    error={errors.quantity}
                    onChange={handleChange('quantity')}
                    type="number"
                    min="0"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                

            </div>
            <div className={classes.hr}/>
            <Button className={classes.button} variant="outlined" color="primary" onClick={send}> Wyślij zlecenie</Button>
            <Button className={classes.button} variant="outlined" color="primary"> Zapisz zlecenie</Button>
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Wysyłanie zlecenia</DialogTitle>
                <DialogContent>
                {!errors.errors&&<DialogContentText id="alert-dialog-description">
                    Zamierzasz wysłać następujące zlecenie do wagi: {values.scale} <br/>
                    Operator: {values.operator}<br/>
                    Podstawa: {values.base}<br/>
                    Ilość ważeń: {values.quantity}

                </DialogContentText>}
                {errors.errors&&<DialogContentText id="alert-dialog-description">
                    Znaleziono błędy w formularzu: <br/>
                    
                        {errors.name&&<li>Twoja nazwa</li>}
                        {errors.operator&&<li>Operator</li>}
                        {errors.scale&&<li>Waga</li>}
                        {errors.base&&<li>Podstawa</li>}
                        {errors.max&&<li>Max</li>}
                        {errors.min&&<li>Min</li>}
                        {errors.treshold&&<li>Próg LO</li>}
                        {errors.quantity&&<li>Ilość ważeń</li>}
                    
                    {/* Operator: {values.operator}<br/>
                    Podstawa: {values.base}<br/>
                    Ilość ważeń: {values.quantity} */}

                </DialogContentText>}
                </DialogContent>
                <DialogActions>
                <Button  onClick={closeDialog} color="primary">
                    {errors.errors?<span>Popraw</span>:<span>Zamknij</span>}
                </Button>
                <Button  color="primary" autoFocus disabled={errors.errors}>
                    Wyślij
                </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
