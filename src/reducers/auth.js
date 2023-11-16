const initialState = {
    isAuthenticated: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(`login called ${state.isAuthenticated}`)
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            console.log("logout called")
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            console.log(`def called ${state.isAuthenticated}`)
            return state;
    }
};

export default authReducer;