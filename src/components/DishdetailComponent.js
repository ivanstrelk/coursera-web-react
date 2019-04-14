import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap';

class DishDetail extends Component {
    renderDish(dish) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        if (comments != null) {
            const handledComments = comments.map((comment) => {
                return (
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {comment.date}</li>
                    </ul>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {handledComments}
                </div>
            );
        }

        return (
            <div></div>
        );
    }

    render() {

        const {selectedDish} = this.props;
        if (selectedDish != null) {
            const {comments} = selectedDish;
            return (
                <div className="row">
                    {this.renderDish(selectedDish)}
                    {this.renderComments(comments)}
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

export default DishDetail;