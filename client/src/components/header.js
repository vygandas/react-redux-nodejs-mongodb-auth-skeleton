import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {

    renderAuthButton() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link to="/signout" className="nav-link">Sign out</Link>
                </li>
            );
        } else {
            return [
                <li className="nav-item" key="signin">
                    <Link to="/signin" className="nav-link">Sign in</Link>
                </li>,
                <li className="nav-item" key="signup">
                    <Link to="/signup" className="nav-link">Sign up</Link>
                </li>
            ];
        }
    }

    renderProtectedLinks() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link to="/feature" className="nav-link">Feature</Link>
                </li>
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-lite">
                <Link to="/" className="navbar-brand">Redux Auth</Link>
                <ul className="nav navbar-nav">
                    {this.renderAuthButton()}
                    {this.renderProtectedLinks()}
                </ul>
            </nav>
        );
    }
    
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);