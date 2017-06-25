import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './welcome.scss';

class Welcome extends Component {

    render() {
        return (
            <div className="Welcome">
                <h1>HELEEEEUUUUUUU!!!</h1>
            </div>
        );
    }

}

export default connect(null)(Welcome);