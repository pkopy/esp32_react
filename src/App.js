import React, { Component } from 'react';
import  './App.scss'
import AppBar from './AppBar'
import Drawer from './Drawer'
import Loader from './Loader'
import Details from './Details/Details'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.REACT_APP_PORTX}`)
// const PORT = PORT || 5000
// const URL = URL || 'localhost'

class App extends Component {
    state ={
        load: false,
        newOrder: false,
        scales: [],
        currentScale: {},
        details:false,
        end:false
    }
    componentDidMount = () => {
        this.setState({load: true})
        fetch('http://localhost:5000/scale')
            .then(data => data.json())
            .then(data => {
                this.setState({scales: data});
                this.setState({load: false})
            })
            .catch((err) => {
                console.log(err)
                this.setState({load: false})
            })
    }
    load = () => {
        this.setState({load:true})
        this.setState({currentScale:{}})
        fetch(`http://localhost:5000/findscales`)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({scales: data});
                this.setState({load: false})
            })
            .catch(err => {
                console.log(err);
                setTimeout(() => {
                    this.setState({load: false})

                }, 2000)
            })
    }
    
    setScale = (scale) => {
        // this.setState({currentScale:{}})
        
        this.setState({currentScale:scale})
        this.setState({details:true})

    }

    changeNewOrderStatus = () => {
        this.setState({newOrder:!this.state.newOrder})
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
                newOrder={this.state.newOrder}
                changeNewOrderStatus={this.changeNewOrderStatus}
            />
            {this.state.scales.length>0&&
                <div className="scales">
                    <ol>
                        {this.state.scales.map(scale =>
                            <li key={scale.address} className="scale" onClick={() =>this.setScale(scale)}>
                                <div>
                                    <h1>{scale.address}</h1>
                                    <AddCircleOutlineIcon/>
                                </div>
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
