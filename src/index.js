import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider
} from 'react-redux';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory,
    IndexRedirect
} from 'react-router';

import App from './containers/App/App';
import Home from './containers/Home/Home';
import User from './containers/User/User';
import Auth from './containers/Auth/Auth';
import About from './containers/About/About';
import Admin from './containers/Admin/Admin';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Project from './containers/Project/Project';
import NotFound from './containers/NotFound/NotFound';
import Publish from './containers/Publish/Publish';
import Published from './containers/Published/Published';
import ApplierList from './containers/ApplierList/ApplierList';
import Applied from './containers/Applied/Applied';
import Setting from './containers/Setting/Setting';

import configureStore from './store/configureStore';

import 'antd/dist/antd.less';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="about" component={About}/>
                <Route path="project/:_id" component={Project}/>
                <Route path="admin" component={Admin}/>
                <Route path="user" component={User}>
                    <IndexRedirect to="setting"/>
                    <Route path="publish" component={Publish}/>
                    <Route path="applied" component={Applied}/>
                    <Route path="published" component={Published}/>
                    <Route path="applierlist/:_id" component={ApplierList}/>
                    <Route path="setting" component={Setting}/>
                </Route>
                <Route path="auth" component={Auth}>
                    <Route path="login" component={Login}/>
                    <Route path="register" component={Register}/>
                </Route>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
