import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishesComponent';
import {DISHES} from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

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
                <Header/>
                <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
                <DishDetail dish={this.state.selectedDish}/>
                <Footer/>
            </div>
        );
    }


}

export default Main;
