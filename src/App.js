import React, { Component } from 'react';
import  './App.scss'
import AppBar from './AppBar'
import Loader from './Loader'
import Details from './Details/Details'
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000
const URL = process.env.URL || 'localhost'

class App extends Component {
    state ={
        load: false,
        scales: []
    }

    load = () => {
        this.setState({load:true})
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

    render () {
        return (
        <div className="App">
            {this.state.load&&<Loader />}
            <AppBar
                load={this.load}
            />
            {this.state.scales.length>0&&
                <div className="scales">
                    <ol>
                        {this.state.scales.map(scale =>
                            <li key={scale.ssid} className="scale">
                                <div><h1>{scale.ssid}</h1></div>
                            </li>    
                        )}
                    </ol>

                </div>
            }
            <Details/>
        </div>
      );
    }
}

export default App;
