import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb,
    BreadcrumbItem, Button, NavItem, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, Modal, Row, Col,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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


class CommentForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isModalOpen : false,
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleModal () {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }


    handleSubmit (values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }


    render () {
        return (
            <React.Fragment>
                <Button outline onClick={ this.toggleModal }>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={ this.state.isModalOpen } toggle={ this.toggleModal }>
                    <ModalHeader toggle={ this.toggleModal }>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                              placeholder="Your Name" className="form-control"
                                              validators={ { minLength : minLength(3), maxLength : maxLength(15) } }
                                />
                                <Errors className="text-danger" model=".author" show="touched"
                                        messages={ {
                                            minLength : 'Must be greater than 2 characters',
                                            maxLength : 'Must be 15 characters or less'
                                        } }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                                  className="form-control"/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    };
}


function RenderComments ({ comments, addComment, dishId }) {
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
                <CommentForm dishId={ dishId } addComment={ addComment }/>
            </div>
        );
    }

    return (
        <div></div>
    );
}

const DishDetail = (props) => {

    const { dish, comments, addComment } = props;
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
                    <RenderComments comments={ comments } addComment={ addComment }
                      dishId={props.dish.id} />
                </div>
            </div>
        );
    }
    return (
        <div></div>
    );
}

export default DishDetail;
