import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    GroupingState,
    IntegratedSummary,
    IntegratedGrouping,
    IntegratedPaging,
    SummaryState,
    DataTypeProvider,
    RowDetailState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider,
    Toolbar,
    PagingPanel,
    TableSummaryRow,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import infoIcon from '../img/paramInfo.svg'

// import { generateRows } from '../../../demo-data/generator';

const useStyles = makeStyles(theme => ({
    imgDiv: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: '#282c3425',
            cursor: 'pointer'
        }
    },
    img: {
        // width: '24px',
        // top: '8px',
        // left: '-7px',
        // position: 'relative',
    },
    imgContainer: {
        display: 'flex',
        // flexDirection: 'row-reverse',
        // marginBottom: '20px'

    },
}))

export default (props) => {
    const classes = useStyles();
    const [pageSizes] = useState([5, 10, 15, 0]);
    const [columns] = useState(props.columns);
    // const [rows] = useState([{ city: 'test' }]);
    const [totalSummaryItems] = useState([
        { columnName: 'measure', type: 'sum' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'measure', align: 'right' },
    ]);

    // TODO fetch all data row from DB every time when a component is called
    const generateRows = () => {
        if (Array.isArray(props.data)) {
            return props.data

        } else {
            return props.data ? props.data.measurments : []

        }
    }
    const RowDetail = ({ row }) => (
        <div className={classes.imgContainer}>
            <div className={classes.imgDiv} onClick={()=>props.viewOrder(row)}>
                <img className={classes.img} src={infoIcon} />
            </div>
            <div className={classes.imgDiv} onClick={() => props.orderDetails(row)}>
                <img className={classes.img} src={infoIcon} />
            </div>
        </div>
        // <div>
      
        //     <div style={{width:'20px', height:'20px', backgroundColor:"#000"}} onClick={()=>props.viewOrder(row)}></div>
        //     Details for
        //   {' '}
        //     {row.name}
        //     {' '}
        //     from
        //   {' '}
        //     {row.city}
        //     <div style={{width:'20px', height:'20px', backgroundColor:"#000"}} onClick={()=>props.orderDetails(row)}></div>
        // </div>
    );
    const [rows] = useState(generateRows)
    return (
        <Paper>
            <div >
                <h2></h2>
                <p>Waga całkowita:  (g)</p>
                <p>Ilość ważeń: </p>
            </div>
            <Grid
                rows={rows}
                columns={columns}
            >
                <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={10}
                />
                {props.orderDetails && <RowDetailState
                // defaultExpandedRowIds={[2, 5]}
                />}

                <IntegratedPaging />
                <DragDropProvider />
                <GroupingState />
                {/* <GroupingState defaultGrouping={[{ columnName: 'city' }]} /> */}

                <IntegratedGrouping />
                <SummaryState
                    totalItems={totalSummaryItems}
                />
                <IntegratedSummary />
                {/* <TableSummaryRow /> */}
                <Table />
                <TableHeaderRow />
                <TableRowDetail
                    contentComponent={RowDetail}
                />
                <TableGroupRow />
                <Toolbar />
                <GroupingPanel
                    messages={{
                        groupByColumn: 'Przeciągnij kolumnę tutaj aby pogrupować'
                    }}

                />
                <PagingPanel
                    pageSizes={pageSizes}
                    messages={{
                        rowsPerPage: 'Wierszy na stronę',
                        showAll: 'Wszystkie',

                    }}
                />
            </Grid>
        </Paper>
    );
};
