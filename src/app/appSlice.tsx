import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

export interface AppState {
    message: string
}

const initialState = {
    message: ''
};

export const appSlice: Slice<AppState> = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        }
    }
});

export const {setMessage} = appSlice.actions;
export default appSlice.reducer;