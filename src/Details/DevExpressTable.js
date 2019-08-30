import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    GroupingState,
    IntegratedSummary,
    IntegratedGrouping,
    IntegratedPaging,
    SummaryState,
    DataTypeProvider,
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
} from '@devexpress/dx-react-grid-material-ui';

// import { generateRows } from '../../../demo-data/generator';

export default (props) => {
    const [pageSizes] = useState([5, 10, 15, 0]);
    const [columns] = useState(props.columns);
    // const [rows] = useState([{ city: 'test' }]);
    const [totalSummaryItems] = useState([
        { columnName: 'measure', type: 'sum' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'measure', align: 'right' },
    ]);
    const generateRows = () => {
        if (Array.isArray(props.data)) {
            return props.data

        } else {
            return props.data ? props.data.measurments : []

        }
    }
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
                    defaultPageSize={0}
                />

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
                <TableGroupRow />
                <Toolbar />
                <GroupingPanel 
                   messages={{
                       groupByColumn:'Przeciągnij kolumnę tutaj aby pogrupować'
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
