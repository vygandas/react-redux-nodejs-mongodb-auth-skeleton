import React, { Component } from 'react';
import { connect } from 'react-redux';

class Welcome extends Component {

    render() {
        return (
            <div>
                <h1>HELEEEEUUUUUUU!!!</h1>
            </div>
        );
    }

}

export default connect(null)(Welcome);