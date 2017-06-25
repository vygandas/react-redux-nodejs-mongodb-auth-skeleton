import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput = field =>  // Define stateless component to render input and errors, // Type specified below in <Field>
        <div>
            <input {...field.input} type={field.type} className="form-control"/>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
        </div>;


class SignIn extends Component {

    handleFormSubmit({ email, password }) {
        this.props.signInUser({ email, password }, this.props);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <Field
                        name="email"                       // Specify field name
                        component={renderInput}            // Specify render component above
                        type="text"                        // "type" prop passed to renderInput
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <Field
                        name="password"                    // Specify field name
                        component={renderInput}            // Specify render component above
                        type="password"                    // "type" prop passed to renderInput
                    />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }

}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

const InitializeFromStateForm = reduxForm({
    form: 'signin',
    enableReinitialize : true
})(SignIn);
export default connect(mapStateToProps, actions)(InitializeFromStateForm);