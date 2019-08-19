import React, { Component } from 'react';
import  './App.scss'
import AppBar from './AppBar'
import Drawer from './Drawer'
import Loader from './Loader'
import Details from './Details/Details'
const dotenv = require('dotenv');


dotenv.config();
const PORT = process.env.PORT || 5000
const URL = process.env.URL || 'localhost'

class App extends Component {
    state ={
        load: false,
        scales: [],
        currentScale: {},
        details:false,
        end:false
    }

    load = () => {
        this.setState({load:true})
        this.setState({currentScale:{}})
        fetch(`http://${URL}:${PORT}/findscales`)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({scales: data});
                this.setState({load: false})
            })
            .catch(err => {
                console.log(err);
                this.setState({load: false})
            })
    }
    
    setScale = (scale) => {
        // this.setState({currentScale:{}})
        
        this.setState({currentScale:scale})
        this.setState({details:true})

    }

    render () {
        return (
        <div className="App">
            {this.state.load&&<Loader />}
            {/* <AppBar
                load={this.load}
            /> */}
            <Drawer
                address={this.state.currentScale.address}
                load={this.load}
            />
            {this.state.scales.length>0&&
                <div className="scales">
                    <ol>
                        {this.state.scales.map(scale =>
                            <li key={scale.address} className="scale" onClick={() =>this.setScale(scale)}>
                                <div><h1>{scale.address}</h1></div>
                            </li>    
                        )}
                    </ol>

                </div>
            }
            {/* {this.state.currentScale.address&&<Details
                address={this.state.currentScale.address}
            />} */}
        </div>
      );
    }
}

export default App;
