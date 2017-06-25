import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput = field =>  {// Define stateless component to render input and errors, // Type specified below in <Field>
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
        <div className={className}>
            <input {...field.input} type={field.type} className="form-control"/>
            {touched && error && <div className="text-help">{error}</div>}
        </div>
    );
};


class SignUp extends Component {

    handleFormSubmit({ email, password }) {
        this.props.signUpUser({ email, password }, this.props);
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
                        name="email"
                        component={renderInput}
                        type="text"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <Field
                        name="password"
                        component={renderInput}
                        type="password"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Repeat your password</label>
                    <Field
                        name="password2"
                        component={renderInput}
                        type="password"
                    />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }

}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Enter your email!";
    }

    if (!isEmailValid(values.email)) {
        errors.email = "Enter valid email!";
    }

    if (!values.password) {
        errors.password = "Enter your apssword!";
    }

    if (!values.password2) {
        errors.password2 = "Enter your apssword again!";
    }

    if (values.password != values.password2) {
        errors.password2 = "Entered passwords doesn't match!";
    }

    return errors;
}

function isEmailValid (email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

const InitializeFromStateForm = reduxForm({
    form: 'signup',
    enableReinitialize : true,
    validate
})(SignUp);
export default connect(mapStateToProps, actions)(InitializeFromStateForm);