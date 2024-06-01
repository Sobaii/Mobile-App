import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface authState {
    isAuthenticated: boolean;
}

const initialState: authState = {
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        }
    }
})

export const { updateIsAuthenticated } = authSlice.actions

export default authSlice.reducer