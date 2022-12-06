import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        notes: [{}],
        error: null
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/`;

    return {
        allNotes: allNotes()
    };    

    function allNotes() {
        return createAsyncThunk(
            `notes/allnotes`,
            async ({ id_user }) => await fetchWrapper.get(`${baseUrl}/notes/allnotes`, { id_user })
        );
    }
}

function createExtraReducers() {
    /*return {
        ...allNotes()
    };

    function allNotes() {
        var { pending, fulfilled, rejected } = extraActions.allNotes;
        return {
            [pending]: (state) => {
                state.notes = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.notes = action.payload;
            },
            [rejected]: (state, action) => {
                state.notes = { error: action.error };
            }
        };
    }*/
}
