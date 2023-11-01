import {createSlice, Slice} from "@reduxjs/toolkit";
import APIClient from "../api/APIClient";

export interface AppState {
    apiClient: APIClient | undefined;
}

const initialState: AppState = {
    apiClient: undefined
};

export const appSlice: Slice<AppState> = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
    }
});

export const {setApiClient} = appSlice.actions;
export default appSlice.reducer;