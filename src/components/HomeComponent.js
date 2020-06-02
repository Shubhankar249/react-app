import React from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, err}) {
    if (isLoading) return (<Loading/>);
    if (err) return (<h4>{err}</h4>);
    return (
        <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)'}}>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
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
                    <RenderCard item={props.promotion} isLoading={props.promoLoading} err={props.promoErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leaderLoading} err={props.leaderErrMess}/>
                </div>
            </div>
        </div>
    )
}

export default Home;