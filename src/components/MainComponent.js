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
import { addComment, fetchDishes } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments : state.comments,
        promotions : state.promotions,
        leaders : state.leaders,
    }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())}
});


class Main extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
    }

    render () {
        const {
            dishes,
            promotions,
            leaders,
            comments,
            addComment,
        } = this.props;

        const HomePage = () => {
            return (
                <Home
                    dish={ dishes.dishes.filter((dish) => dish.featured)[ 0 ] }
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess}
                    promotion={ promotions.filter((promo) => promo.featured)[ 0 ] }
                    leader={ leaders.filter((leader) => leader.featured)[ 0 ] }
                />
            );
        };


        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={ dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[ 0 ] }
                    isLoading={dishes.isLoading}
                    errMess={dishes.errMess}
                    comments={ comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10)) }
                    addComment={addComment} />
            );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={ HomePage }/>
                    <Route exact path='/aboutus' component={ () => <About leaders={ leaders }/> }/>
                    <Route exact path='/menu' component={ () => <Menu dishes={ dishes }/> }/>
                    <Route path='/menu/:dishId' component={ DishWithId }/>
                    <Route exact path='/contactus' component={ Contact }/>} />
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
