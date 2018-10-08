import React from 'react';
import ReactDOM from 'react-dom';


import Repository from './containers/Repository';
import LoadingSpinner from './components/LoadingSpinner'
import GlobalHeader from './components/GlobalHeader'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import MenuBar from './components/MenuBar'

import HomePage from  './containers/HomePage'
import ShoppingPage from './containers/ShoppingPage'

import registerServiceWorker from './registerServiceWorker';
import './all.css';
import createHistory from 'history/createBrowserHistory';
import { Route} from 'react-router';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware, push} from 'react-router-redux'
import store from './store';


//react router not working after build put in server
// //https://stackoverflow.com/questions/43411635/react-router-not-working-when-deployed
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={store.history}>
            <div >
                <Route  path="/" component={LoadingSpinner} />
                <Route  path="/" component={GlobalHeader}/>
                <Route  path="/" component={MenuBar}/>
                /*https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path*/
                <Route  path="/" exact={true} component={HomePage}/>
                <Route  path="/signin" component={LoginForm}/>
                <Route path="/signup" component={SignupForm}/>
                <Route  path="/repository" exact={true} component={Repository} />
                <Route  path="/shopping" exact={true} component={ShoppingPage} />
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));


registerServiceWorker();
