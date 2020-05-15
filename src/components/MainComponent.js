import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishesComponent';
import {DISHES} from "../shared/dishes";


class Main extends Component{
    constructor(props) {
        super(props);

        this.state={
            dishes:DISHES,   // making dishes info available to child components of app.js -> State up from MenuComponent
            selectedDish:null
        }
    }
    onDishSelect(dishID) {
        this.setState({selectedDish:this.state.dishes.filter((dish)=> dish.id===dishID)[0]});
    }

    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
                <DishDetail dish={this.state.selectedDish}/>
            </div>
        );
    }


}

export default Main;
