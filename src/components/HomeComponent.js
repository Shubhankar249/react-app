import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from "./LoadingComponent";

function RenderCard({item, isLoading, err}) {
    if (isLoading) return  (<Loading/>);
    if (err)    return (<h4>{err}</h4>);

    return(
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation? <CardSubtitle>{item.designation}</CardSubtitle>: null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    )
}

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} err={props.dishesErr} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={false} err={null}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={false} err={null}/>
                </div>
            </div>
        </div>
    )
}

export default Home;