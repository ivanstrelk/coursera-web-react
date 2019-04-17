import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish ({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={ dish.image } alt={ dish.name }/>
                <CardBody>
                    <CardTitle>{ dish.name }</CardTitle>
                    <CardText>{ dish.description }</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments ({ comments }) {
    if (comments != null) {
        const handledComments = comments.map((comment) => {
            const date = new Intl.DateTimeFormat(
                'en-US', { year : 'numeric', month : 'short', day : '2-digit' }
            ).format(new Date(Date.parse(comment.date)));

            return (
                <ul key={ comment.id } className="list-unstyled">
                    <li>{ comment.comment }</li>
                    <li>-- { comment.author }, { date }</li>
                </ul>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                { handledComments }
            </div>
        );
    }

    return (
        <div></div>
    );
}

const DishDetail = (props) => {

    const { dish, comments } = props;
    if (dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{ dish.name }</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{ dish.name }</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={ dish }/>
                    <RenderComments comments={ comments }/>
                </div>
            </div>
        );
    }
    return (
        <div></div>
    );
}

export default DishDetail;
