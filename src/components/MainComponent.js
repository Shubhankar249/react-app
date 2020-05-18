import React, {Component} from 'react';
import Menu from './MenuComponent';
import Home from "./HomeComponent";
import DishDetail from './DishesComponent';
import {DISHES} from "../shared/dishes";
import Header from "./HeaderComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import {COMMENTS} from "../shared/comments";
import {LEADERS} from "../shared/leaders";
import {PROMOTIONS} from "../shared/promotions";
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component{
    constructor(props) {
        super(props);

        this.state={
            dishes:DISHES,   // making dishes info available to child components of app.js -> State up from MenuComponent
            comments:COMMENTS,
            promotions:PROMOTIONS,
            leaders:LEADERS
        }
    }

    render() {
        const HomePage=()=>{return (
                <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
                    promotion={this.state.promotions.filter(promo=>promo.featured)[0]}
                    leader={this.state.leaders.filter(leader=>leader.featured)[0]}
                />
            )};

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }


}

export default Main;
