import React, { Component } from 'react';
import Header from './header';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import requireAuth from './hoc/require_authentication';

import Welcome from './welcome';

import SignIn from './auth/signin';
import SignOut from './auth/signout';
import SignUp from './auth/signup';
import Feature from './feature';

export default class App extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div>
                <Header/>
                <Route exact path={path} render={() => (
                    <Welcome/>
                )}/>
                <Route path={`${path}signin`} component={SignIn}/>
                <Route path={`${path}signout`} component={SignOut}/>
                <Route path={`${path}signup`} component={SignUp}/>
                <Route path={`${path}feature`} component={requireAuth(Feature)}/>
            </div>
        );
    }
}
