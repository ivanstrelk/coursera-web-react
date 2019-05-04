import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import {
  postComment, fetchDishes, fetchComments,
  fetchPromos, fetchLeaders, postFeedback
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments : state.comments,
        promotions : state.promotions,
        leaders : state.leaders,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes : () => {
        dispatch(fetchDishes())
    },
    resetFeedbackForm : () => {
        dispatch(actions.reset('feedback'))
    },
    fetchComments : () => dispatch(fetchComments()),
    fetchPromos : () => dispatch(fetchPromos()),
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
});


class Main extends Component {
    componentDidMount () {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render () {
        const {
            dishes,
            promotions,
            leaders,
            comments,
            resetFeedbackForm,
            postComment,
            postFeedback,
        } = this.props;

        const HomePage = () => {
            return (
                <Home
                    dish={ dishes.dishes.filter((dish) => dish.featured)[ 0 ] }
                    dishesLoading={ dishes.isLoading }
                    dishesErrMess={ dishes.errMess }
                    promotion={ promotions.promotions.filter((promo) => promo.featured)[ 0 ] }
                    promoLoading={ promotions.isLoading }
                    promoErrMess={ promotions.errMess }
                    leader={ leaders.leaders.filter((leader) => leader.featured)[ 0 ] }
                    leaderLoading={ leaders.isLoading }
                    leaderErrMess={ leaders.errMess }
                />
            );
        };


        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={ dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[ 0 ] }
                    isLoading={ dishes.isLoading }
                    errMess={ dishes.errMess }
                    comments={ comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10)) }
                    commentsErrMess={ comments.errMess }
                    postComment={ postComment }/>
            );
        };

        return (
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={ this.props.location.key } classNames="page" timeout={ 300 }>
                        <Switch location={ this.props.location }>
                            <Route path='/home' component={ HomePage }/>
                            <Route exact path='/aboutus' component={ () => <About leaders={ leaders }/> }/>
                            <Route exact path='/menu' component={ () => <Menu dishes={ dishes }/> }/>
                            <Route path='/menu/:dishId' component={ DishWithId }/>
                            <Route exact path='/contactus'
                                   component={ () => <Contact
                                     resetFeedbackForm={ resetFeedbackForm }
                                     postFeedback={ postFeedback }/> }/>
                            <Redirect to="/home"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
