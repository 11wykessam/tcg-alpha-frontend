import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

export interface AppState {
    token: string | undefined;
}

const initialState: AppState = {
    token: undefined
};

export const appSlice: Slice<AppState> = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
});

export const {setToken} = appSlice.actions;
export default appSlice.reducer;