import React, {Component} from 'react';
import Menu from './MenuComponent';
import Home from "./HomeComponent";
import About from "./AboutComponent";
import DishDetail from './DishesComponent';
import Header from "./HeaderComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import {addComment} from "../redux/ActionCreators";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapDispatchToProps=(dispatch)=> ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

const mapStateToProps= state=> {
    return{
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
};

class Main extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const HomePage=()=>{return (
                <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
                    promotion={this.props.promotions.filter(promo=>promo.featured)[0]}
                    leader={this.props.leaders.filter(leader=>leader.featured)[0]}
                />
            )};

        const DishWithId=({match})=>{
            return(<DishDetail dish={this.props.dishes.filter(dish=> dish.id===parseInt(match.params.dishId, 10))[0]}
                               comments={this.props.comments.filter(comment=>comment.dishId===parseInt(match.params.dishId, 10))}
                               addComment={this.props.addComment}
                    />
                    );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders}/>}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
