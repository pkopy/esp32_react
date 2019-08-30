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
import DetailChart from './DetailChart';
// import { saveAs } from 'file-saver';
import XLSX from 'xlsx'
import DevExpressTable from './DevExpressTable'





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
    imgContainer: {
        display:'flex',
        flexDirection: 'row-reverse',
        marginBottom: '20px'

    },
    imgDiv: {
        width: '40px',
        height: '40px',
        borderRadius:'50%',
        transition: '0.5s',
        '&:hover' : {
            backgroundColor:'#282c3425',
            cursor:'pointer'
        }
    },
    
    img: {
        width: '24px',
        top: '8px',
        left: '-7px',
        position: 'relative',
    },
    
    head: {
        textAlign: 'left',
        marginLeft: '15px',
        paddingTop: '5px',
    },
    button: {
        marginLeft: '15px'
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

    const columns = [
        { title: 'Numer ważenia', name: 'measureNumber' },
        { title: 'Waga (g)', name: 'measure' },
        { title: 'Data', name: 'time', type: 'date' },
        { title: 'Max', name: 'max', type: 'numeric' },
        { title: 'Min', name: 'min', type: 'numeric' },
        { title: 'Próg LO', name: 'treshold', type: 'numeric' },
        { title: 'Ilość ważeń', name: 'quantity', type: 'numeric' },
    ]
   
    const rows = props.data ? props.data.measurments : []
    const name = props.data ? `Szczegóły zlecenia: ${props.data.name}` : 'Zlecenie:'
    let sum = 0 
    if (rows.length > 0) {
        sum = rows.reduce((a,b) => {
            let m = a.measure + b.measure
            return {measure:m}
        })

    }
    const quantity = props.data.quantity
    const toggleChart = () => {
        setChart(!chart)
    }

    const exportToXLS = () => {
        const workbook = XLSX.utils.book_new()
        const ws_name = "Arkusz1";
        const ws_data = [];
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(workbook, ws, ws_name);
        const dataLength = rows.length
        let cellR = XLSX.utils.encode_cell({c:4, r:dataLength})
        const sheet = workbook.Sheets['Arkusz1']
        sheet['!ref'] = `A1:${cellR}`
        sheet[XLSX.utils.encode_cell({c:0, r:0})] = {v:'Numer'}
        console.log(sheet['!cols'])
        var wscols = [
            {wch:6},
            {wch:7},
            {wch:25},
            
        ];
        
        sheet['!cols'] = wscols;
        for(let i = 0; i < dataLength; i++) {
            let cellA = XLSX.utils.encode_cell({c:0, r:i+1})
            sheet[cellA]={v:rows[i]['measureNumber']}
            let cellB = XLSX.utils.encode_cell({c:1, r:i+1})
            sheet[cellB]={v:rows[i]['measure']}
            let cellC = XLSX.utils.encode_cell({c:2, r:i+1})
            sheet[cellC]={v:rows[i]['time']}
            
        }
            const fileName = props.data.name + '.xlsx'
            console.log(workbook)
            XLSX.writeFile(workbook, fileName);

            // saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx")
        // var blob = new Blob([wbout], {type:"application/octet-stream"});
        // saveAs(blob, "test.xlsx");

    }
    // console.log(rows[0].measure)
    return (
        <div className={classes.root}>
            <div className={classes.imgContainer}>
                <Button className={classes.button} variant="outlined" color="primary" onClick={() => props.drawerView('ordersList')}>
                    POWRÓT
                </Button>
                <div className={classes.imgDiv} onClick={exportToXLS}>
                    <img className={classes.img} src={excelLogo}  />
                </div>
                <div className={classes.imgDiv}>
                    <img className={classes.img} src={pdfLogo} />
                </div>
                <div className={classes.imgDiv} onClick={toggleChart}>
                    <img className={classes.img} src={!chart?chartIcon:listIcon} />
                </div>
            </div>

            {/* {!chart&&<MaterialTable
                
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
            />} */}


            {chart&&<DetailChart
                data={props.data}
            />}

            {!chart&&<DevExpressTable
                data={props.data}
                columns={columns}
            />}
        </div>
    );
}
