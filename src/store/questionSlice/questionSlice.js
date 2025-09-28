import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
    name: 'question',
    initialState: {
        rating: {
            dennis: 0,
            mariah: 0,
            regina: 0,
            tru: 0,
        },
        history: []
    },
    reducers: {
        setRating: (state, action) => {
            state.history.push({ ...state.rating });

            state.rating.dennis += action.payload.dennis;
            state.rating.mariah += action.payload.mariah;
            state.rating.regina += action.payload.regina;
            state.rating.tru += action.payload.tru;
        },
        goBack: (state) => {
            if (state.history.length > 0) {
                const prev = state.history.pop();
                state.rating = prev;
            }
        },
        setReset: (state) => {
            state.rating = {
                dennis: 0,
                mariah: 0,
                regina: 0,
                tru: 0,
            }
        }
    }
})

export const { 
    setRating,
    goBack,
    setReset,
} = questionSlice.actions;

export default questionSlice.reducer;