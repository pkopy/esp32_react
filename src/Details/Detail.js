import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ProgressBar from '../ProgressBar'
import SocketLib from '../Socket'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        marginTop: '30px'
    },
    button: {
        marginTop:'30px',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

export default function PaperSheet() {
    const classes = useStyles();
    const [connection, setConnection] = React.useState()
    const [button, setButton] = React.useState(true)
    // const x = SocketLib.connectToSocket('10.10.1.71')
    // // console.log(connection)
    // setConnection(x)
    const [measure, setMeasure] = React.useState()
    
    // connection.onmessage = (e) => {
        // let data = e.data;
        // const measure = JSON.parse(data);
        // setMeasure(measure.measure)
        // console.log(measure.measure)
    // }
    // console.log(connection)
    function freeMeasurements() {
        const x = SocketLib.connectToSocket('10.10.1.71')
        setConnection(x)
        x.onmessage = (e) => {
            let data = e.data;
            const measure = JSON.parse(data);
            setMeasure(measure.measure)
            console.log(measure.measure)
        }
        setButton(false)
    }
    function stopConnection() {
        connection.close()
        setButton(true)
        setMeasure(0)
    }

    return (
        <div>
            <Paper className={classes.root}>
                <ProgressBar
                    value={measure}
                />
            </Paper>
            <Button className={classes.button} variant="outlined" color="primary" onClick={button?freeMeasurements:stopConnection}>
                {/* {errors.errors ? <span>Popraw</span> : <span>Zamknij</span>} */}
                {button?'START':'STOP'}
            </Button>
        </div>
    );
}