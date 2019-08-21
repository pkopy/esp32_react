import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '200px',
        marginTop: '100px',
        marginBottom: '100px'
    },
    textField: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        marginTop: '100px',
    },
}));

const operators = [
    {
        value: 'JK1',
        label: 'Jan Kowalski',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

export default function TextFields() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        base: '',
        multiline: 'Controlled',
        operator: '',
    });

    const handleChange = name => event => {
        // console.log(event.target.value)
        setValues({ ...values, [name]: event.target.value });
    };

    const  send = () => {
        console.log(values)
    } 

    return (
        <div>


            <h1>Podaj szczegóły zlecenia</h1>
            <form className={classes.container} noValidate autoComplete="off">
                <div>

                    <TextField
                        id="name"
                        label="Twoja nazwa"
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
                        helperText="Wybierz operatora"
                        margin="normal"
                        variant="outlined"
                    >
                        {operators.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}

                    </TextField>
                </div>
                <p></p>
                <TextField
                    id="base"
                    label="Podstwa"
                    // onChange={handleChange('age')}
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
                    id="standard-number"
                    label="Max"
                    // onChange={handleChange('age')}
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
                    id="standard-number"
                    label="Min"
                    // onChange={handleChange('age')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="end">g</InputAdornment>,
                    }}
                    margin="normal"
                    variant="outlined"
                />




                <TextField
                    id="standard-number"
                    label="Ilość ważeń"
                    // onChange={handleChange('age')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="standard-number"
                    label="Próg LO"
                    // onChange={handleChange('age')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />

            </form>
            <Button variant="outlined" color="primary" onClick={send}> Wyślij zlecenie</Button>
        </div>
    );
}
