import axios from "axios";
import {LOGIN, LOGOUT} from "../reducers/types";

export const login = (payload) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username: payload.username, password: payload.password});

    try {
        const res = await axios.post(`http://locslhost:8000/api/auth/login/`, body, config);
        dispatch({type: LOGIN, payload: res.data});
    } catch (err) {
        console.log(`${err}`)
        dispatch({type: LOGOUT});
    }
};

export const signup = (payload) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username: payload.username, password: payload.password, password_repeat: payload.password_repeat});

    try {
        const res = await axios.post(`http://locslhost:8000/api/auth/signup/`, body, config);
        dispatch({type: LOGIN, payload: res.data});
    } catch (err) {
        console.log(`${err}`)
        dispatch({type: LOGOUT});
    }
};

export const logout = () => dispatch => (dispatch({type: LOGOUT}));