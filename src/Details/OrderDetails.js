import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import excelLogo from '../img/excel_logo.svg';
import pdfLogo from '../img/Adobe_PDF_icon.svg';
import chartIcon from '../img/chart.svg';
import listIcon from '../img/Plan.svg'
import MaterialTable from 'material-table';
import DetailChart from './DetailChart'





const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'end'
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        // minWidth: 650,
    },
    img: {
        width: '24px',
        top: '8px',
        marginRight: '10px',
        position: 'relative',
        '&:hover' : {
            cursor:'pointer'
        }
    },
    
    head: {
        textAlign: 'left',
        marginLeft: '15px',
        paddingTop: '5px'
    }
}));





export default function DenseTable(props) {
    const classes = useStyles();
    const [chart, setChart] = React.useState(false)
    const [state, setState] = React.useState({
        columns: [
            { title: 'Numer ważenia', field: 'measureNumber' },
            { title: 'Waga (g)', field: 'measure' },
            { title: 'Data', field: 'time', type: 'date' },
            { title: 'Max', field: 'max', type: 'numeric' },
            { title: 'Min', field: 'min', type: 'numeric' },
            { title: 'Próg LO', field: 'treshold', type: 'numeric' },
            { title: 'Ilość ważeń', field: 'quantity', type: 'numeric' },
        ],
        // data: props.yourOrders
    });
    const rows = props.data ? props.data.measurments : []
    const name = props.data ? `Szczegóły zlecenia: ${props.data.name}` : 'Zlecenie:'
    let sum = 0 
    if (rows.length > 0) {
        sum = rows.reduce((a,b) => {
            console.log(props.data)
            let m = a.measure + b.measure
            return {measure:m}
        })

    }
    const quantity = props.data.quantity
    const toggleChart = () => {
        setChart(!chart)
    }
    // console.log(rows[0].measure)
    return (
        <div className={classes.root}>
            <div style={{marginBottom:'20px'}}>
                <img className={classes.img} src={excelLogo} />
                <img className={classes.img} src={pdfLogo} />
                <img className={classes.img} src={!chart?chartIcon:listIcon} onClick={toggleChart}/>
                <Button className={classes.button} variant="outlined" color="primary" onClick={() => props.drawerView('ordersList')}>
                    POWRÓT
                </Button>

            </div>

            {!chart&&<MaterialTable
                
                title={name}
                columns={state.columns}
                data={rows}
                components={{
                    Toolbar: props => (
                        <div className={classes.head}>
                          <h2>{name}</h2>
                          <p>Waga całkowita: {sum.measure} (g)</p>
                          <p>Ilość ważeń: {quantity}</p>
                        </div>
                      ),
                }}
                // actions={
                //     [
                //         {
                //             icon: 'edit',
                //             tooltip: 'Edycja',
                //             onClick: (event, rowData) => props.viewOrder(rowData)
                //         },
                //         {
                //             icon: 'delete',
                //             tooltip: 'Skasuj',
                //             onClick: (event, rowData) => console.log("You want to delete " + rowData.name),
                //         },
                //         {
                //             icon: 'chevron_right',
                //             tooltip: 'Szczegóły',
                //             onClick: (event, rowData) => orderDetails(rowData)
                //             // disabled: rowData.birthYear < 2000
                //         },
                //     ]}
                options={{
                    // actionsColumnIndex: -1,
                    search:false,
                    sorting:false
                }}
            />}


            {chart&&<DetailChart
                data={props.data}
            />}
        </div>
    );
}
