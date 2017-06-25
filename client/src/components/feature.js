import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

    componentWillMount() {
        this.props.fetchMessage();
    }

    renderMessage() {
        return <span>{this.props.message}</span>;
    }

    render() {
        return (
            <div>
                <h1>
                    {this.renderMessage()}
                </h1>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return { message: state.feature.featureMessage };
}

export default connect(mapStateToProps, actions)(Feature);