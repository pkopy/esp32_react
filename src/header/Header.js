import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';



class Header extends Component {
    render () {
      return (
        <header className="Header">
            <form onSubmit={this.props.chooseScales} className="ipForm">
                <input type="text" placeholder="Type ip:" name="ip" autoComplete="off"></input>
            </form>
            <Icon>star</Icon>
          
        </header>
      );
    };
  };
  
  export default Header