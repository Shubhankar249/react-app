import React, {Component} from "react";
import {
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ModalHeader, ModalBody, Label, Modal, Row, Col
} from 'reactstrap';
import {Control, LocalForm, Errors} from "react-redux-form";
import {Link} from "react-router-dom";
import {Loading} from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';

const maxLength= (len) => (val)=> !(val) || val.length <= len;
const minLength= (len) => (val)=> val && val.length >= len;

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state={
            isModalOpen:false
        };

        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        alert("Your comment has been added!");
        this.toggleModal();
    }

    toggleModal() {
        this.setState({isModalOpen:!this.state.isModalOpen})
    }

    render() {
        const items=[];

        for (let i=1; i<6; i++) {
            items.push(<option >{i}</option>)
        }

        return(
            <div>
            <Button onClick={this.toggleModal} className="bg-transparent text-secondary"><span className="fa fa-pencil"/> Submit Form</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(val)=> this.handleSubmit(val)}>
                            <Row className="form-group">
                                <Label md={4} htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        {items}
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label md={4} htmlFor="author">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model='.author' id="author" name="author" placeholder="Your name"
                                             className="form-control" validators={{
                                                 minLength:minLength(3), maxLength:maxLength(15)
                                    }}/>
                                    <Errors model=".authorname" className="text-danger" show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'}}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="coment"
                                                      rows="6" className="form-control"
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={4}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle><h3>{dish.name}</h3></CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>

    );
}

function RenderComments({comments, addComment, dishId}) {   // user defined components start with Caps
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
                        <CommentForm addComment={addComment} dishId={dishId}/>
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
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }

    if (props.err) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.err}</h4>
                </div>
            </div>
        );
    }

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
                    <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
                </div>
            </div>
        );
    } else {
        return (<div/>);
    }
};

export  default DishDetail;