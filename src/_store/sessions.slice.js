import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

// create slice

const name = 'sessions';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const sessionsActions = { ...slice.actions, ...extraActions };
export const sessionsReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        list: null,
        item: null,
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/audit`;

    return {
        getAll: getAll(),
    };

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async (page) => await fetchWrapper.get(`${baseUrl}?page=${page}`)
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        getAll();

        function getAll() {
            var { pending, fulfilled, rejected } = extraActions.getAll;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload.sessions, totalPages: action.payload.totalPages  };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }
    }
}
