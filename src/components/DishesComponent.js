import React, {Component} from "react";
import {Card, CardImg, CardText, CardTitle, CardBody} from 'reactstrap';

class DishDetail extends Component{
    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle><h3>{dish.name}</h3></CardTitle>
                    <CardText>{this.props.dish.description}</CardText>
                </CardBody>
            </Card>

        );
    }

    renderComments(comments) {
        const comment=comments.map(desc=> {
            return(
                <div key={desc.id} >
                    <li>{desc.comment}</li>
                    <li> -- {desc.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(desc.date)))}</li>
                    <br />
                </div>
            );
        });

        if (comments) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <div className="container">
                        <div className="row">
                            <h3>Comments</h3>
                            <ul className="col-12 list-unstyled">
                                {comment}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>)
        }
    }

    render() {

        if (this.props.dish) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5">
                            {this.renderDish(this.props.dish)}
                        </div>
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        }else {
            return (<div></div>);
        }

    }
}

export  default DishDetail;