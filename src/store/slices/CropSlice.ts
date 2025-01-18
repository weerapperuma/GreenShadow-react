import {Crop} from "../../model/Crop.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialize: Crop[] = []

const CropSlice = createSlice({
    name: 'crop',
    initialState: initialize,
    reducers: {
        addCrop: (state, action: PayloadAction<Crop>) => {
            state.push(action.payload);
        },
        removeCrop: (state, action: PayloadAction<string>) => {
            return state.filter((crop) => crop.cropCode !== action.payload);
        },
        updateCrop: (state, action: PayloadAction<Crop>) => {
            const index = state.findIndex((crop) => crop.cropCode === action.payload.cropCode);
            state[index] = action.payload;
        }
    }
})

export const {addCrop, removeCrop, updateCrop} = CropSlice.actions;
export default CropSlice.reducer;