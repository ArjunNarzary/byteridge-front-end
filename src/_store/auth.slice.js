import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { alertActions } from '_store';
import { history, fetchWrapper } from '_helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        value: JSON.parse(localStorage.getItem('auth'))
    }
}

function createReducers() {
    return {
        setAuth
    };

    function setAuth(state, action) {
        state.value = action.payload;
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const sessionUrl = `${process.env.REACT_APP_API_URL}/audit`;

    return {
        login: login(),
        logout: logout()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async function ({ username, password, ip }, { dispatch }) {
                dispatch(alertActions.clear());
                try {
                    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password, ip });

                    // set auth user in redux state
                    dispatch(authActions.setAuth(user));

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth', JSON.stringify(user));
                    
                    // get return url from location state or default to home page
                    const { from } = history.location.state || { from: { pathname: '/' } };
                    history.navigate(from);
                } catch (error) {
                    dispatch(alertActions.error(error));
                }
            }
        );
    }

    function logout() {
        return createAsyncThunk(
            `${name}/logout`,
            function ({ id, ip }, { dispatch }) {
                /**Haven't added try catch has we don't to restrict user from logging out
                 * event if there is an error in the API request also don't want to wait for response
                 * so haven't added async await
                **/
                fetchWrapper.post(`${sessionUrl}/logout`, { id, ip, type: "Logout" });

                dispatch(authActions.setAuth(null));
                localStorage.removeItem('auth');
                history.navigate('/account/login');
            }
        );
    }
}