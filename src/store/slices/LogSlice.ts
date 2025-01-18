import {Log} from "../../model/Log.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState : Log[] = []

const LogSlice = createSlice({
    name: 'log',
    initialState: initialState,
    reducers: {
        addLog: (state, action: PayloadAction<Log>) => {
            state.push(action.payload);
        },
        removeLog: (state, action: PayloadAction<string>) => {
            return state.filter((log) => log.logCode !== action.payload);
        },
        updateLog: (state, action: PayloadAction<Log>) => {
            const index = state.findIndex((log) => log.logCode === action.payload.logCode);
            state[index] = action.payload;
        }
    }
})

export const {addLog, removeLog, updateLog} = LogSlice.actions;
export default LogSlice.reducer;