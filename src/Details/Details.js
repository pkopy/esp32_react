import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import Button from 'devextreme-react/button';
import AppBar from '../AppBar'
import ProgressBar from '../ProgressBar'
import DataTable from '../DataTable'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import TextBox from 'devextreme-react/text-box';
import Loader from '../Loader';


import Chart, {
    ArgumentAxis,
    Series,
    Legend
} from 'devextreme-react/chart';

import Paper from "@material-ui/core/Paper";
import // State or Local Processing Plugins
"@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";


class Details extends Component {
    state = {
        end:false,
        measure:0,
        raports: [0],
        zero: true,
        columns: [
            'index',
            'date',
            'command',
            'measure',
            'base',
            'min',
            'max'
            
        ],
        rows: [
            
        ],
        data :[],
        ok: false,
        connection: {}
    }

    test = (measure) => {
        const conf = measure.all.shift()
        console.log(conf)
        if (measure.stab || measure.continue) {

            let measureArray = []
            let array = []
            
            measure.all.map(elem => {
                // if(elem.measure && elem.stab) {
                    measureArray.push({arg: measureArray.length, val: elem.stab})
                    let date = `${elem.time[0]}-${elem.time[1]}-${elem.time[2]}T${elem.time[3]}:${elem.time[4]}:${elem.time[5]}`
                    array.push({date:date, measure:elem.stab, command:elem.command, base:elem.base, max:elem.max, min:elem.min, index:elem.measureNumber})
                    // }
                    this.setState({rows:[]})
                    this.setState({data:[]})
                    this.setState({rows:array})
                    this.setState({data:measureArray})
                })
        }
        if (conf.complete) {
            this.setState({end:true})
        } else {
            this.setState({end:false})
        }
        
    }
   
    connectToSocket = () => {
        const connection = new WebSocket(`ws://${this.props.address}:7000`)

        this.setState({connection})
        connection.onopen = () => {
            var msg = {command: "C"};
            connection.send(JSON.stringify(msg));
            this.setState({rows:[]})
            this.setState({data:[]})
        }

        connection.onmessage = (e) => {
            let data = e.data;
            const measure = JSON.parse(data);
            if (measure.all && measure) {
                this.test(measure)
                this.setState({measure:measure.measure})
            }
            // if (measure.command) {
            //     if (measure) {
            //         this.setState({measure:parseFloat(measure.measure)});
            //     }
            //     ok = parseFloat(measure.measure) > 95 && parseFloat(measure.measure) < 105? true : false 
            //     this.setState({ok})
            //     if (parseFloat(measure.measure) > 0 && measure.isStab && this.state.zero && this.state.ok) {
            //         if(this.state.raports[0] == 0) {
            //             this.setState({raports: []})
            //         }
            //         measure.date = Date()
            //         this.test(measure)

            //         // this.setState({rows:measureArray})
            //         this.setState({zero: false})
            //     }
    
            //     if( this.state.rows[this.state.rows.length - 1] && parseFloat(measure.measure) > 0 && (parseFloat(measure.measure) >= (this.state.rows[this.state.rows.length - 1].measure + 10)|| parseFloat(measure.measure) <= (this.state.rows[this.state.rows.length - 1].measure - 10) || parseFloat(measure.measure) <= 1)){
            //         this.setState({zero: true})
            //     } 
            // }
        }

        connection.onerror = (e) => {
            // this.changeStateButton()
            console.log('ERROR')
        }
    }
    sendToSocket = () => {
        var msg = {"command": "SI", 'base': 200, 'max':50, 'min':100,'quantity':3, 'treshold': 100};
            // connection.send();
        this.setState({end:false})
        this.setState({rows:[]})
        this.setState({data:[]})
        this.state.connection.send(JSON.stringify(msg))
    }

    close = () => {
        this.state.connection.close()
    }

    render () {
        return (
        <div className="App">
            {/* <Loader/> */}
            
            <Button type='default' height='30px' text="START" onClick={this.connectToSocket}>START</Button>
            <Button height='30px' text="SEND" onClick={this.send}>SEND </Button>
            <Button height='30px' text="SEND" onClick={this.close}>CLOSE </Button>
            <ProgressBar
                value={this.state.measure}
                />
            {!this.state.end&&<h1 style={{textAlign:'center'}}>{this.state.measure} g </h1>}
            {this.state.end&&<h1 style={{textAlign:'center'}}>ZLECENIE ZAKOŃCZONE</h1>}
            {/* <ol>
                {this.state.rows.map(elem => 
                    
                    <li key={Math.random()}>
                       <p>{elem.measure}</p> 
                    </li>

                )}
            </ol> */}
            <Chart dataSource={this.state.data} style={{width:'80%', marginLeft:'auto', marginRight:'auto'}}>
                <ArgumentAxis tickInterval={10} />
                <Series/>
                <Legend visible={false} />
            </Chart>
            {/* <DataTable 
                rows={this.state.rows}
                columns={this.state.columns}
            /> */}
            {/* <Paper style={{width:'80%', marginLeft:'auto', marginRight:'auto', marginTop:'20px'}}>
                <Grid rows={this.state.rows} columns={this.state.columns}>
                <Table />
                <TableHeaderRow />
                </Grid>
               
                <Paging defaultPageSize={4} />
            </Paper> */}
            <DataTable 
                rows={this.state.rows}
                columns={this.state.columns}
            />
        </div>
      );
    }
}

export default Details;
