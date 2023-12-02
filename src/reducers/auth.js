import {LOGIN, LOGOUT, SIGNUP} from "./types";

const initialState = {
    username: "",
    password: "",
    isAuthenticated: null,
};

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
            };
        case SIGNUP:
            return {
                ...state,
                username: payload.username,
                password: payload.password,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            console.log("default");
            return state;
    }
};

export default authReducer;