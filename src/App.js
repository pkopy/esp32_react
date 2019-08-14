import React, { Component } from 'react';
import  './App.scss'
import AppBar from './AppBar'
import Loader from './Loader'
import Details from './Details/Details'

class App extends Component {
    state ={
        load: false,
        scales: []
    }

    load = () => {
        this.setState({load:true})
        fetch('http://localhost:5000/findscales')
            .then(data => data.json())
            .then(data => {
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
                            <li key={scale.address} className="scale">
                                <div><h1>{scale.address}:{scale.port}</h1></div>
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
