import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from '_helpers';

// create slice

const name = '/auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        error: null
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
        localStorage.removeItem('user');
        history.navigate('/login');
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

    return {
        login: login(),
        register: register(),
        addnote: addnote(),
        allnotes: allNotes(),
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ username, password }) => await fetchWrapper.post(`${baseUrl}/auth/signin`, { username, password })
        );
    }

    function register() {
        return createAsyncThunk(
            `${name}/signup`,
            async ({ username, password, name, surname, email, repassword }) => await fetchWrapper.post(`${baseUrl}/auth/signup`, { username, password, name, surname, email, repassword })
        );
    }

    function addnote() {
        return createAsyncThunk(
            `${name}/addnote`,
            async ({ title, description, id }) => await fetchWrapper.post(`${baseUrl}/notes/addnote`, { title, description, id_user: id })
        );
    }

    function allNotes() {
        return createAsyncThunk(
            `notes/allnotes`,
            async ({ id_user }) => await fetchWrapper.get(`${baseUrl}/notes/allnotes`, { id_user })
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}
