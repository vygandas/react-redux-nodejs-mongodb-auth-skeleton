import { FEATURE_GET_MESSAGE } from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {
        case FEATURE_GET_MESSAGE:
            return { ...state, featureMessage: action.payload };
    }

    return state;
}