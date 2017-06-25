import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import style from './feature.scss';

class Feature extends Component {

    componentWillMount() {
        this.props.fetchMessage();
    }

    renderMessage() {
        return <span>{this.props.message}</span>;
    }

    render() {
        return (
            <div className="Feature">
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