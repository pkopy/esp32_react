import React, { Component } from "react";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    Sorting,
    Scrolling,
    LoadPanel
  } from 'devextreme-react/data-grid';

  import ArrayStore from 'devextreme/data/array_store'


class DataTable extends Component {
  
    
    
  
  render() {
      const { rows, columns } = this.props;
    return (
        <DataGrid style={{width:'80%', marginLeft:'auto', marginRight:'auto', marginTop:'20px', height:'600px'}}
        dataSource={rows}
        defaultColumns={columns}
        showBorders={true}

    >
        <Paging defaultPageSize={25} />
        {/* <Sorting mode={'none'} />
        <Scrolling mode={'virtual'} />
        <LoadPanel enabled={true}/> */}
        {/* <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
          showInfo={true} /> */}
    </DataGrid>
    );
    
  }
}



export default DataTable