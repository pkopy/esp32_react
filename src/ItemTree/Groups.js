import React, { useState } from 'react';
import TreeList, { Column, ColumnChooser, RemoteOperations, FilterRow, HeaderFilter, SearchPanel, Selection, Lookup } from 'devextreme-react/tree-list';
import Paper from '@material-ui/core/Paper';
import Tabs from 'devextreme-react/tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TestElement from './TestElement'


const data = {
    load: function (loadOptions) {
        if (loadOptions.parentIds) {
            let parentIdsParam = loadOptions.parentIds.join(',');
            return fetch(`http://localhost:5000/item?parentId=${parentIdsParam}`)
                .then(response => response.json())
                .catch(() => { throw 'Data Loading Error'; });

        } else {
            return fetch(`http://localhost:5000/item?parentId=`)
                .then(response => response.json())
                .catch(() => { throw 'Data Loading Error'; });
        }
    }
}

const selected = () => {
    return document.querySelector('#groups').getSelectedRowsData()
}

const useStyles = makeStyles(theme => ({
    itemDetails: {
        padding: theme.spacing(3, 2),
        marginLeft: '5px',
        minWidth: '82%',
        marginRight: '10px',
        boxShadow: '0 0 0 0',
        border: '1px solid rgb(109,109,109,0.25)',
        minHeight: '700px'

    },
    root: {
        padding: theme.spacing(3, 2),
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex'
    },
    tree: {
        maxHeight:'800px'
    }

}));

export default (props) => {
    const [currentGroup, setCurrentGroup] = useState()
    const [index, setIndex] = useState(0)
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Paper className={classes.root}>
                <div>
                    <TreeList
                        className={classes.tree}
                        id={'groups'}
                        dataSource={data}
                        defaultExpandedRowKeys={[]}
                        showRowLines={true}
                        showBorders={true}
                        // columnAutoWidth={true}
                        keyExpr={'id'}
                        parentIdExpr={'parentId'}
                        hasItemsExpr={'hasItems'}
                        rootValue={''}
                        // width={'25%'}
                        onRowClick={(row) => {setCurrentGroup(row.data)}}

                    >
                        {/* <SearchPanel visible={true} width={215} searchVisibleColumnsOnly={true}/> */}
                        {/* <HeaderFilter visible={true} /> */}
                        <Selection mode={'single'} />
                        {/* <FilterRow visible={true} /> */}
                        {/* <ColumnChooser enabled={true} />  */}
                        <Column dataField={'name'}
                            caption={'Wybierz grupę i towar'}
                            onClick={() => console.log('xxxx')}
                        />
                        {/* <RemoteOperations filtering={true} /> */}
                    </TreeList>

                </div>



                <Paper className={classes.itemDetails}
                    square={true}
                >
                    {currentGroup && currentGroup.parentId && 
                    <div>

                    <Typography variant="h5"  align='left'>
                        Grupa: {currentGroup.parentId} 
                        
                    </Typography>
                    <Typography paragraph={true} align='left'>
                        Produkt: {currentGroup.name} 
                        
                    </Typography>
                    </div>}
                    {currentGroup && !currentGroup.parentId && <Typography variant="h5"  align='left'>
                        Grupa: {currentGroup.name} 
                    </Typography>}

                    {currentGroup && currentGroup.parentId && <Tabs dataSource={[
                        { text: 'Element testowy' },
                        { text: 'Zmienna' },
                        { text: 'Alarmy i ostrzeżenia' },
                        { text: 'Info w obszarze testowym' },
                        // { text: 'favorites' },
                        // { text: 'additional' },
                        // { text: 'clients' },
                        // { text: 'orders' },
                        // { text: 'shipment' }
                        
                    ]} selectedIndex={index} repaintChangesOnly={true} onItemClick={(ev)=>setIndex(ev.itemIndex)}/>}
                    {currentGroup && currentGroup.parentId && index === 0 &&<TestElement/>}
                </Paper>
            </Paper>

        </div >
    )

}

