import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FEATURE_GET_MESSAGE } from '../actions/types';

const API_URL = "http://localhost:3090";

export function signInUser({ email, password }, { history }) {
    // Submit email and password to server

    return dispatch => { // this is Thunk library feature

        const request = axios.post(`${API_URL}/signin`, { email, password })
            .then(response => {
                // If request is good...
                // - If request is good - update the state to indicate user is authenticated
                dispatch({
                    type: AUTH_USER,
                    payload: null
                });
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - Redirect to the route '/feature'
                history.push('/feature');
            })
            .catch(() => {
                // If request is bad...
                // - Show error to the user
                dispatch(authError('Bad sign in info.'));
            });

    };

}

export function signOutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function signUpUser({ email, password }, { history }) {
    return dispatch => {
        const request = axios.post(`${API_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/feature');
            })
            .catch(err => {
                // console.log('errorType', typeof err);
                // console.log('error', Object.assign({}, err));
                dispatch(authError(err.response.data.error));
            });
    };
}

export function fetchMessage() {
    return dispatch => {
        axios.get(`${API_URL}`, {
                headers: { authorization: localStorage.getItem('token') }
            })
            .then(response => {
                dispatch({
                    type: FEATURE_GET_MESSAGE,
                    payload: response.data.message
                });
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            });
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}