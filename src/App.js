import React, {Component} from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';
import {DISHES} from "./shared/dishes";

class App extends Component{
    constructor(props) {
        super(props);

        this.state={
            dishes:DISHES   // making dishes info available to child components of app.js -> State up from MenuComponent
        }
    }

    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes}/>
            </div>
        );
    }


}

export default App;
