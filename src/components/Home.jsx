import React from 'react';
import {connect} from "react-redux";
import {login} from "../actions/auth";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1 style={{color: "blue"}}>Home page</h1>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/signup">Signup</Link>
            </li>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Home);