import React, { Component } from 'react';
import  './App.scss'
import AppBar from './AppBar'
import Drawer from './Drawer'
import Loader from './Loader'
import Details from './Details/Details'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Scales from './Scales'
import Lib from './Socket'


const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.REACT_APP_PORTX}`)
// const PORT = PORT || 5000
// const URL = URL || 'localhost'

class App extends Component {
    state ={
        load: false,
        newOrder: false,
        details:false,
        findedScales: [],
        scales: [],
        currentScale: {},
        details:false,
        end:false,
        yourOrders:[],
        measure:''
    }
    componentDidMount = () => {
        this.yourScales()
        this.orders()
    }

    orders = () => {
        this.setState({load: true})
        fetch('http://localhost:5000/order')
            .then(data => data.json())
            .then(yourOrders => {
                // console.log(yourOrders)
                if (yourOrders.length > 0 ) {
                    this.setState({yourOrders})
                    this.setState({load: false})

                } else {
                    this.setState({yourOrders:[]})
                    this.setState({load: false})
                }
                
            })
            .catch((err) => {
                console.log(err)
                this.setState({load: false})
            })
    }

    yourScales = () => {
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
    findScales = () => {
        this.setState({load:true})
        this.setState({currentScale:{}})
        fetch(`http://localhost:5000/findscales`)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({findedScales: data});
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
        
        this.setState({currentScale:scale})
        this.setState({details:true})

    }

    setMeasure = (measure) => {
        this.setState({measure})
    }

    changeNewOrderStatus = () => {
        this.setState({newOrder:!this.state.newOrder})
    }

    render () {
        return (
        <div className="App">
            {this.state.load&&<Loader />}
            <Drawer
                address={this.state.currentScale.address}
                findScales={this.findScales}
                yourScales={this.yourScales}
                orders={this.orders}
                newOrder={this.state.newOrder}
                changeNewOrderStatus={this.changeNewOrderStatus}
                scales={this.state.scales}
                yourOrders={this.state.yourOrders}
                measure={this.state.measure}
                setMeasure={this.setMeasure}
            />
        </div>
      );
    }
}

export default App;
