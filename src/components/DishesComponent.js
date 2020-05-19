import React from "react";
import {Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from "react-router-dom";

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle><h3>{dish.name}</h3></CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>

    );
}

function RenderComments({comments}) {   // user defined components start with Caps
    const Comment=comments.map(desc=> {
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
                            {Comment}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (<div/>)
    }
}

const DishDetail= (props) => {
    if (props.dish) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-12 col-md-5">
                        <RenderDish dish={props.dish} />
                    </div>
                    <RenderComments comments={props.comments}/>
                </div>
            </div>
        );
    } else {
        return (<div/>);
    }
};

export  default DishDetail;