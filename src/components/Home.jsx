import React from 'react';
import {connect} from "react-redux";
import {login} from "../actions/auth";

const Home = () => {
    return (
        <div>
            <h1 style={{ color: "blue" }}>Home page</h1>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Home);