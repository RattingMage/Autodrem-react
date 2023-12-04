import {LOAD_CARS, LOAD_USER, LOGIN, LOGOUT, SIGNUP} from "./types";

const initialState = {
    username:"",
    password:"",
    first_name:"",
    last_name:"",
    email:"",
    isAuthenticated: false,
    cars: []
};

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOGIN:
            return {
                ...state,
                username: payload.username,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                password: payload.password,
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
                username:"",
                password:"",
                first_name:"",
                last_name:"",
                email:"",
                isAuthenticated: false,
            };
        case LOAD_USER:
            return {
                ...state,
                username: payload.username,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
            };
        case LOAD_CARS:
            return {
                ...state,
                cars: [payload.cars],
            };
        default:
            console.log("default");
            return state;
    }
};

export default authReducer;