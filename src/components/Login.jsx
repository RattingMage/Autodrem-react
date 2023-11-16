import React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import { login } from '../actions/auth';
import {type} from "@testing-library/user-event/dist/type";

const Login = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch( login() );
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);