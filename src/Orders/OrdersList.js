import React from 'react';
import MaterialTable from 'material-table';
import DetailsIcon from '@material-ui/icons/Details';
import { findProps } from 'devextreme-react/core/template';
import { makeStyles } from '@material-ui/styles';
import DevExpressTable from '../Details/DevExpressTable'
import Button from '@material-ui/core/Button';
import SocketLib from '../Socket'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    tab: {
        marginLeft: 'auto',
        marginRight: 'auto',
        // width: '80%'
    },
    root: {
        maxWidth: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'end'
    },
    paper: {
        // marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        // marginBottom: theme.spacing(2),
    },
}))

export default function MaterialTableDemo(props) {
    const classes = useStyles();
    const [yourOrders, setYourOrders] = React.useState([])
    const [load, setLoad] = React.useState(false)
    


    const columns = [
        { title: 'Twoja nazwa', name: 'name' },
        { title: 'Operator', name: 'operator' },
        { title: 'Podstawa', name: 'base', type: 'numeric' },
        { title: 'Max', name: 'max', type: 'numeric' },
        { title: 'Min', name: 'min', type: 'numeric' },

        { title: 'Ilość ważeń', name: 'quantity', type: 'numeric' },
        { title: 'Data zlecenia', name: 'time', type: 'date' },
    ]

    const orderDetails = (data) => {

        fetch('http://localhost:5000/addDevice', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'orderguid': data.guid,

            },
        })
            .then(data => data.json())
            .then(measurments => {
                data.measurments = measurments;

                if (SocketLib.connection) {
                    SocketLib.connection.close()
                }
                props.setCurrentOrder(data); props.drawerView('orderDetails')
            })
            .catch(err => console.log(err))


    }

    const orders = (data) => {
        setLoad(true)
        fetch('http://localhost:5000/order',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'orderguid': data.guid,

                },
            })
            .then(data => data.json())
            .then(yourOrders => {
                // console.log(yourOrders)
                if (yourOrders.length > 0) {
                    setYourOrders(yourOrders)
                    setLoad(false)

                } else {
                    setYourOrders([])
                    setLoad(false)
                }

            })
            .catch((err) => {
                console.log(err)
                this.setState({ load: false })
            })
    }
    return (
        <div className={classes.root}>
            <div className="imgContainer">
                <Button style={{ marginLeft: '15px' }} variant="outlined" color="primary" onClick={() => { props.drawerView('scales') }}>
                    POWRÓT
                </Button>
                <Button style={{ marginLeft: '15px' }} variant="outlined" color="primary" onClick={() => { props.drawerView('order') }}>
                    NOWE ZLECENIE
                </Button>
                {/* <div onClick={this.exportToXLS} className="imgDiv">
                    <img src={excelLogo} />
                </div>
                <div className="imgDiv" >
                    <img src={pdfLogo} width="24px" />
                </div>
                <div className="imgDiv" onClick={this.toggleChart} >
                    <img src={!this.state.chart ? chartIcon : listIcon} />
                </div> */}
            </div>
            <div className={classes.tab}>
                
                <DevExpressTable
                    data={props.yourOrders}
                    columns={columns}
                    viewOrder={props.viewOrder}
                    orderDetails={orderDetails}
                />


            </div>
        </div>

                );
            }
            
