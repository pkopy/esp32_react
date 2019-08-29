import React from 'react';
import MaterialTable from 'material-table';
import DetailsIcon from '@material-ui/icons/Details';
import { findProps } from 'devextreme-react/core/template';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    tab: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%'
    }
}))

export default function MaterialTableDemo(props) {
    const classes = useStyles();
    // console.log(props.yourOrders)

    const [state, setState] = React.useState({
        columns: [
            { title: 'Twoja nazwa', field: 'name' },
            { title: 'Operator', field: 'operator' },
            { title: 'Podstawa', field: 'base', type: 'numeric' },
            { title: 'Max', field: 'max', type: 'numeric' },
            { title: 'Min', field: 'min', type: 'numeric' },
            { title: 'Próg LO', field: 'treshold', type: 'numeric' },
            { title: 'Ilość ważeń', field: 'quantity', type: 'numeric' },
        ],
        // data: props.yourOrders
    });

    const orderDetails = (data) => {
        // console.log(data)
        fetch('http://localhost:5000/addDevice', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'orderguid': data.guid,

            },
        })
        .then(data => data.json())
        .then(measurments => {data.measurments = measurments; props.setCurrentOrder(data); props.drawerView('orderDetails')})
        .catch(err => console.log(err))
    }

    return (
        <div className={classes.tab}>

            <MaterialTable

                title="Zlecenia"
                columns={state.columns}
                data={props.yourOrders}
                actions={
                    [
                        {
                            icon: 'edit',
                            tooltip: 'Edycja',
                            onClick: (event, rowData) => props.viewOrder(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Skasuj',
                            onClick: (event, rowData) => console.log("You want to delete " + rowData.name),
                        },
                        {
                            icon: 'chevron_right',
                            tooltip: 'Szczegóły',
                            onClick: (event, rowData) => orderDetails(rowData)
                            // disabled: rowData.birthYear < 2000
                        },
                    ]}
                options={{
                    actionsColumnIndex: -1
                }}
            />
        </div>

    );
}

