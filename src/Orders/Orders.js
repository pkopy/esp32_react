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
import SocketLib from '../Socket'
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



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


export default function TextFields(props) {
    const classes = useStyles();
    const scales = props.scales
    // console.log('props.order: ', props.order)
    const order = props.order && Object.keys(props.order).length > 0 ? props.order : {
        name: '',
        base: '',
        min: '',
        max: '',
        operator: '',
        treshold: '',
        quantity: '',
        scale: '',
        interval: ''
        // scaleName: scale.name
    }
    console.log(order)
    const [values, setValues] = React.useState(order);
    const [errors, setError] = React.useState({
        name: false,
        base: false,
        min: false,
        max: false,
        operator: false,
        treshold: false,
        quantity: false,
        scale: false,
        errors: false,
        interval: false
    })
    const [type, setType] = React.useState('quantity');
    const [interval, setInterval] = React.useState('stab')
    const [open, setOpen] = React.useState(false);
    const [connection, setConnection] = React.useState()
    const [scale, setScale] = React.useState({})
    // const [keys, setKeys] = React.useState()
    const handleChange = name => event => {
        // console.log(event.target)
        setValues({ ...values, [name]: event.target.value });
        if (name === 'scale') {
            setCurrentScale(event.target.value)
        }
    };

    function changeType(event) {
        setType(event.target.value);
    }

    function changeInterval(event) {
        setInterval(event.target.value);
    }

    const setCurrentScale = (addressScale) => {
        for (let scale of scales) {
            if (scale.address === addressScale) {
                setScale(scale)
            }
        }
    }

    const validate = () => {
        const valuesKeys = Object.keys(values)
        // setKeys(valuesKeys)
        const err = {}
        setError(err)

        for (let value of valuesKeys) {
            if (value !== 'interval' && (values[value] === '' || values[value] <= 0 || !values[value])) {
                err[value] = true
                err.errors = true
            } else if (interval === 'interval' && (values[value] === '' || values[value] <= 0 || !values[value])) {
                err.interval = true
                err.errors = true
            } else {
                err[value] = false
            }
        }



        if (err.errors) {
            setError(err)
            setOpen(true)
        } else {
            const connection = SocketLib.connectToSocket(values.scale)
            setConnection(connection)
            // setValues({values, scaleName:values.scale})
            setOpen(true)
        }
    }

    const sendOrder = () => {
        values.command = "SI"
        values.scaleName = values.scaleName ? values.scaleName : scale.name
        values.base = parseInt(values.base)
        values.min = parseInt(values.min)
        values.max = parseInt(values.max)
        values.treshold = parseInt(values.treshold)
        values.quantity = parseInt(values.quantity)
        fetch('http://localhost:5000/order', {
            method: 'POST',
            body: JSON.stringify(values)
        })
            .then(data => data.json())
            .then(data => {
                values.guid = data
                SocketLib.sendToSocket(values, connection)
                connection.close()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <div>
            <Typography variant="h4" style={{ marginBottom: 20 }}>Podaj szczegóły zlecenia</Typography>
            <div className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="name"
                    label="Twoja nazwa"
                    error={errors.name}
                    className={classes.textField}
                    value={values.name}
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
                        <MenuItem key={option.label} value={option.label}>
                            {option.label}
                        </MenuItem>
                    ))}

                </TextField>

                {/* <TextField
                    id="contractor"
                    select
                    error={errors.contractor}
                    label="Kontrahent"
                    className={classes.textField}
                    value={values.contractor}
                    onChange={handleChange('contractor')}
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
                        <MenuItem key={option.label} value={option.label}>
                            {option.label}
                        </MenuItem>
                    ))}

                </TextField>


                <TextField
                    id="article"
                    select
                    error={errors.article}
                    label="Towar"
                    className={classes.textField}
                    value={values.article}
                    onChange={handleChange('article')}
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
                        <MenuItem key={option.label} value={option.label}>
                            {option.label}
                        </MenuItem>
                    ))}

                </TextField> */}

                <TextField
                    id="scale"
                    select
                    error={errors.scale}
                    label="Waga"
                    className={classes.textField}
                    value={values.scale}
                    onChange={handleChange('scale')}
                    // onChange={setCurrentScale(values.scale)}
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
                    {scales.map(scale => (
                        <MenuItem key={scale.address} value={scale.address} >
                            {scale.name}
                        </MenuItem>
                    ))}

                </TextField>
                <div className={classes.hr} style={{ width: '50%' }} />
            </div>
            <div className={classes.container} noValidate autoComplete="off">

                <TextField
                    id="base"
                    label="Podstwa"
                    value={values.base}
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
                    value={values.max}
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
                    value={values.min}
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
                    value={values.treshold}
                    onChange={handleChange('treshold')}
                    type="number"
                    inputProps={{

                        min: "1"
                    }}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        min: "1",
                        startAdornment: <InputAdornment position="start">g</InputAdornment>,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <div className={classes.hr} style={{ width: '50%' }} />
            </div>
            <div className={classes.container} noValidate autoComplete="off">
                
                <FormControl component="fieldset">
                    {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
                    <RadioGroup aria-label="position" name="position" value={type} style={{ marginTop: '20px', width: '250px' }} onChange={changeType} row>
                        <FormControlLabel
                            value="quantity"
                            control={<Radio color="primary" />}
                            label="Ilość"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="weight"
                            control={<Radio color="primary" />}
                            label="Masa (g)"
                            labelPlacement="start"
                        />

                    </RadioGroup>
                </FormControl>
                <TextField
                    id="quantity"
                    label=""
                    error={errors.quantity}
                    value={values.quantity}
                    onChange={handleChange('quantity')}
                    type="number"
                    min="0"
                    className={classes.textField}
                    inputProps={{

                        min: "1"
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{type === 'quantity' ? 'szt' : 'g'}</InputAdornment>,
                    }}
                    margin="normal"
                    variant="outlined"
                />



            </div>
            <div className={classes.container} noValidate autoComplete="off">

                <FormControl component="fieldset">
                    {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
                    <RadioGroup aria-label="position" name="position" value={interval} style={{ marginTop: '20px', width: '250px' }} onChange={changeInterval} row>
                        <FormControlLabel
                            value="stab"
                            control={<Radio color="primary" />}
                            label="Stabilny"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="interval"
                            control={<Radio color="primary" />}
                            label="Interwał"
                            labelPlacement="start"
                        />

                    </RadioGroup>
                </FormControl>
                {interval == 'interval' && <TextField
                    id="interval"
                    label="Interwał"
                    error={errors.interval}
                    value={values.interval}
                    onChange={handleChange('interval')}
                    type="number"
                    min="0"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{

                        min: "1"
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">s</InputAdornment>,
                    }}
                    margin="normal"
                    variant="outlined"
                />}
            </div>
            <div className={classes.container} noValidate autoComplete="off">
                <FormControlLabel
                    style={{marginTop:'20px'}}
                    control={
                        <Checkbox   color="primary" value="cccccc" onChange={(e)=>console.log(e.target.checked)}/>
                    }
                    label="Pilnuj zakresów ważenia"
                />

            </div>

            <div className={classes.hr} />
            <Button className={classes.button} variant="outlined" color="primary" onClick={validate}> Wyślij zlecenie</Button>
            <Button className={classes.button} variant="outlined" color="primary"> Zapisz zlecenie</Button>
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {!errors.errors ? <DialogTitle id="alert-dialog-title">Wysyłanie zlecenia</DialogTitle> : <DialogTitle id="alert-dialog-title">UWAGA!</DialogTitle>}
                <DialogContent>
                    {!errors.errors && <DialogContentText id="alert-dialog-description">
                        Zamierzasz wysłać następujące zlecenie do wagi: <b>{scale.name}</b> <br /> <br />
                        <li>Twoja nazwa: {values.name}</li>
                        <li>Operator: {values.operator}</li>
                        <li>Waga: {scale.name}/{values.scale}</li>
                        <li>Podstawa: {values.base}</li>
                        <li>Max: {values.max}</li>
                        <li>Min: {values.min}</li>
                        <li>Próg LO: {values.treshold}</li>
                        <li>Ilość ważeń: {values.quantity}</li>
                        <li>Interwał: {values.interval}</li>

                    </DialogContentText>}
                    {errors.errors && <DialogContentText id="alert-dialog-description">
                        Znaleziono błędy w formularzu: <br /> <br />
                        {errors.name && <li>Twoja nazwa</li>}
                        {errors.operator && <li>Operator</li>}
                        {errors.scale && <li>Waga</li>}
                        {errors.base && <li>Podstawa</li>}
                        {errors.max && <li>Max</li>}
                        {errors.min && <li>Min</li>}
                        {errors.treshold && <li>Próg LO</li>}
                        {errors.quantity && <li>Ilość ważeń</li>}
                        {errors.interval && <li>Interwał</li>}
                    </DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        {errors.errors ? <span>Popraw</span> : <span>Zamknij</span>}
                    </Button>
                    <Button color="primary" autoFocus disabled={errors.errors} onClick={sendOrder}>
                        Wyślij
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
