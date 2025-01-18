import { Equ } from "../../model/Equ.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Equ[] = [];

const EquSlice = createSlice({
    name: "equ",
    initialState,
    reducers: {
        saveEqu: (state, action: PayloadAction<Equ>) => {
            console.log("awa",action.payload);
            state.push(action.payload);
        },
        deleteEqu: (state, action: PayloadAction<string>) => {
            return state.filter((equ) => equ.equId !== action.payload);
        },
        updateEqu: (state, action: PayloadAction<Equ>) => {
            const index = state.findIndex((equ) => equ.equId === action.payload.equId);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
    },
});

export const { saveEqu, deleteEqu, updateEqu } = EquSlice.actions;
export default EquSlice.reducer;
